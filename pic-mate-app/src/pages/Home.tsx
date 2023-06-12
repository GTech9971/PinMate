import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import { Device } from '../components/Device/Device';
import { useEffect, useRef, useState } from 'react';

const Home: React.FC = () => {

  const rootRef = useRef<SVGSVGElement>(null);
  const [rootWidth, setRootWidth] = useState<number>(0);
  const [rootHeight, setRootHeight] = useState<number>(0);

  useEffect(() => {
    if (!rootRef.current) { return; }
    const rect = rootRef.current.getBBox();
    setRootWidth(rect.width * 0.7);
    setRootHeight(rect.height * 0.05);
  }, [rootRef.current, setRootWidth, setRootHeight]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <svg ref={rootRef} style={{ width: '100vw', height: '50vh' }} >
          <Device x={rootWidth} y={rootHeight} pinLength={20} />
        </svg>
      </IonContent>
    </IonPage>
  );
};

export default Home;
