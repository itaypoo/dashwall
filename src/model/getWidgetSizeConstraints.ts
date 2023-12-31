import {WidgetId} from "@/model/WidgetId";

type SizeConstraints = {
    minWidth: number, minHeight: number,
    maxWidth: number, maxHeight: number,
}

export function getWidgetSizeConstraints(widgetId: WidgetId): SizeConstraints {
    switch (widgetId) {
        case "clock": return {
            minWidth: 3, minHeight: 3,
            maxWidth: 6, maxHeight: 6,
        }
        case "weather": return {
            minWidth: 4, minHeight: 4,
            maxWidth: 10, maxHeight: 10,
        }
        case "text": return {
            minWidth: 1, minHeight: 1,
            maxWidth: 30, maxHeight: 30,
        }
        case "news": return {
            minWidth: 4, minHeight: 3,
            maxWidth: 7, maxHeight: 7,
        }
        case "facts": return {
            minWidth: 5, minHeight: 3,
            maxWidth: 7, maxHeight: 7,

        }
        default: return {
            minWidth: 2, minHeight: 2,
            maxHeight: 20, maxWidth: 20,
        }
    }
}