import React from 'react';
import {Layout, Menu,Avatar} from "antd";
import {IdcardOutlined,TeamOutlined,SettingOutlined,LogoutOutlined} from "@ant-design/icons";
import {Link, useLocation} from "react-router-dom";
import {actionLogout} from "../redux/reducers/authReducer";
import {useDispatch, useSelector} from "react-redux";
const { Sider } = Layout;

const Sidebar = () => {
    const isAuth = useSelector(state => state.authReducer.isAuth);
    const img = useSelector(state => state.authReducer.img);
    const login = useSelector(state => state.authReducer.nickname);
    const dispatch = useDispatch();
    const Logout = ()=>{
        dispatch(actionLogout());
    }
    const location = useLocation();
    return (
        <Sider >
            {isAuth ?
                <div className="user-side">
                    <Avatar size="large" icon={<img src={img[48]} alt=""/>} />
                    {login}
                </div>
                : ""}

            <Menu theme="dark" mode="inline" >
                <Menu.Item className={location.pathname === "/"? "ant-menu-item-selected":""} key="1" icon={<IdcardOutlined />}>
                    <Link to="/">Profile</Link>
                </Menu.Item>
                <Menu.Item className={location.pathname === "/users"? "ant-menu-item-selected":""} key="2" icon={<TeamOutlined />}>
                    <Link to="/users">Users</Link>
                </Menu.Item>
                <Menu.Item className={location.pathname === "/category"? "ant-menu-item-selected":""} key="3" icon={<TeamOutlined />}>
                    <Link to="/category">Category</Link>
                </Menu.Item>

                <Menu.Item className={location.pathname === "/settings"? "ant-menu-item-selected":""} key="4" icon={<SettingOutlined />}>
                    <Link to="/settings">Settings</Link>
                </Menu.Item>

                <Menu.Item key="5" icon={<LogoutOutlined />}>
                    {isAuth ? <Link to="/login" onClick={Logout}>Logout</Link> : <Link to="/login">Login</Link>}
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

export default Sidebar;