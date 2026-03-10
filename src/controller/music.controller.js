const Music = require("../model/music.model");

const createMusic = async (req, res) => {
    try {
        const { uri, title, artist, album, genre, duration, url, image, lyrics, releaseDate } = req.body;
        const music = await Music.create({
            uri,
            title,
            artist,
            album,
            genre,
            duration,
            url,
            image,
            lyrics,
            releaseDate
        });
        res.status(201).json(music);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createMusic
};
