import { useCallback, useEffect, useRef, useState } from "react";

export interface PinFootRightProp {
    x: number,
    y: number,
    pinNo: number
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
        setSelect((prev) => !prev);
    }, [setSelect]);

    return (
        <>
            <rect ref={footRef} x={props.x} y={props.y} width='5vw' height='2.5vh' fill={fillColor} stroke='white' onClick={onClickFoot} />
            <text x={props.x - textMarginLeft} y={props.y + textMarginTop} onClick={onClickFoot} fill="white">{props.pinNo}</text>
        </>
    )
}