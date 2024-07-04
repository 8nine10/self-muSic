import React, { useState } from 'react'
import SongTile2 from './SongTile2'
import { deletePlaylist } from '../../actions/song';
import { useDispatch } from 'react-redux';


const PlaylistCard = ({ playlist, admin=false }) => {
    const [down, setDown] = useState(true);
    const dispatch = useDispatch();
    const downUp = () => {
        if (down) setDown(false);
        else setDown(true);
    }
    const handleDelete = (e) => {
        e.stopPropagation();
        dispatch(deletePlaylist(playlist._id));
    }
    return (
        <div className='flex flex-col felx-1 items-start justify-center w-full  bg-dark-3 rounded-lg'>
            <div className='flex flex-row flex-1 items-center justify-between w-full bg-dark-4 p-2 border border-dark-1 rounded-lg' onClick={downUp}>
                <p className='text-light-1 mb-3 text-heading4-medium'>{playlist.playlistName}</p>
                {admin && <img
                    src='/assets/delete.svg'
                    className='h-6 w-6 object-cover rounded-sm'
                    alt='delete'
                    onClick={handleDelete}
                />}
            </div>
            {!down && <div className='flex flex-1 flex-col items-center gap-4 w-full p-5'>
                {playlist.songList.length >0 ? (playlist.songList.map((song) => {
                    return(
                        <SongTile2
                                key={song._id}
                                song={song}
                        />
                    )
                })) : (
                    <h1 className='text-light-1 text-heading3-bold mb-5'>No Songs.</h1>
                )}
            </div>}
        </div>
    )
}

export default PlaylistCard