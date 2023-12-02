import {useNewsWidget} from "./useNewsWidget"
import styles from "./NewsWidget.module.css"
import {WidgetComponent} from "@/model/WidgetComponent";
import {NewsCountryCode} from "@/model/NewsCountryCode";
import {useContext, useEffect, useRef, useState} from "react";
import {GridContext} from "@/view/components/GridLayout/GridContext";

export type NewsWidgetOptions = {
    countryCode: NewsCountryCode
}

export const NewsWidget: WidgetComponent<NewsWidgetOptions> = (props) => {
    const articleListRef = useRef<HTMLDivElement>(null)
    const {
        articles,
        getArticleDateString,
        pushListDown,
        millisPerArticle,
    } = useNewsWidget(props.options, articleListRef)

    const {
        cellSize,
        cellMargin,
    } = useContext(GridContext)

    const listStyle: any = {
        transform: `translateY(0)`,
    }
    if(pushListDown && articleListRef.current && articles.length > 0) {
        let height = articleListRef.current.clientHeight
        height -= props.panel.height * cellSize
        height += 14
        listStyle.transform = `translateY(-${height}px)`
    }
    listStyle.transition = `transform ${articles.length * millisPerArticle}ms linear`

    return (
        <div className={styles.bg}>
            <div
                className={styles.articleList}
                ref={articleListRef}
                style={listStyle}
            >
                { articles.map((article, i) => (
                    <div className={styles.articleCard}>
                        <p className={styles.sourceText}>{article.source}</p>
                        <p className={styles.titleText}>{article.title}</p>
                        <p className={styles.dateText}>{getArticleDateString(article)}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}