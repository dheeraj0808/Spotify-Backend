const Music = require("../model/music.model");
const jwt = require("jsonwebtoken");

async function createMusic(req, res) {


    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }


try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        return res.status(401).json({ message: "Unauthorized" });
    }
} catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
}

}


module.exports = {
    createMusic
};
