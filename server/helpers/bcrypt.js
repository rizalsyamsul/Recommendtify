const bcrypt = require("bcryptjs");
const salt = 10;

function hashPassword(pass) {
  return bcrypt.hashSync(pass, salt);
}

function comparePassword(pass, newpass) {
  return bcrypt.compareSync(pass, newpass);
}

module.exports = {
  hashPassword,
  comparePassword,
};
