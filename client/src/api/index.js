import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:2000'});

API.interceptors.request.use(
    (req) => {
        const user = localStorage.getItem('profile');
        if (user) {
            const parsedUser = JSON.parse(user);
            req.headers.Authorization = `Bearer ${parsedUser.token}`;
        }
        return req;
    },
    (error) => {
        return Promise.reject(error);
    }
)


export const signUp = (formData) => API.post('/user/signup', formData);
export const signIn = (formData) => API.post('/user/signin', formData);
export const signInGoogle = (formData) => API.post('/user/signin/google', formData);
export const updateProfile = (formData) => API.post('/user/updateProfile', formData);
export const getUser = (_id) => API.get(`/user/${_id}/getUser`);


export const uploadSong = (formData) => API.post('/songs/upload', formData);
export const createPlaylist = (formData) => API.post('/songs/createPlaylist', formData);

export const fetchAllSongs = (page) => API.get(`/songs/all?page=${page}`);
export const fetchTopSongs = (page) => API.get(`/songs/top?page=${page}`);
export const fetchSearch = (query) => API.get(`/songs/search?q=${query}`)
export const fetchLikedSongs = (_id, page) => API.get(`/songs/${_id}/liked?page=${page}`);
export const fetchUploadedSongs = (_id, page) => API.get(`/songs/${_id}/uploaded?page=${page}`);
export const fetchPlaylist = (_id, page) => API.get(`/songs/${_id}/playlist?page=${page}`);

export const likeSong = (_id) => API.patch(`/songs/${_id}/like`);
export const addHistory = (_id) => API.patch(`/songs/${_id}/addHistory`);
export const getHistory = (_id) => API.get(`/songs/${_id}/getHistory`);


export const deleteSong = (_id) => API.delete(`/songs/${_id}/deleteSong`);
export const deletePlaylist = (_id) => API.delete(`/songs/${_id}/deletePlaylist`);