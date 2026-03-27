import { User } from "../models/user-model.js";
import getToken from "../utils/getToken.js";

export const signUp = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).send("Registration successfull.");
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong!");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(404).send("Email and password is required!");
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      res.status(404).send("User with this email does not exist!");
    }

    if (email === user.email && password === user.password) {
      const token = getToken(user);

      return res
        .status(200)
        .cookie("token", token, { httpOnly: true })
        .send("User logged in successfully");
    }

    return res.status(401).send("Unauthorized user");
  } catch (error) {
    console.log("Error in Login:", error);
    res.status(500).send("Something went wrong!");
  }
};
