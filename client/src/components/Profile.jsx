import React, { useEffect, useState } from 'react'
import ProfileHeader from './shared/ProfileHeader'
import SongTile2 from '../components/shared/SongTile2'
import { getHistory } from '../actions/song';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')));
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!profile) {
      navigate('/sign-in')
    }
    const fetchData = async () => {
      if (profile?.user?._id) {
        const historyData = await getHistory(profile.user._id);
        setHistory(historyData);
        setLoading(false);
      }
    };
    fetchData();
  }, [profile?.user?._id]);

  if (loading) {
    return <p className='text-light-1'>Loading...</p>;
  }

  return (
    <section>
      <ProfileHeader admin={true} />
      <div className='mb-20'>
        <h1 className='text-light-1 text-heading3-bold mb-5'>Recents:</h1>
        <div className='flex flex-1 flex-col items-center gap-4 w-full'>
          {history?.length > 0 ? (
            history?.map((song, index) => (
              <SongTile2
                key={index}
                song={song}
              />
            ))
          ) : (
            <h1 className='text-light-1 text-heading4-regular mb-5'>No Songs.</h1>
          )}
        </div>
      </div>
    </section>
  );
}

export default Profile