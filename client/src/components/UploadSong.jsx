import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { fileDeleter, fileUploader } from '../utils/uploadHandler';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { uploadSong } from '../actions/song';


const UploadSong = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isUploading, setIsUploading] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [isAudioUploading, setIsAudioUploading] = useState(false);
    const [coverPhotoUrl, setCoverPhotoUrl] = useState(watch('coverPhoto'));
    const [audioUrl, setAudioUrl] = useState(watch('song'));


    const handleUploadCover = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            setIsUploading(true);
            const url = await fileUploader({ file, type: 'cover' });
            setValue("coverPhoto", url);
            setCoverPhotoUrl(url);
        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            setIsUploading(false);
        }
    }
    const handleUploadAudio = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            setIsAudioUploading(true);
            const url = await fileUploader({ file, type: 'audio' });
            setValue("song", url);
            setAudioUrl(url);
        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            setIsAudioUploading(false);
        }
    }
    const handleDeleteCover = async () => {
        try {
            setIsUploading(true);
            await fileDeleter({ url: coverPhotoUrl });
            setValue("coverPhoto", null);
            setCoverPhotoUrl(null);
        } catch (error) {
            console.log(error);
        } finally {
            setIsUploading(false);
        }
    };
    const handleDeleteAudio = async () => {
        try {
            setIsAudioUploading(true);
            await fileDeleter({ url: audioUrl });
            setValue("song", null);
            setAudioUrl(null);
        } catch (error) {
            console.log(error);
        } finally {
            setIsAudioUploading(false);
        }
    };

    const onSubmit = (formData) => {
        setIsSubmit(true);
        dispatch(uploadSong(formData, navigate))
    };
    
    return (
        <main className='mx-auto flex max-w-3xl flex-col justify-start w-4/5 max-md:w-full mb-40'>
            <div className="flex flex-1 items-center">
                <form className="flex flex-1 flex-col md:items-center max-md:items-stretch" onSubmit={handleSubmit(onSubmit)}>
                <p className="text-primary-500 text-heading2-bold mb-6">Upload Song</p>
                <div className="flex flex-row m-3 gap-4 items-center md:mb-11">
                    <img
                        src={`${ isUploading ? "/assets/loading.svg" : (coverPhotoUrl || "https://via.placeholder.com/96")}`}
                        // src="https://via.placeholder.com/96" // Placeholder image
                        width={`${ isUploading ? 48 : 96}`}
                        height={`${ isUploading ? 48 : 96}`}
                        alt="cover"
                        className={`rounded-square object-contain ${isUploading ? 'animate-spin' : ''}`}
                    />
                    <input
                        id="coverPhoto"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleUploadCover}
                        disabled={coverPhotoUrl}
                    />
                    <label htmlFor="coverPhoto" className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded" onClick={coverPhotoUrl ? handleDeleteCover : undefined}>
                        {coverPhotoUrl ? 'Remove Cover Photo' : 'Upload Cover Photo'}
                    </label>
                </div>
                <div className="flex flex-col m-3 gap-4 md:w-1/2 md:mt-11 items-start">
                    <p className='text-light-1'>Name : </p>
                    <input
                        placeholder="name"
                        className="text-input"
                        {...register("songName", { required: true })}
                    />
                    {errors.songName && <span className="form-error">This field is required</span>}
                </div>
                <div className="flex flex-col m-3 gap-4 md:w-1/2 items-start">
                    <p className='text-light-1'>Category : </p>
                    <select className='text-input' {...register("category")}>
                        <option value="pop">Pop</option>
                        <option value="rock">Rock</option>
                        <option value="jazz">Jazz</option>
                        <option value="hiphop">Hip Hop</option>
                        <option value="opera">Opera</option>
                        <option value="other">Other</option>
                    </select>
                    {errors.category && <span className="form-error">This field is required</span>}
                </div>
                <div className="flex flex-row m-3 gap-4 md:w-1/2 md:mt-11 items-start">
                    <p className='text-light-1'>Song : </p>
                    {!audioUrl && <img
                        src={`${ isAudioUploading ? "/assets/loading.svg" : "/assets/music.svg"}`}
                        // src="https://via.placeholder.com/96" // Placeholder image
                        width={24}
                        height={24}
                        alt="cover"
                        className={`rounded-square object-contain ${isAudioUploading ? 'animate-spin' : ''}`}
                    />}
                    <input
                        id="audio"
                        placeholder="Song"
                        type='file'
                        accept='audio/*'
                        className='hidden'
                        onChange={handleUploadAudio}
                        disabled={audioUrl}
                    />
                    <label htmlFor="audio" className="cursor-pointer bg-blue-500 text-white rounded" onClick={audioUrl ? handleDeleteAudio : undefined}>
                        {audioUrl ? 'Remove audio' : 'Upload audio'}
                    </label>
                </div>
                <button type="submit" disabled={isAudioUploading || isUploading || isSubmit} className="form-button bg-blue-500 text-white p-2 rounded md:w-1/3">{isSubmit ? 'Please wait...' : 'Upload'}</button>
                </form>
            </div>
        </main>
    )
}

export default UploadSong