import { RefObject } from "react"

export interface DeviceHeaderProp {
    cx: number,
    cy: number,

}
export const DeviceHeader = (props: DeviceHeaderProp) => {
    return (
        <g>
            <circle cx={props.cx} cy={props.cy} r='10' fill='white' />
        </g>
    )
}