const express = require("express");
const router = express.Router();

router.route("/", async (req, res) => {
  res.send("api on");
});

module.exports = router;
