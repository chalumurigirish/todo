import { gql } from 'urql';

const GetTodos = gql`
  query MyQuery {
    todos {
      id
      title
      completed
    }
  }
`;
export default GetTodos;
