import { useCallback, useEffect, useRef, useState } from "react";
import { DeviceHeader } from "../DeviceHeader/DeviceHeader";
import { PinArray } from "../../models/Devices/PinArray";
import { Pin } from "../../models/Devices/Pin";
import { PinFoot } from "../PinFoots/PinFoot";
import { AssignRegisterPinArrayAction } from "../../models/Assigns/AssignRegisterPinArray.action";

export interface DevicePorp {
    x: number,
    y: number,
    pinLength: number,
    dispatchAssignRegisterPinArray: React.Dispatch<AssignRegisterPinArrayAction>
}
export const Device = (props: DevicePorp) => {
    const pinFootLeftArray: PinArray = new PinArray(
        Array.from({ length: props.pinLength / 2 }, (_, i) => new Pin(i + 1)).concat(
            Array.from({ length: props.pinLength / 2 }, (_, i) => new Pin(i + (props.pinLength / 2) + 1)).reverse()
        ));

    const deviceRef = useRef<SVGRectElement>(null);
    const [pinFootTopMargin, setPinFootTopMargin] = useState<number>(0);
    const [headerMargin, setHeaderMargin] = useState<number>(0);
    const [pinFootRightMargin, setPinFootRightMargin] = useState<number>(0);

    const pinFootX = useCallback((isLeft: boolean): number => {
        return isLeft ? props.x : pinFootRightMargin + props.x;
    }, [props.x, pinFootRightMargin]);

    const pinFootY = useCallback((isLeft: boolean, index: number): number => {
        const useIndex: number = isLeft ? index : (props.pinLength - index - 1);
        return props.y + headerMargin + (pinFootTopMargin * useIndex);
    }, [props.pinLength, props.y, headerMargin, pinFootTopMargin]);

    useEffect(() => {
        if (!deviceRef.current) { return; }
        const rect: DOMRect = deviceRef.current.getBBox();

        setPinFootTopMargin((rect.height / props.pinLength) + 5);
        setHeaderMargin(rect.height * 0.15);
        setPinFootRightMargin(rect.width * 0.85);

    }, [deviceRef.current, setPinFootTopMargin, setHeaderMargin, setPinFootRightMargin, props.pinLength]);


    return (
        <g>
            <DeviceHeader cx={props.x + 15} cy={props.y + 15} />
            <rect ref={deviceRef} x={props.x} y={props.y} width='40vw' height='45vh' rx={10} fill='none' stroke='white' />

            {
                pinFootLeftArray.Value.map((pin, index) => {
                    const isLeft: boolean = index < (props.pinLength / 2);
                    return (
                        <PinFoot
                            key={index}
                            x={pinFootX(isLeft)}
                            y={pinFootY(isLeft, index)}
                            pin={pin}
                            isLeft={isLeft}
                            dispatchAssignRegisterPinArray={props.dispatchAssignRegisterPinArray} />
                    )
                })
            }
        </g>
    )
}