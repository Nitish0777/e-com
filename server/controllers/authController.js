import userModel from "../models/userModel.js";
import { hashPassword } from "../helpers/authHelper.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    console.log(req.body);
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "User already exists",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    const user = new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    });
    await user.save();

    res.status(201).send({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.log("Error in registering user: ", error);
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
