import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AssignRegisterPinArrayAction } from "../../models/Assigns/AssignRegisterPinArray.action";
import { Pin } from "../../models/Devices/Pin";

export interface PinFootProp {
    /** ピン足のx座標 */
    x: number,
    /** ピン足のy座標 */
    y: number,
    /** ピン情報 */
    pin: Pin,
    /** 左側配置かどうか */
    isLeft: boolean,
    /** ピンのアサイン時に実行 */
    dispatchAssignRegisterPinArray: React.Dispatch<AssignRegisterPinArrayAction>,
}

/**
 * ピンの足
 * @param props 
 * @returns 
 */
export const PinFoot = (props: PinFootProp) => {
    const footRef = useRef<SVGRectElement>(null);
    const [select, setSelect] = useState<boolean>(false);
    const [textMargin, setTextMargin] = useState<number>(0);
    const fillColor: 'gray' | 'white' = select ? 'gray' : 'white';

    const textMarginTop: number = 15;

    const textX: number = useMemo(() => {
        return props.isLeft ? props.x + textMargin : props.x - textMargin;
    }, [props.isLeft, props.x, textMargin]);

    useEffect(() => {
        if (!footRef.current) { return; }
        const rect = footRef.current.getBBox();
        setTextMargin(rect.width * 1.2);
    }, [footRef.current, setTextMargin, props]);

    /**
     * ピンの足をクリックした際
     */
    const onClickFoot = useCallback(() => {
        setSelect((prev) => {
            const next: boolean = !prev;
            //レジスターピンのアサインまたは、アサイン解除
            props.dispatchAssignRegisterPinArray({ type: next ? "assign" : 'unassign', pin: props.pin });
            return next;
        });
    }, [setSelect, props.dispatchAssignRegisterPinArray, props.pin]);

    return (
        <>
            <rect ref={footRef} x={props.x} y={props.y} width='5vw' height='2.5vh' fill={fillColor} stroke='white' onClick={onClickFoot} />
            <text x={textX} y={props.y + textMarginTop} onClick={onClickFoot} fill="white">
                {props.pin.No}
            </text>


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