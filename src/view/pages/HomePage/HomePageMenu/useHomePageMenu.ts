import {useState, useEffect, useContext} from "react";
import {GridContext} from "@/view/components/GridLayout/gridContext";
import {generateUUID} from "@/model/generateUUID";

export const useHomePageMenu = () => {
    const [menuButtonShown, setMenuButtonShown] = useState(true)
    const [menuShown, setMenuShown] = useState(false)
    const [isAddWidgetDialogShown, setIsAddWidgetDialogShown] = useState(false)
    const [isClearWidgetsDialogShown, setIsClearWidgetsDialogShown] = useState(false)

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
    }
}