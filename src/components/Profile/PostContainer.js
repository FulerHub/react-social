import {connect} from "react-redux";
import Post from "./Post";
import { actionDeletePost, actionUpdatePost} from "../../redux/reducers/profileReducer";
import {selectGetUser, selectGetUsers} from "../../redux/users-selectors";

function mapStateToProps(state,props) {

    return {
        myID: state.authReducer.id,
        users: selectGetUsers(state,props),
        user: selectGetUser(state,props),
        categories: state.categoryReducer.categories,
        isLoading: state.usersReducer.isLoading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        UpdatePost(postID,text,categories) {
            dispatch(actionUpdatePost(postID,text,categories));
        },
        DeletePost(postID) {
            dispatch(actionDeletePost(postID));
        },
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Post);