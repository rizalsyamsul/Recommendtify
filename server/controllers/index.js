const axios = require("axios");
const { User, Music } = require("../models");
const midtransClient = require("midtrans-client");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
class Controler {
  static login(req, res) {
    const params = new URLSearchParams({
      response_type: "code",
      client_id: process.env.SPOTIFY_CLIENT_ID,
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
      scope:
        "user-read-private user-read-email streaming user-top-read user-read-recently-played user-library-read", // Add any additional scopes as required
    });

    const authorizationUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;

    // res.redirect(authorizationUrl);
    res.status(200).json({ authorizationUrl });
  }

  static async callback(req, res, next) {
    try {
      const { code } = req.headers;
      const params = new URLSearchParams();
      params.append("grant_type", "authorization_code");
      params.append("code", code);
      params.append("redirect_uri", process.env.SPOTIFY_REDIRECT_URI);
      params.append("client_id", process.env.SPOTIFY_CLIENT_ID);
      params.append("client_secret", process.env.SPOTIFY_CLIENT_SECRET);

      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const { access_token, refresh_token } = response.data;
      res.status(200).json({ access_token, refresh_token });
    } catch (error) {
      // console.error("Error:", error.message);
      // res.status(500).json({message:"Authentication failed!"});
      // console.log(error);
      next(error);
    }
  }

  static async getProfile(req, res, next) {
    try {
      let { access_token } = req.headers;
      let { data } = await axios({
        url: "https://api.spotify.com/v1/me",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      let sendData = {
        username: data.id,
        name: data.display_name,
        imageUrl: data.images[0].url,
      };
      res.status(200).json(sendData);
    } catch (error) {
      // console.error("Error:", error.message);
      next(error);
    }
  }

  static async topArtists(req, res, next) {
    try {
      let { access_token } = req.headers;
      let { data } = await axios({
        url: "https://api.spotify.com/v1/me/top/artists",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      let sendData = data.items.map((el) => {
        return {
          id: el.id,
          imageUrl: el.images[0].url,
          name: el.name,
          genres: el.genres,
        };
      });

      res.status(200).json(sendData);
    } catch (error) {
      console.error("Error:", error.message);
      next(error);
    }
  }
  static async topTracks(req, res, next) {
    try {
      let { access_token } = req.headers;
      let { data } = await axios({
        url: "https://api.spotify.com/v1/me/top/tracks",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      let sendData = data.items.map((el) => {
        return {
          id: el.id,
          name: el.name,
          preview: el.preview_url,
          href: el.href,
          album: {
            id: el.album.id,
            name: el.album.name,
            imageUrl: el.album.images[0].url,
          },
          artist: {
            id: el.artists[0].id,
            name: el.artists[0].name,
          },
        };
      });

      res.status(200).json(sendData);
    } catch (error) {
      console.error("Error:", error.message);
      next(error);
    }
  }
  static async recommend(req, res, next) {
    try {
      let { access_token } = req.headers;

      let artist = await axios({
        url: "https://api.spotify.com/v1/me/top/artists",
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      let dataId = artist.data.items.map((el) => {
        let id = [];
        id.push(el.id);
        return id;
      });
      let newSeed = dataId.slice(0, 5).join(",");

      let { data } = await axios({
        url: `https://api.spotify.com/v1/recommendations?seed_artists=${newSeed}`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      let sendData = data.tracks.map((el) => {
        return {
          id: el.id,
          name: el.name,
          preview: el.preview_url,
          href: el.href,
          album: {
            id: el.album.id,
            name: el.album.name,
            imageUrl: el.album.images[0].url,
          },
          artist: {
            id: el.artists[0].id,
            name: el.artists[0].name,
          },
        };
      });

      res.status(200).json(sendData);
    } catch (error) {
      console.error("Error:", error.message);
      next(error);
    }
  }

  static async detailTrack(req, res, next) {
    try {
      let { access_token } = req.headers;
      let { id } = req.params;
      let { data } = await axios({
        url: `https://api.spotify.com/v1/tracks/${id}`,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      let sendData = {
        id: data.id,
        name: data.name,
        preview: data.preview_url,
        href: data.href,
        album: {
          id: data.album.id,
          name: data.album.name,
          imageUrl: data.album.images[0].url,
        },
        artist: {
          id: data.artists[0].id,
          name: data.artists[0].name,
        },
      };
      res.status(200).json(sendData);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  //db

  static async register(req, res, next) {
    try {
      let { email, password } = req.body;
      if (!email || email == undefined) throw { name: "EmailRequired" };
      if (!password) throw { name: "PasswordRequired" };

      let check = await User.findOne({
        where: { email: email },
      });

      if (check) throw { name: "AlreadyExist" };

      let data = await User.create({ email, password });
      res.status(201).json({ id: data.id, email: data.email });
    } catch (error) {
      next(error);
    }
  }

  static async loginUser(req, res, next) {
    try {
      let { email, password } = req.body;
      if (!email) throw { name: "EmailRequired" };
      if (!password) throw { name: "PasswordRequired" };

      let data = await User.findOne({
        where: { email: email },
      });

      if (!data) throw { name: "Invalid" };

      let compare = comparePassword(password, data.password);
      if (!compare) throw { name: "Invalid" };

      let payload = {
        id: data.id,
        email: data.email,
      };

      let access_token_app = signToken(payload);

      res.status(200).json({ access_token_app });
    } catch (error) {
      next(error);
    }
  }

  static async getMyMusic(req, res, next) {
    try {
      let UserId = req.user.id;
      let data = await Music.findAll({
        where: { UserId: UserId },
        order: [["id", "ASC"]],
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async addMyMusic(req, res, next) {
    try {
      let UserId = req.user.id;

      let { name, imageUrl, artistName, spotifyId } = req.body;

      let price = Math.floor(Math.random() * (1000000 - 100000 + 1)) + 100000;
      let status = false;
      let data = await Music.create({
        name,
        imageUrl,
        artistName,
        spotifyId,
        price,
        UserId,
        status,
      });

      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async buyMyMusic(req, res, next) {
    try {
      let status = true;
      let { id } = req.params;
      let data = await Music.update(
        { status },
        {
          where: { id: id },
        }
      );
      res.status(200).json({ message: "Album has been Paid" });
    } catch (error) {
      next(error);
    }
  }

  //midtrans

  static async midtransToken(req, res, next) {
    try {
      let { id } = req.params;
      let data = await Music.findByPk(id, {
        include: { model: User },
      });

      if (data.status === true) throw { name: "Paid" };

      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });

      let parameter = {
        transaction_details: {
          order_id: "TRX666_" + Math.floor(100000 + Math.random() * 900000),
          gross_amount: data.price,
          // gross_amount: 666000,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: data.User.email,
          // email: "testdulugasi@mail.com",
        },
      };

      let midtransToken = await snap.createTransaction(parameter);
      res.status(201).json(midtransToken);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controler;
