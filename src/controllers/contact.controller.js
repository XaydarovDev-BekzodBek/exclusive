const { ContactModel } = require("../models");

exports.createContact = async (req, res) => {
  try {
    const { name, email, message, phone } = req.body;
    const user_id = req.use.id;

    await ContactModel.create({ name, email, message, phone, user_id });

    return res.status(201).json({ success: true, message: "contact created" });
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await ContactModel.find({}).populate("user_id");

    return res
      .status(200)
      .json({ success: true, message: "list of contacts", contacts });
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};
