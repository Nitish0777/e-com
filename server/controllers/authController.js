import userModel from "../models/userModel.js";
import { hashPassword, comparePassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

//Register controller POST --- http://localhost:8080/api/v1/auth/register
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    // console.log(req.body);
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
      message: "User registered successfully",
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

//LOGIN Controller ---- POST  --- http://localhost:8080/api/v1/auth/login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(email, password);
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User does not exist",
      });
    }
    //check password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).send({
        success: false,
        message: "Incorrect Password",
      });
    }
    //generate token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    //send token in response
    res.status(200).send({
      success: true,
      message: "User logged in successfully",
      token,
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (error) {
    console.log("Error in login user: ", error);
    res.status(500).send({
      success: false,
      message: "Error in login user",
      error: error.message,
    });
  }
};

//Test Controller ---- GET  --- http://localhost:8080/api/v1/auth/test
export const testConteller = (req, res) => {
  console.log("Test controller");
  res.send("Test controller");
};
