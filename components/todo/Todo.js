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
import { Formik } from 'formik';
import { useMutation } from 'urql';

import FormikInput from '@/components/shared/FormikInput';
import DisplayAllTodo from '@/components/todo/DisplayAllTodo';
import NewTodo from '@/graphql/todo_queries/newTodo';
import UpdateTodo from '@/graphql/todo_queries/updateTodo';

import { useTodoContext } from '@/utils/context/Todo/TodoContext';
import { useAuthContext } from '@/utils/context/AuthContext';

const Todo = () => {
  const { loggedInUser, logout, setLoggedInUser } = useAuthContext();
  const router = useRouter();

  // console.log(loggedInUser);

  const [addTodoMutationResult, addTodoMutation] = useMutation(NewTodo);
  const [updateTodoMutationResult, updateTodoMutation] =
    useMutation(UpdateTodo);

  const {
    todoList,
    setTodoList,
    allFields,
    initialValues,
    editingTodo,
    setEditingTodo,
  } = useTodoContext();

  const loggingOutUser = () => {
    logout();
    // console.log(loggedInUser); // loggedInUser has previous value even after logout
    // setLoggedInUser(false);
  };

  const onSubmit = async (values, actions) => {
    console.log('clicked');
    if (editingTodo.status) {
      const variables = { id: editingTodo.id, task: values.title };

      try {
        const { data } = await updateTodoMutation(variables);
      } catch (error) {
        console.error(error);
      }

      setEditingTodo({
        status: false,
        id: null,
      });
    } else {
      try {
        const variables = { task: values.title };
        const { data } = await addTodoMutation(variables);
      } catch (error) {
        console.error(error);
      }
    }

    await actions.resetForm();
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
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {(formik) => (
            <>
              <form onSubmit={formik.handleSubmit}>
                <VStack spacing={5} py={{ base: '4' }}>
                  <Heading>TODO</Heading>
                  <HStack>
                    {allFields.map(({ id, label, ...props }) => (
                      <FormikInput key={id} {...props} />
                    ))}
                    {editingTodo.status ? (
                      <Button
                        w={48}
                        colorScheme='blue'
                        type='submit'
                        disabled={formik.isSubmitting}
                      >
                        Update Task
                      </Button>
                    ) : (
                      <Button
                        w={48}
                        colorScheme='blue'
                        type='submit'
                        disabled={formik.isSubmitting}
                      >
                        Create Task
                      </Button>
                    )}
                  </HStack>
                </VStack>
              </form>
              <DisplayAllTodo />
            </>
          )}
        </Formik>
      </Container>
    </Container>
  );
};

export default Todo;
