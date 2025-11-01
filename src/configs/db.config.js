const { connect } = require("mongoose");
const { db_url } = require("../constants/process.constants");

async function ConnectionToDB() {
  console.log("connection loading");
  try {
    await connect(db_url);
    console.log("db connected");
  } catch (error) {
    console.error("db connection error", error);
  }
}

module.exports = ConnectionToDB;