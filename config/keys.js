const mongoURI = typeof process.env.mongoURI === 'undefined'
  ? 'MongoDatabaseURI'
  : process.env.mongoURI;
const secretOrKey = typeof process.env.secretOrKey === 'undefined'
  ? 'SomeSecretOrKey'
  : process.env.secretOrKey;
const registerSecret = typeof process.env.registerSecret === 'undefined'
  ? 'SomeRegisterSecret'
  : process.env.registerSecret;

module.exports = {
  mongoURI,
  secretOrKey,
  registerSecret,
};
