import { useState } from 'react';
import { HStack, Checkbox, Text, Button, Box } from '@chakra-ui/react';
import { useField } from 'formik';
import { useMutation } from 'urql';

import { useTodoContext } from '@/utils/context/Todo/TodoContext';
import DeleteTodo from '@/graphql/todo_queries/deleteTodo';

const IndividualTodo = ({ todo }) => {
  const [isChecked, setIsChecked] = useState(false);

  const [deleteTodoMutationResult, deleteTodoMutation] =
    useMutation(DeleteTodo);

  const { todoList, setTodoList, editingTodo, setEditingTodo } =
    useTodoContext();
  const [{}, {}, { setValue }] = useField({ name: 'title' });

  const editTodo = (todo) => {
    setEditingTodo({
      status: true,
      id: todo.id,
    });

    setValue(todo.title);
  };

  const deleteTodo = async (id) => {
    const newTodoList = todoList.filter((todo) => todo.id !== id);

    const variables = { id };
    const { data } = await deleteTodoMutation(variables);
    console.log(data);

    setTodoList(newTodoList);
  };

  return (
    <HStack justify='space-between'>
      <Box display='flex'>
        <Checkbox
          px='2'
          onChange={() => {
            setIsChecked(!isChecked);
          }}
        ></Checkbox>
        <Text>{todo.title}</Text>
      </Box>
      <HStack>
        <Button onClick={() => editTodo(todo)}>Edit</Button>
        <Button onClick={() => deleteTodo(todo.id)}>Remove</Button>
      </HStack>
    </HStack>
  );
};

export default IndividualTodo;
