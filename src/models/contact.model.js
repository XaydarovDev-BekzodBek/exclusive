const { Schema, model } = require("mongoose");

const ContactSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, email: true },
    phone: { type: String },
    message: { type: String },
    user_id: { type: Schema.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const ContactModel = model("Contact", ContactSchema);
module.exports = ContactModel;
