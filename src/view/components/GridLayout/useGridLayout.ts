import {useState, useEffect, RefObject, useContext} from "react";
import {GridContext} from "@/view/components/GridLayout/gridContext";

export const useGridLayout = (wrapperRef: RefObject<HTMLDivElement>) => {
    const {
        cellSize,
    } = useContext(GridContext)
    const [columns, setColumns] = useState(0)
    const [rows, setRows] = useState(0)

    const calculateGrid = () => {
        const width = wrapperRef.current?.clientWidth || 0
        const height = wrapperRef.current?.clientHeight || 0
        setColumns(Math.floor(width / cellSize))
        setRows(Math.floor(height / cellSize))
    }

    useEffect(() => {
        window.addEventListener('resize', calculateGrid)
        return () => window.removeEventListener('resize', calculateGrid)
    }, []);

    useEffect(() => {
        calculateGrid()
    }, [wrapperRef, cellSize])

    return {
        columns,
        rows,
    }
}