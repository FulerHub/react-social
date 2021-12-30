import {connect} from "react-redux";

import Profile from "../../pages/Profile";
import {compose} from "redux";

let mapStateToProps = (state,props) => {
    return ({
        myID: state.authReducer.id,

    })
}
function mapDispatchToProps(dispatch) {
    return {

    };
}

export default compose(connect(mapStateToProps,mapDispatchToProps)(Profile)) ;