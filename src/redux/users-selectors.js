export const selectGetUsers = (state) => state.usersReducer.users
export const selectGetUser = (state, props) => {
    return state.usersReducer.users.filter(item => item.id === props.author)[0]
}
