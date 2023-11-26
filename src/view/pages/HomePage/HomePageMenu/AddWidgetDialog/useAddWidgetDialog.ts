import {useState, useEffect, useContext} from "react";
import {GridContext} from "@/view/components/GridLayout/gridContext";
import {generateUUID} from "@/model/generateUUID";
import {getWidgetDefaultOptions} from "@/model/getWidgetDefaultOptions";
import {getWidgetSizeConstraints} from "@/model/getWidgetSizeConstraints";

export const useAddWidgetDialog = () => {
    const {
        addPanel
    } = useContext(GridContext)

    const addWidget = (widgetId: WidgetId) => {
        const sizeCon = getWidgetSizeConstraints(widgetId)
        const options = getWidgetDefaultOptions(widgetId)

        addPanel({
            uid: generateUUID(),
            xPos: 0, yPos: 0,
            width: sizeCon.minWidth, height: sizeCon.minHeight,
            ... sizeCon,
            data: {
                widgetId: widgetId,
                options: options
            }
        })
    }

    return {
        addWidget
    }
}