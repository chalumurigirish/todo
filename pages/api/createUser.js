import admin from '@/utils/firebaseAdmin';

const createUser = async (req, res) => {
  const { email, password, displayName } = req.body.input.credentials;

  try {
    const user = await admin.auth().createUser({
      email: email,
      password: password,
      displayName: displayName,
    });

    await admin.auth().setCustomUserClaims(user.uid, {
      'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': ['user'],
        'x-hasura-default-role': 'user',
        'x-hasura-user-id': user.uid,
        'x-hasura-id': user.uid,
      },
    });

    return res.status(200).json({
      id: user.uid,
      email: user.email,
      displayName: user.displayName,
    });
  } catch (error) {
    return res.status(501).json({
      error: error.message,
      location: '/api/createUser was failing',
    });
  }
};

export default createUser;
