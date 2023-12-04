import {useNewsWidget} from "./useNewsWidget"
import styles from "./NewsWidget.module.css"
import {WidgetComponent} from "@/model/WidgetComponent";
import {useRef} from "react";
import Marquee from "react-fast-marquee";
import {newsCountryCodes} from "@/model/NewsCountryCode";

export type NewsWidgetOptions = {
    countryCode: string
}

export const NewsWidget: WidgetComponent<NewsWidgetOptions> = (props) => {
    const articleListRef = useRef<HTMLDivElement>(null)
    const {
        articles,
        getArticleDateString,
        articleWidth,
        articleHeight,
        articleListTop,
        isSmall,
    } = useNewsWidget(props.options, props.panel, articleListRef)

    if(!newsCountryCodes.includes(props.options.countryCode)) {
        throw new Error("Invalid country code")
    }

    return (
        <div className={styles.bg}>
            <div
                className={styles.articleList}
                ref={articleListRef}
                style={{
                    top: -articleListTop,
                }}
            >
                { articles.map((article, i) => (
                    <div
                        className={styles.articleCard}
                        style={{
                            width: articleWidth,
                            height: articleHeight,
                        }}
                    >
                        <p className={styles.sourceText}>{article.source}</p>
                        { !isSmall &&
                            <p className={styles.titleText}>{article.title}</p>
                        }
                        { isSmall &&
                            <Marquee speed={50} style={{zIndex: "1 !important"}}>
                                <p className={styles.titleText}>{article.title + " |  "}</p>
                            </Marquee>
                        }
                        <p className={styles.dateText}>{getArticleDateString(article)}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}