
type SizeConstraints = {
    minWidth: number, minHeight: number,
    maxWidth: number, maxHeight: number,
}

export function getWidgetSizeConstraints(widgetId: WidgetId): SizeConstraints {
    switch (widgetId) {
        case "clock": return {
            minWidth: 4, minHeight: 3,
            maxWidth: 10, maxHeight: 10,
        }
        case "weather": return {
            minWidth: 4, minHeight: 4,
            maxWidth: 10, maxHeight: 10,
        }
        case "text": return {
            minWidth: 2, minHeight: 2,
            maxWidth: 10, maxHeight: 10,
        }
        default: return {
            minWidth: 2, minHeight: 2,
            maxHeight: 20, maxWidth: 20,
        }
    }
}