import { gql } from 'urql';

const DeleteTodo = gql`
  mutation MyMutation($id: Int!) {
    delete_todos_by_pk(id: $id) {
      title
      id
      completed
    }
  }
`;

export default DeleteTodo;
