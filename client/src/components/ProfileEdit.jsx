import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { fileDeleter, fileUploader } from '../utils/uploadHandler.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { updateProfile } from '../actions/auth.js';
import { useDispatch } from 'react-redux';

const ProfileEdit = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')));
    const [isUploading, setIsUploading] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [profilePhotoUrl, setProfilePhotoUrl] = useState(profile?.user?.imgURL);

    useEffect(() => {
        if (profile) {
            setValue('username', profile?.user?.username);
            setValue('profilePhoto', profile?.user?.imgURL);
        } else {
            navigate('/sign-in');
        }
    }, [location]);

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            setIsUploading(true);
            const url = await fileUploader({ file, type: 'profile' });
            setValue("profilePhoto", url);
            setProfilePhotoUrl(url);
        } catch (error) {
            console.error('Error uploading file:', error);
        } finally {
            setIsUploading(false);
        }
    }

    const handleDelete = async () => {
        try {
            setIsUploading(true);
            await fileDeleter({ url: profilePhotoUrl });
            setValue("profilePhoto", null);
            setProfilePhotoUrl(null);
        } catch (error) {
            console.log(error);
        } finally {
            setIsUploading(false);
        }
    };

    const onSubmit = (formData) => {
        setIsSubmit(true);
        const updatedProfile = {
            ...profile,
            user: {
                ...profile.user,
                imgURL: formData.profilePhoto,
                username: formData.username
            }
        };
        setProfile(updatedProfile);
        localStorage.setItem('profile', JSON.stringify(updatedProfile));
        dispatch(updateProfile(formData, navigate));
        setIsSubmit(false);
    };
    return (
        <main className='mx-auto flex max-w-3xl flex-col justify-start w-4/5 max-md:w-full'>
            <div className="flex flex-1 items-center">
                <form className="flex flex-1 flex-col md:items-center max-md:items-stretch" onSubmit={handleSubmit(onSubmit)}>
                <p className="text-primary-500 text-heading2-bold mb-6">Edit Profile</p>
                <div className="flex flex-row m-3 gap-4 items-center">
                    <img
                        src={`${ isUploading ? "/assets/loading.svg" : (profilePhotoUrl || "/assets/user.svg")}`}
                        width={`${ isUploading ? 48 : 96}`}
                        height={`${ isUploading ? 48 : 96}`}
                        alt="Profile"
                        className={`rounded-full object-contain ${isUploading ? 'animate-spin' : ''}`}
                    />
                    <input
                        id="profilePhoto"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleUpload}
                        disabled={profilePhotoUrl} 
                    />
                    <label htmlFor="profilePhoto" className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded underline" onClick={profilePhotoUrl ? handleDelete : undefined}>
                        {profilePhotoUrl ? 'Remove Profile Photo' : 'Upload Profile Photo'}
                    </label>
                </div>
                <div className="flex flex-col m-3 gap-4 md:w-1/2 items-start">
                    <p className='text-light-1'>Username : </p>
                    <input
                    placeholder="username"
                    className="text-input"
                    {...register("username")}
                    />
                    {errors.username && <span className="form-error">This field is required</span>}
                </div>
                <button type="submit" disabled={isUploading || isSubmit} className="form-button bg-blue-500 text-white p-2 rounded md:w-1/3">{isSubmit ? 'Please wait...' : 'Update'}</button>
                </form>
            </div>
        </main>
    )
}

export default ProfileEdit