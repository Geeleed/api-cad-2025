const express = require("express");
const router = express.Router();
const pool = require("./../config/db");
const cad__resource = require("./cad__resource.json");

router.use(express.json());

// router.route("/reset").get(async (req, res) => {
//   const conn = await pool.connect();
//   try {
//     await conn.query(`BEGIN`);
//     const temp = cad__resource.map((el, index) => ({
//       ...el,
//       id_resource: index + 1,
//     }));
//     await conn.query(`TRUNCATE TABLE cad__resource RESTART IDENTITY`);
//     for (let i = 0; i < temp.length; i++) {
//       const element = temp[i];
//       const { id_resource, resource_type, remark, resource, name } = element;
//       await conn.query(
//         `INSERT INTO cad__resource (id_resource, resource_type, remark, resource, name) VALUES ($1, $2, $3, $4, $5)`,
//         [id_resource, resource_type, remark, resource, name]
//       );
//     }

//     const result = await conn.query(`SELECT * FROM cad__resource`);

//     await conn.query(`COMMIT`);
//     const returnResult = result.rows;
//     res.status(200).json(returnResult);
//   } catch (error) {
//     console.error(error);
//     await conn.query(`ROLLBACK`);
//     res.status(500).json({});
//   } finally {
//     conn.release();
//   }
// });

router.route("/").post(async (req, res) => {
  const conn = await pool.connect();
  const { resource_type, name } = req.body;
  try {
    await conn.query(`BEGIN`);
    const result = await conn.query(
      `SELECT * FROM cad__resource WHERE resource_type = $1 AND name = $2`,
      [resource_type, name]
    );
    await conn.query(`COMMIT`);

    // let tempResult = cad__resource.map((el, index) => ({
    //   ...el,
    //   id_resource: index + 1,
    // }));
    // tempResult = tempResult.filter(
    //   (el) => el.resource_type === resource_type && el.name === name
    // );
    // const result = { rows: tempResult };

    const returnResult = result.rows[0];
    // console.log(returnResult);
    res.status(200).json(returnResult);
  } catch (error) {
    await conn.query(`ROLLBACK`);
    console.error(error);
    res.status(500).json({});
  } finally {
    conn.release();
  }
});

// router.route("/landing").post(async (req, res) => {
//   const conn = await pool.connect();

//   try {
//     const { locale } = req.body;

//     // const result = await conn.query(`SELECT * FROM cad__resource`);
//     // let tempResult = result.rows;

//     const temp = [];
//     const list = [
//       { resource_type: "page_landing", name: `section_home_${locale}` },
//       { resource_type: "value_setting", name: `value_setting_${locale}` },
//       { resource_type: "page_services", name: `page_services_${locale}` },
//       { resource_type: "page_landing", name: `section_welcome_${locale}` },
//       { resource_type: "page_about", name: `page_about_${locale}` },
//       { resource_type: "page_team", name: `page_team_${locale}` },
//       { resource_type: "page_doctor", name: `page_doctor_${locale}` },
//       { resource_type: "page_approaches", name: `page_approaches_${locale}` },
//       { resource_type: "page_resources", name: `page_resources_${locale}` },
//       { resource_type: "page_news", name: `page_news_${locale}` },
//     ];
//     for (let i = 0; i < list.length; i++) {
//       const element = list[i];
//       const result = await conn.query(
//         `SELECT * FROM cad__resource WHERE resource_type = $1 AND name = $2`,
//         [element.resource_type, element.name]
//       );
//       temp.push(result.rows[0]);
//     }
//     let tempResult = temp;

//     // let tempResult = cad__resource.map((el, index) => ({
//     //   ...el,
//     //   id_resource: index + 1,
//     // }));

//     const {
//       resource: { h1_1, h1_2, p, img },
//     } = tempResult.find(
//       (el) =>
//         el.resource_type === "page_landing" &&
//         el.name === `section_home_${locale}`
//     );

//     const value_setting = tempResult.find(
//       (el) =>
//         el.resource_type === "value_setting" &&
//         el.name === `value_setting_${locale}`
//     );
//     const {
//       open_days,
//       open_hours,
//       facebook_label,
//       facebook_link,
//       line_label,
//       line_link,
//       email_label,
//       email_link,
//       tel_label,
//       tel_link,
//       address,
//       map,
//       footer,
//       my_services,
//     } = value_setting.resource;
//     const contact = {
//       facebook_label,
//       facebook_link,
//       line_label,
//       line_link,
//       email_label,
//       email_link,
//       tel_label,
//       tel_link,
//     };
//     const openHours = { days: open_days, hours: open_hours };

//     const page_services = tempResult.find(
//       (el) =>
//         el.resource_type === "page_services" &&
//         el.name === `page_services_${locale}`
//     );
//     const servicesTitle = page_services.resource.title;
//     const services = page_services.resource.content.map((el) => el.h2);

