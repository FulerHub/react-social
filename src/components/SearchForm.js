import React from 'react';
import { Input } from 'antd';
import {useDispatch} from "react-redux";
import {actionSearchUsers} from "../redux/reducers/usersReducer";

const { Search } = Input;
const SearchForm = () => {
    const dispatch = useDispatch();
    const FormSubmit = (search) =>{
        dispatch(actionSearchUsers(search))
    }
    return (
        <div>
            <Search name="search" placeholder="Найти пользователя" onSearch={FormSubmit} enterButton="Search" size="large" />
        </div>
    );
};

export default SearchForm;