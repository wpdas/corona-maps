import styled from 'styled-components';
import { ThemeProps } from '../../theme';

export const Container = styled.div`
  display: flex;
  width: 100vw;
  height: calc(100vh - 44px);
`;

export const ViewContainer = styled.div`
  z-index: 1;
  width: 100vw;
  height: 100%;
`;

export const CustomMapButtons = styled.div`
  display: flex;
  position: absolute;
  top: 114px;
  left: 278px;
  z-index: 999;
`;

export const MyPositionButton = styled.div`
  cursor: pointer;
  display: block;
  padding: 8px 8px 6px 8px;
  border-radius: 4px;
  background: ${(props: ThemeProps) => props.theme.current.color6};
  border: 2px solid ${(props: ThemeProps) => props.theme.current.color2};

  :hover {
    border: 2px solid ${(props: ThemeProps) => props.theme.current.color4};
  }
`;

export const LeftContent = styled.div`
  display: flex;
  width: 300px;
  height: 100%;
  background: ${(props: ThemeProps) => props.theme.current.color6};
  border-right: 2px solid ${(props: ThemeProps) => props.theme.current.color7};
  padding: 8px;
`;
