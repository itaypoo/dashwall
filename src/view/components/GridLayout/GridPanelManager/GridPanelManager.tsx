import {useGridPanelManager} from "./useGridPanelManager"
import styles from "./GridPanelManager.module.css"
import React, {Fragment, useContext, useEffect} from "react";
import {GridContext} from "@/view/components/GridLayout/gridContext";
import {generateUUID} from "@/model/generateUUID";
import {GridPanel} from "@/model/GridPanel";

type Props = {
    gridWidth: number
    gridHeight: number
    insidePanelComponent: React.FC<{ panel: GridPanel }>
}

export default function GridPanelManager(props: Props) {
    const {
        panels,
        addPanel,
        cellSize,
        cellMargin,
        isEditMode
    } = useContext(GridContext)
    const {
        onPanelPointerDown,
        isDragInvalid,
        draggedPanel,

        onResizeTipPointerDown,
        isResizeInvalid,
        resizedPanel,

        showGhostPanel,
        ghostPanel,
    } = useGridPanelManager()

    return (
        <div
            className={styles.wrapper}
            style={{width: props.gridWidth * cellSize, height: props.gridHeight * cellSize}}
            data-dragging={!!draggedPanel}
            data-resizing={!!resizedPanel}
        >
            { showGhostPanel &&
                <div
                    className={styles.ghostPanel}
                    style={{
                        width: (ghostPanel.width * cellSize) - (cellMargin*2),
                        height: (ghostPanel.height * cellSize) - (cellMargin*2),
                        left: (ghostPanel.xPos * cellSize) + cellMargin,
                        top: (ghostPanel.yPos * cellSize) + cellMargin,
                    }}
                />
            }
            { panels.map((panel, i) => (
                <Fragment key={`fragment${panel.uid}`}>
                    <div
                        key={`panel${panel.uid}`}
                        className={styles.panel}
                        data-editing={draggedPanel?.uid == panel.uid || resizedPanel?.uid == panel.uid}
                        data-invalid={
                            ((draggedPanel?.uid == panel.uid) && isDragInvalid) ||
                            ((resizedPanel?.uid == panel.uid) && isResizeInvalid)
                        }
                        onPointerDown={(e) => onPanelPointerDown(panel, e)}
                        onDragStart={(e) => e.preventDefault()}
                        style={{
                            width: (panel.width * cellSize) - (cellMargin*2),
                            height: (panel.height * cellSize) - (cellMargin*2),
                            left: (panel.xPos * cellSize) + cellMargin,
                            top: (panel.yPos * cellSize) + cellMargin,
                        }}
                    >
                        <props.insidePanelComponent panel={panel}/>
                    </div>
                    { isEditMode &&
                        <div
                            key={`resizetip${panel.uid}`}
                            className={styles.panelResizeTip}
                            onPointerDown={(e) => onResizeTipPointerDown(panel, e)}
                            onDragStart={(e) => e.preventDefault()}
                            style={{
                                left: (panel.xPos * cellSize) + (panel.width * cellSize) - 27,
                                top: (panel.yPos * cellSize) + (panel.height * cellSize) - 27,
                            }}
                        >
                            <TriangleSVG color="var(--color-on-background)" key={`tsvg${panel.uid}`}/>
                        </div>
                    }
                </Fragment>
            )) }
        </div>
    )
}

const TriangleSVG = ({color}: {color: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
        <path d="M27 24.5V3.03553C27 0.808272 24.3071 -0.307144 22.7322 1.26777L1.26777 22.7322C-0.307145 24.3071 0.808272 27 3.03553 27H24.5C25.8807 27 27 25.8807 27 24.5Z" fill={color}/>
    </svg>
)