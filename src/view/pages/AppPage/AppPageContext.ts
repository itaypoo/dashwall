import {createContext, useEffect, useState} from "react";

export const AppPageContext =
    createContext<AppPageContextData>({} as AppPageContextData)

type AppPageContextData = {
    deleteWidgetDialogOpenFor: string | null
    setDeleteWidgetDialogOpenFor: (panelUid: string | null) => void

    widgetOptionsDialogOpenFor: string | null
    setWidgetOptionsDialogOpenFor: (panelUid: string | null) => void

    userColorHue: number
    setUserColorHue: (hue: number) => void

    autoCycleHue: boolean
    setAutoCycleHue: (autoCycleHue: boolean) => void
}

export const useAppPageContext: () => AppPageContextData = () => {
    const [deleteWidgetDialogOpenFor, setDeleteWidgetDialogOpenFor] = useState<string | null>(null)
    const [widgetOptionsDialogOpenFor, setWidgetOptionsDialogOpenFor] = useState<string | null>(null)
    const [userColorHue, setUserColorHue] = useState(40)
    const [autoCycleHue, setAutoCycleHue] = useState(false)

    useEffect(() => {
        let hue = userColorHue
        if(!autoCycleHue) return
        const i = setInterval(() => {
            hue += 15
            if(hue > 360) hue = 0
            setUserColorHue(hue)
        }, 100000)
        return () => clearInterval(i)
    }, [autoCycleHue])

    return {
        deleteWidgetDialogOpenFor,
        setDeleteWidgetDialogOpenFor,
        widgetOptionsDialogOpenFor,
        setWidgetOptionsDialogOpenFor,
        userColorHue,
        setUserColorHue,
        autoCycleHue,
        setAutoCycleHue,
    }
}