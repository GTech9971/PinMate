import { useCallback, useEffect, useRef, useState } from "react";
import { DeviceHeader } from "../DeviceHeader/DeviceHeader";
import { Pin } from "../../models/Devices/Pin";
import { PinFoot } from "../PinFoots/PinFoot";
import { AssignRegisterPinArrayAction } from "../../models/Assigns/AssignRegisterPinArray.action";
import { RegisterPinArray } from "../../models/Registers/RegisterPinArray";
import { RegisterPin } from "../../models/Registers/RegisterPin";
import { RegisterName } from "../../models/Registers/RegisterName";

export interface DevicePorp {
    pinLength: number,
    dispatchAssignRegisterPinArray: React.Dispatch<AssignRegisterPinArrayAction>
}
export const Device = (props: DevicePorp) => {
    //ピン足を引数のピンの長さから作成する
    const pinFootLeftArray: RegisterPinArray = new RegisterPinArray(
        Array.from({ length: props.pinLength / 2 }, (_, i) => new RegisterPin(new Pin(i + 1), new RegisterName(''), 0)).concat(
            Array.from({ length: props.pinLength / 2 }, (_, i) => new RegisterPin(new Pin(i + (props.pinLength / 2) + 1), new RegisterName(''), 0)).reverse()
        ));

    const deviceRef = useRef<SVGRectElement>(null);
    const [pinFootTopMargin, setPinFootTopMargin] = useState<number>(0);
    const [headerMargin, setHeaderMargin] = useState<number>(0);
    const [pinFootRightMargin, setPinFootRightMargin] = useState<number>(0);

    const pinFootX = useCallback((isLeft: boolean): number => {
        return isLeft ? 0 : pinFootRightMargin;
    }, [pinFootRightMargin]);

    const pinFootY = useCallback((isLeft: boolean, index: number): number => {
        const useIndex: number = isLeft ? index : (props.pinLength - index - 1);
        return headerMargin + (pinFootTopMargin * useIndex);
    }, [props.pinLength, headerMargin, pinFootTopMargin]);

    useEffect(() => {
        if (!deviceRef.current) { return; }
        const rect: DOMRect = deviceRef.current.getBBox();

        setPinFootTopMargin((rect.height / props.pinLength) + 5);
        setHeaderMargin(rect.height * 0.15);
        setPinFootRightMargin(rect.width * 0.85);

    }, [deviceRef.current?.getBBox(), setPinFootTopMargin, setHeaderMargin, setPinFootRightMargin, props.pinLength]);


    return (
        <g style={{ transform: `translate(30vw, 2vh)` }}>
            <DeviceHeader cx={15} cy={15} />
            <rect ref={deviceRef}
                width='40vw'
                height='45vh'
                rx={10}
                fill='none'
                stroke='white' />

            {
                pinFootLeftArray.Value.map((pin, index) => {
                    const isLeft: boolean = index < (props.pinLength / 2);
                    return (
                        <PinFoot
                            key={index}
                            x={pinFootX(isLeft)}
                            y={pinFootY(isLeft, index)}
                            registerPin={pin}
                            isLeft={isLeft}
                            dispatchAssignRegisterPinArray={props.dispatchAssignRegisterPinArray} />
                    )
                })
            }
        </g>
    )
}