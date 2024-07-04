import React, { useEffect, useState } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { likeSong } from '../../actions/song';
import { Link } from 'react-router-dom';


const MusicPlayer = () => {
  const dispatch = useDispatch();
  const profile = JSON.parse(localStorage.getItem('profile'));
  const [down, setDown] = useState(true);
  const downUp = () => {
    if (down) setDown(false);
    else setDown(true);
  }
  const { songPlaying } = useSelector((state) => state.song);
  const [isLiked, setIsLiked] = useState(songPlaying?.likes?.includes(profile?.user?._id));

  useEffect(() => {
    setIsLiked(songPlaying?.likes?.includes(profile?.user?._id));
  }, [songPlaying])

  const handleLike = () => {
    if (profile) {
      if (isLiked) {
        setIsLiked(false);
      } else {
        setIsLiked(true);
      }
      dispatch(likeSong(songPlaying._id));
    }
  };
  return (
    <section className="player">
        <>
          <div className={down ? "flex flex-row items-center justify-start w-full gap-3" : "flex flex-col"}>
              {down ? (<img
                src={songPlaying?.coverImgURL || "/muSic.svg"} // Placeholder image
                alt="cover"
                className="md:h-24 md:w-24 h-12 w-12 object-cover"
              />) : (<>
                <div className="flex w-full items-center justify-evenly my-5">
                  <img
                    src="/assets/download.svg" // Placeholder image
                    alt="cover"
                    className="h-6 w-6 object-cover"
                  />
                  <img
                    src={songPlaying?.coverImgURL || "/muSic.svg"}
                    alt="cover"
                    className="h-48 w-48 object-cover"
                  />
                  <img
                    src={isLiked ? "/assets/heart-filled.svg" : "/assets/heart.svg"} // Placeholder image
                    alt="cover"
                    className="h-6 w-6 object-cover"
                    onClick={handleLike}
                  />
                </div>
                <div className='flex flex-col w-full items-center justify-center gap-2'>
                  <p className='text-light-1 text-heading3-bold'>{songPlaying?.songName}</p>
                  <p className='text-light-1'>{songPlaying?.tag}</p>
                  <Link to={`/users?user=${songPlaying?.artist._id}`}>
                    <p className='text-light-1 text-heading4-medium'>@{songPlaying?.artist.username}</p>
                  </Link>
                </div>
              </>)}
              <div className='w-full'>
                <AudioPlayer
                  autoPlay
                  src={songPlaying?.songURL}
                />
              </div>
            </div>
          {songPlaying && <img
            src="/assets/up.svg"
            alt="Up"
            className={`absolute top-4 right-4 h-4 w-4 transform ${down ? 'rotate-90' : '-rotate-90'} cursor-pointer`}
            onClick={downUp}
          />}
        </>
    </section>
  );
};

export default MusicPlayer;
