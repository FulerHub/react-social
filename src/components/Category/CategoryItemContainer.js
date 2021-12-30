import {connect} from "react-redux";
import {actionDeleteCategory, actionUpdateCategory} from "../../redux/reducers/categoryReducer";
import CategoryItem from "./CategoryItem";

function mapStateToProps(state) {
    return {
        myID: state.authReducer.id
    }
}
function mapDispatchToProps(dispatch) {
    return {
        updateCategory(categoryID,name,desc,color,authorID){
            dispatch(actionUpdateCategory(categoryID,name,desc,color,authorID))
        },
        deleteCategory(categoryID){
            dispatch(actionDeleteCategory(categoryID))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CategoryItem);