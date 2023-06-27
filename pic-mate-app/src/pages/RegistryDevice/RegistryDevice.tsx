import {
    IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel,
    IonList, IonListHeader, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonAlert
} from "@ionic/react"
import { useCallback, useEffect, useReducer, useState } from "react"
import { Device } from "../../components/Device/Device";
import { addCircleOutline } from 'ionicons/icons'
import { RegisterNameArrayReducer } from "../../models/Registers/RegisterNameArray.reducer";
import { RegisterNameItem } from "../../components/Registers/RegisterItem/RegisterItem";
import { RegisterPinArray } from "../../models/Registers/RegisterPinArray";
import { AssignRegisterPinArrayReducer } from "../../models/Assigns/AssignRegisterPinArray.resucer";
import { useRecoilState } from "recoil";
import { Pin } from "../../models/Devices/Pin";
import { UnAssignRegisterPin } from "../../models/Registers/UnAssignRegisterPin";
import { RegisterName } from "../../models/Registers/RegisterName";
import { SelectRegisterNameAtom } from "../../models/Registers/SelectRegisterName.atom";
import { RegisterNameArray } from "../../models/Registers/RegisterNameArray";
import { DetectRegisterName } from "../../models/Registers/DetectRegisterName";
import { PICData } from "../../models/PICs/PICData";
import { UNDetectPICName } from "../../models/PICs/UnDetectPICName";
import { DetectPICName } from "../../models/PICs/DetectPICName";
import { usePICDataIO } from "../../models/PICs/usePICDataIO";
import { PICName } from "../../models/PICs/PICName";

/**
 * デバイス登録
 * @returns 
 */
export const RegistryDevice = () => {
    const [pinLength, setPinLength] = useState<number>(8);
    const [presentAlert] = useIonAlert();

    //ピン足を引数のピンの長さから作成する
    const registerPinFootArray: RegisterPinArray = new RegisterPinArray(
        Array.from({ length: pinLength / 2 }, (_, i) => new UnAssignRegisterPin(new Pin(i + 1))).concat(
            Array.from({ length: pinLength / 2 }, (_, i) => new UnAssignRegisterPin(new Pin(i + (pinLength / 2) + 1))).reverse()
        ));
    /** レジスターピンリスト */
    const [assignRegisterPinArray, dispatchAssignRegisterPinArray] = useReducer(AssignRegisterPinArrayReducer, registerPinFootArray);
    /** レジスター名リスト */
    const [registerNameArray, dispatchRegisterNameArray] = useReducer(RegisterNameArrayReducer, new RegisterNameArray([new DetectRegisterName("RA")]));
    /** 選択済レジスター名 */
    const [selectRegisterName, setSelectRegisterName] = useRecoilState<RegisterName>(SelectRegisterNameAtom);

    useEffect(() => {
        setSelectRegisterName(registerNameArray.Value[0]);
    }, [setSelectRegisterName, registerNameArray]);

    /** PIC名 */
    const [picName, setPICName] = useState<PICName>(new UNDetectPICName());
    /** PICDataのIO */
    const { savePICData } = usePICDataIO();

    /**
     * デバイス名変更
     */
    const onChangeName = useCallback((e: string | number | null | undefined) => {
        if (!e) { return; }
        setPICName(new DetectPICName(e as string));
    }, [setPICName,]);

    /**
     * レジスター名追加
     */
    const onClickAddRegisterBtn = useCallback(() => {
        dispatchRegisterNameArray({ type: 'registry' });
    }, [dispatchRegisterNameArray]);

    /**
     * レジスター名削除
     */
    const onClickDeleteRegisterNameBtn = useCallback((registerName: RegisterName) => {
        dispatchRegisterNameArray({ type: 'unregister', registerName: registerName });
    }, [dispatchRegisterNameArray]);

    /**
     * ピンの数変更時
     * ピンアサインを初期化して作成しなおす
     */
    const onChangePinLength = useCallback((value: number) => {
        dispatchAssignRegisterPinArray({ type: 'init', pinLength: value });
        setPinLength(value);
    }, [dispatchAssignRegisterPinArray, setPinLength]);


    /**
     * PIC保存ボタン押下時
     */
    const onClickSavePICBtn = useCallback(async () => {
        try {
            const picData: PICData = new PICData(picName, assignRegisterPinArray);
            await savePICData(picData);
            await presentAlert({ message: `Save:${picData.Name.Value}` });
        } catch (e) {
            const error: Error = e as Error;
            await presentAlert({ header: 'Error', message: error.message });
        }
    }, [picName, assignRegisterPinArray, savePICData, presentAlert]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        {
                            selectRegisterName ?
                                `Assign ${selectRegisterName.Value} Registry` :
                                picName.Value
                        }
                    </IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={onClickSavePICBtn}>
                            Save
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonHeader slot='fixed'>
                <svg style={{ width: '100vw', height: '45vh', background: 'gray' }} >
                    <Device
                        registerPinArray={assignRegisterPinArray}
                        dispatchAssignRegisterPinArray={dispatchAssignRegisterPinArray} />
                </svg>
            </IonHeader>

            <IonContent className="ion-padding" fullscreen>

                <IonList>
                    <IonListHeader>
                        <IonLabel>Basic Information</IonLabel>
                    </IonListHeader>
                    <IonItem>
                        <IonInput label="Name"
                            labelPlacement='stacked'
                            type="text"
                            placeholder="PIC16F1827"
                            value={picName.Value}
                            onIonChange={e => onChangeName(e.target.value)} />
                    </IonItem>
                    <IonItem>
                        <IonSelect label="Pin Length"
                            labelPlacement='stacked'
                            value={pinLength}
                            onIonChange={e => onChangePinLength(e.target.value)}>
                            <IonSelectOption value={8}>8</IonSelectOption>
                            <IonSelectOption value={16}>16</IonSelectOption>
                            <IonSelectOption value={18}>18</IonSelectOption>
                            <IonSelectOption value={20}>20</IonSelectOption>
                        </IonSelect>
                    </IonItem>
                </IonList>


                <IonList>
                    <IonListHeader>
                        <IonLabel>Register Information</IonLabel>
                        <IonButton onClick={onClickAddRegisterBtn} >
                            <IonIcon icon={addCircleOutline} color='primary' />
                        </IonButton>
                    </IonListHeader>

                    {
                        registerNameArray.Value.map((registerName) => {
                            return (
                                <RegisterNameItem key={registerName.Value}
                                    select={selectRegisterName?.Value === registerName.Value}
                                    registerName={registerName}
                                    onClick={() => setSelectRegisterName(registerName)}
                                    onClickDeleteRegisterNameBtn={onClickDeleteRegisterNameBtn} />
                            )
                        })
                    }

                </IonList>

            </IonContent>
        </IonPage>
    )
}