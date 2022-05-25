import { ChakraProvider } from '@chakra-ui/react';
import { useState } from 'react';
import { AuthContextProvider } from '@/utils/context/AuthContext';
import { Provider } from 'urql';

import { client } from '@/utils/urql';

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider value={client}>
      <AuthContextProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </AuthContextProvider>
    </Provider>
  );
};

export default MyApp;
