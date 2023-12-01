import {WidgetOptionsDialog} from "@/model/WidgetOptionsDialog";
import OptionsDialog from "@/view/components/OptionsDialog/OptionsDialog";
import {SelectOption} from "@/view/materialPoo/MpSelect";

const ClockWidgetOptionsDialog: WidgetOptionsDialog = (props) => {
    const themeOptions = [
        {label: "Light", code: "light", icon: "light_mode"},
        {label: "Dark", code: "dark", icon: "dark_mode"},
        {label: "Auto", code: "auto", icon: "update"}
    ]

    return (
        <OptionsDialog
            isOpen={props.isOpen}
            onClose={props.onClose}
        >
            <OptionsDialog.Switch
                label="Use 24h format"
                value={props.options.is24Hour as boolean}
                onChange={(value) => props.setOption('is24Hour', value)}
            />
            <OptionsDialog.Select
                label="Theme"
                selectedValue={themeOptions.find(option => option.code === props.options.theme) as SelectOption}
                options={themeOptions}
                onChange={(value) => props.setOption('theme', value.code)}
            />
        </OptionsDialog>
    )
}

export default ClockWidgetOptionsDialog;