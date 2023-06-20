import { RegisterPin } from "../../../models/Registers/RegisterPin"

export interface RegisterTextProp {
    x: number,
    y: number,
    isLeft: boolean,
    registerPin: RegisterPin
}

export const RegisterText = (props: RegisterTextProp) => {
    //TODO マーカーとテキストの位置調整
    const lineX1: number = props.isLeft ? -30 : props.x;
    const lineX2: number = props.isLeft ? 0 : props.x;
    const textX: number = (props.x * 2) + ((props.x * 2) * 0.2);
    const textY: number = (props.y) + (props.y) * 0.05;

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

            <line x1={lineX1} y1={props.y * 1.15} x2={lineX2} y2={props.y * 1.15}
                stroke="black"
                markerMid="line"
                markerStart="url(#arrowhead-left)"
                markerEnd="url(#arrowhead-right)" />

            <text x={textX} y={textY} fill="white" textAnchor="middle">
                {props.registerPin.RegisterName.Value}
                {props.registerPin.RegisterNo}
            </text>
        </>
    )
}