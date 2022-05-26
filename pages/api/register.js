// import admin from '@/utils/firebaseAdmin';

import * as admin from 'firebase-admin';

// const firebaseAdminConfig = {
//   type: process.env.FB_TYPE,
//   project_id: process.env.FB_PROJECT_ID,
//   private_key_id: process.env.FB_PRIVATE_KEY_ID,
//   private_key: process.env.FB_PRIVATE_KEY,
//   client_email: process.env.FB_CLIENT_EMAIL,
//   client_id: process.env.FB_CLIENT_ID,
//   auth_uri: process.env.FB_AUTH_URI,
//   token_uri: process.env.FB_TOKEN_URI,
//   auth_provider_x509_cert_url: process.env.FB_PROVIDER_CERT_URL,
//   client_x509_cert_url: process.env.FB_CLIENT_CERT_URL,
// };

const firebaseAdminConfig = {
  type: 'service_account',
  project_id: 'hasura-nextjs-78bc7',
  private_key_id: 'dcc8655ce17fc37d2e06086d246dc08a15a21acf',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCneri27Z47S6DA\niglFTfwhiXL+9bzHTVcv/APnVOaZZc6N87A/zYHDajPnzez02qXQ0e/y6rdl7exG\nlULrGQroBWOhmZjaNhvaDJckNQFrqNawMYwFRp0w5HAs6gDAbatIMhTBB3cB+5Wq\nWMEUn6RGt8oTqy8lpdklPwoVnM3iKtNCXmFAkdQRFBaQ4kMBXiqrvY9s/HkHLHxJ\njO7rjAdrxF7Q39X2zVuKGjI6lrJHHLHSaa64ZEQ/gYP/TchXndtpPZLdZaltqtQe\nk1v0C6RoA+BsTGlzdl5cuCHJS31LfTVwQx/3J9vdzQ+XmwtiFfGI6Yp4MKvOUisd\nJeLljVkHAgMBAAECggEAJpcritMT27vgbZ0g57xBdYTTX5ZGCnJyvZbHW31/qScB\nQko9eWYkGWAWV7pmeEENZiGJtaKJ4c3B3L217rAViEL9oxXeV6GSJ1sxVGF2U1VT\nKsQv7GNKAyMQCflddPmQNxF7IMNUk7th0B+lVdg3JShiQsf2FCmz8FYnP7Wi5xLx\npqLcuBaaP+nVd3ZCg2VL65kbpySrGOsIuo9SCccTAjDQ+NfRFX6vj6z6Y8hyMLTL\ngs9pbprXZg4eZYtt+q17XJvyWdLINodIwD5SukBqkWwn7pLomcjU5yWPq4LttbZq\nP1unsEfcMYs6v9wm3it+KQHqLFSzNG0UoxlCDkC2YQKBgQDU/+DsCz9PATRlTmYa\n/grINQYbKEItX07xKTbURD2f4Bcjh+I9csvvyg8h8TMyJ0WFS/XqGKCoZUl1DnwO\nu/R8KXp1FQGoOvjnW3Xnj87VEJ40I/ynNBNZWMaZLwQcSokds/LwDRONMrBAaw22\nU246sJSr1jmh0TqAipIbhDAOVwKBgQDJSkvmTKTALwOgFPAuBSA7x6XAYYqjTqi1\nXKcPKHcyJAPW2OMd/pfW86eNHLRhpCNjhp+AX3m6yuKX0jBhB4F3FTBtRuwH9PIN\nLvLjKqFkbLG3SgsddRXFsrdSXsya4r3ycaOXv+i7NWMW5gxYW4dYpfs0aIPawbyh\nVJVrrOz80QKBgCU4QVl97aYkk79QH89/rOqnOVXthwLesLC7fvVAp3QUeHag/Au4\nz6IrMNHBkCynaCKOz34Ep65FZLyrt0nr1iEMLnXfIdb/1xa2iLfaDU52BO8firq9\nAtSOCsYhzRoUfDlQhJcl8dCultXq3w6JLa3bxV7xpEh+gzaLAFUGmE8pAoGACKlN\nwschf7OGMGk2PISz8l6Q30pTMNu9nrAx8BEJr/qkv6Xtf+jol7M8TnIhwOHTNAEi\n898n2cXJIkdFFafBBmK/BrS6i00a7T5L7UJ0V2Hl88EX4VicazlZcg3qN+/xxHDn\nXSxA021kqiOT/GlT1Ziuyn6EzfDwMPD2zP9P40ECgYBuMweBbYDzyBJ3Ly0EeF2w\nNkGYLpyUht6ziqLXqQ8SV30qdbBTNVqHrXuj9j7rgG46pmMnZUGsMaUneODFYY1Y\nbX5TZBuuEfYf+SWVQX0ytxnLs83L5emoFXs88oo8GH4k4TPiD2s5QVDUUUyxEmf7\nwjpTfAJ+1vbGWBM/3vEP+A==\n-----END PRIVATE KEY-----\n',
  client_email:
    'firebase-adminsdk-k6wd1@hasura-nextjs-78bc7.iam.gserviceaccount.com',
  client_id: '101020846299944486347',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-k6wd1%40hasura-nextjs-78bc7.iam.gserviceaccount.com',
};

(async () => {
  try {
    await admin.initializeApp({
      credential: admin.credential.cert(firebaseAdminConfig),
    });
    console.log('initialization');
  } catch (error) {
    if (!/already exists/u.test(error.message)) {
      console.error('Firebase admin initialization error', error.stack);
    }
  }
})();

// export default admin;

const register = async (req, res) => {
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

export default register;
