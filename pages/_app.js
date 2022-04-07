import '../styles/globals.css';

import { useState } from 'react';
import { ButtonContextProvider } from 'context/buttonContext';
import Router from 'next/router';

import Loader from 'components/Loader';

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  Router.events.on('routeChangeStart', () => {
    setLoading(true);
  });
  Router.events.on('routeChangeComplete', () => {
    setLoading(false);
  });

  return (
    <>
      <ButtonContextProvider>
        {loading && <Loader />}
        <Component {...pageProps} />
      </ButtonContextProvider>
    </>
  );
}

export default MyApp;
