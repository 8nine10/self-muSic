import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SongTile2 from '../components/shared/SongTile2';
import { useLocation } from 'react-router-dom';
import Pagination from '../components/shared/Pagination';
import { fetchAllSongs } from '../actions/song';


const NewSongs = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const page = Number(query.get('page') || 1);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            await dispatch(fetchAllSongs(page));
            setLoading(false);
        };
        fetchData();
    }, [dispatch, page]);

    const { songs } = useSelector((state) => state.song);
    
    if (loading) {
        return <p className='text-light-1'>Loading...</p>;
    }
    return (
        <div className='mb-20'>
            <h1 className='text-light-1 text-heading3-bold mb-5'>New Songs: </h1>
            <div className='flex flex-1 flex-col items-center gap-4 w-full'>
                {songs.list.length >0 ? (songs.list.map((song) => {
                    return(
                        <SongTile2
                            key={song._id}
                            song={song}
                        />
                    )
                })) : (
                    <h1 className='text-light-1 text-heading4-regular mb-5'>No Songs.</h1>
                )}
            </div>
            <Pagination
                pageNumber={page}
                isNext={songs.isNext}
            />
        </div>
    )
}

export default NewSongs