import React, { useEffect, useState } from 'react';

import {
  Container,
  LeftContent,
  ViewContainer,
  CustomMapButtons,
} from './styles';

import cursorStyle from './cursorStyle';

import HeaderBar from '../HeaderBar';
import { AddLocationButton, MyLocationButton } from '../MapButtons';

// Map Manager
import {
  initMap,
  onInitMap,
  getLastUserPosition,
  updateMapPosition,
  addCovidMarkers,
  // enableDrawCovidMarker,
  enableCovidMarkerInsertion,
  MarkerData,
  MapPosition,
} from '../../utils/mapManager';
import '../../utils/mapManager/map.css';

const MapContainer: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<Position | null>(null);
  const [additionalViewStyle, setAdditionalViewStyle] = useState({});

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
      : { latitude: -19.8157, longitude: -43.9542 }; // Belo Horizonte

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

  // TODO add cancel action button (para cancelar acao de criar ponteiro)
  const handlerClickAddCovidLocation = () => {
    // Enable draw marker
    setAdditionalViewStyle(cursorStyle);
    enableCovidMarkerInsertion((markerPosition) => {
      setAdditionalViewStyle({});
      console.log(markerPosition); // To store on DB
    });
  };

  return (
    <Container>
      <LeftContent>
        <HeaderBar />
      </LeftContent>
      <ViewContainer id="mapView" style={{ ...additionalViewStyle }}>
        <CustomMapButtons>
          <MyLocationButton onClick={handlerClickMyLocation} />
          <AddLocationButton onClick={handlerClickAddCovidLocation} />
        </CustomMapButtons>
      </ViewContainer>
    </Container>
  );
};

export default MapContainer;
