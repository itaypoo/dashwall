import {useOptionsDialog} from "./useOptionsDialog"
import styles from "./OptionsDialog.module.css"
import MpDialog from "@/view/materialPoo/MpDialog";
import {PropsWithChildren} from "react";
import MpButton from "@/view/materialPoo/MpButton";
import MpText from "@/view/materialPoo/MpText";
import MpSwitch from "@/view/materialPoo/MpSwitch";
import MpSelect, {SelectOption} from "@/view/materialPoo/MpSelect";
import MpTextbox from "@/view/materialPoo/MpTextbox";
import MpColorSelect from "@/view/materialPoo/MpColorSelect";

type Props = {
    isOpen: boolean
    onClose: () => void
}

const OptionsDialog = (props: PropsWithChildren<Props>) => {

    return (
        <MpDialog isOpen={props.isOpen} isFullSize>
            <p className="mp-dialog-title">Widget settings</p>
            <div className={styles.optionsWrapper}>
                {props.children}
            </div>
            <div className="mp-dialog-buttons">
                <MpButton type="filled" onClick={props.onClose}>Okay</MpButton>
            </div>
        </MpDialog>
    )
}

export default OptionsDialog

//////////////////////////////////////////////////////////////////////////////////////

type SwitchProps = {
    label: string
    value: boolean
    onChange: (value: boolean) => void
}
OptionsDialog.Switch = (props: SwitchProps) => {
    return (
        <div className={styles.option}>
            <MpText scale="body" noMargin>{props.label}</MpText>
            <MpSwitch
                isInitiallyChecked={props.value}
                onChange={props.onChange}
            />
        </div>
    )
}

type SelectProps = {
    label: string
    options: SelectOption[]
    selectedValue: SelectOption
    onChange: (value: SelectOption) => void
}
OptionsDialog.Select = (props: SelectProps) => {
    return (
        <div className={styles.option}>
            <MpText scale="body" noMargin>{props.label}</MpText>
            <MpSelect
                options={props.options}
                selectedOption={props.selectedValue}
                onChange={props.onChange}
            />
        </div>
    )
}

type TextInputsProps = {
    label: string
    hint: string
    value: string
    onChange: (value: string) => void
}
OptionsDialog.TextInput = (props: TextInputsProps) => {
    return (
        <div className={styles.option}>
            <MpText scale="body" noMargin>{props.label}</MpText>
            <MpTextbox
                hint={props.hint}
                text={props.value}
                onTextChange={props.onChange}
            />
        </div>
    )
}

type ColorPickerProps = {
    label: string
    value: string
    onChange: (value: string) => void
}
OptionsDialog.ColorPicker = (props: ColorPickerProps) => {
    return (
        <div className={styles.option}>
            <MpText scale="body" noMargin>{props.label}</MpText>
            <MpColorSelect
                color={props.value}
                setColor={props.onChange}
            />
        </div>
    )
}