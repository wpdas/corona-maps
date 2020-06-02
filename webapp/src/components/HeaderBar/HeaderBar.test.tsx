import React from 'react';
import { render } from '@testing-library/react';
import CustomThemeProvider from '../../theme';
import HeaderBar from './index';

test('renders header title', () => {
  const { getByText } = render(
    <CustomThemeProvider>
      <HeaderBar />
    </CustomThemeProvider>,
  );
  const linkElement = getByText(/Corona Maps/i);
  expect(linkElement).toBeInTheDocument();
});
