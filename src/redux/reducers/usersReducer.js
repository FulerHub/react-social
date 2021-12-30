import {UsersAPI} from "../../api/UsersAPI/api";
import {message} from "antd";

const defaultState = {
    isLoading: true,
    users:[],
    totalCount: 0,
}

export const USERS_LOAD = "USERS_LOAD";
export const LOAD_USER = "LOAD_USER";
export const SET_TOTAL_COUNT_USERS = "SET_TOTAL_COUNT_USERS";
export const USERS_LOADING = "USERS_LOADING";

export default function usersReducer(state = defaultState, action) {
    switch(action.type) {
        case USERS_LOAD:
            return {...state, users: action.payload}
        case LOAD_USER:
            if(!state.users.filter(item => item.id === action.payload.id)[0]) return {...state, users: [...state.users, action.payload]}
            break;
        case SET_TOTAL_COUNT_USERS:
            return {...state, totalCount: action.payload}
        case USERS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        default:
    }
    return state
}
export const actions ={
    loading: (payload) => ({type: USERS_LOADING, payload}),
    loadUsers: (payload) =>({type: USERS_LOAD, payload}),
    setTotalCount: (payload) =>({type: SET_TOTAL_COUNT_USERS, payload}),
    loadUser: (payload) =>({type: LOAD_USER, payload}),

};


export const actionSearchUsers = (name)=> async dispatch =>{
    try {
        const response = await UsersAPI.searchUsers(name);
        dispatch(actions.loadUsers(response))
    }
    catch (e) {
        
    }

}
export const actionGetUser = (userid) => async dispatch =>{
        dispatch(actions.loading(true))
        const response = await UsersAPI.getUser(userid);
        dispatch(actions.loadUser(response));
        dispatch(actions.loading(false))
}
export const actionGetSelectUser = (users) => async dispatch =>{
    dispatch(actions.loading(true))
    try {
        if(users) {
            const response = await UsersAPI.getPostsUsers(users);
            await dispatch(actions.loadUsers(response));
        }
    }
    catch (e) {
    }
    dispatch(actions.loading(false))

}

export const actionGetUsers = (page) => async dispatch =>{
    dispatch(actions.loading(true))
    try {
        const response = await UsersAPI.getUsers(page);
        const response1 = await dispatch(actions.loadUsers(response.users))
        const response2 = await dispatch(actions.setTotalCount(response.totalCount))
    }
    catch (e) {
        message.error({content: 'Возникла ошибка!', duration: 2});
    }

    dispatch(actions.loading(false))
}

