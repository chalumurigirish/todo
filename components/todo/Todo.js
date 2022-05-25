import React from 'react';
import {
  Container,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Text,
  Button,
  Checkbox,
} from '@chakra-ui/react';

import IndividualTodo from './IndividualTodo';
import { useAuthContext } from '@/utils/context/AuthContext';

const Todo = () => {
  const { loggedInUser, logout } = useAuthContext();

  console.log(loggedInUser);
  return (
    <Container maxW='full' pt='4'>
      <HStack justify='space-between'>
        <Text>{loggedInUser?.email}</Text>
        <Button onClick={() => logout()} variant='outline' colorScheme={'blue'}>
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
