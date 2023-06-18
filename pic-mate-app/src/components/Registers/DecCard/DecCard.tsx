import { IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonGrid, IonRow, IonCol, IonLabel } from "@ionic/react"

export const DecCard = () => {
    return (
        <IonCard>
            <IonCardHeader>
                <IonCardSubtitle>Dec</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonLabel>0</IonLabel>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonCardContent>
        </IonCard>
    )
}