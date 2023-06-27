import { IonCard, IonCardHeader, IonCardTitle } from "@ionic/react"
import { PICData } from "../../models/PICs/PICData"

export interface PICCardProp {
    picData: PICData,
}
export const PICCard = (props: PICCardProp) => {
    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>
                    {props.picData.Name.Value}
                </IonCardTitle>
            </IonCardHeader>
        </IonCard>
    )
}