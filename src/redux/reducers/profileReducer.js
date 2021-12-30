import {PostAPI} from "../../api/PostAPI/api";
import {UsersAPI} from "../../api/UsersAPI/api";
import {message} from "antd";
import {actionGetCategories} from "./categoryReducer";

const defaultState = {
    isLoading: true,
    isLoadingInfo: true,
    isSending: false,
    profile: [],
    posts: []
}

export const LOAD_POSTS = "LOAD_POSTS";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";
export const ADD_POST = "ADD_POST";
export const PROFILE_LOADING = "PROFILE_LOADING";
export const PROFILE_INFO_LOADING = "PROFILE_INFO_LOADING";
export const LOAD_PROFILE = "LOAD_PROFILE";
export const POST_SENDING = "POST_SENDING";

export default function profileReducer(state = defaultState, action) {
    switch(action.type) {
        case DELETE_POST:
            return {...state, posts: state.posts.filter(item => item.id !== action.payload)}
        case UPDATE_POST:
            return {...state, posts:state.posts.map(item => item.id === action.payload.id ? {...item, title: {rendered: action.payload.text},categories: action.payload.categories } : item) } // return {...state, newText: action.payload}
        case ADD_POST:
            return {...state, posts: [action.payload,...state.posts]}
        case LOAD_POSTS:
            return {...state, posts: action.payload}
        case LOAD_PROFILE:
            return {...state, profile: action.payload}
        case PROFILE_LOADING:
            return { ...state, isLoading: action.payload }
        case PROFILE_INFO_LOADING:
            return { ...state, isLoadingInfo: action.payload }
        case POST_SENDING:
            return { ...state, isSending: action.payload }
        default:
    }
    return state
}

const actions = {
    loading: (payload) => ({type: PROFILE_LOADING, payload}),
    loadingInfo: (payload) => ({type: PROFILE_INFO_LOADING, payload}),
    loadPosts: (payload) => ({type: LOAD_POSTS, payload}),
    loadProfile: (payload) => ({type: LOAD_PROFILE, payload}),
    addPosts: (payload) => ({type: ADD_POST, payload}),
    deletePost: (payload) => ({type: DELETE_POST, payload}),
    updatePost:(payload) => ({type: UPDATE_POST, payload}),
    sendingPost:(payload) => ({type: POST_SENDING, payload})
}

export const actionGetProfile = (userID)=> async dispatch =>{
    dispatch(actions.loading(true))
    try{
        const response = await PostAPI.getPostsUser(userID);
        dispatch(actions.loadPosts(response))
        await dispatch(actionGetCategories(userID));
    }
    catch (e) {

    }
    dispatch(actions.loading(false))
}

export const actionGetPosts = ()=> async dispatch =>{
    const response = await PostAPI.getPosts();
    dispatch(actions.loadPosts(response))
}

export const actionAddPost = (post)=> async dispatch =>{
    message.loading({ content: 'Добавляю...', key: 'addPost' });
    try {
        dispatch(actions.sendingPost(true))
        const response = await PostAPI.addPost(post.title.rendered,post.content.rendered,post.categories,post.acf.userid);
        dispatch(actions.addPosts(response))
        dispatch(actions.sendingPost(false))
        message.success({ content: 'Успешно добавлен!', key: 'addPost', duration: 2 });
    }
    catch (e) {
        message.error({ content: 'Ошибка! Немогу добавить', key: 'addPost', duration: 2 });
    }


}

export const actionUpdatePost = (postID,text,categories)=> async dispatch =>{
    message.loading({ content: 'Update...', key: 'UpdatePost' });
    try {
        await PostAPI.updatePost(postID,text,categories);
        dispatch(actions.updatePost({id: postID,text: text,categories: categories}))
        message.success({ content: 'Изменения успешно приняты!', key: 'UpdatePost', duration: 2 });
    }
    catch (e) {
        message.error({ content: 'Ошибка! Немогу изменить', key: 'UpdatePost', duration: 2 });
    }


}

export const actionDeletePost = (postID)=> async dispatch =>{
    message.loading({ content: 'Удаляю...', key: 'deletePost' });
    try {
        await PostAPI.deletePost(postID);
        dispatch(actions.deletePost(postID))
        message.success({ content: 'Успешно удален!', key: 'deletePost' });
    }
    catch (e) {
        message.error({ content: 'Ошибка! Немогу удалить', key: 'deletePost' });
    }


}

export const actionLoadProfile = (id)=> async dispatch =>{
    message.loading({ content: 'Получаю данные...', key: 'deletePost' });
    dispatch(actions.loadingInfo(true))
    try {
        const response = await UsersAPI.getUser(id)
        await dispatch(actions.loadProfile(response))
        message.success({ content: 'Данные успешно загружены!', key: 'deletePost' });
        dispatch(actions.loadingInfo(false))
    }
    catch (e) {
        message.error({ content: 'Ошибка! Немогу загрузить', key: 'deletePost' });
    }



}

