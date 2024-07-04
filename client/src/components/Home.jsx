import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAllSongs, fetchLikedSongs, fetchTopSongs } from '../actions/song';
import SongTile from './shared/SongTile';

const Home = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Add a loading state
  const profile = JSON.parse(localStorage.getItem('profile'))
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchAllSongs(1));
      setLoading(false); // Set loading to false after fetching the data
      await dispatch(fetchTopSongs(1));
      if (profile)
        await dispatch(fetchLikedSongs(profile?.user?._id, 1));
    };
    fetchData();
  }, [dispatch]);

  const { songs, likedSongs, topSongs } = useSelector((state) => state.song);

  if (loading) {
    return <p className='text-light-1'>Loading...</p>; // Show loading indicator while fetching data
  }
  // console.log(topSongs?.sortedSongs);
  return (
    <div className='mb-20'>
      <h1 className='text-light-1 text-heading3-bold'>Welcome</h1>
      <div className='flex flex-row justify-between items-center'>
        <p className='text-light-1 text-heading4-medium mt-5'>New :</p>
        <Link to='/new'>
          <p className='text-dark-4'>MORE</p>
        </Link>
      </div>
      <div className='flex gap-5 items-center justify-start overflow-auto scrollbar-hide'>
        {songs.list && songs.list.length > 0 ? (
            songs.list.map((song) => (
              <SongTile 
                key={song._id}
                song={song}
              />
            ))
        ) : (
          <p>No songs available.</p>
        )}
      </div>
      {topSongs?.list?.length > 0 && <>
        <div className='flex flex-row justify-between items-center'>
        <p className='text-light-1 text-heading4-medium mt-5'>Top Songs :</p>
          <Link to='top'>
            <p className='text-dark-4'>MORE</p>
          </Link>
        </div>
        <div className='flex gap-5 items-center justify-start overflow-auto scrollbar-hide'>
          {topSongs.list && topSongs.list.length > 0 ? (
              topSongs.list.map((song) => (
                <SongTile 
                  key={song._id}
                  song={song}
                />
              ))
          ) : (
            <p>No songs available.</p>
          )}
        </div>
      </>}
      {likedSongs?.list?.length > 0 && <>
        <div className='flex flex-row justify-between items-center'>
          <p className='text-light-1 text-heading4-medium mt-5'>Your Likes :</p>
          <Link to='/profile/likedSongs'>
            <p className='text-dark-4'>MORE</p>
          </Link>
        </div>
        <div className='flex gap-5 items-center justify-start overflow-auto scrollbar-hide'>
          {likedSongs.list && likedSongs.list.length > 0 ? (
              likedSongs.list.map((song) => (
                <SongTile 
                  key={song._id}
                  song={song}
                />
              ))
          ) : (
            <p>No songs available.</p>
          )}
        </div>
      </>}
    </div>
  );
};

export default Home;
