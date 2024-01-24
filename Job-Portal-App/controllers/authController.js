import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
 
    const { name, email, password } = req.body;
    if (!name) next("Please provide name!");
    if (!email) next("Please provide email!");
    if (!password) next("Please provide password!");

    // check existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) next("Email already registered, please login!");

    const user = await userModel.create({ email, name, password });

//Token
const token= user.createJWT();

    res.status(201).send({
      success: true,
      message: "User successfully registered!",
      user:{
        name:user.name,
        lastName:user.lastName,
        email:user.email,
        location:user.location
      },
      token,
    });
};
