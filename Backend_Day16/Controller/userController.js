const User = require("../models/userModel.js");
// import validator from './../node_modules/validator/es/index';
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const client = require("../config/redis")
const validate =require("../validation/validator.js")

// ================= REGISTER =================
const registerUser = async (req, res) => {
    try {

        validate(req.body)
        const { name, email, password } = req.body;

        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ message: "User registered", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ================= LOGIN (COOKIE SET) =================
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: user._id, name: user.name, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000,
            sameSite: "lax",
        });

        res.json({ message: "Login successful",info:user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ================= LOGOUT =================
const logoutUser = async (req, res) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            throw new Error("token not present");
        }

        const paylode = jwt.decode(token);
        console.log(paylode);

        if (!paylode || !paylode.exp) {
            throw new Error("invalid token");
        }

        await client.set(`token:${token}`, "blocked");
        await client.expireAt(`token:${token}`, paylode.exp);

        res.cookie("token", null, { expires: new Date(0) });

        res.send("Logged Out successfully");
    } catch (error) {
        res.status(400).send("Error" + error.message);
    }
};

// ================= GET ALL USERS (ADMIN) =================
const getAllUser = async (req, res) => {
    try {
        const allUser=await User.find();
        res.send(allUser)
    } catch (error) {
        res.send("Error"+error)
    }
};

// ================= GET PROFILE (ANY LOGGED USER) =================
const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// ================= UPDATE USER =================
const updateUser = async (req, res) => {
    try {
        const { id } = req.user.id;

        const updated = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.json({ message: "User updated", updated });
    } catch (error) {
        res.send("Error" + error)
    }
};

// ================= DELETE USER (ADMIN) =================
const deleteUser = async (req, res) => {
    try {
        const UserId=req.user.id;

        await User.findByIdAndDelete(UserId);
        res.json({ message: "User deleted" });
    } catch (error) {
        res.send("Error" + error)
    }
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getAllUser,
    getProfile,
    updateUser,
    deleteUser,
};
 