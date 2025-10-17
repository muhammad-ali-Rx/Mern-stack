import User from "../Model/User.mjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { username, email, password, profilePicture, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      profilePicture,
      role,
    });

    await newUser.save();

    console.log("New User", newUser);
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password, profilePicture, role } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (username) user.username = username;
    if (email) user.email = email;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    if (profilePicture) user.profilePicture = profilePicture;
    if (role) user.role = role;

    await user.save();
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }

    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Step 1: Check if user exists
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.status(404).json({ message: "User Not Found" });
    }

    // Step 2: Check password
    const checkPassword = bcrypt.compareSync(password, checkUser.password);
    if (!checkPassword) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    // Step 3: Generate token
    const GenerateToken = jwt.sign(
      { id: checkUser._id, email: checkUser.email },process.env.JWT_SECRET,
      { expiresIn: "1h" });

    // Step 4: Success response
    res.status(200).json({message: "Login Successful",oken: token,user:{
        id: checkUser._id,
        email: checkUser.email,
        name: checkUser.name,
      },
    });

  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};