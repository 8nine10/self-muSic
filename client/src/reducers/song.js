import { ADD_SONG_TO_PLAYLIST, DELETE_PLAYLIST, DELETE_SONG, FETCH_ALL_SONG, FETCH_LIKED_SONGS, FETCH_PLAYLIST, FETCH_SEARCH, FETCH_TOP_SONGS, FETCH_UPLOADED_SONGS, LIKE_SONG, PLAY_SONG, REMOVE_SONG_TO_PLAYLIST, UPLOAD_SONG } from "../constants/actionTypes"

const initialState = {
    songs: {
        list: [],
        isNext: false,
    },
    songPlaying: null,
    likedSongs: {
        list: [],
        isNext: false,
    },
    uploadedSongs: {
        list: [],
        isNext: false,
    },
    playlists: {
        list: [],
        isNext: false,
    },
    topSongs: {
        list: [],
        isNext: false,
    },
    searchResults: {
        songs: [],
        users: [],
        playlists: [],
    },
    createPlaylist: [],
}

const songReducer = ( state = initialState, action) => {
    switch(action.type) {
        case UPLOAD_SONG:
            return { ...state,
                songs: { 
                    ...state.songs,
                    list: [
                        ...state.songs.list,
                        action.data,
                    ]
                }
            };
        case FETCH_ALL_SONG:
            return {
                ...state, songs: {
                    list: action.data.songs,
                    isNext: action.data.isNext,
                },
            };
        case PLAY_SONG:
            return {
                ...state, songPlaying: action.data,
            };
        case LIKE_SONG:
            return {
                ...state, songs: {
                    list: state.songs.list.map((song) => song._id === action.data._id ? action.data : song)
                }
            };
        case FETCH_LIKED_SONGS:
            return {
                ...state, likedSongs: {
                    list: action.data.likedSongs,
                    isNext: action.data.isNext,
                },
            };
        case FETCH_TOP_SONGS:
            return {
                ...state, topSongs: {
                    list: action.data.sortedSongs,
                    isNext: action.data.isNext,
                },
            };
        case FETCH_UPLOADED_SONGS:
            return {
                ...state, uploadedSongs: {
                    list: action.data.uploadedSongs,
                    isNext: action.data.isNext,
                },
            };
        case FETCH_PLAYLIST:
            return {
                ...state, playlists: {
                    list: action.data.playlists,
                    isNext: action.data.isNext,
                },
            }; 
        case FETCH_SEARCH:
            return {
                ...state, searchResults: action.data
            };
        case ADD_SONG_TO_PLAYLIST:
            return {
                ...state, createPlaylist: [
                    ...state.createPlaylist, action.data
                ]
            };
        case REMOVE_SONG_TO_PLAYLIST:
            return {
                ...state,
                createPlaylist: state.createPlaylist.filter(song => song._id !== action.data)
            };
        case DELETE_SONG:
            return {
                ...state,
                songs: {
                    ...state.songs,
                    list: state.songs.list.filter(song => song._id !== action.data)
                }
            };
        case DELETE_PLAYLIST:
            return {
                ...state,
                playlists: {
                    ...state.playlists,
                    list: state.playlists.list.filter(playlist => playlist._id !== action.data)
                }
            };
        default:
            return state;
    }
}

export default songReducer