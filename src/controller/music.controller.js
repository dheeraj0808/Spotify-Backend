const Music = require("../model/music.model");
const jwt = require("jsonwebtoken");
const { uploadFile } = require("../Services/storage.service");
//this is the music controller api

async function createMusic(req, res) {


    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }


    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== "artist") {
            return res.status(401).json({ message: "Unauthorized" });
        }
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }


    const { title } = req.body;
    const { file } = req.body;

    const result = await uploadFile(file, "music");

    const music = await Music.create({
        uri: result.url,
        title: title,
        artist: decoded.id,
    });

    res.status(201).json({ 
        message: "Music created successfully" ,
music: {
        id: music.id,
        title: music.title,
        uri: music.uri,
        artist: music.artist,
        createdAt: music.createdAt,
        updatedAt: music.updatedAt,
    }
    });
}


module.exports = {
    createMusic
};
