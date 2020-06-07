import styled from 'styled-components';
import { ThemeProps } from '../../theme';

export const Container = styled.div`
  display: flex;
  flex-grow: 1;
  height: 100vh;
`;

export const ViewContainer = styled.div`
  z-index: 1;
  width: 100%;
  height: 100%;
  background: ${(props: ThemeProps) => props.theme.current.color6};
`;

export const CustomMapButtons = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  margin-left: 8px;
  margin-top: 90px;
  z-index: 999;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 4px;
  padding: 3px;
`;
