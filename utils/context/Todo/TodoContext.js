import React, { useState, useEffect, createContext, useContext } from 'react';
import { useQuery } from 'urql';

import { getTodo } from '@/graphql/todo_queries/getTodo';

const todoContext = createContext();

export const useTodoContext = () => {
  return useContext(todoContext);
};

const TodoContextProvider = ({ children }) => {
  const [allTodos, getAllTodos] = useQuery({ query: getTodo });

  const [todoList, setTodoList] = useState([]);
  const [isEditing, setIsEditing] = useState({
    status: false,
    id: null,
  });

  const data = {
    allFields: [
      {
        id: 1,
        label: null,
        placeholder: 'Enter your To Do',
        type: 'text',
        name: 'title',
      },
    ],
    initialValues: {
      title: '',
    },
  };

  const value = {
    allTodos,
    todoList,
    setTodoList,
    isEditing,
    setIsEditing,
    ...data,
  };

  useEffect(() => {
    const { data, fetching, error } = allTodos;

    if (data) {
      setTodoList(data.todos);
    }
  }, [allTodos]);
  return <todoContext.Provider value={value}>{children}</todoContext.Provider>;
};

export default TodoContextProvider;
