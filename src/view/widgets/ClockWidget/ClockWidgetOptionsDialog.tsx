import {WidgetOptionsDialog} from "@/model/WidgetOptionsDialog";
import OptionsDialog from "@/view/components/OptionsDialog/OptionsDialog";
import {SelectOption} from "@/view/materialPoo/MpSelect";
import {ClockWidgetOptions} from "@/view/widgets/ClockWidget/ClockWidget";

const ClockWidgetOptionsDialog: WidgetOptionsDialog<ClockWidgetOptions> = (props) => {
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
                value={props.options.is24Hour}
                onChange={(value) => props.setOption('is24Hour', value)}
            />
            <OptionsDialog.Select
                label="Theme"
                options={themeOptions}
                selectedValue={props.options.theme}
                onChange={(value) => props.setOption('theme', value)}
            />
        </OptionsDialog>
    )
}

export default ClockWidgetOptionsDialog;