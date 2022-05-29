import { gql } from 'urql';

const RegisterUserMutation = gql`
  mutation registerUser(
    $email: String!
    $password: String!
    $displayName: String
  ) {
    createUser(
      credentials: {
        email: $email
        password: $password
        displayName: $displayName
      }
    ) {
      displayName
      email
      id
    }
  }
`;

export default RegisterUserMutation;
