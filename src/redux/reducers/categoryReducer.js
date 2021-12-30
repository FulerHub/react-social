import {CategoryAPI} from "../../api/CategoryAPI/api";
import {message} from "antd";

const defaultState = {
    categories: []
}


export const LOAD_CATEGORIES = "LOAD_CATEGORIES";
export const CREATE_CATEGORY = "CREATE_CATEGORY";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const DELETE_CATEGORY = "DELETE_CATEGORY";

export default function categoryReducer(state = defaultState, action) {
    switch(action.type) {
        case DELETE_CATEGORY:
            return {...state, categories: state.categories.filter(item => item.id !== action.payload)}
        case UPDATE_CATEGORY:
            return {...state, categories: state.categories.map(item => item.id === action.payload ? {...item, text:'sadasdas123'} : item)}

        case CREATE_CATEGORY:
            return {...state, categories: [action.payload,...state.categories]}
        case LOAD_CATEGORIES:
            return {...state, categories:  action.payload}
        default:
    }
    return state
}

export const actions ={
    addCategory: payload => ({type: CREATE_CATEGORY, payload}),
    deleteCategory:  payload => ({type: DELETE_CATEGORY, payload}),
    updateCategory:  payload => ({type: UPDATE_CATEGORY, payload:{id: payload.id,name: payload.name,description: payload.desc,color: payload.color}}),
    loadCategories: payload =>({type: LOAD_CATEGORIES, payload})
}

export const actionGetCategories = (userID)=> async dispatch =>{
    const response = await CategoryAPI.getCategoryUser(userID);
    dispatch(actions.loadCategories(response))
}
export const actionAddCategory = (name,desc,color,authorID)=> async dispatch =>{
    message.loading({ content: 'Добавляю...', key: 'addCategory' });
    try {
        const response = await CategoryAPI.addCategory(name,desc,color,authorID);
        dispatch(actions.addCategory(response))
        message.success({ content: 'Успешно добавлен!', key: 'addCategory', duration: 2 });
    }
    catch (e) {
        message.error({ content: 'Ошибка! Немогу добавить', key: 'addCategory', duration: 2 });
    }

}
export const actionUpdateCategory = (categoryID,name,desc,color,authorID)=> async dispatch =>{
    message.loading({ content: 'Update...', key: 'UpdateCategory' });
    try {
        await CategoryAPI.updateCategory(categoryID,name,desc,color,authorID);
        dispatch(actions.updateCategory({id: categoryID,name: name,desc: desc,color: color}))
        message.success({ content: 'Изменения успешно приняты!', key: 'UpdateCategory', duration: 2 });
    }
    catch (e) {
        message.error({ content: 'Ошибка! Немогу изменить', key: 'UpdateCategory', duration: 2 });
    }

}
export const actionDeleteCategory = (categoryID)=> async dispatch =>{
    message.loading({ content: 'Удаляю...', key: 'deleteCategory' });
    try {
        await CategoryAPI.deleteCategory(categoryID);
        dispatch(actions.deleteCategory(categoryID))
        message.success({ content: 'Успешно удален!', key: 'deleteCategory' });
    }
    catch (e) {
        message.error({ content: 'Ошибка! Немогу удалить', key: 'deleteCategory' });
    }

}
