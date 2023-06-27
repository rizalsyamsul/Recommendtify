const { decodeToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    let { access_token_app } = req.headers;

    if (!access_token_app) throw { name: "Unauthorized" };
    let payload = decodeToken(access_token_app);

    let data = await User.findByPk(payload.id);
    if (!data) throw { name: "Unauthorized" };

    req.user = {
      id: data.id,
      email: data.email,
    };

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authentication;
