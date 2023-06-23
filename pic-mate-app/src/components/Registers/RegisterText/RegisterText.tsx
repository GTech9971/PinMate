import { RegisterPin } from "../../../models/Registers/RegisterPin"
import { UnAssignRegisterPin } from "../../../models/Registers/UnAssignRegisterPin";

export interface RegisterTextProp {
    x: number,
    y: number,
    isLeft: boolean,
    registerPin: RegisterPin
}

export const RegisterText = (props: RegisterTextProp) => {
    const lineX1: number = props.isLeft ? -30 : props.x * 1.2;
    const lineX2: number = props.isLeft ? 0 : props.x * 1.2 + 30;
    const lineY1: number = props.y + 8;
    const textX: number = props.isLeft ? -50 : props.x * 1.2 + 50;
    const textY: number = props.y + 12;

    return (
        <>
            <defs>
                <marker id="arrowhead-right" markerUnits='strokeWidth' markerWidth="10" markerHeight="7"
                    refX="10" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#000000" />
                </marker>

                <marker id="arrowhead-left" markerWidth="10" markerHeight="7"
                    refX="0" refY="3.5" orient="auto">
                    <polygon points="10 0, 0 3.5, 10 7" fill="#000000" />
                </marker>
            </defs>

            <line x1={lineX1} y1={lineY1} x2={lineX2} y2={lineY1}
                stroke="black"
                markerMid="line"
                markerStart="url(#arrowhead-left)"
                markerEnd="url(#arrowhead-right)" />

            <text x={textX} y={textY} fill="white" textAnchor="middle">
                {
                    props.registerPin instanceof UnAssignRegisterPin ?
                        ``
                        :
                        `${props.registerPin.RegisterName.Value}${props.registerPin.RegisterNo.Value}`
                }

            </text>
        </>
    )
}