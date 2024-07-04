import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLikedSongs, playSong } from '../../actions/song';
import SongTile2 from './SongTile2';
import { useLocation } from 'react-router-dom';
import Pagination from './Pagination';


const LikedSong = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const page = Number(query.get('page') || 1);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const profile = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchLikedSongs(profile?.user._id, page));
            setLoading(false);
        };
        fetchData();
    }, [dispatch, profile?.user._id, page]);

    const { likedSongs } = useSelector((state) => state.song);
    
    if (loading) {
        return <p className='text-light-1'>Loading...</p>;
    }
    return (
        <div className='mb-20'>
            <h1 className='text-light-1 text-heading3-bold mb-5'>Liked Songs: </h1>
            <div className='flex flex-1 flex-col items-center gap-4 w-full'>
                {likedSongs.list.length >0 ? (likedSongs.list.map((song) => {
                    return(
                        <SongTile2
                            key={song._id}
                            song={song}
                        />
                    )
                })) : (
                    <h1 className='text-light-1 text-heading4-regular mb-5'>No Liked Songs.</h1>
                )}
            </div>
            <Pagination
                pageNumber={page}
                isNext={likedSongs.isNext}
            />
        </div>
    )
}

export default LikedSong