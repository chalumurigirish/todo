import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
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
  FormErrorMessage,
} from '@chakra-ui/react';
import { Formik, Field } from 'formik';
import * as yup from 'yup';

import FormikInput from '@/components/shared/FormikInput';
// import { initialValues, onSubmitHandler } from './formik/exports';
import { allFields } from './formik/inputs';
import { useAuthContext } from '@/utils/context/AuthContext';

const Login = () => {
  const [showSignup, setShowSignup] = useState(false);

  const router = useRouter();
  const { loggedInUser, register, login } = useAuthContext();

  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  const onSubmitHandler = ({ email, password }, actions) => {
    console.log(email, password);
    {
      showSignup ? register(email, password) : login(email, password);
    }
    actions.resetForm();
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required('Email cannot be empty')
      .email('Enter a valid email address'),
    password: yup
      .string()
      .required('Password cannot be empty')
      .min(8, 'Password must contain 8 characters'),
    ...(showSignup && {
      confirmPassword: yup
        .string()
        .required('Password cannot be empty')
        .oneOf([yup.ref('password'), null], 'Password mismatch'),
    }),
  });

useEffect(() => {
    console.log('rendered', loggedInUser);
    if (loggedInUser) {
      router.push('/todo');
    }
  }, [loggedInUser]);

  return (
    <Container
      maxW='lg'
      py={{ md: '24', base: '12' }}
      px={{ sm: '12', base: '0' }}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmitHandler}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <VStack spacing={5} py={{ base: '4' }}>
              <Heading>{showSignup ? 'Signup' : 'Log In'}</Heading>

              {allFields.map(({ showInLogin, ...props }) => {
                if (showSignup) {
                  return <FormikInput key={props.label} {...props} />;
                } else {
                  if (showInLogin) {
                    return <FormikInput key={props.label} {...props} />;
                  }
                }
              })}
            </VStack>

            <HStack justify='space-between'>
              {/* Link */}
              <HStack>
                <Text>
                  {showSignup
                    ? 'Already have an account?'
                    : 'dont have an account?'}
                </Text>
                <Button
                  variant='link'
                  colorScheme={'blue'}
                  onClick={() => setShowSignup((x) => !x)}
                >
                  {!showSignup ? 'signup' : 'Login'}
                </Button>
              </HStack>

              {/* button */}
              <Button
                type='submit'
                disabled={
                  formik.errors.email ||
                  formik.errors.password ||
                  formik.errors.confirmPassword ||
                  formik.values.email === '' ||
                  formik.values.password === ''
                }
              >
                {showSignup ? 'signup' : 'Login'}
              </Button>
            </HStack>
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default Login;
