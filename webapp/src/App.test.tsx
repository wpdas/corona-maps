import React from 'react';
import { render } from '@testing-library/react';
import CustomThemeProvider from './theme';
import App from './App';

test('renders header title', () => {
  const { getByText } = render(
    <CustomThemeProvider>
      <App />
    </CustomThemeProvider>,
  );
  const linkElement = getByText(/Corona Maps/i);
  expect(linkElement).toBeInTheDocument();
});
