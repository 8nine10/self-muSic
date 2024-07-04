import * as api from '../api/index.js';
import { AUTH, UPDATE_PROFILE } from '../constants/actionTypes';

export const signUp = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData);
        dispatch({ type: AUTH, data });
        navigate('/')
    } catch (error) {
        console.log(error);
    }
}

export const signIn = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData);
        dispatch({ type: AUTH, data });
        navigate('/')
    } catch (error) {
        console.log(error);
    }
}

export const signInGoogle = (formData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signInGoogle(formData);
        dispatch({ type: AUTH, data });
        navigate('/')
    } catch (error) {
        console.log(error);
    }
}

export const updateProfile = (formData, navigate) => async (dispatch) => {
    try {
        await api.updateProfile(formData);
        dispatch({ type: UPDATE_PROFILE });
        navigate('/profile');
    } catch (error) {
        console.log(error);
    }
}

export const getUser = async (_id) => {
    try {
        const { data } = await api.getUser(_id);
        return data;
    } catch (error) {
        console.log(error);
    }
}