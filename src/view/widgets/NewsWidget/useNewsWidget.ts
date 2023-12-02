import {useState, useEffect, useRef, RefObject, useContext} from "react";
import {NewsArticle} from "@/model/NewsArticle";
import {NewsWidgetOptions} from "@/view/widgets/NewsWidget/NewsWidget";
import {GridPanel} from "@/model/GridPanel";
import {GridContext} from "@/view/components/GridLayout/GridContext";

export const useNewsWidget = (options: NewsWidgetOptions, articleListRef: RefObject<HTMLDivElement>, panel: GridPanel) => {
    const [articles, setArticles] = useState<NewsArticle[]>([])
    const [listPushHeight, setListPushHeight] = useState(0)

    const {
        cellSize
    } = useContext(GridContext)

    useEffect(() => {
        fetchNews()
        const millisInHour = 3600 * 1000
        const i = setInterval(fetchNews, millisInHour*6)
        return () => clearInterval(i)
    }, [])

    useEffect(() => {
        if(!articleListRef.current) return
        let height = 0
        let direction = -1

        const onFrame = () => {
            setListPushHeight(height)
            height += direction

            if(height > 0) direction = -1
            let maxHeight = articleListRef.current!.scrollHeight
            maxHeight -= panel.height * cellSize
            maxHeight += 14
            if(height < -maxHeight) {
                direction = 1
            }

            console.log("height", height)
            console.log("maxHeight", maxHeight)

            requestAnimationFrame(onFrame)
        }

        const anim = requestAnimationFrame(onFrame)
        return () => cancelAnimationFrame(anim)
    }, [panel, articleListRef.current])

    const fetchNews = async () => {
        const res = await fetch(`/api/news?countryCode=${options.countryCode}`)
        if(res.ok) {
            const data = await res.json()
            setArticles([
                data.articles[0],
                data.articles[1],
                data.articles[2],
                data.articles[3],
            ])
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
        listPushHeight,
    }
}