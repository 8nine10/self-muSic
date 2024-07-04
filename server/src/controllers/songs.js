import User from "../models/user.model.js";
import Song from "../models/song.model.js";
import Playlist from "../models/playlist.model.js";


export const uploadSong = async (req, res) => {
    const { songName, category, coverPhoto, song } = req.body;

    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found'});
        }
        const newSong = await Song.create({
            songName,
            artist: user._id,
            coverImgURL: coverPhoto,
            songURL: song,
            tag: category,
            likes: [],
        })
        await newSong.save();

        user.uploadedSongs.push(newSong._id);
        await user.save();
        const resultSong = {
            ...newSong,
            artist: user?.username,
        }
        res.status(200).json(resultSong);
        
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
}

export const createPlaylist = async (req, res) => {
    const { playlistName, songs } = req.body;

    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found'});
        }
        const newPlaylist = await Playlist.create({
            playlistName,
            creator: user._id,
            songList: songs,
        })
        await newPlaylist.save();

        user.playlists.push(newPlaylist._id);
        await user.save();

        res.status(200).json({ message : 'Success'});
        
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
}

export const fetchAllSongs = async (req, res) => {
    const { page } = req.query;
    try {
        const limit = 5;
        const skipAmount = (page - 1) * limit;

        const songsQuery = Song.find()
            .sort({ createdAt: -1 })
            .skip(skipAmount)
            .limit(limit)
            .populate({
                path: 'artist',
                model: User,
                select: 'username',
            })
        const songs = await songsQuery.exec();
        // console.log(songs);
        const totalSongs = await Song.countDocuments();
        const isNext = totalSongs > skipAmount + songs.length;
        res.status(200).json({ songs, isNext });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
}

export const fetchTopSongs = async (req, res) => {
    const { page } = req.query;
    try {
        const limit = 5;
        const skipAmount = (page - 1) * limit;
        const songsQuery = Song.find()
            .skip(skipAmount)
            .limit(limit)
            .populate({
                path: 'artist',
                model: User,
                select: 'username',
            });
        const songs = await songsQuery.exec();
        
        // Sort songs by the length of the likes array in descending order
        const sortedSongs = songs.sort((a, b) => b.likes.length - a.likes.length);
        const totalSongs = await Song.countDocuments();
        const isNext = totalSongs > skipAmount + songs.length;
        res.status(200).json({ sortedSongs, isNext });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
}

export const fetchLikedSongs = async (req, res) => {
    const { _id } = req.params;
    const { page } = req.query;
    try {
        const limit = 5;
        const skipAmount = (page - 1) * limit;

        const user = await User.findById(_id).populate({
            path: 'likedSongs',
            model: Song,
            select: '_id songName tag coverImgURL songURL likes',
            populate: {
                path: 'artist',
                model: User,
                select: 'username',
            }
        });

        if (!user) return res.status(404).json({ message: 'User not found' });

        const likedSongs = user.likedSongs.slice(skipAmount, skipAmount + limit);

        const totalLikedSongs = user.likedSongs.length;

        const isNext = skipAmount + likedSongs.length < totalLikedSongs;

        res.status(200).json({ likedSongs, isNext });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};

export const fetchUploadedSongs = async (req, res) => {
    const { _id } = req.params;
    let { page } = req.query;
    try {
        let limit = 5;
        if (page === 'all') {
            limit = 1000;
            page=1;
        }

        const skipAmount = (page - 1) * limit;

        const user = await User.findById(_id).populate({
            path: 'uploadedSongs',
            model: Song,
            select: '_id songName tag coverImgURL songURL likes',
            populate: {
                path: 'artist',
                model: User,
                select: 'username',
            }
        });

        if (!user) return res.status(404).json({ message: 'User not found' });

        const uploadedSongs = user.uploadedSongs.slice(skipAmount, skipAmount + limit);

        const totaluploadedSongs = user.uploadedSongs.length;

        const isNext = skipAmount + uploadedSongs.length < totaluploadedSongs;

        res.status(200).json({ uploadedSongs, isNext });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};

export const fetchPlaylist = async (req, res) => {
    const { _id } = req.params;
    const { page } = req.query;
    try {
        const limit = 5;
        const skipAmount = (page - 1) * limit;

        const user = await User.findById(_id).populate({
            path: 'playlists',
            model: Playlist,
            select: '_id playlistName',
            populate: {
                path: 'creator',
                model: User,
                select: 'username',
            },
            populate: {
                path: 'songList',
                model: Song,
                select: '_id songName tag coverImgURL songURL likes',
                populate: {
                    path: 'artist',
                    model: User,
                    select: 'username',
                }
            }
        });

        if (!user) return res.status(404).json({ message: 'User not found' });

        const playlists = user.playlists.slice(skipAmount, skipAmount + limit);

        const totalplaylists = user.playlists.length;

        const isNext = skipAmount + playlists.length < totalplaylists;

        res.status(200).json({ playlists, isNext });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};

export const fetchSearch = async (req, res) => {
    const query = req.query.q;
    if (query) {
        try {
            const songs = await Song.find({
                songName: new RegExp(query, 'i')
            })
            .populate({
                path: 'artist',
                model: User,
                select: 'username',
            })

            const users = await User.find({
                username: new RegExp(query, 'i')
            })

            const playlists = await Playlist.find({
                playlistName: new RegExp(query, 'i')
            }).populate({
                path: 'creator',
                model: User,
                select: 'username',
            }).populate ({
                path: 'songList',
                model: Song,
                select: '_id songName tag coverImgURL songURL likes',
                populate: {
                    path: 'artist',
                    model: User,
                    select: 'username',
                }
            })

            res.status(200).json({ 
                songs: songs, 
                users: users, 
                playlists: playlists 
            });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error', error});
        }
    } else {
        return res.status(200).json([]);
    }
}

export const likeSong = async (req, res) => {
    const userId = req.userId;
    const { _id } = req.params;
    try {
        const user = await User.findById(userId);
        const song = await Song.findById(_id);

        if (!user || !song) {
            return res.status(404).json({ message: 'Not Found' });
        }

        const isLiked = song?.likes?.includes(userId);

        if (isLiked) {
            song.likes = song?.likes?.filter((id) => id.toString() !== userId);
            user.likedSongs = user?.likedSongs?.filter((songId) => songId.toString() !== _id);
        } else {
            song.likes.push(userId);
            user.likedSongs.push(song._id);
        }

        await user.save();
        await song.save();

        const updatedSong = await Song.findById(_id).populate({
            path: 'artist',
            model: 'User',
            select: 'username'
        });

        res.status(200).json(updatedSong);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
};

export const addHistory = async (req, res) => {
    const userId = req.userId;
    const { _id } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.history = user.history.filter(songId => songId.toString() !== _id.toString());
        
        user.history.unshift(_id);

        if (user.history.length > 15) {
            user.history = user.history.slice(0, 15);
        }

        await user.save();

        res.status(200).json({ message: 'Song added to history' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

export const getHistory = async (req, res) => {
    const { _id } = req.params;
    try {
        const user = await User.findById(_id)
        .populate({
            path: 'history',
            model: Song,
            select: '_id songName tag coverImgURL songURL likes',
            populate: {
                path: 'artist',
                model: User,
                select: 'username'
            }
        })
        if (!user) {
            return res.status(404).json({ message: 'Not found'});
        }
        res.status(200).json(user.history);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong'});
    }
}

export const deleteSong = async (req, res) => {
    const { _id } = req.params;

    try {
        const song = await Song.findById(_id);
        
        if (!song) {
            return res.status(404).json({ message: 'Song not found' });
        }

        await Song.findByIdAndDelete(_id);

        // Remove the song ID from the likedSongs, uploadedSongs, and history arrays of all users
        await User.updateMany(
            {
                $or: [
                    { likedSongs: _id },
                    { uploadedSongs: _id },
                    { history: _id },
                ]
            },
            { $pull: { 
                    likedSongs: _id,
                    uploadedSongs: _id,
                    history: _id,
                } 
            }
        );

        // Remove the song from all playlists' songList
        await Playlist.updateMany(
            { songList: _id },
            { $pull: { songList: _id } }
        );

        res.status(200).json({ message: 'Song deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
}

export const deletePlaylist = async (req, res) => {
    const { _id } = req.params;

    try {
        const playlist = await Playlist.findById(_id);
        
        if (!playlist) {
            return res.status(404).json({ message: 'Playlist not found' });
        }

        await Playlist.findByIdAndDelete(_id);

        // Remove the song ID from the likedSongs array of all users
        await User.updateMany(
            { playlists: _id },
            { $pull: { playlists: _id } }
        );

        res.status(200).json({ message: 'Song deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
}