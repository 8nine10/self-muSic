import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import Searchbar from '../components/shared/Searchbar';
import SongTile from '../components/shared/SongTile';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPlaylistFN } from '../actions/song';

const CreatePlaylist = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        control
    } = useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'songs'
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isSubmit, setIsSubmit] = useState(false);
    const { searchResults, createPlaylist } = useSelector((state) => state.song);
    
    const onSubmit = (formData) => {
        // console.log(formData);
        setIsSubmit(true);
        dispatch(createPlaylistFN(formData, navigate));
    };
    
    useEffect(() => {
        const songIdList = createPlaylist.map((song) => song._id);
        setValue('songs', songIdList || []);
    }, [createPlaylist, setValue]);

    return (
        <main className='mx-auto flex max-w-3xl flex-col justify-start w-4/5 max-md:w-full mb-40 '>
            <div className="flex flex-1 items-center">
                <form className="flex flex-1 flex-col md:items-center max-md:items-stretch" onSubmit={handleSubmit(onSubmit)}>
                    <p className="text-primary-500 text-heading2-bold mb-6">Create Playlist</p>
                    <div className="flex flex-col m-3 gap-4 md:w-1/2 md:mt-11 items-start">
                        <p className='text-light-1'>Name : </p>
                        <input
                            placeholder="name"
                            className="text-input"
                            {...register("playlistName", { required: true })}
                        />
                        {errors.playlistName && <span className="form-error">This field is required</span>}
                    </div>
                    <div className="flex flex-col m-3 gap-4 md:w-1/2 items-start">
                        <p className='text-light-1'>Selected Songs : </p>
                        {createPlaylist.length > 0 && <div className='flex flex-col h-52 gap-5 items-center justify-start overflow-auto scrollbar-hide'>
                            {createPlaylist.length > 0 ? (
                                createPlaylist.map((field, index) => (
                                    <SongTile
                                        key={index}
                                        song={field}
                                        playlistCreate={'remove'}
                                    />
                                ))
                            ) : (
                                <p className='text-light-1'>No songs added.</p>
                            )}
                        </div>}
                    </div>
                    <div className="flex flex-col m-3 gap-4 md:w-1/2 items-start">
                        <p className='text-light-1'>Select Songs : </p>
                        <Searchbar />
                        {searchResults?.songs?.length > 0 && <div className='flex flex-col h-52 gap-5 items-center justify-start overflow-auto scrollbar-hide'>
                            {searchResults?.songs && searchResults?.songs.length > 0 ? (
                                searchResults.songs.map((song) => (
                                    <SongTile
                                        key={song._id}
                                        song={song}
                                        playlistCreate={'add'}
                                    />
                                ))
                            ) : (
                                <p>No songs available.</p>
                            )}
                        </div>}
                    </div>
                    <button type="submit" disabled={isSubmit} className="form-button bg-blue-500 text-white p-2 rounded md:w-1/3">{isSubmit ? 'Please wait...' : 'Create'}</button>
                </form>
            </div>
        </main>
    );
};

export default CreatePlaylist;
