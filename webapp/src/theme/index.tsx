import React from 'react';
import { ThemeProvider, ThemedStyledProps } from 'styled-components';

import light from './light';

export type Theme = {
  readonly color1: string;
  readonly color2: string;
  readonly color3: string;
  readonly color4: string;
  readonly color5: string;
  readonly regularFont: string;
  readonly lightFont: string;
  readonly boldFont: string;
};

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
