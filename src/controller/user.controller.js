const User = require("../model/user.model");
const bcrypt = require("bcrypt");

const getProfile = async (req, res) => {

  const user = await User.findByPk(req.user.id, {
    attributes: { exclude: ["password"] }
  });

  res.json(user);
}

const getAllUsers = async (req, res) => {

  if (req.user.role !== "admin") {
    return res.json({ message: "Access denied" });
  }

  const users = await User.findAll({
    attributes: { exclude: ["password"] }
  });

  res.json(users);
}

const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const userId = req.user.id;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }
      user.email = email;
    }

    if (name) {
      user.name = name;
    }

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

const changePassword = async (req, res) => {

  try {

    const { currentPassword, newPassword } = req.body

    if (!currentPassword || !newPassword) {

      res.status(400).json({
        message: "password and current password are required"
      });

    }
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }


    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (isMatch) {
    
      if (currentPassword != newPassword) {
        let newPa = await bcrypt.hash(newPassword, 10)
        
        await User.update({ password: newPa },
          {
            where: {
              id: user.id
            }
          })
      } else {
        return res.status(401).json({ message: "current password and new password shoud be diff" });
      }
      return res.status(201).json({ message: "Password changed Successfully" });
    } else{
    return res.status(404).json({message:"You are not Authorized , Password did not matched"});
  }

  }

catch (error) {
console.log(error);
  }
}



module.exports = {
  getProfile,
  getAllUsers,
  updateProfile,
  changePassword
}