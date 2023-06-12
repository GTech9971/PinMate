import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { PinFootLeft } from "../PinFootLeft/PinFootLeft"
import { PinFootRight } from "../PinFootRight/PinFootRight"

export interface DevicePorp {
    x: number,
    y: number,
    pinLength: number,
}
export const Device = (props: DevicePorp) => {
    const pinFootLeftArray: number[] = Array.from({ length: props.pinLength / 2 + 1 }, (_, i) => i);
    const pinFootRightArray: number[] = Array.from({ length: props.pinLength / 2 + 1 }, (_, i) => i + (props.pinLength / 2));

    const deviceRef = useRef<SVGRectElement>(null);

    const [pinFootTopMargin, setPinFootTopMargin] = useState<number>(0);


    // TODO 初回時に実行されない
    useLayoutEffect(() => {
        if (!deviceRef.current) { return; }
        setPinFootTopMargin((deviceRef.current.getBBox().height / props.pinLength) + 5);
    }, [deviceRef.current, setPinFootTopMargin, props.pinLength]);

    return (
        <>
            <circle cx='25' cy='25' r='10' />
            <rect ref={deviceRef} x='10' y='10' width='40vw' height='45vh' rx={10} fill='none' stroke='black' />

            {
                pinFootLeftArray.map((no, index) => {
                    return (
                        <PinFootLeft key={index} x={props.x} y={props.y + 50 + (pinFootTopMargin * index)} pinNo={no} />
                    )
                })
            }

            {/* {
                pinFootRightArray.map((no, index) => {
                    return (
                        <PinFootRight key={index} x={props.x} y={props.y} pinNo={no} />
                    )
                })
            } */}

        </>
    )
}