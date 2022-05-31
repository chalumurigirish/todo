import React, { useState, useEffect, createContext, useContext } from 'react';
import { useQuery } from 'urql';

import GetTodo from '@/graphql/todo_queries/getTodo';

const todoContext = createContext();

export const useTodoContext = () => {
  return useContext(todoContext);
};

const TodoContextProvider = ({ children }) => {
  const [allTodos, getAllTodos] = useQuery({ query: GetTodo });

  const [todoList, setTodoList] = useState([]);
  const [editingTodo, setEditingTodo] = useState({
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
    editingTodo,
    setEditingTodo,
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
