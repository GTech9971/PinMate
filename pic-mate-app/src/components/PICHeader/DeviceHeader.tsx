export interface PICHeaderProp {
    cx: number,
    cy: number,

}
export const PICHeader = (props: PICHeaderProp) => {
    return (
        <g>
            <circle cx={props.cx} cy={props.cy} r='10' fill='white' />
        </g>
    )
}