import { gql } from 'urql';

const GetTodos = gql`
  query MyQuery {
    todos {
      id
      title
      user_id
    }
  }
`;
export default GetTodos;
