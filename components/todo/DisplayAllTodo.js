import React from 'react';
import IndividualTodo from './IndividualTodo';

import { useTodoContext } from '@/utils/context/Todo/TodoContext';

const DisplayAllTodo = () => {
  const { todoList } = useTodoContext();

  return (
    <>
      {todoList.map((todo) => (
        <IndividualTodo key={todo.id} todo={todo} />
      ))}
    </>
  );
};

export default DisplayAllTodo;
