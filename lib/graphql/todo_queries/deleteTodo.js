import { gql } from 'urql';

const DeleteTodo = gql`
  mutation MyMutation($id: Int!) {
    delete_todos_by_pk(id: $id) {
      title
      id
      user_id
    }
  }
`;

export default DeleteTodo;
