const User = require("../models/user.model");

async function registerUser(req, res) {
    const { username,email, password, role="user" } = req.body;
    const isUserAlreadyExist = await User.findOne({
       $or:[{username},{email}]
    });
    if(isUserAlreadyExist){
        return res.status(400).json({message:"User already exists"});
    }
    const hash = await bcrypt.hash(password,10);
    //here  10 is a salt value
    //ye thoda na attacker ko delay karta hai 
    const user = await User.create({
        username,
        email,
        password:hash,
        role
    });
    const token = jwt.sign({
        id:user._id,
        role:user.role
    },process.env.JWT_SECRET,{expiresIn:"1d"});
    
}

module.exports = { registerUser };