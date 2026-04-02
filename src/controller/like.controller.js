const Like = require("../model/like.model");

async function likeMusic(req, res) {
    try {
        const { musicId } = req.body;
        const userId = req.user.id; // Get from authenticated user
        const like = await Like.create({ userId, musicId });
        res.status(201).json(like);
    } catch (error) {
        res.status(500).json({ error: "Failed to like music", message: error.message });
    }
}

async function unlikeMusic(req, res) {
    try {
        const { musicId } = req.body;
        const userId = req.user.id; // Get from authenticated user
        await Like.destroy({ where: { userId, musicId } });
        res.status(200).json({ message: "Music unliked successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to unlike music", message: error.message });
    }
}

async function getLikedMusic(req, res) {
    try {
        const { userId } = req.params;
        const likedMusic = await Like.findAll({ where: { userId } });
        res.status(200).json(likedMusic);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve liked music" });
    }
}

module.exports = { likeMusic, unlikeMusic, getLikedMusic };    

