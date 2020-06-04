import styled from 'styled-components';
import { ThemeProps } from '../../theme';

export const ButtonWrapper = styled.div`
  cursor: pointer;
  display: block;
  padding: 9px 8px 5px 8px;
  margin-bottom: 1px;
  border-radius: 4px;
  background: ${(props: ThemeProps) => props.theme.current.color6};
  border: 2px solid ${(props: ThemeProps) => props.theme.current.color2};

  :hover {
    border: 2px solid ${(props: ThemeProps) => props.theme.current.color8};
  }
`;
