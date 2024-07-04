import express from 'express';
import { signIn, signInGoogle, signUp, updateProfile, getUser } from '../controllers/users.js';
import auth from '../middleware/auth.js';
const router = express.Router();

router.post('/signin', signIn);
router.post('/signin/google', signInGoogle);
router.post('/signup', signUp);
router.post('/updateProfile', auth, updateProfile);
router.get('/:_id/getUser', getUser)

export default router;