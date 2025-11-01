const { hash } = require("crypto");
const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String, email: true, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await hash(this.password);
  }
});

const UserModel = model("user", UserSchema);

module.exports = UserModel;
