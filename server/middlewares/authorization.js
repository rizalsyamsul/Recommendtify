const { Music, User } = require("../models");

async function authorization(req, res, next) {
  try {
    let UserId = req.user.id;

    let { id } = req.params;

    let album = await Music.findByPk(id);
    if (!album) throw { name: "NotFound" };

    if (album.UserId !== UserId) throw { name: "Forbidden" };

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authorization;
