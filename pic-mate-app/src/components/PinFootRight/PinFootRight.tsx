import { useCallback, useEffect, useRef, useState } from "react";
import { AssignPinNoArrayAction } from "../../models/Assigns/AssignPinNoArray.action";

export interface PinFootRightProp {
    x: number,
    y: number,
    pinNo: number,
    dispatchAssignPinArray: React.Dispatch<AssignPinNoArrayAction>,
}
export const PinFootRight = (props: PinFootRightProp) => {
    const footRef = useRef<SVGRectElement>(null);
    const [select, setSelect] = useState<boolean>(false);
    const [textMarginLeft, setTextMarginLeft] = useState<number>(0);
    const fillColor: 'gray' | 'white' = select ? 'gray' : 'white';

    const textMarginTop: number = 15;

    useEffect(() => {
        if (!footRef.current) { return; }
        setTextMarginLeft(footRef.current.getBBox().width * 1.2);
    }, [footRef.current, setTextMarginLeft, props]);

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
            <text x={props.x - textMarginLeft} y={props.y + textMarginTop} onClick={onClickFoot} fill="white">{props.pinNo}</text>
        </>
    )
}