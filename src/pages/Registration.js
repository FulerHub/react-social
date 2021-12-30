import React, {useEffect} from 'react';
import {Input, Button,Layout} from 'antd';
import {Formik} from "formik";
import * as yup from "yup";
import {Link, Navigate, useLocation} from "react-router-dom";
import {actionCreateAuth} from "../redux/reducers/authReducer";
import {useDispatch, useSelector} from "react-redux";
const { Content } = Layout;
const Registration = () => {
    useEffect(() => {
        document.title = `Registration`;
    },[]);
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.authReducer.isAuth);
    const errorCode = useSelector(state => state.authReducer.errorCode);
    const errorMessage = useSelector(state => state.authReducer.errorMessage);
    let location = useLocation();
    if (isAuth) {
        return <Navigate to="/" state={{ from: location }} />;
    }
    const FormSubmit = (values)=>{
        dispatch(actionCreateAuth(values.login,values.password,values.email))
    }
    const valSchema = yup.object().shape({
        login: yup.string().typeError('Это поле принимает только текст').required('Это поле обязательное').min(3,'Поле должно состоять не менее чем из 3 символов'),
        email: yup.string().email('Неправильный email').required('Это поле обязательное').min(3,'Поле должно состоять не менее чем из 3 символов'),
        password: yup.string().typeError('Это поле принимает только текст').required('Это поле обязательное').min(6,'Поле должно состоять не менее чем из 6 символов'),
        second_password: yup.string().oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
    })
    return (
        <Content
            className="site-layout-background"
            style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
            }}
        >
            <div className="login-form">
                <h1>Регистрация</h1>
                <Formik
                    initialValues={{
                        email:'',
                        login:'',
                        password: '',
                        second_password: ''
                    }}
                    validationSchema={valSchema}
                    validateOnBlur
                    onSubmit={(values) => FormSubmit(values)}
                >
                    {({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, isSubmitting}) => (
                        <form onSubmit={handleSubmit}>
                            <div className={errors.login ? touched.login : errorCode && 'ant-form-item-has-error'}>
                                <Input onChange={handleChange} onBlur={handleBlur} value={values.login} name="login" size="large" placeholder="Login" /><br/>
                                {errors.login && touched.login && <p style={{color:"#ff0000"}}>{errors.login}</p> }
                            </div>
                            <div className={errors.email ? touched.email : errorCode && 'ant-form-item-has-error'}>
                                <Input onChange={handleChange} onBlur={handleBlur} value={values.email} name="email" size="large" placeholder="Email" /><br/>
                                {errors.email && touched.email && <p style={{color:"#ff0000"}}>{errors.email}</p> }
                            </div>
                            <div className={errors.password ? touched.password : errorCode && 'ant-form-item-has-error'}>
                                <Input.Password onChange={handleChange} onBlur={handleBlur} value={values.password} name="password" size="large" placeholder="Password" /><br/>
                                {errors.password && touched.password && <p style={{color:"#ff0000"}}>{errors.password}</p> }
                            </div>
                            <div className={errors.second_password ? touched.second_password : errorCode && 'ant-form-item-has-error'}>
                                <Input.Password onChange={handleChange} onBlur={handleBlur} value={values.second_password} name="second_password" size="large" placeholder="Second Password" /><br/>
                                {errors.second_password && touched.second_password && <p style={{color:"#ff0000"}}>{errors.second_password}</p> }
                            </div>
                            <div>
                                {errorMessage && <p style={{color:"#ff0000"}}>{errorMessage}</p> }
                                <Button htmlType="submit" type="primary" >Зарегистрироваться</Button>
                                <Link to="/login">Войти в аккаунт</Link>
                            </div>

                        </form>
                    )}
                </Formik>
            </div>
        </Content>
    );
};

export default Registration;