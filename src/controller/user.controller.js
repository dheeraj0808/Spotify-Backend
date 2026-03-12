const User = require("../model/user.model");

const getProfile = async (req,res)=>{

 const user = await User.findByPk(req.user.id,{
   attributes:{exclude:["password"]}
 });

 res.json(user);
}

const getAllUsers = async (req,res)=>{

 if(req.user.role !== "admin"){
   return res.json({message:"Access denied"});
 }

 const users = await User.findAll({
   attributes:{exclude:["password"]}
 });

 res.json(users);
}

async 

module.exports = {
 getProfile,
 getAllUsers
}