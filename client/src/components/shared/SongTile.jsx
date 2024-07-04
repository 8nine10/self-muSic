import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { playSong, addHistory } from '../../actions/song';
import { ADD_SONG_TO_PLAYLIST, REMOVE_SONG_TO_PLAYLIST } from '../../constants/actionTypes';

const SongTile = ({ song, playlistCreate = false }) => {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')));
  const handlePlay = () => {
    if (playlistCreate === 'add') {
      dispatch({ type: ADD_SONG_TO_PLAYLIST, data: song });
    } else if (playlistCreate === 'remove') {
      dispatch({ type: REMOVE_SONG_TO_PLAYLIST, data: song._id });
    } else {
      dispatch(playSong(song));
      if (profile?.user?._id) {
        addHistory(song._id);
      }
    }
  };

  return (
    <div className='flex flex-col items-start justify-start p-2' onClick={handlePlay}>
      <div className='h-24 w-24 md:h-48 md:w-48 mb-2'>
        <img
          src={song.coverImgURL || '/muSic.svg'}
          className='h-24 w-24 md:h-48 md:w-48 object-cover rounded-sm'
          alt={`${song.songName} cover`}
        />
      </div>
      <p className='text-light-1 text-sm md:text-base font-semibold overflow-hidden text-ellipsis whitespace-nowrap w-full'>
        {song.songName}
      </p>
      <p className='text-light-1 mt-1 text-xs md:text-sm overflow-hidden text-ellipsis whitespace-nowrap w-full'>
        @{song.artist.username}
      </p>
    </div>
  );
};

export default SongTile;
