import mongoose, { Schema } from 'mongoose';

const playlistSchema = mongoose.Schema({
    playlistName: {
        type: String,
        required: true,
    },
    songList: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Song',
        }
    ],
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
},
{
    timestamps: true
})

const Playlist = mongoose.model('Playlist', playlistSchema);

export default Playlist;