import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import { PinFootLeft } from '../components/PinFootLeft/PinFootLeft';
import { PinFootRight } from '../components/PinFootRight/PinFootRight';
import { Device } from '../components/Device/Device';

const Home: React.FC = () => {


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <svg style={{ width: '100vw', height: '50vh' }} >

          <Device x={10} y={10} pinLength={20} />




        </svg>
      </IonContent>
    </IonPage>
  );
};

export default Home;
