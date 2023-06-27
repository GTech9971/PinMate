import { IonAccordion, IonAccordionGroup, IonContent, IonHeader, IonItem, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import { PIC } from '../components/PIC/PIC';
import { useEffect, useRef, useState } from 'react';
import { BinaryCard } from '../components/Registers/BinaryCard/BinaryCard';
import { HexCard } from '../components/Registers/HexCard/HexCard';
import { DecCard } from '../components/Registers/DecCard/DecCard';

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
          <IonTitle>PIC16F1827</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonHeader slot='fixed'>
        <svg ref={rootRef} style={{ width: '100vw', height: '50vh', background: 'gray' }} >
          {/* <PIC x={rootWidth} y={rootHeight} pinLength={18} /> */}
        </svg>
      </IonHeader>

      <IonContent fullscreen>
        <IonAccordionGroup multiple>

          <IonAccordion value='ra'>
            <IonItem slot='header' color='light'>
              <h2 className='ion-text'>RA</h2>
            </IonItem>

            <div className='ion-padding' slot='content' >
              <BinaryCard />
              <HexCard />
              <DecCard />
            </div>
          </IonAccordion>

          <IonAccordion value='rb'>
            <IonItem slot='header' color='light'>
              <h2 className='ion-text'>RB</h2>
            </IonItem>

            <div className='ion-padding' slot='content' >
              <BinaryCard />
              <HexCard />
              <DecCard />
            </div>
          </IonAccordion>
        </IonAccordionGroup>

      </IonContent>
    </IonPage>
  );
};

export default Home;
