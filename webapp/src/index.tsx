import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CustomThemeProvider from './theme';
import Preloader from './pages/Preloader';

ReactDOM.render(
  <React.StrictMode>
    <CustomThemeProvider>
      <Preloader />
    </CustomThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
