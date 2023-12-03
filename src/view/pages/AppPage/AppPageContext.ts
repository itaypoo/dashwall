import {createContext, useState} from "react";

export const AppPageContext =
    createContext<AppPageContextData>({} as AppPageContextData)

type AppPageContextData = {
    deleteWidgetDialogOpenFor: string | null
    setDeleteWidgetDialogOpenFor: (panelUid: string | null) => void

    widgetOptionsDialogOpenFor: string | null
    setWidgetOptionsDialogOpenFor: (panelUid: string | null) => void

    userColorHue: number
    setUserColorHue: (hue: number) => void
}

export const useAppPageContext: () => AppPageContextData = () => {
    const [deleteWidgetDialogOpenFor, setDeleteWidgetDialogOpenFor] = useState<string | null>(null)
    const [widgetOptionsDialogOpenFor, setWidgetOptionsDialogOpenFor] = useState<string | null>(null)
    const [userColorHue, setUserColorHue] = useState(40)

    return {
        deleteWidgetDialogOpenFor,
        setDeleteWidgetDialogOpenFor,
        widgetOptionsDialogOpenFor,
        setWidgetOptionsDialogOpenFor,
        userColorHue,
        setUserColorHue,
    }
}