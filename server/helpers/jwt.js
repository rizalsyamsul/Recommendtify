const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

function signToken(data) {
  return jwt.sign(data, secret);
}

function decodeToken(data) {
  return jwt.verify(data, secret);
}

module.exports = {
  signToken,
  decodeToken,
};
