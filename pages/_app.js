import '../styles/globals.css';

import { ButtonContextProvider } from 'context/buttonContext';

function MyApp({ Component, pageProps }) {
  return (
    <ButtonContextProvider>
      <Component {...pageProps} />
    </ButtonContextProvider>
  );
}

export default MyApp;
