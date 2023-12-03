import {useState, useEffect, useRef, RefObject, useContext} from "react";
import {NewsArticle} from "@/model/NewsArticle";
import {NewsWidgetOptions} from "@/view/widgets/NewsWidget/NewsWidget";
import {GridPanel} from "@/model/GridPanel";
import {GridContext} from "@/view/components/GridLayout/GridContext";

export const useNewsWidget = (
    options: NewsWidgetOptions,
    panel: GridPanel,
    articleListRef: RefObject<HTMLDivElement>
) => {
    const [articles, setArticles] = useState<NewsArticle[]>([])
    const [articleWidth, setArticleWidth] = useState(0)
    const [articleHeight, setArticleHeight] = useState(0)
    const [articleListTop, setArticleListTop] = useState(0)

    const isSmall = panel.height < 4

    const {
        cellSize,
        cellMargin,
    } = useContext(GridContext)

    useEffect(() => {
        fetchNews()
        const millisInHour = 3600 * 1000
        const i = setInterval(fetchNews, millisInHour*6)
        return () => clearInterval(i)
    }, [])

    useEffect(() => {
        setArticleWidth((panel.width * cellSize) - (cellMargin * 2) - 28 - 28)
        setArticleHeight((panel.height * cellSize) - (cellMargin * 2) - 28 - 28)
    }, [panel])

    useEffect(() => {
        const timeout = setTimeout(() => {
            const scroll = articleHeight + 28 + 8
            setArticleListTop(articleListTop + scroll)

            if(articleListTop == ((articles.length-1) * scroll)) {
                setArticleListTop(0)
            }
        }, isSmall ? 12000 : 8000)
        return () => clearTimeout(timeout)
    }, [articleListRef.current, articleListTop, articleHeight, articles])

    useEffect(() => {
        setArticleListTop(0)
    }, [panel.height])

    const fetchNews = async () => {
        const res = await fetch(`/api/news?countryCode=${options.countryCode}`)
        if(res.ok) {
            const data = await res.json()
            setArticles(data.articles)
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
        articleWidth,
        articleHeight,
        articleListTop,
        isSmall,
    }
}