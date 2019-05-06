module.exports = {
  jwt: {
    secret: 'secret',
    tokens: {
      access: {
        type: 'access',
        expiresIn: '60m'
      },
      refresh: {
        type: 'refresh',
        expiresIn: '63m'
      }
    }
  }
};