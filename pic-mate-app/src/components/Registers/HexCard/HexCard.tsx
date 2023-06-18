import { IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonGrid, IonRow, IonCol, IonLabel } from "@ionic/react"

export const HexCard = () => {
    return (
        <IonCard>
            <IonCardHeader>
                <IonCardSubtitle>Hex</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonLabel>0x00</IonLabel>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonCardContent>
        </IonCard>
    )
}