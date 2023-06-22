import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonLabel, IonList, IonListHeader, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from "@ionic/react"
import { useCallback, useEffect, useReducer, useState } from "react"
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
import { useRecoilState } from "recoil";
import { SelectRegisterAtom } from "../../models/Registers/SelectRegister.atom";
import { Pin } from "../../models/Devices/Pin";
import { RegisterPin } from "../../models/Registers/RegisterPin";

export const RegistryDevice = () => {
    const [pinLength, setPinLength] = useState<number>(8);

    //ピン足を引数のピンの長さから作成する
    const rergisterPinFootArray: RegisterPinArray = new RegisterPinArray(
        Array.from({ length: pinLength / 2 }, (_, i) => new RegisterPin(new Pin(i + 1), new RegisterName(''), -1)).concat(
            Array.from({ length: pinLength / 2 }, (_, i) => new RegisterPin(new Pin(i + (pinLength / 2) + 1), new RegisterName(''), -1)).reverse()
        ));

    const [assignRegisterPinArray, dispatchAssignRegisterPinArray] = useReducer(AssignRegisterPinArrayReducer, rergisterPinFootArray);

    const [registerArray, dispatchRegisterArray] = useReducer(RegisterArrayReducer, new RegisterArray([new Register(new RegisterName('RA'), new RegisterPinArray([]))]));
    const [selectRegister, setSelectRegister] = useRecoilState<Register>(SelectRegisterAtom);


    useEffect(() => {
        setSelectRegister(registerArray.Value[0]);
    }, [setSelectRegister, registerArray]);



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
    }, [assignRegisterPinArray]);


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        {
                            selectRegister ?
                                `Assign ${selectRegister.Name.Value} Registry` :
                                device.Name
                        }
                    </IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonHeader slot='fixed'>
                <svg style={{ width: '100vw', height: '50vh', background: 'gray' }} >
                    <Device
                        registerPinArray={assignRegisterPinArray}
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