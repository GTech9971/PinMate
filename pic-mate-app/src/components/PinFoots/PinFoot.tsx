import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AssignRegisterPinArrayAction } from "../../models/Assigns/AssignRegisterPinArray.action";
import { RegisterPin } from "../../models/Registers/RegisterPin";
import { Register } from "../../models/Registers/Register";
import { useRecoilValue } from "recoil";
import { SelectRegisterAtom } from "../../models/Registers/SelectRegister.atom";
import { useIonAlert } from "@ionic/react";
import { RegisterText } from "../Registers/RegisterText/RegisterText";

export interface PinFootProp {
    /** ピン足のx座標 */
    x: number,
    /** ピン足のy座標 */
    y: number,
    /** ピン情報 */
    registerPin: RegisterPin,
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
    const [presentAlert] = useIonAlert();
    const [select, setSelect] = useState<boolean>(false);
    const [textMargin, setTextMargin] = useState<number>(0);

    const selectRegister: Register = useRecoilValue<Register>(SelectRegisterAtom);

    const fillColor: 'gray' | 'white' = select ? 'gray' : 'white';
    const textMarginTop: number = 15;

    const textX: number = useMemo(() => {
        return props.isLeft ? props.x + textMargin : props.x - textMargin;
    }, [props.isLeft, props.x, textMargin]);

    useEffect(() => {
        if (!footRef.current) { return; }
        const rect = footRef.current.getBBox();
        setTextMargin(rect.width * 1.2);
    }, [footRef.current?.getBBox(), setTextMargin, props]);

    /**
     * ピンの足をクリックした際
     */
    const onClickFoot = useCallback(() => {
        if (!selectRegister) {
            presentAlert({ message: 'Select Assign Register!' });
            return;
        }
        setSelect((prev) => {
            const next: boolean = !prev;

            //レジスターピンのアサインまたは、アサイン解除
            props.dispatchAssignRegisterPinArray({
                type: next ? "assign" : 'unassign',
                pin: props.registerPin.Pin,
                registerName: selectRegister.Name
            });
            return next;
        });
    }, [selectRegister, setSelect, props.dispatchAssignRegisterPinArray, props.registerPin]);

    return (
        <>
            <rect ref={footRef} x={props.x} y={props.y} width='5vw' height='2.5vh' fill={fillColor} stroke='white' onClick={onClickFoot} />
            <text x={textX} y={props.y + textMarginTop} onClick={onClickFoot} fill="white">
                {props.registerPin.Pin.No}
            </text>

            <RegisterText x={props.x} y={props.y} isLeft={props.isLeft} registerPin={props.registerPin} />
        </>
    )
}