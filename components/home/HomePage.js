import React from 'react';
import { Container, HStack, Text, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { logout } from '@/utils/context/loginFunctions';
import { useAuthContext } from '@/utils/context/AuthContext';

const HomePage = () => {
  const { loggedInUser } = useAuthContext();

  return (
    <Container maxW='full' pt='4'>
      <HStack justify='space-between'>
        <Text>{loggedInUser?.email}</Text>
        <Link href='/todo'>TODO</Link>
        <Link href='/techStack'>TechStack</Link>
        <Button onClick={() => logout()} variant='outline' colorScheme={'blue'}>
          Logout
        </Button>
      </HStack>
    </Container>
  );
};

export default HomePage;
