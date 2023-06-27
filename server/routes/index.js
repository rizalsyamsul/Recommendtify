const express = require("express");
const router = express.Router();
const Controler = require("../controllers");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
router.post("/register", Controler.register);
router.post("/login", Controler.loginUser);
router.get("/spotify/login", Controler.login);
router.get("/spotify/callback", Controler.callback);

router.use(authentication);
router.get("/spotify/profile", Controler.getProfile);
router.get("/spotify/topArtists", Controler.topArtists);
router.get("/spotify/topTracks", Controler.topTracks);
router.get("/spotify/recommend", Controler.recommend);
router.get("/spotify/detailTrack/:id", Controler.detailTrack);

router.get("/myMusic", Controler.getMyMusic);
router.post("/myMusic", Controler.addMyMusic);
router.patch("/myMusic/:id", authorization, Controler.buyMyMusic);

router.post("/generate-midtrans/:id", Controler.midtransToken);

module.exports = router;
