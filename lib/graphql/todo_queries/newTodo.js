import { gql } from 'urql';

const NewTodo = gql`
  mutation newTodo($title: String!, $user_id: Int!) {
    insert_todos_one(object: { title: $title, user_id: $user_id }) {
      id
      title
      user_id
      completed
    }
  }
`;

export default NewTodo;
