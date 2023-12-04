import {WidgetId} from "@/model/WidgetId";
import {TextWidgetOptions} from "@/view/widgets/TextWidget/TextWidget";
import {WeatherWidgetOptions} from "@/view/widgets/WeatherWidget/WeatherWidget";
import {ClockWidgetOptions} from "@/view/widgets/ClockWidget/ClockWidget";
import {NewsWidgetOptions} from "@/view/widgets/NewsWidget/NewsWidget";

export function getWidgetDefaultOptions(widgetId: WidgetId) {
    switch (widgetId) {
        case "clock": return {
            is24Hour: false,
            theme: "auto",
        } as ClockWidgetOptions

        case "weather": return {
            location: "autoip",
        } as WeatherWidgetOptions

        case "text": return {
            text: "Hello World",
            backgroundColor: "#182d49",
            isBold: false,
            isItalic: false,
            useGlobalTheme: false,
        } as TextWidgetOptions

        case "news": return {
            countryCode: "us",
        } as NewsWidgetOptions

        default: return {}
    }
}