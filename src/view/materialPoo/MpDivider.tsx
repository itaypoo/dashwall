type MpDividerProps = {
	color?: string
	className?: string
}

export default function MpDivider(props: MpDividerProps) {
	return (
		<div
			className={"mp-divider " + props.className}
			style={{ backgroundColor: props.color || "var(--color-card)" }}
		/>
	)
}
