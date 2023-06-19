import { useCallback, useEffect, useRef, useState } from "react";
import { AssignPinNoArrayAction } from "../../models/Assigns/AssignPinNoArray.action";

export interface PinFootLeftProp {
    x: number,
    y: number,
    pinNo: number,
    dispatchAssignPinArray: React.Dispatch<AssignPinNoArrayAction>,
}
export const PinFootLeft = (props: PinFootLeftProp) => {
    const footRef = useRef<SVGRectElement>(null);
    const [textMarginLeft, setTextMarginLeft] = useState<number>(0);

    const [footWidth, setFootWidth] = useState<number>(0);
    const [footHeight, setFootHeight] = useState<number>(0);

    const [select, setSelect] = useState<boolean>(false);

    const fillColor: 'gray' | 'white' = select ? 'gray' : 'white';

    const textMarginTop: number = 15;

    useEffect(() => {
        if (!footRef.current) { return; }
        const rect = footRef.current.getBBox();
        setTextMarginLeft(rect.width * 1.2);
        setFootWidth(rect.width);
        setFootHeight(rect.height);
    }, [footRef.current, setTextMarginLeft, setFootWidth, setFootHeight, props]);

    const onClickFoot = useCallback(() => {
        setSelect((prev) => {
            const next: boolean = !prev;
            props.dispatchAssignPinArray({ type: next ? "assign" : 'unassign', pinNo: props.pinNo });
            return next;
        });
    }, [setSelect, props.dispatchAssignPinArray, props.pinNo]);

    return (
        <>
            <rect ref={footRef} x={props.x} y={props.y} width='5vw' height='2.5vh' fill={fillColor} stroke='white' onClick={onClickFoot} />
            <text x={props.x + textMarginLeft} y={props.y + textMarginTop} onClick={onClickFoot} fill='white'>{props.pinNo}</text>

            {/* <defs>
                <marker
                    id="arrow"
                    viewBox="0 0 10 10"
                    refX={footWidth}
                    refY={footHeight}
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" />
                </marker>
            </defs>


            <line
                x1={props.x}
                y1={props.y}
                x2={props.x * 0.5}
                y2={props.y}
                stroke="white"
                marker-end="url(#arrow)" /> */}

        </>
    )
}