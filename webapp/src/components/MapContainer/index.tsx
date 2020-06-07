import React, { useEffect, useState, useContext } from 'react';

import cursorStyle from './cursorStyle';
import ModalContext from '../../contexts/Modal';
import useI18n from '../../hooks/i18n';
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
  const { text, labels } = useI18n();

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
    const initialPosition: MapPosition = lastUserPosition || {
      latitude: -19.8157,
      longitude: -43.9542,
    }; // Belo Horizonte

    initMap('mapView', initialPosition.latitude, initialPosition.longitude);
    if (navigator.geolocation) {
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
    enableCovidMarkerInsertion((markerPosition, cancelAction) => {
      setAdditionalViewStyle({});
      setCovidMarkerActivated(false);

      showConfirmationModal({
        title: text(labels.modalNewMarker),
        description: text(labels.modalConfirmationDescription),
        confirmButtonText: text(labels.yes),
        cancelButtonText: text(labels.no),
        onClickConfirm: () => {
          // eslint-disable-next-line no-console
          console.log(markerPosition); // TODO Store this marker position on DB
        },
        onClickCancel: cancelAction,
      });
    });
  };

  const handlerCancelAction = () => {
    disableCovidMarkerInsertion();
    setAdditionalViewStyle({});
    setCovidMarkerActivated(false);
  };

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
