import React, { useEffect, useState } from 'react'
import ProfileHeader from './ProfileHeader'
import { useLocation } from 'react-router-dom';
import { fetchUploadedSongs } from '../../actions/song';
import { useDispatch, useSelector } from 'react-redux';
import SongTile2 from './SongTile2';
import Pagination from './Pagination';


const UserPage = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    const query = new URLSearchParams(location.search);
    const _id = query.get('user') || null;

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchUploadedSongs(_id, 'all'));
            setLoading(false);
        };
        fetchData();
    }, [dispatch, _id]);
    const { uploadedSongs } = useSelector((state) => state.song);
    
    if (loading) {
        return <p className='text-light-1'>Loading...</p>;
    }

    return (
        <section>
        <ProfileHeader _id={_id} />
        <div className='mb-20'>
            <h1 className='text-light-1 text-heading3-bold mb-5'>Uploaded Songs: </h1>
            <div className='flex flex-1 flex-col items-center gap-4 w-full'>
                {uploadedSongs.list.length >0 ? (uploadedSongs.list.map((song) => {
                    return(
                        <SongTile2
                            key={song._id}
                            song={song}
                        />
                    )
                })) : (
                    <h1 className='text-light-1 text-heading4-regular mb-5'>No Uploaded Songs.</h1>
                )}
            </div>
        </div>
        </section>
    )
}

export default UserPage