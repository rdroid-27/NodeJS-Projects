const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

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
      return res.status(500).send({
        message: "User already exists!",
      });
    }
    // hash password
    const salt = bcrypt.genSaltSync(10);
    const hashPass = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      userName,
      email,
      password:hashPass,
      phone,
      address,
      userType,
    });

    if (user) {
      res.status(201).send({
        success: true,
        message: "User Registered Successfully!",
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

const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validate all fields
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Enter email and password both!",
      });
    }

    // find user
    const user = await userModel.findOne({email});
    const isMatch= await bcrypt.compare(password, user.password);

    if (!isMatch || !user) {
      res.status(404).send({
        success: false,
        message: "Invalid Credentials!",
      });
    }
    user.password= undefined;
    
    // create token
    let token = JWT.sign({ _id : user._id }, process.env.JWT_SECRET ,{ expiresIn: '10d'});
    res.status(200).send({
      success: true,
      message: "User Login Successful!",
      token,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error Logging in!",
      error,
    });
  }
};

module.exports = { registerUserController, loginUserController };
