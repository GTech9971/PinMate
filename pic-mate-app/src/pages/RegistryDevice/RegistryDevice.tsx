import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import { useEffect, useRef, useState } from "react"
import { DeviceData } from "../../models/Devices/DeviceData"
import { Device } from "../../components/Device/Device";

export const RegistryDevice = () => {

    const rootRef = useRef<SVGSVGElement>(null);
    const [rootWidth, setRootWidth] = useState<number>(0);
    const [rootHeight, setRootHeight] = useState<number>(0);

    const [pinLength, setPinLength] = useState<number>(8);

    useEffect(() => {
        if (!rootRef.current) { return; }
        const rect = rootRef.current.getBBox();
        setRootWidth(rect.width * 0.7);
        setRootHeight(rect.height * 0.05);
    }, [rootRef.current, setRootWidth, setRootHeight]);


    const [device, setDevice] = useState<DeviceData>(new DeviceData('sample', []));

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        {device.Name}
                    </IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonHeader slot='fixed'>
                <svg ref={rootRef} style={{ width: '100vw', height: '50vh', background: 'gray' }} >
                    <Device x={rootWidth} y={rootHeight} pinLength={pinLength} />
                </svg>
            </IonHeader>

            <IonContent className="ion-padding" fullscreen>

            </IonContent>
        </IonPage>
    )
}