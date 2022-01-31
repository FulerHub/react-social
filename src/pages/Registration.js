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
        login: yup.string().typeError('This field only accepts text').required('This field is required').min(3,'The field must be at least 3 characters long'),
        email: yup.string().email('Wrong email').required('This field is required').min(3,'The field must be at least 3 characters long'),
        password: yup.string().typeError('This field only accepts text').required('This field is required').min(6,'The field must be at least 6 characters long'),
        second_password: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
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
                <h1>Sign up</h1>
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
                                <Button htmlType="submit" type="primary" >Sign up</Button>
                                <Link to="/login">Sign in</Link>
                            </div>

                        </form>
                    )}
                </Formik>
            </div>
        </Content>
    );
};

export default Registration;