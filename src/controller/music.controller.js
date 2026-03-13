const Music = require("../model/music.model");
const jwt = require("jsonwebtoken");
//this is the music controller api

async function createMusic(req, res) {


    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }


try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "artist") {
        return res.status(401).json({ message: "Unauthorized" });
    }
} catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
}
const {title,artist,uri} = req.body;    
if(!title || !artist || !uri){
    return res.status(400).json({ message: "All fields are required" });
}
    

}


module.exports = {
    createMusic
};
