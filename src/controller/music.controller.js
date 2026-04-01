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

async function getAllMusic(req, res) {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    if (!req.user || req.user.role !== "user") {
        return res.status(403).json({ message: "Only admin and artists can fetch all music" });
    }
    const music = await Music.findAll({ offset: skip, limit: limit });
    res.status(200).json({
        message: "Music fetched successfully",
        music,
    });
}

async function getMusicByName   (req, res) {
    const { name } = req.params;
    const music = await Music.findAll({ where: { title: name } });
    if (!music || music.length === 0) {
        return res.status(404).json({ message: "Music not found" });
    }
    res.status(200).json({
        message: "Music fetched successfully",
        music,
    });
}

async function updateMusic(req, res) {
    if(!req.user) {
        return res.status(403).json({ message: "Only artists and admin can update music" });
    }
    const { id } = req.params;
    const { title } = req.body;
    let music = await Music.findByPk(id);
    if (!music) {
        return res.status(404).json({ message: "Music not found" });
    }
    await music.update({ title });
    res.status(200).json({
        message: "Music updated successfully",
        music,
    });
}

async function deleteMusic(req, res) {
    if(!req.user) {
        return res.status(403).json({ message: "Only artists and admin can delete music" });
    }
    const { id } = req.params;
    const music = await Music.findByPk(id);
    if (!music) {
        return res.status(404).json({ message: "Music not found" });
    }
    await music.destroy();
    res.status(200).json({
        message: "Music deleted successfully",
        music,
    });
}


module.exports = {
    createMusic,
    getAllMusic,
    getMusicByName,
    updateMusic,
    deleteMusic
};
