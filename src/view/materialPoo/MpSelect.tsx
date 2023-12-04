import MpText from "./MpText";
import MpIcon from "./MpIcon";
import {useEffect, useRef, useState} from "react";

export type SelectOption = {
    label: string;
    icon?: string;
    code: string;
};

type MpSelectProps = {
    options: SelectOption[];
    selectedOptionCode: string;
    onChange: (option: string) => void;
};

export default function MpSelect(props: MpSelectProps) {
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const selectRef = useRef<HTMLDivElement>(null);

    const selectedOption = props.options.find(option => option.code === props.selectedOptionCode)

    useEffect(() => {
        const clickOutside = (event: PointerEvent) => {
            if (!selectRef.current?.contains(event.target as Node)) {
                setDropdownOpen(false)
            }
        }
        window.addEventListener('pointerup', clickOutside)
        return () => window.removeEventListener('pointerup', clickOutside)
    }, [dropdownOpen])

    return (
        <button
            className="mp-select"
            onClick={() => setDropdownOpen(!dropdownOpen)}
        >
            <div>
                { selectedOption?.icon &&
                    <MpIcon icon={selectedOption.icon} />
                }
                <MpText scale="body" noMargin>{selectedOption?.label}</MpText>
            </div>
            <MpIcon icon="arrow_drop_down"/>

            <div
                className="mp-select-dropdown"
                data-open={dropdownOpen}
                ref={selectRef}
            >
                { props.options.map((option, i) => (
                    <div key={`mpselectoption${i}`}
                        className="mp-select-option"
                        onClick={() => {
                            props.onChange(option.code)
                            setDropdownOpen(false)
                        }}
                    >
                        { option.icon &&
                            <MpIcon icon={option.icon} />
                        }
                        <MpText scale="body" noMargin>{option.label}</MpText>
                    </div>
                ))}
            </div>
        </button>
    );
}