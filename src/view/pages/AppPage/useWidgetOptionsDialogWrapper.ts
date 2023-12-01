import {useContext, useEffect, useState} from "react";
import {GridContext} from "@/view/components/GridLayout/GridContext";
import {GridPanel} from "@/model/GridPanel";

export const useWidgetOptionsDialogWrapper = (openForPanelUid: string | null) => {
    const [isOpen, setIsOpen] = useState(false)
    const [openedPanel, setOpenedPanel] = useState<GridPanel | null>(null);

    const {
        panels,
        replacePanel,
    } = useContext(GridContext)

    useEffect(() => {
        if(openForPanelUid) {
            setIsOpen(true)
            const panel = panels.find(p => p.uid == openForPanelUid)
            setOpenedPanel(panel || null)
        }
    }, [openForPanelUid])

    const setOption = (option: string, value: string) => {
        if(!openedPanel) return
        const newPanel = {...openedPanel}
        newPanel.data.options[option] = value
        replacePanel(openedPanel, newPanel)
    }

    return {
        isOpen,
        setIsOpen,
        openedPanel,
        setOption,
    }
}