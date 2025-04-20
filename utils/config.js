require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;
const SECRET = process.env.SECRET;
const SALT_ROUND = process.env.SALT_ROUND;

module.exports = { MONGODB_URI, PORT, SECRET, SALT_ROUND }