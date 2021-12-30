import {connect} from "react-redux";

import Settings from "../pages/Settings";
import {actionAuthPassword, actionUpdateAuth} from "../redux/reducers/authReducer";

function mapStateToProps(state) {
    return {
        user: state.authReducer,
        isSending: state.authReducer.isSending
    }
}
function mapDispatchToProps(dispatch) {
    return {
        UpdateMe(user){
            dispatch(actionUpdateAuth(user))
        },
        ChangePassword(password){
            dispatch(actionAuthPassword(password))
        }

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Settings);