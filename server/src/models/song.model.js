import mongoose, { Schema } from 'mongoose';

const songSchema = mongoose.Schema({
    songName: {
        type: String,
        required: true,
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    tag: {
        type: String,
        required: true,
    },
    coverImgURL: {
        type: String,
    },
    songURL: {
        type: String,
        required: true,
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: true,
        }
    ],
},
{
    timestamps: true,
})

const Song = mongoose.model('Song', songSchema);

export default Song;