//     const basicServices = my_services;

//     const {
//       resource: { h2: welcomeTitle, p: welcomeP },
//     } = tempResult.find(
//       (el) =>
//         el.resource_type === "page_landing" &&
//         el.name === `section_welcome_${locale}`
//     );

//     const {
//       resource: {
//         h2: aboutTitle,
//         h3: aboutSubtitle,
//         p_1: aboutP1,
//         p_2: aboutP2,
//         card: aboutCard,
//       },
//     } = tempResult.find(
//       (el) =>
//         el.resource_type === "page_about" && el.name === `page_about_${locale}`
//     );

//     const {
//       resource: { title: teamTitle, team },
//     } = tempResult.find(
//       (el) =>
//         el.resource_type === "page_team" && el.name === `page_team_${locale}`
//     );
//     const teamCard = team.map((el) => ({
//       img: el.img,
//       person_name: el.person_name,
//       role: el.role,
//       position: el.position,
//     }));

//     const {
//       resource: { content: buttonLabel, child: tempChild },
//     } = tempResult.find(
//       (el) =>
//         el.resource_type === "page_doctor" &&
//         el.name === `page_doctor_${locale}`
//     );
//     const doctorIntro = tempChild.find((el) => el?.label === "intro")?.content;
//     const doctorImg = tempChild.find((el) => el?.content?.name === "doctor")
//       ?.content?.src_image;

//     const servicesCard = services;

//     const {
//       resource: { content: approachesTitle, child: tempChild2 },
//     } = tempResult.find(
//       (el) =>
//         el.resource_type === "page_approaches" &&
//         el.name === `page_approaches_${locale}`
//     );
//     const approachesCard = tempChild2.map((el) => el.content);

//     const {
//       resource: { title: resourcesTitle },
//     } = tempResult.find(
//       (el) =>
//         el.resource_type === "page_resources" &&
//         el.name === `page_resources_${locale}`
//     );
//     const articlesList = [];
//     const videosList = [];

//     const {
//       resource: { title: newsTitle },
//     } = tempResult.find(
//       (el) =>
//         el.resource_type === "page_news" && el.name === `page_news_${locale}`
//     );
//     const newsList = [];

//     const returnResult = {
//       sectionHome: { h1_1, h1_2, p, img },
//       sectionBasicInfo: { contact, openHours, basicServices },
//       sectionWelcome: { welcomeTitle, welcomeP },
//       sectionAbout: { aboutTitle, aboutSubtitle, aboutP1, aboutP2, aboutCard },
//       sectionTeam: { teamTitle, teamCard },
//       sectionDoctor: { doctorImg, doctorIntro, buttonLabel },
//       sectionServices: { servicesTitle, servicesCard },
//       sectionApproaches: { approachesTitle, approachesCard },
//       sectionResources: { resourcesTitle, articlesList, videosList },
//       sectionNews: { newsTitle, newsList },
//       sectionFooter: { address, contact, footer, map },
//     };

//     res.status(200).json(returnResult);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({});
//   } finally {
//     conn.release();
//   }
// });

