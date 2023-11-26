import React from "react";

export type WidgetComponent<OptionsType> = React.FC<{options: OptionsType}>