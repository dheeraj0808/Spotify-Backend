const User = require("../models/user.model");

async function registerUser(req, res) {
    const { username,email, password, role="user" } = req.body;
    const isUserAlreadyExist = await User.findOne(
        username,
        email,
        password,
        role
    );
    
    
}

module.exports = { registerUser };