const express = require("express");
const router = express.Router();

router.route("/").get(async (req, res) => {
  const news = require("../static_json/news.json");
  res.send(news);
});

module.exports = router;
