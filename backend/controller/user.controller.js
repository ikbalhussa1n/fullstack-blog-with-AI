import { User } from "../models/users.model.js";

export const register = async (req, res) => {
  console.log("register here");

  const { name, email, password } = req.body;

  console.log(
    " name : ",
    name,
    " email ",
    email,
    " password  : ",
    password,
    " ",
  );

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const newUser = new User({ name, email, password });

    await newUser.save();

    return res.status(200).json({ message: "User registration sucessfull" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Fail to create User!" });
  }
};
