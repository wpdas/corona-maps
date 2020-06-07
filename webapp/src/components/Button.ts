import styled from 'styled-components';
import { ThemeProps } from '../theme';

const Button = styled.button`
  font-family: ${(props: ThemeProps) => props.theme.current.regularFont};
  background: ${(props: ThemeProps) => props.theme.current.color2};
  color: ${(props: ThemeProps) => props.theme.current.color6};
  border: none;
  min-width: 72px;
  padding: 12px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 14px;

  :active {
    background: ${(props: ThemeProps) => props.theme.current.color8};
  }
  :focus {
    outline: none;
    box-shadow: none;
  }
`;

export default Button;
