import ClockWidgetOptionsDialog from "@/view/widgets/ClockWidget/ClockWidgetOptionsDialog";
import {useWidgetOptionsDialogWrapper} from "@/view/pages/AppPage/useWidgetOptionsDialogWrapper";
import TextWidgetOptionsDialog from "@/view/widgets/TextWidget/TextWidgetOptionsDialog";

type Props = {
    openForPanelUid: string | null,
    onCloseDialog: () => void
}

export default function WidgetOptionsDialogWrapper(props: Props) {
    const {
        isOpen,
        setIsOpen,
        openedPanel,
        setOption,
    } = useWidgetOptionsDialogWrapper(props.openForPanelUid)

    const onClose = () => {
        setIsOpen(false)
        props.onCloseDialog()
    }

    return (
        <>
            { openedPanel && openedPanel.data.widgetId == "clock" &&
                <ClockWidgetOptionsDialog
                    isOpen={isOpen}
                    onClose={onClose}
                    options={openedPanel.data.options}
                    setOption={setOption}
                />
            }
            { openedPanel && openedPanel.data.widgetId == "text" &&
                <TextWidgetOptionsDialog
                    isOpen={isOpen}
                    onClose={onClose}
                    options={openedPanel.data.options}
                    setOption={setOption}
                />
            }
        </>
    )
}