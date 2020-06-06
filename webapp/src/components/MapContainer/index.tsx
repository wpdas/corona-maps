import React, { useEffect, useState, useContext } from 'react';

import cursorStyle from './cursorStyle';
import ModalContext from '../../contexts/Modal';
import {
  AddLocationButton,
  MyLocationButton,
  CancelActionButton,
} from '../MapButtons';

// Map Manager
import {
  initMap,
  onInitMap,
  getLastUserPosition,
  updateMapPosition,
  addCovidMarkers,
  // enableDrawCovidMarker,
  enableCovidMarkerInsertion,
  disableCovidMarkerInsertion,
  MarkerData,
  MapPosition,
} from '../../utils/mapManager';

import { Container, ViewContainer, CustomMapButtons } from './styles';
import '../../utils/mapManager/map.css';

const MapContainer: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<Position | null>(null);
  const [additionalViewStyle, setAdditionalViewStyle] = useState({});
  const [covidMarkerActivated, setCovidMarkerActivated] = useState(false);
  const { showConfirmationModal } = useContext(ModalContext);

  // Simulated: Add markers from server.
  useEffect(() => {
    onInitMap(() => {
      const fooData: MarkerData = {
        position: {
          longitude: -5191591.426426359,
          latitude: -2698597.3009821284,
        },
      };
      const foo: Array<MarkerData> = [fooData];
      addCovidMarkers(foo);
    });
  }, []);

  useEffect(() => {
    let watchId: number;
    const lastUserPosition = getLastUserPosition();
    const initialPosition: MapPosition = lastUserPosition
      ? lastUserPosition
      : {
          latitude: -19.8157,
          longitude: -43.9542,
        }; // Belo Horizonte

    initMap('mapView', initialPosition.latitude, initialPosition.longitude);
    if (navigator.geolocation) {
      // Fetch current location
      // navigator.geolocation.getCurrentPosition((position) => {
      //   const { latitude, longitude } = position.coords;
      //   // initMap('mapView', latitude, longitude);
      //   updateMapPosition(latitude, longitude);
      // });

      // Watch location updates
      watchId = navigator.geolocation.watchPosition((position) => {
        setCurrentLocation(position);
      });
    }

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  // Updates map position according to the user geolocation
  useEffect(() => {
    if (currentLocation?.coords) {
      const { latitude, longitude } = currentLocation.coords;
      updateMapPosition(latitude, longitude);
    }
  }, [currentLocation]);

  // Go back to my position
  const handlerClickMyLocation = () => {
    if (currentLocation?.coords) {
      const { latitude, longitude } = currentLocation.coords;
      updateMapPosition(latitude, longitude, 17);
    }
  };

  const handlerClickAddCovidLocation = () => {
    // Enable draw marker
    setAdditionalViewStyle(cursorStyle);
    setCovidMarkerActivated(true);
    enableCovidMarkerInsertion((markerPosition) => {
      setAdditionalViewStyle({});
      setCovidMarkerActivated(false);

      // TODO: finish confirmation modal rule
      // TODO: use i18n to fill attributes
      showConfirmationModal({
        title: 'Criar Marcação',
        description:
          'Deseja realmente criar uma marcação de COVID-19 neste local?',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
        onClickConfirm: () => {
          console.log(markerPosition); // TODO To store on DB
        },
      });
    });
  };

  const handlerCancelAction = () => {
    disableCovidMarkerInsertion();
    setAdditionalViewStyle({});
    setCovidMarkerActivated(false);
  };

  // TODO add cancel action button (para cancelar acao de criar ponteiro)
  // TODO pesquisar endereço (campo e funcao que deve ser investigado no site da API do mapa)

  return (
    <Container>
      <ViewContainer id="mapView" style={{ ...additionalViewStyle }}>
        <CustomMapButtons>
          {covidMarkerActivated ? (
            <CancelActionButton onClick={handlerCancelAction} />
          ) : (
            <>
              <MyLocationButton onClick={handlerClickMyLocation} />
              <AddLocationButton onClick={handlerClickAddCovidLocation} />
            </>
          )}
        </CustomMapButtons>
      </ViewContainer>
    </Container>
  );
};

export default MapContainer;
