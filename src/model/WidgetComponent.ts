import React from "react";
import {GridPanel} from "@/model/GridPanel";

export type WidgetComponent<OptionsType> = React.FC<{
    options: OptionsType,
    panel: GridPanel,
}>