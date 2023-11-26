import {useClockWidget} from "./useClockWidget"
import styles from "./ClockWidget.module.css"
import {WidgetComponent} from "@/model/WidgetComponent";

export type ClockWidgetOptions = {
    is24Hour: boolean
}

export const ClockWidget: WidgetComponent<ClockWidgetOptions> = (props) => {

    return (
        <div>
            clock widget
        </div>
    )
}