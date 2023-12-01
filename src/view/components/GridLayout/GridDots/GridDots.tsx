import styles from "./GridDots.module.css"
import {useContext} from "react";
import {GridContext} from "@/view/components/GridLayout/GridContext";

type Props = {
    gridWidth: number
    gridHeight: number
}

export default function GridDots(props: Props) {
    const {
        cellSize,
        isEditMode,
    } = useContext(GridContext)
    const cellCount = props.gridWidth * props.gridHeight
    const arr = Array.from(Array(cellCount).keys())

    return (
        <div
            className={styles.container}
            style={{width: cellSize * props.gridWidth, height: cellSize * props.gridHeight}}
            data-shown={isEditMode}
        >
            { arr.map(i => (
               <div
                   key={`celldot${i}`}
                   className={styles.cell}
                   style={{width: cellSize, height: cellSize}}
               >
                   <div className={styles.cellDot}/>
                   <div className={styles.cellDot}/>
                   <div className={styles.cellDot}/>
                   <div className={styles.cellDot}/>
               </div>
            )) }
        </div>
    )
}