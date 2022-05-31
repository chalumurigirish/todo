import { ChakraProvider } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { AuthContextProvider } from '@/utils/context/AuthContext';
import { createClient } from 'urql';
import { Provider } from 'urql';

// import { client } from '@/utils/urql';

const MyApp = ({ Component, pageProps }) => {
  const [client, setClient] = useState();

  useEffect(() => {
    const urqlClient = createClient({
      url: 'https://champion-pheasant-82.hasura.app/v1/graphql',
      //  exchanges: [dedupExchange, cacheExchange, fetchExchange],
      fetchOptions: () => {
        const token = window.localStorage.getItem('accessToken');
        return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
      },
    });

    setClient(urqlClient);
  }, []);
  return (
    <ChakraProvider>
      {client && (
        <Provider value={client}>
          <AuthContextProvider>
            <Component {...pageProps} />
          </AuthContextProvider>
        </Provider>
      )}
    </ChakraProvider>
  );
};

export default MyApp;
