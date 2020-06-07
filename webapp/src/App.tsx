import React from 'react';
// import ApolloClient from 'apollo-boost';
// import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { ModalProvider } from './contexts/Modal';
import MainPage from './pages/MainPage';
import './fonts';

// TODO: Use env API instead of hard coded
// const client = new ApolloClient({
//   uri: 'http://localhost:5000/graphql',
// });

function App() {
  return (
    // <ApolloProvider client={client}>
    <ModalProvider>
      <Router>
        <Route exact path="/" component={MainPage} />
      </Router>
    </ModalProvider>
    // </ApolloProvider> */
  );
}

export default App;
