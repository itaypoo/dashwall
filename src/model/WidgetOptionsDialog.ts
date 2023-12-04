import React from "react";

type WidgetOptionsDialogProps<OptionsType> = {
    isOpen: boolean,
    onClose: () => void,
    options: OptionsType,
    setOption: (option: string, value: any) => void,
}

export type WidgetOptionsDialog<T> = React.FC<WidgetOptionsDialogProps<T>>