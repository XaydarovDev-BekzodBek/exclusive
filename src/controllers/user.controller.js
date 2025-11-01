const { UserModel } = require("../models");
const { createToken } = require("../utils/jwt");
const bcrypt = require("bcrypt");

exports.RegisterUser = async (req, res) => {
  try {
    const { name, identify, password } = req.body;

    const oldUser = await UserModel.findOne(
      identify.includes("@") ? { email: identify } : { phone: identify }
    );
    if (oldUser) {
      return req.status(400).send("This email or phone is there");
    } else {
      const identifyObj = identify.includes("@")
        ? { email: identify, phone: "" }
        : { phone: identify, email: "" };
      const user = await UserModel.create({
        firstname: name.split(" ")[0],
        lastname: name.split(" ")[1],
        password,
        address: "",
        ...identifyObj,
      });

      const token = createToken({ id: user._id, role: "user" });
      return res.status(201).json({ ...user._doc, token });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

exports.LoginUser = async (req, res) => {
  try {
    const { identify, password } = req.body;
    const user = await UserModel.findOne(
      identify.includes("@") ? { email: identify } : { phone: identify }
    );

    if (!user) {
      return res.status(400).send("Email or password invalid");
    }

    const matchPassword = await bcrypt.compare(user.password, password);

    if (matchPassword) {
      return res.status(400).send("Email or password invalid");
    }

    const token = createToken({ id: user._id, role: "user" });

    return res.status(200).json({ success: true, token });
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

exports.getUserByToken = async (req, res) => {
  try {
    const user = await UserModel.findById(req.use.id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    return res.status(200).send(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      address,
      current_password,
      new_password,
    } = req.body;
    const user = await UserModel.findById(req.use.id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const matchPassword = await bcrypt.compare(user.password, current_password);
    if (matchPassword) {
      return res.status(400).send("Password is invalid");
    }

    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;
    user.address = address;
    user.password = new_password;

    await user.save();
    return res.status(200).send(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};
