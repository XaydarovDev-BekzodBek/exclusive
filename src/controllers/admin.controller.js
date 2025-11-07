const { compare, hash } = require("bcrypt");
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
    return res.status(500).send(error);
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
    return res.status(500).send(error);
  }
};

exports.GetAdminByToken = async (req, res) => {
  try {
    const admin = req.admin;

    return res
      .status(200)
      .json({ success: true, message: "admin found", admin });
  } catch (error) {
    console.error("error", error);
    return res.status(500).send(error);
  }
};

exports.updateAdminById = async (req, res) => {
  try {
    const adminId = req.use.id;
    const { email, password } = req.body;

    const admin = await AdminModel.findByIdAndUpdate(
      adminId,
      { email, password: await hash(password, 10) },
      { new: true }
    );

    if (!adminId) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Admin updated", admin });
  } catch (error) {
    console.error("error", error);
    return res.status(500).send(error);
  }
};

exports.deleteAdminById = async (req, res) => {
  try {
    const adminId = req.params.id;
    const admin = await AdminModel.findByIdAndDelete(adminId);

    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }

    return res.status(200).json({ success: true, message: "admin deleted" });
  } catch (error) {
    console.error("error", error);
    return res.status(500).send(error);
  }
};

exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await AdminModel.find({});

    return res
      .status(200)
      .json({ success: true, message: "list of admins", admins });
  } catch (error) {
    console.error("error", error);
    return res.status(500).send(error);
  }
};

exports.createAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const old_admin = await AdminModel.findOne({ email });

    if (old_admin) {
      return res.status(400).json({ success: false, message: "email invalid" });
    }

    const admin = await AdminModel.create({ email, password });

    return res
      .status(201)
      .json({ success: true, message: "admin created", admin });
  } catch (error) {
    console.error("error", error);
    return res.status(500).send(error);
  }
};
