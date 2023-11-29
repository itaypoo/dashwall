import styles from "./WidgetWrapper.module.css"
import {ClockWidget, ClockWidgetOptions} from "@/view/widgets/ClockWidget/ClockWidget";
import {WeatherWidget, WeatherWidgetOptions} from "@/view/widgets/WeatherWidget/WeatherWidget";
import {TextWidget, TextWidgetOptions} from "@/view/widgets/TextWidget/TextWidget";
import WidgetMenu from "@/view/components/WidgetWrapper/WidgetMenu/WidgetMenu";
import {useEffect} from "react";

type Props = {
    widgetId: WidgetId
    options: any
    isMenuOpen: boolean
    onCloseMenu: () => void
}

export default function WidgetWrapper(props: Props) {

    return (
        <div className={styles.widgetWrapper}>
            { props.widgetId === "clock" &&
                <ClockWidget options={props.options as ClockWidgetOptions}/>
            }
            { props.widgetId === "weather" &&
                <WeatherWidget options={props.options as WeatherWidgetOptions}/>
            }
            { props.widgetId === "text" &&
                <TextWidget options={props.options as TextWidgetOptions}/>
            }
            <WidgetMenu
                isOpen={props.isMenuOpen}
                onClose={props.onCloseMenu}
            />
        </div>
    )
}