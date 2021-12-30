import {connect} from 'react-redux';
import Posts from "./Posts";
import {actionGetProfile} from "../../redux/reducers/profileReducer";
import {actionGetSelectUser} from "../../redux/reducers/usersReducer";



function mapStateToProps(state) {
    return {
        isLoadingInfo: state.profileReducer.isLoadingInfo,
        isLoading: state.profileReducer.isLoading,
        profile: state.profileReducer.profile,
        categories: state.categoryReducer.categories,
        posts: state.profileReducer.posts
    };
}

function mapDispatchToProps(dispatch) {
    return {

        LoadSelectUsers(users){
            dispatch(actionGetSelectUser(users));
        },
        LoadPosts(userID){
            dispatch(actionGetProfile(userID));
        },
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Posts);