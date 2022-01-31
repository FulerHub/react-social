import {AuthAPI} from "../../api/AuthAPI/api";
import {message} from "antd";

const defaultState = {
    id: '',
    nickname: '',
    isAuth: false,
    token: '',
    email: '',
    first_name: '',
    last_name: '',
    roles: [],
    img: [],
    status: '',
    phone: '',
    errorCode: 0,
    errorMessage: '',
    isSending: false
}

export const SET_DATA = "SET_DATA";
export const UPDATE_DATA = "UPDATE_DATA";
export const SET_AUTH_ERROR = "SET_AUTH_ERROR";
export const SET_AUTH_LOADING = "SET_AUTH_LOADING";

export default function authReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_DATA:
            return {
                ...state,
                isAuth: action.payload.isAuth,
                id: action.payload.id,
                nickname: action.payload.nickname,
                email: action.payload.email,
                first_name: action.payload.first_name,
                last_name: action.payload.last_name,
                roles: action.payload.roles,
                img: action.payload.img,
                status: action.payload.status,
                phone: action.payload.phone,
                closePage: action.payload.closePage
            }
        case UPDATE_DATA:
            return {
                ...state,
                email: action.payload.email,
                first_name: action.payload.first_name,
                last_name: action.payload.last_name,
                status: action.payload.status,
                phone: action.payload.phone,
                closePage: action.payload.close
            }
        case SET_AUTH_ERROR:
            return {
                ...state,
                errorCode: action.payload.errorCode,
                errorMessage: action.payload.errorMessage
            }
        case SET_AUTH_LOADING:
            return {
                ...state,
                isSending: action.payload,
            }
        default:
    }
    return state
}

export const actionAuth = () => async dispatch => {
    if (localStorage.getItem('token')) {
        let data = await AuthAPI.checkToken()
        if (data?.statusCode === 200) {
            let response = await AuthAPI.getAuthData();
            let {id, nickname, email, roles, avatar_urls, acf} = response;
            const dataUser = {
                isAuth: true,
                id: id,
                nickname: nickname,
                email: email,
                first_name: acf.first_name,
                last_name: acf.last_name,
                roles: roles,
                img: avatar_urls,
                status: acf.status,
                phone: acf.phone,
                closePage: acf.close,
                errorCode: 0,
                errorMessage: ''
            }
            dispatch(setAuthData(dataUser))
        } else {
            dispatch(actionLogout());
        }
    }


}
export const actionLogin = (login, password) => async dispatch => {
    message.loading({content: 'Authorization...', key: 'Login'});
    try {
        const response = await AuthAPI.getAuth(login, password);
        if (response.success) {
            message.success({content: 'Success!', key: 'Login', duration: 2});
            localStorage.setItem('token', response.data.token)
            let data = await AuthAPI.getAuthData();
            let {id, nickname, email, roles, avatar_urls, acf} = data;
            const dataUser = {
                isAuth: true,
                id: id,
                nickname: nickname,
                email: email,
                first_name: acf.first_name,
                last_name: acf.last_name,
                roles: roles,
                img: avatar_urls,
                status: acf.status,
                phone: acf.phone,
                closePage: acf.close,
                errorCode: 0,
                errorMessage: ''
            }
            dispatch(setAuthData(dataUser))
        } else {
            message.error({content: 'Authorisation Error!', key: 'Login', duration: 2});
            dispatch(setAuthError({errorCode: response.data.statusCode, errorMessage: response.data.message}))
        }

    } catch (e) {
        message.error({content: 'Authorisation Error!', key: 'Login', duration: 2});
    }


}
export const actionUpdateAuth = (user) => async dispatch => {
    message.loading({content: 'Update...', key: 'Update'});
    dispatch(setAuthLoading(true));
    await AuthAPI.updateAuthData(user);
    dispatch(updateAuthData(user))
    message.success({content: 'Settings updated!', key: 'Update', duration: 2});
    dispatch(setAuthLoading(false));


}
export const actionAuthPassword = (password) => async dispatch => {
    message.loading({content: 'Update...', key: 'Password'});
    dispatch(setAuthLoading(true));
    await AuthAPI.updateAuthPassword(password);
    message.success({content: 'Password changed successfully!', key: 'Password', duration: 2});
    dispatch(setAuthLoading(false));
}
export const actionCreateAuth = (login, password, email) => async dispatch => {
    message.loading({content: 'Creating...', key: 'Password'});
    try {
        const res = await AuthAPI.createAuth(login, password, email);
        message.success("Account created successfully, now you can login")

        //dispatch(actionLogin(login, password))
    } catch (e) {

    }
}
export const actionLogout = () => dispatch => {
    localStorage.removeItem('token')
    const dataUser = {
        isAuth: false,
        id: '',
        nickname: '',
        email: '',
        first_name: '',
        last_name: '',
        roles: '',
        img: '',
        status: '',
        phone: '',
        error: ''
    }
    dispatch(setAuthData(dataUser))
}
export const setAuthData = payload => ({type: SET_DATA, payload})
export const updateAuthData = payload => ({type: UPDATE_DATA, payload})
export const setAuthError = payload => ({type: SET_AUTH_ERROR, payload})
export const setAuthLoading = payload => ({type: SET_AUTH_LOADING, payload})
