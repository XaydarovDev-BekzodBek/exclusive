const { Schema, model } = require("mongoose");
const { hash } = require("bcrypt");

const UserSchema = new Schema(
  {
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String, email: true },
    phone: { type: String },
    password: { type: String, required: true },
    address: { type: String },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await hash(this.password, 10);
  }
});

const UserModel = model("user", UserSchema);

module.exports = UserModel;
