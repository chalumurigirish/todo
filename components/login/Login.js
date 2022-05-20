import React from 'react';
import { useState } from 'react';
import {
  Center,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Text,
  Button,
  Link,
  Container,
} from '@chakra-ui/react';

const Login = () => {
  const [showSignup, setShowSignup] = useState(false);

  const onSignup = () => {
    setShowSignup(!showSignup);
  };

  return (
    <Container
      maxW='lg'
      py={{ md: '24', base: '12' }}
      px={{ sm: '12', base: '0' }}
    >
      <VStack spacing={5} py={{ base: '4' }}>
        <Heading>{showSignup ? 'Signup' : 'Log In'}</Heading>

        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder='enter your email address'
            id='email'
            type='email'
          />
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            placeholder='enter your password'
            id='password'
            type='password'
          />
        </FormControl>

        {showSignup && (
          <FormControl>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              placeholder='enter your password'
              id='password'
              type='password'
            />
          </FormControl>
        )}
      </VStack>

      <HStack justify='space-between'>
        <HStack>
          <Text>
            {showSignup ? 'Already have an account?' : 'dont have an account?'}
          </Text>
          <Link onClick={() => onSignup()}>
            {!showSignup ? 'signup' : 'Login'}
          </Link>
        </HStack>

        <Button>{showSignup ? 'signup' : 'Login'}</Button>
      </HStack>
    </Container>
  );
};

export default Login;
