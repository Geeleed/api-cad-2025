const express = require("express");
const router = express.Router();

router.route("/home").get(async (req, res) => {
  const home_en = require("../static_json/home_en.json");
  res.send({ en: home_en, th: null });
});

router.route("/about").get(async (req, res) => {
  const about_en = require("../static_json/about_en.json");
  res.send({ en: about_en, th: null });
});

router.route("/approach").get(async (req, res) => {
  const approach_en = require("../static_json/approach_en.json");
  res.send({ en: approach_en, th: null });
});

router.route("/contact").get(async (req, res) => {
  const contact_en = require("../static_json/contact_en.json");
  res.send({ en: contact_en, th: null });
});

router.route("/doctor").get(async (req, res) => {
  const doctor_en = require("../static_json/doctor_en.json");
  res.send({ en: doctor_en, th: null });
});

router.route("/service").get(async (req, res) => {
  const service_en = require("../static_json/service_en.json");
  res.send({ en: service_en, th: null });
});

router.route("/team").get(async (req, res) => {
  const team_en = require("../static_json/team_en.json");
  res.send({ en: team_en, th: null });
});

module.exports = router;
