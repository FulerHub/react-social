import React, {useEffect} from 'react';
import {Input, Button,Layout} from 'antd';
import {Navigate, useLocation} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {actionLogin} from "../redux/reducers/authReducer";
import {Formik} from "formik";
import * as yup from "yup";
import {Link} from "react-router-dom";
const { Content } = Layout;
const Login = () => {

    const dispatch = useDispatch();
    const FormSubmit = (values)=>{
        dispatch(actionLogin(values.login,values.password))
    }
    const isAuth = useSelector(state => state.authReducer.isAuth);
    const errorCode = useSelector(state => state.authReducer.errorCode);
    const errorMessage = useSelector(state => state.authReducer.errorMessage);
    let location = useLocation();
    useEffect(() => {
        document.title = `Sign in`;
    });
    if (isAuth) {
        return <Navigate to="/" state={{ from: location }} />;
    }

    const valSchema = yup.object().shape({
        login: yup.string().typeError('Это поле принимает только текст').required('Это поле обязательное').min(3,'Поле должно состоять не менее чем из 3 символов'),
        password: yup.string().typeError('Это поле принимает только текст').required('Это поле обязательное').min(3,'Пароль должен состоять не менее чем из 6 символов'),
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
                <h1>Вход</h1>
                <Formik
                    initialValues={{
                        login:'',
                        password: ''
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
                            <div className={errors.password ? touched.password : errorCode && 'ant-form-item-has-error'}>
                                <Input.Password onChange={handleChange} onBlur={handleBlur} value={values.password} name="password" size="large" placeholder="Password" /><br/>
                                {errors.password && touched.password && <p style={{color:"#ff0000"}}>{errors.password}</p> }
                            </div>
                            <div>
                                {errorMessage && <p style={{color:"#ff0000"}}>{errorMessage}</p> }
                                <Button htmlType="submit" type="primary" >Войти</Button>
                                <Link to="/registration">Регистрация</Link>
                            </div>

                        </form>
                    )}
                </Formik>
            </div>
        </Content>

    );
};

export default Login;