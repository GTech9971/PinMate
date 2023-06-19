import { IonItemSliding, IonItem, IonListHeader, IonLabel, IonItemOptions, IonItemOption } from "@ionic/react"
import { Register } from "../../../models/Registers/Register"
import { useCallback } from "react"

export interface RegisterItemProp {
    register: Register,
    onClickDeleteRegisterBtn: (register: Register) => void,
    onClick?: (register: Register) => void,
    select?: boolean,
}
export const RegisterItem = (props: RegisterItemProp) => {

    const onClickRegisterItem = useCallback(() => {
        if (props.onClick) {
            props.onClick(props.register);
        }
    }, [props.register, props.onClick]);

    return (
        <IonItemSliding>
            <IonItem button
                detail={false}
                onClick={onClickRegisterItem}>
                <IonListHeader color={props.select ? 'primary' : undefined}>
                    <IonLabel>{props.register.Name.Value}</IonLabel>
                </IonListHeader>
            </IonItem>

            <IonItemOptions>
                <IonItemOption color='danger'
                    onClick={() => props.onClickDeleteRegisterBtn(props.register)}>
                    Delete
                </IonItemOption>
            </IonItemOptions>
        </IonItemSliding>
    )
}