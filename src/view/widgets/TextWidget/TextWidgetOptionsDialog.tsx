import {WidgetOptionsDialog} from "@/model/WidgetOptionsDialog";
import OptionsDialog from "@/view/components/OptionsDialog/OptionsDialog";
import {TextWidgetOptions} from "@/view/widgets/TextWidget/TextWidget";

const TextWidgetOptionsDialog: WidgetOptionsDialog<TextWidgetOptions> = (props) => {

    return (
        <OptionsDialog isOpen={props.isOpen} onClose={props.onClose}>
            <OptionsDialog.TextInput
                label="Text to display"
                hint="Write anything"
                value={props.options.text}
                onChange={(value) => props.setOption("text", value)}
            />
            <OptionsDialog.Switch
                label="Use global theme"
                value={props.options.useGlobalTheme}
                onChange={(value) => props.setOption("useGlobalTheme", value)}
            />
            { !props.options.useGlobalTheme &&
                <OptionsDialog.ColorPicker
                    label="Background color"
                    value={props.options.backgroundColor}
                    onChange={(value) => props.setOption("backgroundColor", value)}
                />
            }
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