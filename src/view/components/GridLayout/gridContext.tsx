import React, {createContext, PropsWithChildren, useEffect, useState} from "react";
import {GridPanel} from "@/model/GridPanel";


type GridContextData = {
    isEditMode: boolean
    setIsEditMode: (isEditMode: boolean) => void

    cellSize: number
    cellMargin: number

    panels: GridPanel[]
    addPanel: (panel: GridPanel) => void
    removePanel: (panel: GridPanel) => void
    replacePanel: (oldPanel: GridPanel, newPanel: GridPanel) => void
    clearPanels: () => void
}


export const GridContext =
    createContext<GridContextData>({} as GridContextData)


export const useGridContext: () => GridContextData = () => {
    const [isEditMode, setIsEditMode] = useState(false)
    const [panels, setPanels] = useState<GridPanel[]>([])

    const addPanel = (panel: GridPanel) => {
        setPanels([...panels, panel])
    }
    const removePanel = (panel: GridPanel) => {
        setPanels(panels.filter(p => p !== panel))
    }
    const replacePanel = (oldPanel: GridPanel, newPanel: GridPanel) => {
        const i = panels.indexOf(oldPanel)
        const arr = [...panels]
        arr[i] = newPanel
        setPanels(arr)
    }
    const clearPanels = () => {
        setPanels([])
    }

    useEffect(() => {
        if(panels.length != 0) localStorage.setItem('panels', JSON.stringify(panels))
    }, [panels])

    useEffect(() => {
        const panels = localStorage.getItem('panels')
        if (panels) {
            setPanels(JSON.parse(panels))
        }
    }, [])

    const cellSize = 64
    const cellMargin = 8

    return {
        isEditMode,
        setIsEditMode,
        cellSize,
        cellMargin,
        panels,
        addPanel,
        removePanel,
        replacePanel,
        clearPanels,
    }
}