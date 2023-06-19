import { useEffect, useRef, useState } from "react";
import { PinFootLeft } from "../PinFootLeft/PinFootLeft"
import { PinFootRight } from "../PinFootRight/PinFootRight"
import { DeviceHeader } from "../DeviceHeader/DeviceHeader";
import { AssignPinNoArrayAction } from "../../models/Assigns/AssignPinNoArray.action";
import { PinArray } from "../../models/Devices/PinArray";
import { Pin } from "../../models/Devices/Pin";

export interface DevicePorp {
    x: number,
    y: number,
    pinLength: number,
    dispatchAssignLeftPinArray: React.Dispatch<AssignPinNoArrayAction>,
    dispatchAssignRightPinArray: React.Dispatch<AssignPinNoArrayAction>,
}
export const Device = (props: DevicePorp) => {
    const pinFootLeftArray: PinArray = new PinArray(Array.from({ length: props.pinLength / 2 }, (_, i) => new Pin(i + 1)));
    const pinFootRightArray: PinArray = new PinArray(Array.from({ length: props.pinLength / 2 }, (_, i) => new Pin(i + (props.pinLength / 2) + 1)).reverse());

    const deviceRef = useRef<SVGRectElement>(null);

    const [pinFootTopMargin, setPinFootTopMargin] = useState<number>(0);
    const [headerMargin, setHeaderMargin] = useState<number>(0);
    const [pinFootRightMargin, setPinFootRightMargin] = useState<number>(0);


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
                    return (
                        <PinFootLeft
                            key={index}
                            x={props.x}
                            y={props.y + headerMargin + (pinFootTopMargin * index)}
                            pin={pin}
                            dispatchAssignPinArray={props.dispatchAssignLeftPinArray} />
                    )
                })
            }

            {
                pinFootRightArray.Value.map((pin, index) => {
                    return (
                        <PinFootRight
                            key={index}
                            x={pinFootRightMargin + props.x}
                            y={props.y + headerMargin + (pinFootTopMargin * index)}
                            pin={pin}
                            dispatchAssignPinArray={props.dispatchAssignRightPinArray} />
                    )
                })
            }

        </g>
    )
}