import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import categoryReducer from "./reducers/categoryReducer";
import authReducer from "./reducers/authReducer";

import appReducer from "./reducers/appReducer";
import profileReducer from "./reducers/profileReducer";
import usersReducer from "./reducers/usersReducer";





const rootReducer = combineReducers({
    categoryReducer: categoryReducer,
    authReducer: authReducer,
    usersReducer: usersReducer,
    profileReducer: profileReducer,
    appReducer: appReducer,

})

export const store = createStore(rootReducer, applyMiddleware(thunk)) //composeWithDevTools


