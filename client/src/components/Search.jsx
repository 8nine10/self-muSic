import React from 'react'
import { useSelector } from 'react-redux'
import Searchbar from '../components/shared/Searchbar'
import SongTile2 from '../components/shared/SongTile2';
import PlaylistCard from './shared/PlaylistCard';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const navigate = useNavigate();
  const { searchResults } = useSelector((state) => state.song);

  return (
    <div className='mb-20'>
      <Searchbar />
      <div className='flex flex-col flex-1 items-start justify-center w-full gap-3'>
        <div className='flex flex-1 flex-col items-start gap-4 w-full'>
          {searchResults?.songs?.length > 0 && <p className='text-base-regular text-light-2'>Songs :</p>}
          {searchResults?.songs?.length > 0 && (searchResults?.songs?.map((song) => {
              return(
                  <SongTile2
                      key={song._id}
                      song={song}
                  />
              )
          }))}
        </div>
        <div className='flex flex-1 flex-col items-start gap-4 w-full'>
          {searchResults?.playlists?.length > 0 && <p className='text-base-regular text-light-2'>Playlists :</p>}
          {searchResults?.playlists?.length > 0 && (searchResults?.playlists?.map((playlist, index) => {
              return(
                <PlaylistCard key={index} playlist={playlist} />
              )
          }))}
        </div>
        <div className='flex flex-1 flex-col items-start gap-4 w-full'>
          {searchResults?.users?.length > 0 && <p className='text-base-regular text-light-2'>users :</p>}
          {searchResults?.users?.length > 0 && (searchResults?.users?.map((user, index) => {
              return(
                <div key={index} className='flex items-center gap-5' onClick={() => navigate(`/users?user=${user._id}`)}>
                  <img
                    src={user?.imgURL || "/assets/user.svg"} // Placeholder image
                    width={80}
                    height={80}
                    alt="Profile"
                    className="rounded-full object-contain bg-dark-1 p-2"
                  />
                  <p className='text-light-1 text-base-regular'>@{user?.username}</p>
                </div>
              )
          }))}
        </div>
      </div>
    </div>
  )
}

export default Search