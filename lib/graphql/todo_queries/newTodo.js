import { gql } from 'urql';

const NewTodo = gql`
  mutation newTodo($title: String!, $user_id: Int!) {
    insert_todos_one(object: { title: $title }) {
      id
      title

      completed
    }
  }
`;

export default NewTodo;
