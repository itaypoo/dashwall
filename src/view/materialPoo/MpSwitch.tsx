import React, {useState} from "react";

type MpSwitchProps = {
    onChange?: (checked: boolean) => void,
    isInitiallyChecked?: boolean,
    className?: string
}

export default function MpSwitch(props: React.PropsWithChildren<MpSwitchProps>) {
    const [isChecked, setIsChecked] = useState<boolean>(props.isInitiallyChecked || false)

    return (
        <div className={"mp-switch-container "+props.className} data-checked={isChecked}
             onClick={() => {
                 setIsChecked(!isChecked)
                 props.onChange?.(!isChecked)
             }}
        >
            <div className="mp-switch-thumb" data-checked={isChecked}/>
        </div>
    )
}