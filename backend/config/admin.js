module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'imy210DefaultAdminJwtSecretKey'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'imy210DefaultApiTokenSaltKey'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT', 'imy210DefaultTransferTokenSaltKey'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY', 'imy210DefaultEncryptionKeyString'),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});
