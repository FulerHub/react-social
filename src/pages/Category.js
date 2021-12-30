import React, {useEffect} from 'react';
import {Layout} from "antd";
import CategoryListContainer from "../components/Category/CategoryListContainer";

const {Content} = Layout;
const Category = () => {
    useEffect(() => {
        document.title = `Categories`;
    });
    return (
        <Content
            className="site-layout-background"
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
            }}
        >
            <h1>Category</h1>
            <CategoryListContainer/>
        </Content>
    );
};

export default Category;