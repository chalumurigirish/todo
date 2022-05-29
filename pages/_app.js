import { ChakraProvider } from '@chakra-ui/react';
import { useState } from 'react';
import { AuthContextProvider } from '@/utils/context/AuthContext';
import { Provider } from 'urql';

import { client } from '@/utils/urql';

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <Provider value={client}>
        <AuthContextProvider>
          <Component {...pageProps} />
        </AuthContextProvider>
      </Provider>
    </ChakraProvider>
  );
};

export default MyApp;
