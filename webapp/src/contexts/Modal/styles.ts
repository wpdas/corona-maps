import styled from 'styled-components';
import { ThemeProps } from '../../theme';

export const ModalContainer = styled.div`
  display: block;
  position: absolute;
  background: #ffffff60;
  width: 100vw;
  height: 100vh;
  z-index: 999;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 300px;
  background: #ffffff;
  border: 1px solid ${(props: ThemeProps) => props.theme.current.color7};
  margin: 38vh auto auto auto;
  font-family: ${(props: ThemeProps) => props.theme.current.regularFont};
  letter-spacing: 0.2px;
  padding: 16px;
`;

export const Title = styled.h4`
  font-family: ${(props: ThemeProps) => props.theme.current.regularFont};
  letter-spacing: 0.2px;
  margin: 0;
  text-align: center;
`;

export const Description = styled.p`
  font-family: ${(props: ThemeProps) => props.theme.current.regularFont};
  letter-spacing: 0.2px;
  text-align: center;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;
