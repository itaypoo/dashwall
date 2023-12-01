import {useGridLayout} from "./useGridLayout"
import styles from "./GridLayout.module.css"
import GridDots from "@/view/components/GridLayout/GridDots/GridDots";
import React, {ReactNode, useRef} from "react";
import GridPanelManager from "@/view/components/GridLayout/GridPanelManager/GridPanelManager";
import {GridPanel} from "@/model/GridPanel";

type Props = {
    renderPanelContent: (panel: GridPanel) => ReactNode
    onPanelLongPress?: (panel: GridPanel) => void
}

export default function GridLayout(props: Props) {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const {
        rows,
        columns,
    } = useGridLayout(wrapperRef)

    return (
        <div className={styles.gridWrapper} ref={wrapperRef}>
            <GridDots
                gridWidth={columns}
                gridHeight={rows}
            />
            <GridPanelManager
                gridWidth={columns}
                gridHeight={rows}
                renderPanelContent={props.renderPanelContent}
                onPanelLongPress={props.onPanelLongPress}
            />
        </div>
    )
}