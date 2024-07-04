import * as api from '../api/index.js';
import { DELETE_PLAYLIST, DELETE_SONG, FETCH_ALL_SONG, FETCH_LIKED_SONGS, FETCH_PLAYLIST, FETCH_SEARCH, FETCH_TOP_SONGS, FETCH_UPLOADED_SONGS, LIKE_SONG, PLAY_SONG, UPLOAD_SONG } from '../constants/actionTypes.js';

export const uploadSong = (formData, navigate) => async(dispatch) => {
    try {
        const { data } = await api.uploadSong(formData);
        dispatch({ type: UPLOAD_SONG, data });
        navigate('/profile');
    } catch (error) {
        console.log(error);
    }
}

export const createPlaylistFN = (formData, navigate) => async(dispatch) => {
    try {
        await api.createPlaylist(formData);
        // dispatch({ type: UPLOAD_PLAYLIST, data });
        navigate('/profile');
    } catch (error) {
        console.log(error);
    }
}

export const fetchAllSongs = (page) => async(dispatch) => {
    try {
        const { data } = await api.fetchAllSongs(page);
        dispatch({ type: FETCH_ALL_SONG, data });
    } catch (error) {
        console.log(error);
    }
}

export const fetchTopSongs = (page) => async(dispatch) => {
    try {
        const { data } = await api.fetchTopSongs(page);
        dispatch({ type: FETCH_TOP_SONGS, data });
    } catch (error) {
        console.log(error);
    }
}

export const fetchLikedSongs = (_id, page) => async(dispatch) => {
    try {
        const { data } = await api.fetchLikedSongs(_id, page);
        dispatch({ type: FETCH_LIKED_SONGS, data });
    } catch (error) {
        console.log(error);
    }
}

export const fetchUploadedSongs = (_id, page) => async(dispatch) => {
    try {
        const { data } = await api.fetchUploadedSongs(_id, page);
        dispatch({ type: FETCH_UPLOADED_SONGS, data });
    } catch (error) {
        console.log(error);
    }
}

export const fetchPlaylist = (_id, page) => async(dispatch) => {
    try {
        const { data } = await api.fetchPlaylist(_id, page);
        dispatch({ type: FETCH_PLAYLIST, data });
    } catch (error) {
        console.log(error);
    }
}

export const fetchSearch = (query) => async(dispatch) => {
    try {
        const { data } = await api.fetchSearch(query);
        dispatch({ type: FETCH_SEARCH, data });
    } catch (error) {
        console.log(error);
    }
}

export const likeSong = (_id) => async(dispatch) => {
    try {
        const { data } = await api.likeSong(_id);
        dispatch({ type: LIKE_SONG, data });
    } catch (error) {
        console.log(error);
    }
}

export const deleteSong = (_id, navigate) => async(dispatch) => {
    try {
        await api.deleteSong(_id);
        dispatch({ type: DELETE_SONG, data: _id });
        navigate('/profile')
    } catch (error) {
        console.log(error);
    }
}

export const deletePlaylist = (_id) => async(dispatch) => {
    try {
        await api.deletePlaylist(_id);
        dispatch({ type: DELETE_PLAYLIST, data: _id });
    } catch (error) {
        console.log(error);
    }
}

export const addHistory = async (_id) => {
    try {
        await api.addHistory(_id);
    } catch (error) {
        console.log(error);
    }
}

export const getHistory = async (_id) => {
    try {
        const { data } = await api.getHistory(_id);
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const playSong = (song) => async(dispatch) => {
    try {
        dispatch({ type: PLAY_SONG, data: song })
    } catch (error) {
        console.log(error);
    }
}