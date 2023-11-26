import {useTextWidget} from "./useTextWidget"
import styles from "./TextWidget.module.css"
import {WidgetComponent} from "@/model/WidgetComponent";

export type TextWidgetOptions = {
    text: string
    isBold: boolean
    isItalic: boolean
}

export const TextWidget: WidgetComponent<TextWidgetOptions> = (props) => {

    return (
        <div>
            text widget
            {": " + props.options.text}
        </div>
    )
}