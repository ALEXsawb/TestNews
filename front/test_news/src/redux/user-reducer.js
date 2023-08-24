import {authAPI} from "../api/api";
import Cookies from 'js-cookie';

const UserState = {
    isAuth: false,
    access_token: null,
    refresh_token: null
}

const AUTHORIZED_USER = "AUTHORIZED_USER";
const ADD_ACCESS_TOKEN = "ADD_ACCESS_TOKEN";
const UNAUTHORIZED_USER = "UNAUTHORIZED_USER";
const REFRESH = "REFRESH";


const userReducer = (state = UserState, action) => {
    switch (action.type){
        case AUTHORIZED_USER: {
            return {...state, isAuth: true, access_token: action.access_token, refresh_token: action.refresh_token}
        }
        case ADD_ACCESS_TOKEN: {
            return {...state, isAuth: true, access_token: action.access_token}
        }
        case UNAUTHORIZED_USER: {
            return {...state, isAuth: false, access_token: null, refresh_token: null}
        }
        case REFRESH: {
            return {...state, isAuth: true, access_token: action.access_token}
        }
        default: {
            return state
        }

    }
}


export const authorizedUser = (access_token, refresh_token) => ({type: AUTHORIZED_USER, access_token, refresh_token})
export const addAccessToken = (access_token) => ({type: AUTHORIZED_USER, access_token})
export const refreshAC = (access_token) => ({type: REFRESH, access_token})
export const unauthorizedUser = () => ({type: UNAUTHORIZED_USER})


export const login = (username, password, refresh_token=null) => (dispatch) => {
    authAPI.login(username, password).then(response => {
            if (response.status === 200){
                dispatch(authorizedUser(response.data.access, response.data.refresh))
                Cookies.set('access_token', response.data.access, { expires: 1 });
                Cookies.set('refresh_token', response.data.refresh, { expires: 10 });
            }
            else if(response.status === 401 && refresh_token){
                dispatch(refresh(refresh_token))
            }
    })
}


export const verify = (accessToken, refreshToken) => (dispatch) => {
    authAPI.verify(accessToken).then(response => {
        if (response.status === 200){
            dispatch(authorizedUser(accessToken, refreshToken))
        }
        else if(response.status === 401 && refreshToken){
            dispatch(refresh(refreshToken))
        }
    })
}


export const refresh = (refresh_token) => (dispatch) => {
    authAPI.refresh(refresh_token).then(response => {
            alert(response.status)
            if (response.status === 200){
                Cookies.set('access_token', response.data.access, { expires: 5/24/12 });
                dispatch(refreshAC(response.data.access))
            }
            else if(response.status === 401){
                dispatch(logout())
            }
    })
}

export const logout = () => (dispatch) => {
    dispatch(unauthorizedUser())
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
}


export default userReducer;
