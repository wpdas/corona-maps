import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Launches title', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Launches/i);
  expect(linkElement).toBeInTheDocument();
});
