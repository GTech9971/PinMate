import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonLabel, IonList, IonListHeader, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from "@ionic/react"
import { useCallback, useEffect, useReducer, useRef, useState } from "react"
import { DeviceData } from "../../models/Devices/DeviceData"
import { Device } from "../../components/Device/Device";
import { addCircleOutline } from 'ionicons/icons'
import { RegisterArrayReducer } from "../../models/Registers/RegisterArray.reducer";
import { RegisterArray } from "../../models/Registers/RegisterArray";
import { Register } from "../../models/Registers/Register";
import { RegisterName } from "../../models/Registers/RegisterName";
import { RegisterItem } from "../../components/Registers/RegisterItem/RegisterItem";
import { RegisterPinArray } from "../../models/Registers/RegisterPinArray";
import { AssignRegisterPinArrayReducer } from "../../models/Assigns/AssignRegisterPinArray.resucer";

export const RegistryDevice = () => {

    const rootRef = useRef<SVGSVGElement>(null);
    const [rootWidth, setRootWidth] = useState<number>(0);
    const [rootHeight, setRootHeight] = useState<number>(0);

    const [pinLength, setPinLength] = useState<number>(8);

    const [assignRegisterPinArray, dispatchAssignRegisterPinArray] = useReducer(AssignRegisterPinArrayReducer, new RegisterPinArray([]));


    const [registerArray, dispatchRegisterArray] = useReducer(RegisterArrayReducer, new RegisterArray([new Register(new RegisterName('RA'), new RegisterPinArray([]))]));
    const [selectRegister, setSelectRegister] = useState<Register>(registerArray.Value[0]);

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
        dispatchRegisterArray({ type: 'registry' });
    }, [dispatchRegisterArray]);

    const onClickDeleteRegisterBtn = useCallback((register: Register) => {
        dispatchRegisterArray({ type: 'unregister', register: register });
    }, [dispatchRegisterArray]);

    useEffect(() => {
        console.log(registerArray.Value);
    }, [registerArray]);

    useEffect(() => {
        console.log(assignRegisterPinArray.Value);
        if (selectRegister) {
            const newRegisterPinArray: RegisterPinArray = new RegisterPinArray(assignRegisterPinArray.Value);
            const newRegister: Register = new Register(selectRegister.Name, newRegisterPinArray);
            dispatchRegisterArray({ type: 'updat-register', register: newRegister });
        }
    }, [assignRegisterPinArray, dispatchRegisterArray, selectRegister,]);


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
                        dispatchAssignRegisterPinArray={dispatchAssignRegisterPinArray} />
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
                    <IonButton onClick={onClickAddRegisterBtn} >
                        <IonIcon icon={addCircleOutline}
                            size="large"
                            color='primary' />
                    </IonButton>
                </IonListHeader>

                {
                    registerArray.Value.map((register) => {
                        return (
                            <RegisterItem key={register.Name.Value}
                                select={selectRegister === register}
                                register={register}
                                onClick={() => setSelectRegister(register)}
                                onClickDeleteRegisterBtn={onClickDeleteRegisterBtn} />
                        )
                    })
                }



            </IonContent>
        </IonPage>
    )
}