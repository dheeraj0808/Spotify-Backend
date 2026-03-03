const User = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

async function registerUser(req, res) {
    try {
        const { username, email, password, role, user: roleAlt } = req.body;
        const assignedRole = role || roleAlt || "user";

        const isUserAlreadyExist = await User.findOne({
            where: {
                [Op.or]: [{ username }, { email }]
            }
        });

        if (isUserAlreadyExist) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hash = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hash,
            role: assignedRole
        });

        const token = jwt.sign({
            id: user.id,
            role: user.role
        }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function loginUser(req, res) {
    try {
        const { username, email, password } = req.body;

        if (!username && !email) {
            return res.status(400).json({ message: "Username or Email is required" });
        }

        const searchCriteria = [];
        if (username) searchCriteria.push({ username });
        if (email) searchCriteria.push({ email });

        const user = await User.findOne({
            where: {
                [Op.or]: searchCriteria
            }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign({
            id: user.id,
            role: user.role
        }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.status(200).json({
            message: "User logged in successfully",
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
module.exports = { registerUser, loginUser };