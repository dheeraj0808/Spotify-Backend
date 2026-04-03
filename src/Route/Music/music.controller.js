const Music = require("../../model/music.model");
const jwt = require("jsonwebtoken");
const { uploadFile } = require("../../Services/storage.service");
//this is the music controller api

async function createMusic(req, res) {
    try {
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
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

async function getAllMusic(req, res) {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const { count, rows: music } = await Music.findAndCountAll({
            offset: (page - 1) * limit,
            limit: limit,
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({
            message: "Music fetched successfully",
            pagination: {
                totalFiles: count,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
                limit: limit
            },
            music,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

async function getMusicByName(req, res) {
    try {
        const { name } = req.params;
        const music = await Music.findAll({ where: { title: name } });
        if (!music || music.length === 0) {
            return res.status(404).json({ message: "Music not found" });
        }
        res.status(200).json({
            message: "Music fetched successfully",
            music,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

async function updateMusic(req, res) {
    try {
        const { id } = req.params;
        const { title } = req.body;
        let music = await Music.findByPk(id);
        if (!music) {
            return res.status(404).json({ message: "Music not found" });
        }

        // Additional ownership check: Only the actual artist or admin can update
        if (req.user.role !== 'admin' && music.artist !== req.user.id) {
            return res.status(403).json({ message: "Forbidden: You cannot modify another artist's music" });
        }

        await music.update({ title });
        res.status(200).json({
            message: "Music updated successfully",
            music,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

async function deleteMusic(req, res) {
    try {
        const { id } = req.params;
        const music = await Music.findByPk(id);
        if (!music) {
            return res.status(404).json({ message: "Music not found" });
        }

        // Ownership check
        if (req.user.role !== 'admin' && music.artist !== req.user.id) {
            return res.status(403).json({ message: "Forbidden: You cannot delete another artist's music" });
        }

        await music.destroy();
        res.status(200).json({
            message: "Music deleted successfully",
            music,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}


module.exports = {
    createMusic,
    getAllMusic,
    getMusicByName,
    updateMusic,
    deleteMusic
};
