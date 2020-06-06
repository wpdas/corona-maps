import React from 'react';
import { Container, LeftContent } from './styles';

import HeaderBar from '../../components/HeaderBar';
import MapContainer from '../../components/MapContainer';

const MainPage: React.FC = () => {
  return (
    <Container>
      <LeftContent>
        <HeaderBar />
      </LeftContent>
      <MapContainer />
    </Container>
  );
};

export default MainPage;
