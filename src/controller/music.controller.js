const Music = require("../model/music.model");
const jwt = require("jsonwebtoken");
const { uploadFile } = require("../Services/storage.service");
//this is the music controller api

async function createMusic(req, res) {
    if (!req.user || req.user.role !== "artist") {
        return res.status(403).json({ message: "Only artists can upload music" });
    }


    const { title } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ message: "No music file uploaded" });
    }

    const result = await uploadFile(file.buffer, "music");

    const music = await Music.create({
        uri: result.url,
        title: title,
        artist: req.user.id,
    });

    res.status(201).json({
        message: "Music created successfully",
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
