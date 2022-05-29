import { createClient } from 'urql';

const client = createClient({
  url: 'https://champion-pheasant-82.hasura.app/v1/graphql',
  fetchOptions: () => {
    const token = window.localStorage.getItem('accessToken');
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    // headers: {
    //   'x-hasura-admin-secret':
    //     'eUBCXOXsCtT2QOxe14MGeGu5yQXyGkR3tS1WUQM4xr0LONVWCbGxJ0Lp1jRk7GyL',
    // },
  },
});

export { client };
