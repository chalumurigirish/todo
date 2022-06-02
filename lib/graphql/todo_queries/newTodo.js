import { gql } from 'urql';

const NewTodo = gql`
  mutation newTodo($title: String!) {
    insert_todos_one(object: { title: $title }) {
      id
      title

      completed
    }
  }
`;

export default NewTodo;
