import React, {useState, useEffect, useContext} from "react"
import {GridContext} from "@/view/components/GridLayout/gridContext"
import {GridPanel} from "@/model/GridPanel";

export const useGridPanelManager = () => {
    const {
        cellSize,
        cellMargin,
        isEditMode,
        replacePanel,
        panels,
    } = useContext(GridContext)

    const [showGhostPanel, setShowGhostPanel] = useState(false)
    const [ghostPanel, setGhostPanel] = useState({
        xPos: 0, yPos: 0,
        width: 1, height: 1,
    })

    const [dragStartPos, setDragStartPos] = useState<{x: number, y: number}>({x: 0, y: 0})
    const [draggedPanel, setDraggedPanel] = useState<GridPanel|null>(null)
    const [isDragInvalid, setIsDragInvalid] = useState(false)

    const [resizeStartPos, setResizeStartPos] = useState<{x: number, y: number}>({x: 0, y: 0})
    const [resizedPanel, setResizedPanel] = useState<GridPanel|null>(null)
    const [isResizeInvalid, setIsResizeInvalid] = useState(false)

    ////////// Drag panel //////////////////////////////////////////////////////////////////////////////

    const onPanelPointerDown = (panel: GridPanel, e: React.PointerEvent<HTMLDivElement>) => {
        if(!isEditMode) return
        setShowGhostPanel(true)
        setDragStartPos({x: e.clientX, y: e.clientY})
        setDraggedPanel(panel)
    }

    useEffect(() => {
        const onPointerMove = (e: PointerEvent) => {
            if(!isEditMode || !draggedPanel) return
            const dxPx = (e.clientX + cellSize/2) - dragStartPos.x
            const dyPx = (e.clientY + cellSize/2) - dragStartPos.y
            const dxCell = Math.floor(dxPx / cellSize)
            const dyCell = Math.floor(dyPx / cellSize)

            const newPanel = {
                ... draggedPanel,
                xPos: draggedPanel.xPos + dxCell,
                yPos: draggedPanel.yPos + dyCell,
            }
            setGhostPanel({
                xPos: newPanel.xPos,
                yPos: newPanel.yPos,
                width: newPanel.width,
                height: newPanel.height
            })
            let invalidPosition = false

            // Prevent dragging panel out of grid
            if(newPanel.xPos < 0) invalidPosition = true
            if(newPanel.yPos < 0) invalidPosition = true

            // Prevent collision with other panels
            const otherPanels = panels.filter(p => p.uid !== draggedPanel.uid)
            for(const otherPanel of otherPanels) {
                if(newPanel.xPos + newPanel.width > otherPanel.xPos && newPanel.xPos < otherPanel.xPos + otherPanel.width) {
                    if(newPanel.yPos + newPanel.height > otherPanel.yPos && newPanel.yPos < otherPanel.yPos + otherPanel.height) {
                        invalidPosition = true
                    }
                }
            }

            setIsDragInvalid(invalidPosition)
            if(!invalidPosition) replacePanel(draggedPanel, newPanel)
        }

        window.addEventListener('pointermove', onPointerMove)
        return () => window.removeEventListener('pointermove', onPointerMove)
    }, [isEditMode, draggedPanel, dragStartPos, setIsDragInvalid])

    useEffect(() => {
        const onUp = () => {
            if(!isEditMode || !draggedPanel) return
            setDraggedPanel(null)
            setShowGhostPanel(false)
        }

        window.addEventListener('pointerup', onUp)
        return () => window.removeEventListener('pointerup', onUp)
    }, [isEditMode, draggedPanel, dragStartPos])


    ////////// Resize panel //////////////////////////////////////////////////////////////////////////////

    const onResizeTipPointerDown = (panel: GridPanel, e: React.PointerEvent<HTMLDivElement>) => {
        if(!isEditMode) return
        setShowGhostPanel(true)
        setResizeStartPos({x: e.clientX, y: e.clientY})
        setResizedPanel(panel)
    }

    useEffect(() => {
        const onPointerMove = (e: PointerEvent) => {
            if(!isEditMode || !resizedPanel) return
            const dxPx = (e.clientX + cellSize/2) - resizeStartPos.x
            const dyPx = (e.clientY + cellSize/2) - resizeStartPos.y
            const dxCell = Math.floor(dxPx / cellSize)
            const dyCell = Math.floor(dyPx / cellSize)

            const newPanel = {
                ... resizedPanel,
                width: resizedPanel.width + dxCell,
                height: resizedPanel.height + dyCell,
            }
            setGhostPanel({
                xPos: newPanel.xPos,
                yPos: newPanel.yPos,
                width: newPanel.width,
                height: newPanel.height
            })
            let invalidSize = false

            // Prevent negative size
            if(newPanel.width <= 0) newPanel.width = 1
            if(newPanel.height <= 0) newPanel.height = 1

            // Enforce max and min size
            if(newPanel.height > newPanel.maxHeight) newPanel.height = newPanel.maxHeight
            if(newPanel.width > newPanel.maxWidth) newPanel.width = newPanel.maxWidth
            if(newPanel.height < newPanel.minHeight) newPanel.height = newPanel.minHeight
            if(newPanel.width < newPanel.minWidth) newPanel.width = newPanel.minWidth

            // Prevent collision with other panels
            const otherPanels = panels.filter(p => p.uid !== resizedPanel.uid)
            for(const otherPanel of otherPanels) {
                if(newPanel.xPos + newPanel.width > otherPanel.xPos && newPanel.xPos < otherPanel.xPos + otherPanel.width) {
                    if(newPanel.yPos + newPanel.height > otherPanel.yPos && newPanel.yPos < otherPanel.yPos + otherPanel.height) {
                        invalidSize = true
                    }
                }
            }

            setIsResizeInvalid(invalidSize)
            if(!invalidSize) replacePanel(resizedPanel, newPanel)
        }

        window.addEventListener('pointermove', onPointerMove)
        return () => window.removeEventListener('pointermove', onPointerMove)
    }, [isEditMode, resizedPanel, resizeStartPos])

    useEffect(() => {
        const onUp = () => {
            if(!isEditMode || !resizedPanel) return
            setResizedPanel(null)
            setShowGhostPanel(false)
        }

        window.addEventListener('pointerup', onUp)
        return () => window.removeEventListener('pointerup', onUp)
    }, [isEditMode, resizedPanel, resizeStartPos])


    /////////////////////////////////////////////////////////////////////////////////////////////////////

    return {
        onPanelPointerDown,
        isDragInvalid,
        draggedPanel,

        onResizeTipPointerDown,
        isResizeInvalid,
        resizedPanel,

        showGhostPanel,
        ghostPanel,
    }
}