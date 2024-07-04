import mongoose, { Schema, mongo } from 'mongoose';

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    imgURL: {
        type: String,
    },
    likedSongs: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Song'
        }
    ],
    history: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Song'
        }
    ],
    uploadedSongs: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Song'
        }
    ],
    playlists: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Playlist'
        }
    ],
},
{
    timestamps: true,
})

const User = mongoose.model('User', userSchema);

export default User;