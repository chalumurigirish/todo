import * as admin from 'firebase-admin';

const firebaseAdminConfig = {
  type: process.env.FB_TYPE,
  project_id: process.env.FB_PROJECT_ID,
  private_key_id: process.env.FB_PRIVATE_KEY_ID,
  private_key: process.env.FB_PRIVATE_KEY,
  client_email: process.env.FB_CLIENT_EMAIL,
  client_id: process.env.FB_CLIENT_ID,
  auth_uri: process.env.FB_AUTH_URI,
  token_uri: process.env.FB_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FB_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.FB_CLIENT_CERT_URL,
};

const createUser = async (req, res) => {
  const { email, password, displayName } = req.body.input.credentials;

  try {
    if (admin?.apps?.length === 0) {
      console.log('initializeApp');
      await admin.initializeApp({
        credential: admin.credential.cert(firebaseAdminConfig),
      });
    } else {
      console.log('already initialized');
    }
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
