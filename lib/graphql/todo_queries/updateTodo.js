import { gql } from 'urql';

const UpdateTodo = gql`
  mutation MyMutation($id: Int!, $title: String!) {
    update_todos_by_pk(pk_columns: { id: $id }, _set: { title: $title }) {
      id
      title
      completed
    }
  }
`;

export default UpdateTodo;
