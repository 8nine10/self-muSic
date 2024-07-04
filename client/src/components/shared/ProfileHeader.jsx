import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../actions/auth';

const ProfileHeader = ({ _id = null, admin = false }) => {
    const [loading, setLoading] = useState(_id ? true : false);
    const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')));

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (_id) {
                const userProfile = await getUser(_id);
                setProfile(userProfile);
                setLoading(false);
            }
        };
        fetchUserProfile();
    }, [_id]);

    if (loading) {
        return <p className='text-light-1'>Loading...</p>; // Show loading indicator while fetching data
    }
    return (
        <div className='flex w-full flex-col justify-start md:ml-11'>
            <div className='flex items-center justify-between md:w-4/5'>
                <div className='flex items-center gap-3'>
                    <img
                        src={profile?.user?.imgURL || "/assets/user.svg"}
                        alt="Profile"
                        className="rounded-full bg-dark-2 p-2 object-contain md:w-40 md:h-40 max-md:w-20 max-md:h-20"
                    />
                    <p className='text-light-1 md:text-heading2-bold max-md:text-heading3-bold'>@{profile?.user?.username}</p>
                </div>
                {admin && (
                    <Link to='/profile/edit'>
                        <div className='flex cursor-pointer gap-3 rounded-md bg-dark-3 px-4 py-2'>
                            <img
                                src='/assets/edit.svg'
                                alt='edit'
                                width={16}
                                height={16}
                            />
                            <p className="text-light-2 max-sm:hidden">Edit</p>
                        </div>
                    </Link>
                )}
            </div>
            {admin && (
                <div className='flex items-center justify-end max-md:gap-1 md:gap-10 md:w-4/5 max-md:mt-5'>
                    <Link to='uploadSong'>
                        <div className='flex flex-row mx-3'>
                            <img 
                                src='/assets/create.svg'
                                alt='upload song' 
                                width={20}
                                height={20}
                            />
                            <img 
                                src='/assets/music.svg'
                                alt='upload song' 
                                width={20}
                                height={20}
                            />
                        </div>
                    </Link>
                    <Link to='createPlaylist'>
                        <div className='flex flex-row mx-3'>
                            <img 
                                src='/assets/create.svg'
                                alt='create playlist' 
                                width={20}
                                height={20}
                            />
                            <img 
                                src='/assets/playlist.svg'
                                alt='create playlist' 
                                width={20}
                                height={20}
                            />
                        </div>
                    </Link>
                    <Link to='likedSongs'>
                        <p className='text-primary-500 underline'>My Likes</p>
                    </Link>
                    <Link to='uploadedSong'>
                        <p className='text-primary-500 underline'>My Uploads</p>
                    </Link>
                    <Link to='createdPlaylist'>
                        <p className='text-primary-500 underline'>My Playlist</p>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default ProfileHeader;
