import {useGridLayout} from "./useGridLayout"
import styles from "./GridLayout.module.css"
import GridDots from "@/view/components/GridLayout/GridDots/GridDots";
import React, { useRef} from "react";
import GridPanelManager from "@/view/components/GridLayout/GridPanelManager/GridPanelManager";
import {GridPanel} from "@/model/GridPanel";

type Props = {
    insidePanelComponent: React.FC<{ panel: GridPanel }>
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
                insidePanelComponent={props.insidePanelComponent}
                onPanelLongPress={props.onPanelLongPress}
            />
        </div>
    )
}