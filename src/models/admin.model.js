const { hash } = require("bcrypt");
const { Schema, model } = require("mongoose");

const AdminSchema = new Schema(
  {
    email: { type: String },
    password: { type: String },
    isSuperAdmin: { type: Boolean },
  },
  { timestamps: true }
);

AdminSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await hash(this.password, 10);
  }
});

const AdminModel = model("Admin",AdminSchema)
module.exports = AdminModel