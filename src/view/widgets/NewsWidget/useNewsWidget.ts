import {useState, useEffect, useRef, RefObject} from "react";
import {NewsArticle} from "@/model/NewsArticle";
import {NewsWidgetOptions} from "@/view/widgets/NewsWidget/NewsWidget";

export const useNewsWidget = (options: NewsWidgetOptions, articleListRef: RefObject<HTMLDivElement>) => {
    const [articles, setArticles] = useState<NewsArticle[]>([])
    const [pushListDown, setPushListDown] = useState(true)
    const millisPerArticle = 800

    useEffect(() => {
        fetchNews()
        const millisInHour = 3600 * 1000
        const i = setInterval(fetchNews, millisInHour*6)
        return () => clearInterval(i)
    }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            setPushListDown(!pushListDown)
        }, articles.length * millisPerArticle)
        return () => clearTimeout(timer)
    }, [articles, pushListDown])

    const fetchNews = async () => {
        const res = await fetch(`/api/news?countryCode=${options.countryCode}`)
        if(res.ok) {
            const data = await res.json()
            setArticles(data.articles)
            const length = data.articles.length * 800
        }
        else console.error(res)
    }

    const getArticleDateString = (article: NewsArticle) => {
        const date = new Date(article.publishDate)
        return date.toLocaleDateString("en-US", {weekday: "long", month: "long", day: "numeric"})
    }

    return {
        articles,
        getArticleDateString,
        pushListDown,
        millisPerArticle,
    }
}