const userModel = require("../models/userModel");

const registerUserController = async (req, res) => {
  try {
    const { userName, email, password, phone, address, userType } = req.body;

    //validate all fields
    if (!userName || !email || !password || !phone || !userType) {
      return res.status(500).send({
        success: false,
        message: "All fields are mandatory!",
      });
    }
    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.send({
        message: "User already exists!",
      });
    }

    const user = await userModel.create({
      userName,
      email,
      password,
      phone,
      address,
      userType,
    });

    if (user) {
      res.status(201).send({
        success: true,
        message: "User Created!",
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error registering user!",
      error,
    });
  }
};
