import React, { useEffect, useState, useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { BsGeoAlt } from 'react-icons/bs';

import { ThemeContextValue } from '../../theme';

import {
  Container,
  LeftContent,
  ViewContainer,
  CustomMapButtons,
  MyPositionButton,
} from './styles';

// Map Manager
import {
  initMap,
  onInitMap,
  updateMapPosition,
  addCovidMarkers,
  // enableDrawCovidMarker,
  enableCovidMarkerInsertion,
  MarkerData,
} from '../../utils/mapManager';
import '../../utils/mapManager/map.css';

const MapContainer: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<Position | null>(null);
  const {
    current: { color2 },
  } = useContext<ThemeContextValue>(ThemeContext);

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

      // Enable draw marker
      enableCovidMarkerInsertion((markerPosition) => {
        console.log(markerPosition); // To store on DB
      });
    });
  }, []);

  useEffect(() => {
    let watchId: number;
    initMap('mapView', -19.8157, -43.9542); // Initial position for map bootstrap set to Belo Horizonte
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
  const handlerClickMyPosition = () => {
    if (currentLocation?.coords) {
      const { latitude, longitude } = currentLocation.coords;
      updateMapPosition(latitude, longitude, 18);
    }
  };

  return (
    <Container>
      <LeftContent></LeftContent>
      <ViewContainer id="mapView" />
      <CustomMapButtons>
        <MyPositionButton onClick={handlerClickMyPosition}>
          <BsGeoAlt color={color2} />
        </MyPositionButton>
      </CustomMapButtons>
    </Container>
  );
};

export default MapContainer;
