const express = require("express");
const router = express.Router();

router.route("/video").get(async (req, res) => {
  const video = require("../static_json/video.json");
  res.send(video);
});

module.exports = router;
