const express = require("express");
const cors = require("cors");
const { PORT } = require("./constants/process.constants");
const ConnectionToDB = require("./configs/db.config");
const { setUpSwagger } = require("./utils/swagger");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors({ origin: "*", methods: ["POST", "GET", "DELETE", "PUT"] }));

setUpSwagger(app);

const UserRouter = require("./routes/user.route");

app.use("/api", UserRouter);

app.listen(PORT, async () => {
  await ConnectionToDB();
  console.log("app is running");
});
