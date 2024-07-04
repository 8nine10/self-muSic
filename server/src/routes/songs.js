import express from 'express';
import auth from '../middleware/auth.js';
import { fetchTopSongs, getHistory, deleteSong, deletePlaylist, fetchUploadedSongs, fetchPlaylist, createPlaylist, fetchSearch, fetchAllSongs, uploadSong, likeSong, fetchLikedSongs, addHistory } from '../controllers/songs.js';

const router = express.Router();

router.post('/upload', auth, uploadSong);
router.post('/createPlaylist', auth, createPlaylist);

router.get('/all', fetchAllSongs);
router.get('/top', fetchTopSongs);
router.get('/:_id/uploaded', fetchUploadedSongs);
router.get('/:_id/playlist', fetchPlaylist);
router.get('/:_id/liked', fetchLikedSongs);
router.get('/search', fetchSearch);

router.patch('/:_id/like', auth, likeSong);
router.patch('/:_id/addHistory', auth, addHistory);
router.get('/:_id/getHistory', getHistory);

router.delete('/:_id/deleteSong', auth, deleteSong)
router.delete('/:_id/deletePlaylist', auth, deletePlaylist)

export default router;