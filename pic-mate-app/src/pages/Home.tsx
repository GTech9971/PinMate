import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import { PinFootLeft } from '../components/PinFootLeft/PinFootLeft';

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
          <circle cx='25' cy='25' r='10' />

          <PinFootLeft x={10} y={40} pinNo={0} />

          <rect x='10' y='10' width='40vw' height='45vh' rx={10} fill='none' stroke='black' />
        </svg>
      </IonContent>
    </IonPage>
  );
};

export default Home;
