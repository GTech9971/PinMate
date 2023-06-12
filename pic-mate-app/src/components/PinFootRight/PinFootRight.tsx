import { useCallback, useState } from "react";

export interface PinFootRightProp {
    x: number,
    y: number,
    pinNo: number
}
export const PinFootRight = (props: PinFootRightProp) => {
    const [select, setSelect] = useState<boolean>(false);

    const fillColor: 'gray' | 'white' = select ? 'gray' : 'white';

    const textMarginLeft: number = 25;
    const textMarginTop: number = 15;

    const onClickFoot = useCallback(() => {
        setSelect((prev) => !prev);
    }, [setSelect]);

    return (
        <>
            <rect x={props.x} y={props.y} width='5vw' height='2.5vh' fill={fillColor} stroke='black' onClick={onClickFoot} />
            <text x={props.x - textMarginLeft} y={props.y + textMarginTop} onClick={onClickFoot}>{props.pinNo}</text>
        </>
    )
}