import {NextApiRequest, NextApiResponse} from "next";
import {NewsCountryCode} from "@/model/NewsCountryCode";
import {ApiError, processApiCall} from "@/backend/processApiCall";
import {db} from "@/backend/firebaseAdmin";
import {firestore} from "firebase-admin";
import Timestamp = firestore.Timestamp;
import {NewsArticle} from "@/model/NewsArticle";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method != "GET") return res.status(405).json({message: "Method not allowed"})
    const countryCode = req.query.countryCode as NewsCountryCode
    if(!countryCode) return res.status(400).json({message: "Missing country code"})

    await processApiCall(res, async () => {
        const shouldFetch = await shouldFetchNewNews(countryCode)
        let articles: NewsArticle[]
        if(shouldFetch) {
            const apiData = await fetchNews(countryCode)
            articles = apiDataToNewsData(apiData)
            await uploadSavedNews(countryCode, articles)
        }
        else {
            articles = await getExistingNews(countryCode)
        }

        res.status(200).json({articles})
    })
}

////////////////////////////////////////////////////////////////////////////////////////////////////

async function shouldFetchNewNews(countryCode: NewsCountryCode) {
    const existingNews = await db.collection("savedNews").doc(countryCode).get()
    if(!existingNews.exists) return true
    const lastUpdated = (existingNews.get("lastUpdated") as Timestamp).toDate()
    const now = new Date()
    const diff = now.getTime() - lastUpdated.getTime()
    const diffInHours = diff / (1000 * 3600)
    // fetch new news every 12 hours
    return diffInHours > 12
}

async function fetchNews(countryCode: NewsCountryCode) {
    const apiKey = process.env.NEWS_API_KEY
    const res = await fetch(`https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=${apiKey}`)
    if(!res.ok) throw new ApiError(500, `Failed to fetch news for country code ${countryCode}`)
    return await res.json()
}

function apiDataToNewsData(apiData: any): NewsArticle[] {
    const res: NewsArticle[] = []
    apiData.articles.forEach((article: any) => {
        if(article.source.name == "Google News") article.source.name = article.author
        res.push({
            source: article.source.name,
            title: article.title,
            description: article.description,
            imageUrl: article.urlToImage,
            publishDate: new Date(article.publishedAt),
        })
    })
    return res
}

async function uploadSavedNews(countryCode: NewsCountryCode, news: NewsArticle[]) {
    const savedNewsRef = db.collection("savedNews").doc(countryCode)
    savedNewsRef.set({lastUpdated: new Date()})

    const existingArticles = await db.collection("savedNews").doc(countryCode).collection("articles").listDocuments()
    const batch = db.batch()
    existingArticles.forEach(article => batch.delete(article))
    await batch.commit()

    const articlesRef = savedNewsRef.collection("articles")
    const batch2 = db.batch()
    news.forEach((article: any) => {
        if(article.title == "[Removed]" || article.source == "[Removed]") return
        const articleRef = articlesRef.doc()
        batch2.set(articleRef, article)
    })
    await batch2.commit()
}

async function getExistingNews(countryCode: NewsCountryCode) {
    const savedNewsRef = db.collection("savedNews").doc(countryCode)
    const existingArticles = await savedNewsRef.collection("articles").get()
    const res: NewsArticle[] = []
    existingArticles.forEach(article => res.push({
        ...article.data(),
        publishDate: (article.get("publishDate") as Timestamp).toDate(),
    } as NewsArticle))
    return res
}