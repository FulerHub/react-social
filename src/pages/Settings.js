import React, {useEffect, useState} from 'react';
import {Button, Input, Layout, Upload, message, Switch} from "antd";
import {Formik} from "formik";
import * as yup from "yup";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
const { Content } = Layout;



const Settings = (props) => {
    useEffect(() => {
        document.title = `Settings`;
    });
    const valSchema = yup.object().shape({
        first_name: yup.string().typeError('This field only accepts text').required('This field is required').min(3,'The field must be at least 3 characters long'),
        last_name: yup.string().typeError().required('This field is required').min(3,'The field must be at least 3 characters long'),
        email: yup.string().typeError().required('This field is required').min(3,'The field must be at least 3 characters long'),
        status: yup.string().typeError().min(3,'The field must be at least 3 characters long'),
        phone: yup.string().typeError().min(3,'The field must be at least 3 characters long'),
        close: yup.boolean().typeError().required('This field is required'),

    })
    const valSchema2 = yup.object().shape({
        password: yup.string().required('This field is required').min(6, 'The field must be at least 6 characters long').matches(/[a-zA-Z]/, 'Пароль может содержать только латинские буквы.'),
        second_password: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')

    })

    const FormSubmit=(values)=>{
        props.UpdateMe(values)
    }
    const FormPasswordSubmit=(values)=>{
        props.ChangePassword(values.password)
    }

    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    function beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    const handleChange1 = info => {
        console.log(info)
        if (info.file.status === 'uploading') {
            setLoading(true)
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, imageUrl =>{
                    setimageUrl(imageUrl);
                    setLoading(false)
            });
        }
    };
    const [loading, setLoading] = useState(false);
    const [imageUrl, setimageUrl] = useState();
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    return (
        <>
            <Content
                className="site-layout-background"
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                }}
            >
                <h1>Settings</h1>
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={true}
                    action="http://localhost:3000/"
                    beforeUpload={beforeUpload}
                    onChange={handleChange1}
                >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
                <Formik
                    initialValues={{
                        img:'',
                        first_name: props.user.first_name,
                        last_name: props.user.last_name,
                        email: props.user.email,
                        status: props.user.status,
                        phone: props.user.phone,
                        close : props.user.closePage
                    }}
                    validationSchema={valSchema}
                    validateOnBlur
                    onSubmit={(values) => FormSubmit(values)}
                >
                    {({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, isSubmitting,setFieldValue}) => (
                        <form onSubmit={handleSubmit}>
                            <div className={errors.img && touched.img && 'ant-form-item-has-error'}>
                            <br/>
                                {errors.img && touched.img && <p style={{color:"#ff0000"}}>{errors.img}</p> }
                            </div>
                            <div className={errors.first_name && touched.first_name && 'ant-form-item-has-error'}>
                                <Input onChange={handleChange} onBlur={handleBlur} value={values.first_name} name="first_name" size="large" placeholder="First Name" /><br/>
                                {errors.first_name && touched.first_name && <p style={{color:"#ff0000"}}>{errors.first_name}</p> }
                            </div>
                            <br/>
                            <div className={errors.last_name && touched.last_name && 'ant-form-item-has-error'}>
                                <Input onChange={handleChange} onBlur={handleBlur} value={values.last_name} name="last_name" size="large" placeholder="Last Name" /><br/>
                                {errors.last_name && touched.last_name && <p style={{color:"#ff0000"}}>{errors.last_name}</p> }
                            </div>
                            <br/>
                            <div className={errors.email && touched.email && 'ant-form-item-has-error'}>
                                <Input onChange={handleChange} onBlur={handleBlur} value={values.email} name="email" size="large" placeholder="Email" /><br/>
                                {errors.email && touched.email && <p style={{color:"#ff0000"}}>{errors.email}</p> }
                            </div>
                            <br/>
                            <div className={errors.status && touched.status && 'ant-form-item-has-error'}>
                                <Input onChange={handleChange} onBlur={handleBlur} value={values.status} name="status" size="large" placeholder="Your status" /><br/>
                                {errors.status && touched.status && <p style={{color:"#ff0000"}}>{errors.status}</p> }
                            </div>
                            <br/>
                            <div className={errors.phone && touched.phone && 'ant-form-item-has-error'}>
                                <Input onChange={handleChange} onBlur={handleBlur} value={values.phone} name="phone" size="large" placeholder="Your phone" /><br/>
                                {errors.phone && touched.phone && <p style={{color:"#ff0000"}}>{errors.phone}</p> }
                            </div>
                            <div className={errors.close && touched.close && 'ant-form-item-has-error'} style={{padding:"20px 0px"}}>
                                    Profile
                                    <Switch name="close" style={{marginLeft:"10px"}} checkedChildren="Public" unCheckedChildren="Private" checked={values.close} onChange={(checked, event) => setFieldValue("close",checked)} />
                            </div>
                            <br/>
                            <Button loading={props.isSending} htmlType="submit" type="primary" >Update Profile</Button>
                        </form>
                    )}
                </Formik>
            </Content>
            <Content
                className="site-layout-background"
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                }}
            >
                <h1>Change Password</h1>
                <Formik
                    initialValues={{
                        password: '',
                        second_password: '',
                    }}
                    validationSchema={valSchema2}
                    validateOnBlur
                    onSubmit={(values) => FormPasswordSubmit(values)}
                >
                    {({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, isSubmitting}) => (
                        <form onSubmit={handleSubmit}>
                            <div className={errors.password && touched.password && 'ant-form-item-has-error'}>
                                <Input.Password onChange={handleChange} onBlur={handleBlur} value={values.password} name="password" size="large" placeholder="Password" /><br/>
                                {errors.password && touched.password && <p style={{color:"#ff0000"}}>{errors.password}</p> }
                            </div>
                            <br/>
                            <div className={errors.second_password && touched.second_password && 'ant-form-item-has-error'}>
                                <Input.Password onChange={handleChange} onBlur={handleBlur} value={values.second_password} name="second_password" size="large" placeholder="Confirm password" /><br/>
                                {errors.second_password && touched.second_password && <p style={{color:"#ff0000"}}>{errors.second_password}</p> }
                            </div>
                            <br/>
                            <Button loading={props.isSending} htmlType="submit" type="primary" >Обновить пароль</Button>
                        </form>
                    )}
                </Formik>
            </Content>
        </>


    );
};

export default Settings;