import {useTextWidget} from "./useTextWidget"
import styles from "./TextWidget.module.css"
import {WidgetComponent} from "@/model/WidgetComponent";

export type TextWidgetOptions = {
    text: string
    isBold: boolean
    isItalic: boolean
    backgroundColor: string
    useGlobalTheme: boolean
}

export const TextWidget: WidgetComponent<TextWidgetOptions> = (props) => {
    const {
        textColor
    } = useTextWidget(props.options)

    return (
        <div
            className={styles.bg}
            style={ props.options.useGlobalTheme ?
                {backgroundColor: "var(--user-color-lighter)"}
                : {backgroundColor: props.options.backgroundColor}
            }
        >
            <p
                className={styles.text}
                style={ props.options.useGlobalTheme ?
                    {color: "var(--user-color-darker)"}
                    : {color: textColor}
                }
                data-bold={props.options.isBold}
                data-italic={props.options.isItalic}
            >
                {props.options.text}
            </p>
        </div>
    )
}