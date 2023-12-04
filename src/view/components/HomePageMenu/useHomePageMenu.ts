import {useState, useEffect, useContext} from "react";
import {GridContext} from "@/view/components/GridLayout/GridContext";

export const useHomePageMenu = () => {
    const [menuButtonShown, setMenuButtonShown] = useState(true)
    const [menuShown, setMenuShown] = useState(false)
    const [isAddWidgetDialogShown, setIsAddWidgetDialogShown] = useState(false)
    const [isClearWidgetsDialogShown, setIsClearWidgetsDialogShown] = useState(false)
    const [isChangeThemeDialogOpen, setIsChangeThemeDialogOpen] = useState(false)

    const {
        setIsEditMode,
        clearPanels,
    } = useContext(GridContext)

    useEffect(() => {
        const onClick = () => {
            if(menuShown) setMenuShown(false)
        }
        window.addEventListener('click', onClick)
        return () => window.removeEventListener('click', onClick)
    }, [menuShown, setMenuShown])

    const menuItemClick = (id: string) => {
        if(id == "add") {
            setIsAddWidgetDialogShown(true)
        }
        else if(id == "edit") {
            setIsEditMode(true)
        }
        else if(id == "clear-widgets") {
            setIsClearWidgetsDialogShown(true)
        }
        else if(id == "change-theme") {
            setIsChangeThemeDialogOpen(true)
        }
    }

    const clearWidgets = () => {
        clearPanels()
    }

    return {
        menuButtonShown,
        menuShown,
        setMenuShown,
        menuItemClick,
        isAddWidgetDialogShown,
        setIsAddWidgetDialogShown,
        isClearWidgetsDialogShown,
        setIsClearWidgetsDialogShown,
        clearWidgets,
        isChangeThemeDialogOpen,
        setIsChangeThemeDialogOpen,
    }
}