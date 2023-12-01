import React from "react";

type WidgetOptionsDialogProps = {
    isOpen: boolean,
    onClose: () => void,
    options: { [key: string]: any },
    setOption: (option: string, value: any) => void,
}

export type WidgetOptionsDialog = React.FC<WidgetOptionsDialogProps>