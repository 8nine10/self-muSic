import { combineReducers } from "redux";

import auth from './auth.js';
import song from './song.js';

export default combineReducers({ auth, song });