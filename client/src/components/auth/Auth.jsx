import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { fileDeleter, fileUploader } from '../../utils/uploadHandler.js';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signIn, signUp, signInGoogle } from '../../actions/auth.js';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from '../../config/firebase.config.js';

const Auth = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const [isSignUp, setIsSignUp] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(watch("profilePhoto"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

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
  

  const onSubmit = async (formData) => {
    setIsSubmit(true);
    if (isSignUp)
      dispatch(signUp(formData, navigate));
    else
      dispatch(signIn(formData, navigate));
  };

  const login = async () => {
    try {
        setIsSubmit(true);
        const userCred = await signInWithPopup(firebaseAuth, provider);
        const user = userCred?.user;
        const token = userCred?.user?.accessToken;
        // console.log(user);
        const updatedForm = {
          email: user.email,
          username: user.displayName,
          profilePhoto: user.photoURL,
        };
        dispatch(signInGoogle(updatedForm, navigate));
    } catch (error) {
        console.log(error);
    } finally {
      setIsSubmit(false);
    }
};

  return (
    <main className='mx-auto flex max-w-3xl flex-col justify-start md:w-1/2 max-md:w-full'>
      <div className="flex flex-1 items-center">
        <form className="flex flex-1 flex-col items-stretch" onSubmit={handleSubmit(onSubmit)}>
          <p className="text-primary-500 text-heading2-bold mb-6">{isSignUp ? 'Sign In to muSic' : 'Login to muSic'}</p>
          {isSignUp && <div className="flex flex-row m-3 gap-4 items-center">
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
          </div>}
          <div className="flex flex-col items-start m-3 gap-4">
          <p className='text-light-1'>Email : </p>
            <input
              placeholder="email"
              type="email"
              className="text-input"
              {...register("email", { required: true })}
            />
            {errors.email && <span className="form-error">This field is required</span>}
          </div>
          {isSignUp && <div className="flex flex-col items-start m-3 gap-4">
            <p className='text-light-1'>Username : </p>
            <input
              placeholder="username"
              className="text-input"
              {...register("username", { required: true })}
            />
            {errors.username && <span className="form-error">This field is required</span>}
          </div>}
          <div className="flex flex-col items-start m-3 gap-4">
            <p className='text-light-1'>Password : </p>
            <input
              placeholder="password"
              type="password"
              className="text-input"
              {...register("password", { required: true })}
            />
            {errors.password && <span className="form-error">This field is required</span>}
          </div>
          {isSignUp && <div className="flex flex-col items-start m-3 gap-4">
            <p className='text-light-1'>Confirm Password : </p>
            <input
              placeholder="confirm password"
              type="password"
              className="text-input"
              {...register("confirmpassword", { required: true })}
            />
            {errors.confirmpassword && <span className="form-error">This field is required</span>}
          </div>}
          <button type="submit" disabled={isUploading || isSubmit} className="form-button bg-blue-500 text-white p-2 rounded">{isSubmit ? ('Please wait ...') : (isSignUp ? 'Sign Up' : 'Login')}</button>
          {/* {!isSignUp && <button type="submit" disabled={isUploading} className="form-button bg-blue-500 text-white p-2 rounded">Login</button>} */}
        </form>
      </div>
        <button className='form-button p-2 items-center justify-evenly flex' onClick={login} disabled={isUploading || isSubmit}><img src='/assets/google.svg' className='h-4 w-4'/></button>
        {!isSignUp && <p className='text-primary-500 underline mt-5 cursor-pointer' onClick={() => setIsSignUp(true)}>Don't have an account? Sign Up</p>}
        {isSignUp && <p className='text-primary-500 underline mt-5 cursor-pointer' onClick={() => setIsSignUp(false)}>Already registered? Login</p>}

    </main>
  );
};

export default Auth;
