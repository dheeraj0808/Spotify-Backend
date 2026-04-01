const Playlist = require("../model/playlist.model");
const Music = require("../model/music.model");

const createPlaylist = async (req, res) => {
    try {
        const { name, description, image, userId } = req.body;
        const playlist = await Playlist.create({
            name,
            description,
            image,
            userId
        });
        res.status(201).json(playlist);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getPlaylists = async (req, res) => {
    try {
        const playlists = await Playlist.findAll({
            include: [{ model: Music, as: "songs", attributes: ["id", "title", "uri"] }]
        });
        res.json(playlists);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const addMusicToPlaylist = async (req, res) => {
    try {
        const { playlistId, musicId } = req.body;
        const playlist = await Playlist.findByPk(playlistId);
        if (!playlist) {
            return res.status(404).json({ message: "Playlist not found" });
        }
        const music = await Music.findByPk(musicId);
        if (!music) {
            return res.status(404).json({ message: "Music not found" });
        }
        
        // Use Sequelize generated magic method `addSong` because of our 'songs' alias
        await playlist.addSong(music);
        
        res.json({ message: "Music added to playlist successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const removeMusicFromPlaylist = async (req, res) => {
    try {
        const { playlistId, musicId } = req.body;
        const playlist = await Playlist.findByPk(playlistId);
        if (!playlist) {
            return res.status(404).json({ message: "Playlist not found" });
        }
        const music = await Music.findByPk(musicId);
        if (!music) {
            return res.status(404).json({ message: "Music not found" });
        }
        
        // Use Sequelize generated magic method `removeSong`
        await playlist.removeSong(music);
        
        res.json({ message: "Music removed from playlist successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getPlaylistWithSongs = async (req, res) => {
    try {
        const { playlistId } = req.params;
        const playlist = await Playlist.findByPk(playlistId, {
            include: [{
                model: Music,
                as: "songs",
                attributes: ["id", "title", "uri", "artist"]
            }]
        });
        if (!playlist) {
            return res.status(404).json({ message: "Playlist not found" });
        }
        res.json(playlist);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    createPlaylist,
    getPlaylists,
    addMusicToPlaylist,
    removeMusicFromPlaylist,
    getPlaylistWithSongs
};