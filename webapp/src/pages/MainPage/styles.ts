import styled from 'styled-components';
import { ThemeProps } from '../../theme';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

export const LeftContent = styled.div`
  display: flex;
  width: 314px;
  height: 100vh;
  background: ${(props: ThemeProps) => props.theme.current.color6};
  border-right: 2px solid ${(props: ThemeProps) => props.theme.current.color7};
`;

export const Foo = styled.div``;
