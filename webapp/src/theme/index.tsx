import React from 'react';
import { ThemeProvider, ThemedStyledProps } from 'styled-components';

import Theme from './Theme';
import light from './light';

/** List of themes */
export const themes = {
  light,
};

// Using this style to allow use anothers props in the future
export type ThemeContextValue = {
  readonly current: Theme;
};

const defaultValue: ThemeContextValue = {
  current: light,
};

/** Props to be used within styles */
export type ThemeProps = ThemedStyledProps<{}, ThemeContextValue>;

type Props = {
  children: React.ReactNode;
};

const CustomThemeProvider: React.FC<Props> = ({ children }: Props) => {
  return <ThemeProvider theme={{ ...defaultValue }}>{children}</ThemeProvider>;
};

export default CustomThemeProvider;
