import {useAddWidgetDialog} from "./useAddWidgetDialog"
import styles from "./AddWidgetDialog.module.css"
import MpDialog from "@/view/materialPoo/MpDialog";
import MpButton from "@/view/materialPoo/MpButton";
import MpIcon from "@/view/materialPoo/MpIcon";
import MpText from "@/view/materialPoo/MpText";

const widgetOptions: {widgetId: WidgetId, name: string, icon: string}[] = [
    {
        widgetId: "clock",
        icon: "schedule",
        name: "Clock"
    },
    {
        widgetId: "weather",
        icon: "sunny",
        name: "Weather"
    },
    {
        widgetId: "text",
        icon: "text_fields",
        name: "Text Widget"
    }
]

type Props = {
    isOpen: boolean
    onClose: () => void
}

export default function AddWidgetDialog(props: Props) {
    const {
        addWidget
    } = useAddWidgetDialog()

    return (
        <MpDialog isOpen={props.isOpen}>
            <p className="mp-dialog-title">Add Widget</p>
            <div className={styles.optionsWrapper}>
                { widgetOptions.map((option, i) => (
                    <div
                        key={`menuitem${i}`}
                        className={styles.option}
                        onClick={() => {
                            addWidget(option.widgetId)
                            props.onClose()
                        }}
                    >
                        <MpIcon icon={option.icon}/>
                        <MpText scale="body" noMargin>{option.name}</MpText>
                    </div>
                ))}
            </div>
            <div className="mp-dialog-buttons">
                <MpButton type="outlined" onClick={props.onClose}>Cancel</MpButton>
            </div>
        </MpDialog>
    )
}