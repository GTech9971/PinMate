import { IonItemSliding, IonItem, IonListHeader, IonLabel, IonItemOptions, IonItemOption } from "@ionic/react"
import { useCallback } from "react"
import { RegisterName } from "../../../models/Registers/RegisterName";

export interface RegisterNameItemProp {
    registerName: RegisterName,
    onClickDeleteRegisterNameBtn: (registerName: RegisterName) => void,
    onClick?: (registerName: RegisterName) => void,
    select?: boolean,
}
export const RegisterNameItem = (props: RegisterNameItemProp) => {

    const onClickRegisterNameItem = useCallback(() => {
        if (props.onClick) {
            props.onClick(props.registerName);
        }
    }, [props]);

    return (
        <IonItemSliding>
            <IonItem button
                detail={false}
                onClick={onClickRegisterNameItem}>
                <IonListHeader color={props.select ? 'primary' : undefined}>
                    <IonLabel>{props.registerName.Value}</IonLabel>
                </IonListHeader>
            </IonItem>

            <IonItemOptions>
                <IonItemOption color='danger'
                    onClick={() => props.onClickDeleteRegisterNameBtn(props.registerName)}>
                    Delete
                </IonItemOption>
            </IonItemOptions>
        </IonItemSliding>
    )
}