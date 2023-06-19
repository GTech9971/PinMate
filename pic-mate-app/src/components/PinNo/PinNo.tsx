export interface PinNoProp {
    x: number,
    y: number,
    pinLength: number
}
export const PinNo = (props: PinNoProp) => {
    const textYSpan: number = 23;
    const pinNoLeftArray: number[] = Array.from({ length: props.pinLength / 2 + 1 }, (_, i) => i);
    const pinNoRightArray: number[] = Array.from({ length: props.pinLength / 2 + 1 }, (_, i) => i + (props.pinLength / 2));


    return (
        <>
            {
                pinNoLeftArray.map((no, index) => {
                    return (
                        <text x={props.x} y={props.y + (index * textYSpan)}>{no}</text>
                    )
                })
            }


            {
                pinNoRightArray.map((no, index) => {
                    return (
                        <text x={props.x + 80} y={props.y + (index * textYSpan)}>{no}</text>
                    )
                })
            }
        </>
    )
}