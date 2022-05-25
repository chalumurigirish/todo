import { useQuery, gql, useMutation } from 'urql';
import { Button, Input, Container, VStack, HStack } from '@chakra-ui/react';

import { useState } from 'react';
import NewTodo from '@/graphql/todo_queries/newTodo';
import DeleteTodo from '@/graphql/todo_queries/deleteTodo';
import UpdateTodo from '@/graphql/todo_queries/updateTodo';
import GetTodos from '@/graphql/todo_queries/getTodo';

const NewTestIndex = () => {
  const [insertNewTodoTitle, setInsertNewTodoTitle] = useState('');
  const [deleteTodoId, setDeleteTodoId] = useState('');
  const [updateTodoText, setUpdateTodoText] = useState('');
  const [updateTodoId, setUpdateTodoId] = useState('');

  const [insertTodoResult, insertTodo] = useMutation(NewTodo);
  const [deleteTodoResult, deleteTodo] = useMutation(DeleteTodo);
  const [updateTodoResult, updateTodo] = useMutation(UpdateTodo);
  const [response] = useQuery({ query: GetTodos });

  const getTodoList = () => {
    console.log(response.data);
  };

  const newTodoSubmit = async () => {
    try {
      const variables = { title: insertNewTodoTitle, user_id: 1 };
      const { data } = await insertTodo(variables);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodoSubmit = async () => {
    try {
      const variables = { id: deleteTodoId };
      const { data } = await deleteTodo(variables);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTodoSubmit = async () => {
    try {
      const variables = { id: updateTodoId, title: updateTodoText };
      const { data } = await updateTodo(variables);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container py='100px'>
      <VStack spacing='5'>
        <h1>Testing Mutation</h1>
        <HStack maxW={'lg'} spacing='2'>
          <Input
            type='text'
            placeholder='enter your todo'
            value={insertNewTodoTitle}
            onChange={(e) => setInsertNewTodoTitle(e.target.value)}
          />
          <Button variant='solid' width='200px' onClick={() => newTodoSubmit()}>
            submit todo
          </Button>
        </HStack>

        <HStack maxW={'lg'} spacing='2'>
          <Input
            placeholder='id to delete'
            type='number'
            value={deleteTodoId}
            onChange={(e) => setDeleteTodoId(e.target.value)}
          />
          <Button
            variant='solid'
            width='200px'
            onClick={() => deleteTodoSubmit()}
          >
            delete Todo
          </Button>
        </HStack>

        <HStack maxW={'lg'} spacing='2'>
          <Input
            placeholder='enter the Id'
            type='number'
            value={updateTodoId}
            onChange={(e) => setUpdateTodoId(e.target.value)}
          />
          <Input
            placeholder='update todo based on Id'
            type='text'
            value={updateTodoText}
            onChange={(e) => setUpdateTodoText(e.target.value)}
          />
          <Button
            variant='solid'
            width='300px'
            onClick={() => updateTodoSubmit()}
          >
            update Todo
          </Button>
        </HStack>
        <Button variant='solid' onClick={() => getTodoList()}>
          get-todo
        </Button>
      </VStack>
    </Container>
  );
};

export default NewTestIndex;
