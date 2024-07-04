import { Route, Routes, useLocation } from "react-router-dom"
import Bottombar from "./components/shared/Bottombar"
import Home from "./components/Home"
import Rightbar from "./components/shared/Rightbar"
import Topbar from "./components/shared/Topbar"
import Auth from "./components/auth/Auth"
import Search from "./components/Search"
import Profile from "./components/Profile"
import ProfileEdit from "./components/ProfileEdit"
import UploadSong from "./components/UploadSong"
import MusicPlayer from "./components/shared/MusicPlayer"
import LikedSong from "./components/shared/LikedSong"
import CreatePlaylist from "./components/CreatePlaylist"
import UploadedSongs from "./components/shared/UploadedSongs"
import CreatedPlaylist from "./components/shared/CreatedPlaylist"
import TopSongs from "./components/TopSongs"
import NewSongs from "./components/NewSongs"
import UserPage from "./components/shared/UserPage"


function App() {
  const { pathname } = useLocation();

  return (
      <div className="flex flex-row">
        <Topbar />
        <main className="flex flex-row w-full">
          <section className="main-container">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/top' element={<TopSongs />} />
              <Route path='/new' element={<NewSongs />} />
              <Route path='/users' element={<UserPage />} />
              <Route path='/sign-in' element={<Auth />} />
              <Route path='/search' element={<Search />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/profile/edit' element={<ProfileEdit />} />
              <Route path='/profile/uploadSong' element={<UploadSong />} />
              <Route path='/profile/createPlaylist' element={<CreatePlaylist />} />
              <Route path='/profile/likedSongs' element={<LikedSong />} />
              <Route path='/profile/uploadedSong' element={<UploadedSongs />} />
              <Route path='/profile/createdPlaylist' element={<CreatedPlaylist />} />
            </Routes>
          </section>
          {!(pathname.includes('sign-in')) && 
            <Rightbar />
          }
        </main>
        {!(pathname.includes('sign-in')) &&
          <MusicPlayer />
        }
        <Bottombar />
      </div>
  )
}

export default App
