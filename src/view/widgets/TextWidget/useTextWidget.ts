import {useState, useEffect} from "react";
import {TextWidgetOptions} from "@/view/widgets/TextWidget/TextWidget";

export const useTextWidget = (options: TextWidgetOptions) => {
    const [textColor, setTextColor] = useState<"black" | "white">("white")

    useEffect(() => {
        if(!options.backgroundColor) return
        const color = options.backgroundColor
        const r = parseInt(color.slice(1, 3), 16)
        const g = parseInt(color.slice(3, 5), 16)
        const b = parseInt(color.slice(5, 7), 16)
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255 // chatgpt told me to do this

        setTextColor(luminance > 0.5 ? 'black' : 'white')
    }, [options.backgroundColor])

    return {
        textColor,
    }
}