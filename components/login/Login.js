import { useState } from 'react';
import { useMutation } from 'urql';
import { useRouter } from 'next/router';
import {
  VStack,
  Heading,
  HStack,
  Text,
  Button,
  Container,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import * as yup from 'yup';

import FormikInput from '@/components/shared/FormikInput';
import { allFields } from './formik/inputs';
import { useAuthContext } from '@/utils/context/AuthContext';
import RegisterUserMutation from '@/graphql/user_queries/create';
import LoginUserMutation from '@/graphql/user_queries/loginThroughBackend';

const Login = () => {
  const [showSignup, setShowSignup] = useState(false);

  const [insertUserResult, insertUser] = useMutation(RegisterUserMutation);
  const [insertLoginResult, insertLogin] = useMutation(LoginUserMutation);

  const router = useRouter();
  const { loggedInUser, register, login, setLoggedInUser } = useAuthContext();

  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  const registerUser = async (email, password) => {
    try {
      const variables = {
        email: email,
        password: password,
        displayName: '', // intentional future changes needed
      };
      const { data } = await insertUser(variables);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  // loginUSer using backend //
  // const loginUser = async (email, password) => {
  //   // window.localStorage.clear();
  //   try {
  //     const variables = { email: email, password: password };
  //     const { data } = await insertLogin(variables);
  //     // console.log(window);
  //     console.log('data', data);

  //     window.localStorage.setItem('accessToken', data.loginUser.accessToken);

  //     setLoggedInUser({ accessToken: data.loginUser.accessToken, email });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const onSubmitHandler = ({ email, password }, actions) => {
    console.log(email, password);
    {
      // showSignup ? register(email, password) : login(email, password);
      showSignup ? registerUser(email, password) : login(email, password);
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
