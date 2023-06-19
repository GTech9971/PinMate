import { IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from "@ionic/react"
import { useCallback, useEffect, useReducer, useRef, useState } from "react"
import { DeviceData } from "../../models/Devices/DeviceData"
import { Device } from "../../components/Device/Device";
import { pulseOutline } from 'ionicons/icons'
import { AssignPinNoArray } from "../../models/Assigns/AssignPinNoArray";
import { AssignPinNoArrayReducer } from "../../models/Assigns/AssignPinNoArray.reducer";

export const RegistryDevice = () => {

    const rootRef = useRef<SVGSVGElement>(null);
    const [rootWidth, setRootWidth] = useState<number>(0);
    const [rootHeight, setRootHeight] = useState<number>(0);

    const [pinLength, setPinLength] = useState<number>(8);

    const [assignLeftPinArray, dispatchAssignLeftPinArray] = useReducer(AssignPinNoArrayReducer, new AssignPinNoArray([]));
    const [assignRightPinArray, dispatchAssignRightPinArray] = useReducer(AssignPinNoArrayReducer, new AssignPinNoArray([]));


    useEffect(() => {
        if (!rootRef.current) { return; }
        const rect = rootRef.current.getBBox();
        setRootWidth(rect.width * 0.7);
        setRootHeight(rect.height * 0.05);
    }, [rootRef.current, setRootWidth, setRootHeight]);



    const [device, setDevice] = useState<DeviceData>(new DeviceData('sample', []));

    const onChangeName = useCallback((e: any) => {
        setDevice((prev) => new DeviceData(e, prev.Registers));
    }, [setDevice,]);

    const onClickAddRegisterBtn = useCallback(() => {

    }, []);

    useEffect(() => {
        console.log(assignLeftPinArray.Value);
    }, [assignLeftPinArray]);

    useEffect(() => {
        console.log(assignRightPinArray.Value);
    }, [assignRightPinArray]);

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
                    <Device
                        x={rootWidth}
                        y={rootHeight}
                        pinLength={pinLength}
                        dispatchAssignLeftPinArray={dispatchAssignLeftPinArray}
                        dispatchAssignRightPinArray={dispatchAssignRightPinArray} />
                </svg>
            </IonHeader>

            <IonContent className="ion-padding" fullscreen>

                <IonListHeader>
                    <IonLabel>Basic Infomartion</IonLabel>
                </IonListHeader>

                <IonList>
                    <IonInput label="Name"
                        labelPlacement='floating'
                        type="text"
                        placeholder="PIC16F1827"
                        value={device.Name}
                        onIonChange={(e: any) => onChangeName(e.target.value)} />

                    <IonSelect label="Pin Length"
                        labelPlacement="floating"
                        interface='action-sheet'
                        value={pinLength}
                        onIonChange={e => setPinLength(e.target.value)}>
                        <IonSelectOption value={8}>8</IonSelectOption>
                        <IonSelectOption value={16}>16</IonSelectOption>
                        <IonSelectOption value={18}>18</IonSelectOption>
                        <IonSelectOption value={20}>20</IonSelectOption>
                    </IonSelect>
                </IonList>

                <IonListHeader>
                    <IonLabel>Register Infomartion</IonLabel>
                </IonListHeader>

                <IonList>
                    <IonItem button
                        detailIcon={pulseOutline}
                        onClick={onClickAddRegisterBtn}>
                        <IonLabel>Add Register</IonLabel>
                    </IonItem>


                </IonList>

                <IonListHeader>
                    <IonLabel
                        color='primary'>RA</IonLabel>
                </IonListHeader>
                <IonList>

                </IonList>

            </IonContent>
        </IonPage>
    )
}