import React from 'react';
import { Row} from "antd";

import CategoryForm from "./CategoryForm";
import CategoryItemContainer from "./CategoryItemContainer";

class CategoryList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            categories: this.props.categories,
        }

    }
    componentDidMount() {
        this.props.LoadCategories(this.props.myID);
    }


    render() {
        const catList = this.props.categories.map(item => <CategoryItemContainer key={item.id} id={item.id} name={item.name} desc={item.description} color={item.acf.color} />);
        return (
            <div >
                <CategoryForm  />
                <div className="wrap-cat">
                    <Row className="my" style={{width: '100%'}}>
                        {catList}
                    </Row>
                </div>

            </div>
        );
    }
}

export default CategoryList;