const express = require("express");
const router = express.Router();

router.use(express.json({ limit: "10mb" })); // กำหนดขนาด payload สูงสุดเป็น 10MB

router.route("/video").get(async (req, res) => {
  const video = require("../static_json/video.json");
  res.send(video);
});

router.route("/article").get(async (req, res) => {
  const article = await fetch(`https://mysql.geeleed.com/api.php`).then((r) =>
    r.json()
  );
  res.send(article);
});

router.route("/article/:id_article").get(async (req, res) => {
  const { id_article } = req.params;
  const article = await fetch(
    `https://mysql.geeleed.com/api.php?id_article=${id_article}`
  ).then((r) => r.json());
  res.send(article);
});

router.route("/article").post(async (req, res) => {
  const payload = req.body;
  const password = payload.password;
  const PASSWORD_POST_ARTICLE = process.env.PASSWORD_POST_ARTICLE;
  if (password !== PASSWORD_POST_ARTICLE) {
    return res.send({ auth: false });
  }
  const article = await fetch(`https://mysql.geeleed.com/api.php`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then((r) => r.json());
  res.send({ auth: true, data: article });
});

module.exports = router;
