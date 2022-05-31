import React from 'react';
import Todo from '@/components/todo/Todo';

import TodoContextProvider from '@/utils/context/Todo/TodoContext';

const index = () => {
  return (
    <TodoContextProvider>
      <Todo />
    </TodoContextProvider>
  );
};

export default index;
