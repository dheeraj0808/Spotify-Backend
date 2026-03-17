const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

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
            email: email.toLowerCase(),
            password: hashedPassword
        });

        const userData = user.toJSON();
        delete userData.password;

        res.status(201).json({
            message: "User registered successfully",
            user: userData
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
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
            where: { email: email.toLowerCase() }
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
            { id: user.id, role: user.role, },
            process.env.JWT_SECRET,
            { expiresIn: "1d" },

        );

        const userData = user.toJSON();
        delete userData.password;

        res.status(200).json({
            message: "Login successful",
            token,
            user: userData
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

const forgetPassword = async (req, res) => {
  try {
    // 1. Get email from user
    const { email } = req.body;

    // Validate email exists
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // 2. Find user in database
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 3. Generate OTP
    const otp = generateOtp();

    // 4. Set OTP expiry time (10 minutes from now)
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    // 5. Save OTP to database
    await user.update({
      otp: otp,
      otpExpiry: otpExpiry,
      isOtpVerified: false
    });

    // 6. For now, just log the OTP (later you'll send email)
    console.log(`OTP for ${email}: ${otp}`);

    // 7. Send success response
    res.json({ 
      message: "OTP sent to your email",
      // FOR TESTING ONLY - Remove in production!
      // otp: otp  
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check OTP
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Incorrect OTP!" });
    }

    // Check expiry
    if (new Date() > user.otpExpiry) {
      return res.status(400).json({ message: "OTP has expired! Request new OTP" });
    }

    // Mark as verified
    await user.update({ isOtpVerified: true });

    res.json({ message: "OTP verified! Now you can reset your password" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ message: "Email and new password are required" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if OTP was verified
    if (!user.isOtpVerified) {
      return res.status(400).json({ message: "Please verify OTP first!" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear OTP fields
    await user.update({
      password: hashedPassword,
      otp: null,
      otpExpiry: null,
      isOtpVerified: false
    });

    res.json({ message: "Password reset successfully! You can now login" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
    registerUser,
    loginUser,
    forgetPassword,
    verifyOtp,
    resetPassword
};