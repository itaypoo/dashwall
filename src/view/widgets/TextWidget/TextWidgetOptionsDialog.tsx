import {WidgetOptionsDialog} from "@/model/WidgetOptionsDialog";
import OptionsDialog from "@/view/components/OptionsDialog/OptionsDialog";

const TextWidgetOptionsDialog: WidgetOptionsDialog = (props) => {

    return (
        <OptionsDialog isOpen={props.isOpen} onClose={props.onClose}>
            <OptionsDialog.TextInput
                label="Text to display"
                hint="Write anything"
                value={props.options.text}
                onChange={(value) => props.setOption("text", value)}
            />
            <OptionsDialog.ColorPicker
                label="Background color"
                value={props.options.backgroundColor}
                onChange={(value) => props.setOption("backgroundColor", value)}
            />
            <OptionsDialog.Switch
                label="Bold"
                value={props.options.isBold}
                onChange={(value) => props.setOption("isBold", value)}
            />
            <OptionsDialog.Switch
                label="Italic"
                value={props.options.isItalic}
                onChange={(value) => props.setOption("isItalic", value)}
            />
        </OptionsDialog>
    )
}

export default TextWidgetOptionsDialog