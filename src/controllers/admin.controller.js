const { compare } = require("bcrypt");
const { AdminModel } = require("../models");
const { createToken } = require("../utils/jwt");

exports.InitSuperAdmin = async () => {
  try {
    const superAdmin = await AdminModel.findOne({ isSuperAdmin: true });
    if (!superAdmin) {
      await AdminModel.create({
        email: "admin@gmail.com",
        password: "admin",
        isSuperAdmin: true,
      });
      console.log("super admin created");
    } else {
      console.log("There is a super admin");
    }
  } catch (error) {
    console.error("error", error);
  }
};

exports.LoginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return res
        .status(400)
        .json({ success: false, email: "Email or password invalid" });
    }

    const matchPassword = await compare(password, admin.password);
    if (!matchPassword) {
      return res
        .status(400)
        .json({ success: false, email: "Email or password invalid" });
    }

    const token = createToken({ id: admin._id, role: "admin" });

    return res.status(200).json({ success: true, token });
  } catch (error) {
    console.error("error", error);
  }
};

exports.GetAdminByToken = async (req, res) => {
  try {
    const adminId = req.use.id;
    const admin = await AdminModel.findById(adminId);
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "admin not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "admin found", admin });
  } catch (error) {
    console.error("error", error);
  }
};
