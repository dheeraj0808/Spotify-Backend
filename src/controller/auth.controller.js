const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;
        

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const existingUser = await User.findOne({
           where: { email: email.toLowerCase() }
        });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const { password: pwd, ...userData } = user.toJSON();

        res.status(201).json({
            message: "User registered successfully",
            user: userData
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        const { password: pwd, ...userData } = user.toJSON();

        res.status(200).json({
            message: "Login successful",
            token,
            user: userData
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser
};