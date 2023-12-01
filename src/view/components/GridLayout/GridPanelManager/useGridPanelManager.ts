import React, {useState, useEffect, useContext} from "react"
import {GridContext} from "@/view/components/GridLayout/GridContext"
import {GridPanel} from "@/model/GridPanel";

export const useGridPanelManager = (onLongPress?: (panel: GridPanel) => void) => {
    const {
        cellSize,
        isEditMode,
        replacePanel,
        panels,
        gridRows,
        gridColumns,
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

    const [heldPanel, setHeldPanel] = useState<GridPanel|null>(null)
    const longPressTimeout = 500

    ////////// Drag + long press panel //////////////////////////////////////////////////////////////////////////////

    const onPanelPointerDown = (panel: GridPanel, e: React.PointerEvent<HTMLDivElement>) => {
        if(!isEditMode) {
            setHeldPanel(panel)
            return
        }
        setShowGhostPanel(true)
        setIsDragInvalid(false)
        setDragStartPos({x: e.clientX, y: e.clientY})
        setDraggedPanel(panel)
        setGhostPanel({
            xPos: panel.xPos,
            yPos: panel.yPos,
            width: panel.width,
            height: panel.height
        })
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
            let doReplacePanel = true
            let invalidPosition = false

            // Prevent dragging panel out of grid
            if(newPanel.xPos < 0) {
                newPanel.xPos = 0
                invalidPosition = true
            }
            if(newPanel.yPos < 0) {
                newPanel.yPos = 0
                invalidPosition = true
            }
            if(newPanel.xPos + newPanel.width > gridColumns) {
                newPanel.xPos = gridColumns - newPanel.width
                invalidPosition = true
            }
            if(newPanel.yPos + newPanel.height > gridRows) {
                newPanel.yPos = gridRows - newPanel.height
                invalidPosition = true
            }

            // Prevent collision with other panels
            const otherPanels = panels.filter(p => p.uid !== draggedPanel.uid)
            for(const otherPanel of otherPanels) {
                if(newPanel.xPos + newPanel.width > otherPanel.xPos && newPanel.xPos < otherPanel.xPos + otherPanel.width) {
                    if(newPanel.yPos + newPanel.height > otherPanel.yPos && newPanel.yPos < otherPanel.yPos + otherPanel.height) {
                        doReplacePanel = false
                        invalidPosition = true
                    }
                }
            }

            setIsDragInvalid(invalidPosition)
            if(doReplacePanel) replacePanel(draggedPanel, newPanel)
        }

        window.addEventListener('pointermove', onPointerMove)
        return () => window.removeEventListener('pointermove', onPointerMove)
    }, [isEditMode, draggedPanel, dragStartPos, setIsDragInvalid])

    useEffect(() => {
        const onUp = () => {
            setHeldPanel(null)
            if(!isEditMode || !draggedPanel) return
            setDraggedPanel(null)
            setShowGhostPanel(false)
        }

        window.addEventListener('pointerup', onUp)
        return () => window.removeEventListener('pointerup', onUp)
    }, [isEditMode, draggedPanel, dragStartPos])

    useEffect(() => {
        if(!heldPanel) return
        const timeout = setTimeout(() => {
            if(onLongPress) onLongPress(heldPanel)
            setHeldPanel(null)
        }, longPressTimeout)
        return () => clearTimeout(timeout)
    }, [heldPanel])


    ////////// Resize panel //////////////////////////////////////////////////////////////////////////////

    const onResizeTipPointerDown = (panel: GridPanel, e: React.PointerEvent<HTMLDivElement>) => {
        if(!isEditMode) return
        setShowGhostPanel(true)
        setGhostPanel({
            xPos: panel.xPos,
            yPos: panel.yPos,
            width: panel.width,
            height: panel.height
        })
        setIsResizeInvalid(false)
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
            let doReplacePanel = true
            let invalidSize = false

            // Prevent negative size
            if(newPanel.width <= 0) newPanel.width = 1
            if(newPanel.height <= 0) newPanel.height = 1

            // Enforce max and min size
            if(newPanel.height > newPanel.maxHeight) {
                newPanel.height = newPanel.maxHeight
                invalidSize = true
            }
            if(newPanel.width > newPanel.maxWidth) {
                newPanel.width = newPanel.maxWidth
                invalidSize = true
            }
            if(newPanel.height < newPanel.minHeight) {
                newPanel.height = newPanel.minHeight
                invalidSize = true
            }
            if(newPanel.width < newPanel.minWidth) {
                newPanel.width = newPanel.minWidth
                invalidSize = true
            }

            // Prevent resizing panel out of grid
            if(newPanel.xPos + newPanel.width > gridColumns) {
                newPanel.width = gridColumns - newPanel.xPos
                invalidSize = true
            }
            if(newPanel.yPos + newPanel.height > gridRows) {
                newPanel.height = gridRows - newPanel.yPos
                invalidSize = true
            }

            // Prevent collision with other panels
            const otherPanels = panels.filter(p => p.uid !== resizedPanel.uid)
            for(const otherPanel of otherPanels) {
                if(newPanel.xPos + newPanel.width > otherPanel.xPos && newPanel.xPos < otherPanel.xPos + otherPanel.width) {
                    if(newPanel.yPos + newPanel.height > otherPanel.yPos && newPanel.yPos < otherPanel.yPos + otherPanel.height) {
                        doReplacePanel = false
                        invalidSize = true
                    }
                }
            }

            setIsResizeInvalid(invalidSize)
            if(doReplacePanel) replacePanel(resizedPanel, newPanel)
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

        heldPanel,
        showGhostPanel,
        ghostPanel,
    }
}