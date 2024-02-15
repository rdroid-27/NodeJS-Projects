const userModel = require("../models/userModel");

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

module.exports = { getUserController, updateUserController };
