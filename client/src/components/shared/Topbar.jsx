import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LOGOUT } from '../../constants/actionTypes';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
const Topbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')));
  const logout = () => {
    dispatch({ type: LOGOUT });
    setProfile(null);
    navigate('/');
  }

  useEffect(() => {
    const token = profile?.token;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
    setProfile(JSON.parse(localStorage.getItem('profile')));
  }, [ location, profile?.token ]);

  return (
    <nav className='topbar'>
        <Link to='/'>
          <h5 className='logo'>muSic</h5>
        </Link>
        <div className='flex gap-3 items-center justify-center'>
          <img
            src={profile?.user?.imgURL || "/assets/user.svg"} // Placeholder image
            width={40}
            height={40}
            alt="Profile"
            className="rounded-full object-contain bg-dark-1 p-2"
            onClick={() => navigate('/profile')}
          />
          {!profile && <Link to='/sign-in'>
            <p className='cursor-pointer underline text-light-1'>Login</p>
          </Link>}
          {profile && <img src='/assets/logout.svg' className='h-6 w-6' onClick={logout} />}
        </div>
    </nav>
  )
}

export default Topbar