router.route("/landing").post(async (req, res) => {
  const conn = await pool.connect();

  try {
    const { locale } = req.body;

    // กำหนด resource ที่ต้องดึง พร้อม field JSON ที่ใช้
    const resourceConfigs = [
      {
        type: "page_landing",
        name: `section_home_${locale}`,
        fields: ["h1_1", "h1_2", "p", "img"],
        key: "sectionHome",
      },
      {
        type: "page_landing",
        name: `section_welcome_${locale}`,
        fields: ["h2", "p"],
        key: "sectionWelcome",
      },
      {
        type: "value_setting",
        name: `value_setting_${locale}`,
        fields: [
          "open_days",
          "open_hours",
          "facebook_label",
          "facebook_link",
          "line_label",
          "line_link",
          "email_label",
          "email_link",
          "tel_label",
          "tel_link",
          "address",
          "map",
          "footer",
          "my_services",
        ],
        key: "valueSetting",
      },
      {
        type: "page_services",
        name: `page_services_${locale}`,
        fields: ["title", "content"],
        key: "pageServices",
      },
      {
        type: "page_about",
        name: `page_about_${locale}`,
        fields: ["h2", "h3", "p_1", "p_2", "card"],
        key: "sectionAbout",
      },
      {
        type: "page_team",
        name: `page_team_${locale}`,
        fields: ["title", "team"],
        key: "sectionTeam",
      },
      {
        type: "page_doctor",
        name: `page_doctor_${locale}`,
        fields: ["content", "child"],
        key: "sectionDoctor",
      },
      {
        type: "page_approaches",
        name: `page_approaches_${locale}`,
        fields: ["content", "child"],
        key: "sectionApproaches",
      },
      {
        type: "page_resources",
        name: `page_resources_${locale}`,
        fields: ["title"],
        key: "sectionResources",
      },
      {
        type: "page_news",
        name: `page_news_${locale}`,
        fields: ["title"],
        key: "sectionNews",
      },
    ];

    // สร้าง placeholders และ values สำหรับ IN query
    const placeholders = resourceConfigs
      .map((_, i) => `($${i * 2 + 1}, $${i * 2 + 2})`)
      .join(", ");
    const values = resourceConfigs.flatMap((r) => [r.type, r.name]);

    // Query JSON column ทั้งหมดในครั้งเดียว
    const result = await conn.query(
      `SELECT resource_type, name, resource
       FROM cad__resource
       WHERE (resource_type, name) IN (${placeholders})`,
      values
    );

    // Mapping resource_type+name → resource JSON
    const resourceMap = {};
    result.rows.forEach((r) => {
      resourceMap[`${r.resource_type}_${r.name}`] = r.resource;
    });

    // สร้าง returnResult
    const returnResult = {};

    resourceConfigs.forEach((cfg) => {
      const resData = resourceMap[`${cfg.type}_${cfg.name}`];
      if (!resData) return;
      switch (cfg.key) {
        case "sectionHome":
          returnResult.sectionHome = {
            h1_1: resData.h1_1,
            h1_2: resData.h1_2,
            p: resData.p,
            img: resData.img,
          };
          break;
        case "sectionWelcome":
          returnResult.sectionWelcome = {
            welcomeTitle: resData.h2,
            welcomeP: resData.p,
          };
          break;
        case "valueSetting":
          returnResult.sectionBasicInfo = {
            contact: {
              facebook_label: resData.facebook_label,
              facebook_link: resData.facebook_link,
              line_label: resData.line_label,
              line_link: resData.line_link,
              email_label: resData.email_label,
              email_link: resData.email_link,
              tel_label: resData.tel_label,
              tel_link: resData.tel_link,
            },
            openHours: { days: resData.open_days, hours: resData.open_hours },
            basicServices: resData.my_services,
          };
          returnResult.sectionFooter = {
            address: resData.address,
            contact: {
              facebook_label: resData.facebook_label,
              facebook_link: resData.facebook_link,
              line_label: resData.line_label,
              line_link: resData.line_link,
              email_label: resData.email_label,
              email_link: resData.email_link,
              tel_label: resData.tel_label,
              tel_link: resData.tel_link,
            },
            footer: resData.footer,
            map: resData.map,
          };
          break;
        case "pageServices":
          returnResult.sectionServices = {
            servicesTitle: resData.title,
            servicesCard: resData.content.map((c) => c.h2),
          };
          break;
        case "sectionAbout":
          returnResult.sectionAbout = {
            aboutTitle: resData.h2,
            aboutSubtitle: resData.h3,
            aboutP1: resData.p_1,
            aboutP2: resData.p_2,
            aboutCard: resData.card,
          };
          break;
        case "sectionTeam":
          returnResult.sectionTeam = {
            teamTitle: resData.title,
            teamCard: resData.team.map((t) => ({
              img: t.img,
              person_name: t.person_name,
              role: t.role,
              position: t.position,
            })),
          };
          break;
        case "sectionDoctor":
          returnResult.sectionDoctor = {
            buttonLabel: resData.content,
            doctorIntro: resData.child.find((c) => c?.label === "intro")
              ?.content,
            doctorImg: resData.child.find((c) => c?.content?.name === "doctor")
              ?.content?.src_image,
          };
          break;
        case "sectionApproaches":
          returnResult.sectionApproaches = {
            approachesTitle: resData.content,
            approachesCard: resData.child.map((c) => c.content),
          };
          break;
        case "sectionResources":
          returnResult.sectionResources = {
            resourcesTitle: resData.title,
            articlesList: [],
            videosList: [],
          };
          break;
        case "sectionNews":
          returnResult.sectionNews = { newsTitle: resData.title, newsList: [] };
          break;
      }
    });

    res.status(200).json(returnResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({});
  } finally {
    conn.release();
  }
});

router.route("/footer").post(async (req, res) => {
  try {
    const { locale } = req.body;
    let tempResult = cad__resource.map((el, index) => ({
      ...el,
      id_resource: index + 1,
    }));

    const value_setting = tempResult.find(
      (el) =>
        el.resource_type === "value_setting" &&
        el.name === `value_setting_${locale}`
    );
    const {
      facebook_label,
      facebook_link,
      line_label,
      line_link,
      email_label,
      email_link,
      tel_label,
      tel_link,
      address,
      map,
      footer,
      my_services,
    } = value_setting.resource;
    const contact = {
      facebook_label,
      facebook_link,
      line_label,
      line_link,
      email_label,
      email_link,
      tel_label,
      tel_link,
    };

    const returnResult = { address, contact, footer, map };

    res.status(200).json(returnResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({});
  }
});

module.exports = router;
