import { IonAccordion, IonAccordionGroup, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import { PIC } from '../components/PIC/PIC';
import { useCallback, useEffect, useRef, useState } from 'react';
import { BinaryCard } from '../components/Registers/BinaryCard/BinaryCard';
import { HexCard } from '../components/Registers/HexCard/HexCard';
import { DecCard } from '../components/Registers/DecCard/DecCard';
import { add } from 'ionicons/icons'
import { usePICDataIO } from '../models/PICs/usePICDataIO';
import { PICData } from '../models/PICs/PICData';
import { PICCard } from '../components/PICCard/PICCard';
import { useHistory } from 'react-router';

const Home: React.FC = () => {
  const history = useHistory();

  // const rootRef = useRef<SVGSVGElement>(null);
  // const [rootWidth, setRootWidth] = useState<number>(0);
  // const [rootHeight, setRootHeight] = useState<number>(0);

  // useEffect(() => {
  //   if (!rootRef.current) { return; }
  //   const rect = rootRef.current.getBBox();
  //   setRootWidth(rect.width * 0.7);
  //   setRootHeight(rect.height * 0.05);
  // }, [rootRef.current, setRootWidth, setRootHeight]);

  const { loadAllPICData } = usePICDataIO();
  const [picArray, setPICArray] = useState<PICData[]>([]);

  useEffect(() => {
    loadAllPICData().then(array => {
      setPICArray(array);
      console.log(array);
    });
  }, [loadAllPICData, setPICArray]);


  /**
   * 登録画面に遷移する
   */
  const onClickRegistryFabBtn = useCallback(() => {
    history.push('registry');
  }, [history]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>PinMate</IonTitle>
        </IonToolbar>
      </IonHeader>


      <IonContent fullscreen>
        {
          picArray.map((picData, index) => {
            return <PICCard
              key={index}
              picData={picData} />
          })
        }
      </IonContent>

      <IonFab horizontal='end' vertical='bottom'>
        <IonFabButton onClick={onClickRegistryFabBtn}>
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>

      {/* <IonContent fullscreen>
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

      </IonContent> */}
    </IonPage>
  );
};

export default Home;
