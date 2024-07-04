import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteSong, playSong, addHistory } from '../../actions/song';
import { useNavigate } from 'react-router-dom';
import { fileDeleter } from '../../utils/uploadHandler';
const SongTile2 = ({ song, admin=false }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')));
    const [isSubmit, setIsSubmit] = useState(false);
    const handlePlay = () => {
        dispatch(playSong(song));
        if (profile?.user?._id) {
            addHistory(song._id);
        }
    }
    const handleDelete = async (e) => {
        e.stopPropagation();
        try {
            setIsSubmit(true)
            if (song.coverImgURL)
                await fileDeleter({ url: song.coverImgURL });
            await fileDeleter({ url: song.songURL });
            dispatch(deleteSong(song._id, navigate));
        } catch (error) {
            console.log(error);
        } finally{
            setIsSubmit(false);
        }
    }
    return (
        <div className='w-full flex flex-row flex-1 items-center justify-start gap-5' onClick={handlePlay}>
            <div className='h-20 w-20 md:h-24 md:w-24'>
                <img
                    src={song.coverImgURL || '/muSic.svg'}
                    className='h-20 w-20 md:h-24 md:w-24 object-cover rounded-sm'
                    alt={`${song.songName} cover`}
                />
            </div>
            <div className='flex flex-row items-center justify-around w-3/4'>
                <div className='flex flex-col'>
                    <p className='text-light-1'>{song.songName}</p>
                    <p className='text-light-1'>@{song.artist.username}</p>
                </div>
                <p className='text-light-1'>{song.tag}</p>
                {admin && (isSubmit ? (
                    <p className='text-light-1'>Please Wait</p>
                ) : (<img
                    src='/assets/delete.svg'
                    className='h-6 w-6 object-cover rounded-sm'
                    alt={`${song.songName} cover`}
                    onClick={handleDelete}
                />))}
            </div>
        </div>
    );
};

export default SongTile2;
