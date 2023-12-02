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
        listPushHeight
    } = useNewsWidget(props.options, articleListRef, props.panel)

    const {
        cellSize,
        cellMargin,
    } = useContext(GridContext)

    return (
        <div className={styles.bg}>
            <div
                className={styles.articleList}
                ref={articleListRef}
                style={{
                    top: listPushHeight
                }}
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