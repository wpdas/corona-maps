import React from 'react';

import { useI18n } from '../../i18n';
import { Container, LoadingText } from './styles';

const FallbackBody: React.FC = () => {
  const { text, labels } = useI18n();

  return (
    <Container>
      <LoadingText>{text(labels.loading)}</LoadingText>
    </Container>
  );
};

const Fallback = <FallbackBody />;

export default Fallback;
