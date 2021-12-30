import {actionAuth} from "./authReducer";

let initialState = {
    initialized: false
};

const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'INITIALIZED':
            return {...state, initialized: true}
        default:
            return state;
    }
}

export const actions = {
    initialized: () => ({type: 'INITIALIZED'} )
}

export const initializeApp = () => async dispatch => {
    let response = await dispatch(actionAuth());
    dispatch(actions.initialized());
}

export default appReducer;
