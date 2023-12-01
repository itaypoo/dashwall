
type MpColorSelectProps = {
    color: string;
    setColor: (color: string) => void;
}

export default function MpColorSelect(props: MpColorSelectProps) {

    return (
        <input className="mp-color-select" type="color" value={props.color} onChange={(e) => props.setColor(e.target.value)} />
    )
}