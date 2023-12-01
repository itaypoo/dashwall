import {createContext, useState} from "react";

export const AppPageContext =
    createContext<AppPageContextData>({} as AppPageContextData)

type AppPageContextData = {
    deleteWidgetDialogOpenFor: string | null
    setDeleteWidgetDialogOpenFor: (panelUid: string | null) => void

    widgetOptionsDialogOpenFor: string | null
    setWidgetOptionsDialogOpenFor: (panelUid: string | null) => void
}

export const useAppPageContext: () => AppPageContextData = () => {
    const [deleteWidgetDialogOpenFor, setDeleteWidgetDialogOpenFor] = useState<string | null>(null)
    const [widgetOptionsDialogOpenFor, setWidgetOptionsDialogOpenFor] = useState<string | null>(null)

    return {
        deleteWidgetDialogOpenFor,
        setDeleteWidgetDialogOpenFor,
        widgetOptionsDialogOpenFor,
        setWidgetOptionsDialogOpenFor
    }
}