import React from 'react';
import {
  Container,
  VStack,
  Heading,
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
  };

  const onSubmit = async (values, actions) => {
    console.log('clicked');
    if (editingTodo.status) {
      const variables = { id: editingTodo.id, title: values.title };

      try {
        const response = await updateTodoMutation(variables);
        console.log(response);
      } catch (error) {
        console.error(error);
      }

      setEditingTodo({
        status: false,
        id: null,
      });
    } else {
      try {
        const variables = { title: values.title };
        const { data } = await addTodoMutation(variables);
        console.log(data);
        setTodoList([...todoList, data.insert_todos_one]);
      } catch (error) {
        console.error(error);
      }
    }

    await actions.resetForm();
  };

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
                  <HStack align='baseline'>
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
