import {useWeatherWidget} from "./useWeatherWidget"
import styles from "./WeatherWidget.module.css"
import exp from "constants";
import {WidgetComponent} from "@/model/WidgetComponent";

export type WeatherWidgetOptions = {
    location: string
}

export const WeatherWidget: WidgetComponent<WeatherWidgetOptions> = (props) => {

    return (
        <div>
            weather widget
        </div>
    )
}