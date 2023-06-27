import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PICHeader } from "../PICHeader/DeviceHeader";
import { PinFoot } from "../PinFoots/PinFoot";
import { AssignRegisterPinArrayAction } from "../../models/Assigns/AssignRegisterPinArray.action";
import { RegisterPinArray } from "../../models/Registers/RegisterPinArray";
import { PICName } from "../../models/PICs/PICName";

export interface PICProp {
    picName: PICName,
    registerPinArray: RegisterPinArray,
    dispatchAssignRegisterPinArray: React.Dispatch<AssignRegisterPinArrayAction>
}
export const PIC = (props: PICProp) => {

    const deviceRef = useRef<SVGRectElement>(null);
    const [pinFootTopMargin, setPinFootTopMargin] = useState<number>(0);
    const [headerMargin, setHeaderMargin] = useState<number>(0);
    const [pinFootRightMargin, setPinFootRightMargin] = useState<number>(0);

    const pinLength: number = useMemo(() => {
        return props.registerPinArray.Value.length;
    }, [props.registerPinArray.Value.length]);

    const pinFootX = useCallback((isLeft: boolean): number => {
        return isLeft ? 0 : pinFootRightMargin;
    }, [pinFootRightMargin]);

    const pinFootY = useCallback((isLeft: boolean, index: number): number => {
        const useIndex: number = isLeft ? index : (pinLength - index - 1);
        return headerMargin + (pinFootTopMargin * useIndex);
    }, [pinLength, headerMargin, pinFootTopMargin]);

    useEffect(() => {
        if (!deviceRef.current) { return; }
        const rect: DOMRect = deviceRef.current.getBBox();

        setPinFootTopMargin((rect.height / pinLength) + 5);
        setHeaderMargin(rect.height * 0.15);
        setPinFootRightMargin(rect.width * 0.85);

    }, [deviceRef.current?.getBBox(), setPinFootTopMargin, setHeaderMargin, setPinFootRightMargin, pinLength]);


    return (
        <g style={{ transform: `translate(30vw, 2vh)` }}>
            <PICHeader cx={15} cy={15} />
            <rect ref={deviceRef}
                width='40vw'
                height='40vh'
                rx={10}
                fill='none'
                stroke='white' />

            {
                props.registerPinArray.Value.map((pin, index) => {
                    const isLeft: boolean = index < (pinLength / 2);
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