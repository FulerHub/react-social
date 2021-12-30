import {connect} from "react-redux";
import CategoryList from "./CategoryList";
import {actionGetCategories} from "../../redux/reducers/categoryReducer";

function mapStateToProps(state) {
    return {
        myID: state.authReducer.id,
        categories: state.categoryReducer.categories
    }
}
function mapDispatchToProps(dispatch) {
    return {
        LoadCategories(userID){
            dispatch(actionGetCategories(userID))
        }

    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CategoryList);