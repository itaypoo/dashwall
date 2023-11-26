
export function getWidgetDefaultOptions(widgetId: WidgetId) {
    switch (widgetId) {
        case "clock": return {
            is24Hour: false,
        }
        case "weather": return {
            location: "autoip",
        }
        case "text": return {
            text: "Hello World",
            isBold: false,
            isItalic: false,
        }
        default: return {}
    }
}