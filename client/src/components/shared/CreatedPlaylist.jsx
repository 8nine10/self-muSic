import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPlaylist } from '../../actions/song';
import { useLocation } from 'react-router-dom';
import PlaylistCard from './PlaylistCard';
import Pagination from './Pagination';

const CreatedPlaylist = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const page = Number(query.get('page') || 1);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const profile = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
      const fetchData = async () => {
          await dispatch(fetchPlaylist(profile?.user._id, page));
          setLoading(false);
      };
      fetchData();
  }, [dispatch, profile?.user._id, page]);

  const { playlists } = useSelector((state) => state.song);
  
  if (loading) {
      return <p className='text-light-1'>Loading...</p>;
  }
    return (
      <div className='mb-20'>
            <h1 className='text-light-1 text-heading3-bold mb-5'>Your Playlists: </h1>
            <div className='flex flex-1 flex-col items-center gap-4 w-full'>
                {playlists?.list?.length >0 ? (playlists?.list.map((playlist, index) => {
                    return(
                        <PlaylistCard key={index} playlist={playlist} admin={true} />
                    )
                })) : (
                    <h1 className='text-light-1 text-heading4-regular mb-5'>You haven't created any playlists.</h1>
                )}
            </div>
            <Pagination
                pageNumber={page}
                inNext={playlists.isNext}
            />
        </div>
    )
}

export default CreatedPlaylist