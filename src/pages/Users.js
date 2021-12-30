import React, {useEffect, useState} from 'react';
import {Avatar, Layout, List, Pagination} from "antd";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {actionGetUsers} from "../redux/reducers/usersReducer";
import {useNavigate} from "react-router";
import Preloader from "../components/Preloader/Preloader";
import SearchForm from "../components/SearchForm";
const { Content } = Layout;

const Users = () => {
    useEffect(() => {
        document.title = `Users`;
    });
    let { pageId } = useParams();
    const [page, setPage] = useState(pageId ? pageId : 1);
    let navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(actionGetUsers(page));
    },[dispatch,page])
    const onChange = (page) =>{
        navigate("/users/"+page);
        setPage(page)
    }
    const users = useSelector(state => state.usersReducer.users);
    const totalCount = useSelector(state => state.usersReducer.totalCount);
    const isLoading = true;
    if(!isLoading) return <Preloader/>;
    return (
        <Content
            className="site-layout-background"
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
            }}
        >
            <h1>Users</h1>

            <List
                size="large"
                header={<SearchForm/>}
                bordered
                dataSource={users}
                renderItem={item => <List.Item><div className="users__img"><Avatar icon={<img src={item.avatar_urls[48]} alt=""/>} />  <Link to={"/profile/"+item.id}>{item.name}</Link></div></List.Item>}
            />
            <div className="pagination">
                Страница: {page} /  {Math.ceil(totalCount/10)}
                <Pagination defaultCurrent={page} current={page} onChange={(e)=>onChange(e)} showSizeChanger={false} hideOnSinglePage pageSize={10} total={totalCount} />
            </div>

        </Content>
    );
};

export default Users;