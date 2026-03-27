const Playlist = require("../model/playlist.model");

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
        const playlists = await Playlist.findAll();
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
        playlist.musicId = musicId;
        await playlist.save();
        res.json(playlist);
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
        playlist.musicId = null;
        await playlist.save();
        res.json(playlist);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getPlaylistWithSongs = async (req, res) => {
    try {
        const { playlistId } = req.params;
        const playlist = await Playlist.findByPk(playlistId);
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