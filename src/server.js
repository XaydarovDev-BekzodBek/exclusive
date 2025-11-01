const express = require("express");
const cors = require("cors");
const { PORT, db_url } = require("./constants/process.constants");
const ConnectionToDB = require("./configs/db.config");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors({ origin: "*", methods: ["POST", "GET", "DELETE", "PUT"] }));


const UserRouter = require("./routes/user.route");

app.use("/api", UserRouter);
app.listen(PORT, async () => {
  await ConnectionToDB();
  console.log("app is running");
});
