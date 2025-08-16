require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.use("/test", require("./routes/test"));
app.use("/page", require("./routes/page"));
app.use("/resource", require("./routes/resource"));
app.use("/news", require("./routes/news"));
app.use("/data", require("./routes/data"));

app.listen(8000, () => console.log("api on port 8000"));
