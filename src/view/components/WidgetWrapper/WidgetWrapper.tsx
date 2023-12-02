import styles from "./WidgetWrapper.module.css"
import {ClockWidget, ClockWidgetOptions} from "@/view/widgets/ClockWidget/ClockWidget";
import {WeatherWidget, WeatherWidgetOptions} from "@/view/widgets/WeatherWidget/WeatherWidget";
import {TextWidget, TextWidgetOptions} from "@/view/widgets/TextWidget/TextWidget";
import WidgetMenu from "@/view/components/WidgetWrapper/WidgetMenu/WidgetMenu";
import {WidgetId} from "@/model/WidgetId";
import {GridPanel} from "@/model/GridPanel";
import {NewsWidget, NewsWidgetOptions} from "@/view/widgets/NewsWidget/NewsWidget";

type Props = {
    panel: GridPanel
    isMenuOpen: boolean
    onCloseMenu: () => void
}

export default function WidgetWrapper(props: Props) {

    const widgetId = props.panel.data.widgetId as WidgetId
    const options = props.panel.data.options

    return (
        <div className={styles.widgetWrapper}>
            { widgetId === "clock" &&
                <ClockWidget
                    options={options as ClockWidgetOptions}
                    panel={props.panel}
                />
            }
            { widgetId === "weather" &&
                <WeatherWidget
                    options={options as WeatherWidgetOptions}
                    panel={props.panel}
                />
            }
            { widgetId === "text" &&
                <TextWidget
                    options={options as TextWidgetOptions}
                    panel={props.panel}
                />
            }
            { widgetId === "news" &&
                <NewsWidget
                    options={options as NewsWidgetOptions}
                    panel={props.panel}
                />
            }
            <WidgetMenu
                isOpen={props.isMenuOpen}
                onClose={props.onCloseMenu}
                panelUid={props.panel.uid}
            />
        </div>
    )
}