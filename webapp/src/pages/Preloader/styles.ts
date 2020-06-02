import styled from 'styled-components';
import { ThemeProps } from '../../theme';

export const Container = styled.div`
  display: flex;
  background: ${(props: ThemeProps) => props.theme.current.color1};
  width: 100vw;
  height: 100vh;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const LoadingText = styled.p`
  color: ${(props: ThemeProps) => props.theme.current.color3};
  font-weight: bold;
`;
