const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const getUserController = async (req, res) => {
  try {
    console.log(req.body.id);
    const user = await userModel.findById({ _id: req.body.id });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found!",
      });
    }

    // hide password
    user.password = undefined;

    // display user data
    res.status(200).send({
      success: true,
      message: `Welcome back ${user.userName}`,
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in getting user data!",
      error,
    });
  }
};

const updateUserController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.id });
    const { userName, address, phone } = req.body;
    if (userName) user.userName = userName;
    if (address) user.address = address;
    if (phone) user.phone = phone;
    await user.save();

    // hide password
    user.password = undefined;

    // display user data
    res.status(200).send({
      success: true,
      message: `User Updated Successfully!`,
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in updating user data!",
      error,
    });
  }
};

const updatePasswordController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.id });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found!",
      });
    }
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(401).send({
        success: false,
        message: "Enter old and New Password!",
      });
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Old Password is Wrong!",
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPass = await bcrypt.hash(newPassword, salt);
    user.password = hashPass;
    await user.save();

    // display user data
    res.status(200).send({
      success: true,
      message: `Password Updated Successfully!`,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in updating user password!",
      error,
    });
  }
};

const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(401).send({
        success: false,
        message: "Enter all fields!",
      });
    }

    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found!",
      });
    }
    // hash password
    const salt = bcrypt.genSaltSync(10);
    const hashPass = await bcrypt.hash(newPassword, salt);
    user.password = hashPass;
    await user.save();

    // display user data
    res.status(200).send({
      success: true,
      message: `Password Reset Successful!`,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in resetting user password!",
      error,
    });
  }
};

const deleteUserController = async (req, res) => {
  try {
   
   await userModel.findByIdAndDelete(req.params.id);
   res.status(200).send({
    success: true,
    message: " User Deleted Successfully!",
  });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Deleting User!",
      error,
    });
  }
};

module.exports = {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteUserController,
};
