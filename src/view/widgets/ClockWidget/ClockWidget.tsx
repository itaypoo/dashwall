import {useClockWidget} from "./useClockWidget"
import styles from "./ClockWidget.module.css"
import {WidgetComponent} from "@/model/WidgetComponent";
import {CSSProperties, useEffect} from "react";

export type ClockWidgetOptions = {
    is24Hour: boolean
    theme: "light" | "dark" | "auto"
}

export const ClockWidget: WidgetComponent<ClockWidgetOptions> = (props) => {
    const {
        hours,
        minutes,
        dateString,
        numberDistances,
        isDark,
        isBig,
    } = useClockWidget(props.options, props.panel)

    return (
        <div
            className={styles.main}
            data-dark={isDark}
            data-big={isBig}
        >
            <div>
                <p className={styles.time+" "+styles.one}
                   style={{"--distance": numberDistances[0]+"px"} as CSSProperties}
                >
                    {hours[0]}
                </p>
                <p className={styles.time+" "+styles.two}
                   style={{"--distance": numberDistances[1]+"px"} as CSSProperties}
                >
                    {hours[1]}
                </p>
            </div>
            <div>
                <p className={styles.time+" "+styles.three}
                   style={{"--distance": numberDistances[2]+"px"} as CSSProperties}
                >
                    {minutes[0]}
                </p>
                <p className={styles.time+" "+styles.four}
                   style={{"--distance": numberDistances[3]+"px"} as CSSProperties}
                >
                    {minutes[1]}
                </p>
            </div>
            <p>{dateString}</p>
        </div>
    )
}