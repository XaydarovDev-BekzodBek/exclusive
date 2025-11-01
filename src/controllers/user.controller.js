const { UserModel } = require("../models");
const { createToken } = require("../utils/jwt");

exports.RegisterUser = async (req, res) => {
  try {
    const { firstname, lastname, email, phone, password, address } = req.body;

    const oldUser = await UserModel.findOne({ email });
    if (oldUser) {
      return req.status(500).send("This email is there");
    } else {
      const { password, ...user } = await UserModel.create({
        firstname,
        lastname,
        email,
        phone,
        password,
        address,
      });

      const token = createToken({ id: user._id, role: "user" });

      return { ...user, token };
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};
