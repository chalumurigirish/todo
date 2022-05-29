import { gql } from 'urql';

const LoginUserMutation = gql`
  mutation loginUserMutation($email: String!, $password: String!) {
    loginUser(credentials: { email: $email, password: $password }) {
      accessToken
      uid
    }
  }
`;

export default LoginUserMutation;
