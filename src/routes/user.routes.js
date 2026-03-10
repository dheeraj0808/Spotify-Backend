const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");

router.get(
  "/profile",
  auth,
  role("user","artist","admin"),
  (req,res)=>{
     res.json({message:"User profile"})
  }
);

module.exports = router;