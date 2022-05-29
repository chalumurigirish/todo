import React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  VStack,
  Heading,
  FormControl,
  Input,
  HStack,
  Text,
  Button,
} from '@chakra-ui/react';

import IndividualTodo from './IndividualTodo';
import { useAuthContext } from '@/utils/context/AuthContext';

const Todo = () => {
  const { loggedInUser, logout, setLoggedInUser } = useAuthContext();
  const router = useRouter();

  console.log(loggedInUser);

  const loggingOutUser = () => {
    // logout();
    // console.log(loggedInUser); // loggedInUser has previous value even after logout
    setLoggedInUser(false);
  };

  useEffect(() => {
    // console.log('rendered', loggedInUser);
    if (!loggedInUser) {
      router.push('/login');
    }
  }, [loggedInUser]);

  return (
    <Container maxW='full' pt='4'>
      <HStack justify='space-between'>
        <Text>{loggedInUser?.email}</Text>
        <Button
          onClick={() => loggingOutUser()}
          variant='outline'
          colorScheme={'blue'}
        >
          Logout
        </Button>
      </HStack>
      <Container
        maxW='lg'
        py={{ md: '24', base: '12' }}
        px={{ sm: '12', base: '0' }}
      >
        <VStack spacing={5} py={{ base: '4' }}>
          <Heading>TODO</Heading>
          <FormControl>
            <Input placeholder='enter your Todo' type='text' />
          </FormControl>
        </VStack>
        <IndividualTodo />
      </Container>
    </Container>
  );
};

export default Todo;
