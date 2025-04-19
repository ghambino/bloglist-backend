require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;
const SALT = process.env.SALT;
const SALT_ROUND = process.env.SALT_ROUND;

module.exports = { MONGODB_URI, PORT, SALT, SALT_ROUND}