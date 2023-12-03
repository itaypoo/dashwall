import {WidgetId} from "@/model/WidgetId";

export function getWidgetDefaultOptions(widgetId: WidgetId) {
    switch (widgetId) {
        case "clock": return {
            is24Hour: false,
            theme: "auto",
        }
        case "weather": return {
            location: "autoip",
        }
        case "text": return {
            text: "Hello World",
            backgroundColor: "#182d49",
            isBold: false,
            isItalic: false,
        }
        case "news": return {
            countryCode: "us",
        }
        default: return {}
    }
}