import { AUTH, LOGOUT, UPDATE_PROFILE } from "../constants/actionTypes";

const initialState = {
    authData: null,
};

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
            return { ...state, authData: action?.data };
        case LOGOUT:
            localStorage.clear();
            return { ...state, authData: null };
        case UPDATE_PROFILE:
            return state;
        default:
            return state;
    }
}

export default authReducer