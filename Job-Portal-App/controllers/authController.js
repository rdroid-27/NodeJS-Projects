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
  const token = user.createJWT();

  res.status(201).send({
    success: true,
    message: "User successfully registered!",
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
    },
    token,
  });
};
export const loginController = async (req, res, next) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    next("Please provide all fields!");
  }
  //find user by email
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) next("Invalid credentials!");
  
  //compare password
  const isMatch = await user.comparePasswords(password);

  if (!isMatch) {
    next("Invalid credentials!");
  }
  user.password=undefined;
  const token = user.createJWT();
  res
    .status(200)
    .json({ success: true, message: "Login Successfully!", user, token });
};
