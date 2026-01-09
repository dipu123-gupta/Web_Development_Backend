const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
    logoutUser,
    getAllUser,
    getProfile,
    updateUser,
    deleteUser,
} = require("../Controller/userController");

const authMiddleware = require("../middleWare/userMiddleWare");

// PUBLIC
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

// USER
router.get("/profile",authMiddleware, getProfile);

// ADMIN
router.get("/allUser",getAllUser);

router.delete("/deleteUser",authMiddleware,deleteUser
);

router.put("/updateUser", authMiddleware, updateUser);

module.exports = router;
