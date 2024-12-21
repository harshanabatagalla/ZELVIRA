import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//generate a token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

//Route for user login
const userLoginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        //checking user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        //comparing password
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = createToken(user._id);
            return res.json({ success: true, token });
        }
        else {
            return res.json({ success: false, message: "Invalid credentials" });
        }

    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

//Route for user registration
const userRegisterController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //checking user already exists
        const user = await userModel.findOne({ email });
        if (user) {
            return res.json({ success: false, message: "User already exists" });
        }

        //validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "please enter valid email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "password must be 8 characters long or more" });
        }

        //hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //creating new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });
        const savedUser = await newUser.save();

        const token = createToken(savedUser._id);
        res.json({ success: true, token });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

//Route for admin login
const adminLoginController = async (req, res) => {
}

export { userLoginController, userRegisterController, adminLoginController };