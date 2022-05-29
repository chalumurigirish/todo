import { login } from '@/utils/context/loginFunctions';

const userLogin = async (req, res) => {
  const { email, password } = req.body.input.credentials;

  try {
    const { accessToken, uid } = await login(email, password);

    res.status(200).json({ accessToken, uid });
  } catch (error) {
    console.error(error);
  }
};

export default userLogin;
