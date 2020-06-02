import React, { lazy, Suspense } from 'react';
import Fallback from './Fallback';

const App = lazy(() => import('../../App'));

const Preloader: React.FC = () => {
  return (
    <Suspense fallback={Fallback}>
      <App />
    </Suspense>
  );
};

export default Preloader;
