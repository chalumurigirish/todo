import { login } from '@/utils/context/loginFunctions';

const userLogin = async (req, res) => {
  const { email, password } = req.body.input.credentials;

  try {
    const { accessToken } = await login(email, password);
    console.log(accessToken);
    res.status(200).json({ accessToken });
  } catch (error) {
    console.error(error);
  }
};

export default userLogin;
