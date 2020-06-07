import styled from 'styled-components';
import { ThemeProps } from '../../theme';

export const Container = styled.div`
  display: flex;
  height: 50px;
  width: 100%;
  background: ${(props: ThemeProps) => props.theme.current.color1};
`;

export const AppTitle = styled.h4`
  color: ${(props: ThemeProps) => props.theme.current.color3};
  font-family: ${(props: ThemeProps) => props.theme.current.regularFont};
  margin: 16px;
`;
