import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCol, IonGrid, IonLabel, IonRow } from "@ionic/react"

export const BinaryCard = () => {
    return (
        <IonCard>
            <IonCardHeader>
                <IonCardSubtitle>Binary</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
                <IonGrid>
                    <IonRow>
                        <IonCol><IonLabel>7</IonLabel></IonCol>
                        <IonCol><IonLabel>6</IonLabel></IonCol>
                        <IonCol><IonLabel>5</IonLabel></IonCol>
                        <IonCol><IonLabel>4</IonLabel></IonCol>
                        <IonCol><IonLabel>3</IonLabel></IonCol>
                        <IonCol><IonLabel>2</IonLabel></IonCol>
                        <IonCol><IonLabel>1</IonLabel></IonCol>
                        <IonCol><IonLabel>0</IonLabel></IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol><IonLabel>0</IonLabel></IonCol>
                        <IonCol><IonLabel>0</IonLabel></IonCol>
                        <IonCol><IonLabel>0</IonLabel></IonCol>
                        <IonCol><IonLabel>0</IonLabel></IonCol>
                        <IonCol><IonLabel>0</IonLabel></IonCol>
                        <IonCol><IonLabel>0</IonLabel></IonCol>
                        <IonCol><IonLabel>0</IonLabel></IonCol>
                        <IonCol><IonLabel>0</IonLabel></IonCol>
                    </IonRow>
                </IonGrid>
            </IonCardContent>
        </IonCard>
    )
}