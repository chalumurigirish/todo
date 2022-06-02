import React from 'react';
import IndividualTodo from './IndividualTodo';
import { Stack } from '@chakra-ui/react';

import { useTodoContext } from '@/utils/context/Todo/TodoContext';

const DisplayAllTodo = () => {
  const { todoList } = useTodoContext();

  return (
    <Stack py='5'>
      {todoList.map((todo) => (
        <IndividualTodo key={todo.id} todo={todo} />
      ))}
    </Stack>
  );
};

export default DisplayAllTodo;
