import React, {useState} from 'react';
import {Input, Button, Select} from 'antd';
import {Formik} from "formik";
import * as yup from 'yup';
import {useDispatch, useSelector} from "react-redux";
import {actionAddCategory} from "../../redux/reducers/categoryReducer";
import {
    blue,
    cyan,
    geekblue,
    gold,
    green,
    lime,
    magenta,
    orange,
    purple,
    red,
    volcano,
    yellow
} from '@ant-design/colors';
const { TextArea } = Input;
const { Option } = Select;
const CategoryForm = () => {
    const [color,setColor] = useState();
    const dispatch = useDispatch();
    const myID = useSelector(state => state.authReducer.id);
    const valSchema = yup.object().shape({
        name: yup.string().typeError('Это поле принимает только текст').required('Это поле обязательное').min(3,'Поле должно состоять не менее чем из 3 символов'),
        desc: yup.string().typeError().required('Это поле обязательное').min(3,'Поле должно состоять не менее чем из 3 символов')
    })
    const FormSubmit=(values)=>{
        dispatch(actionAddCategory(values.name,values.desc,color,myID));

    }
    const colorsList = [
        ...red,
        ...volcano,
        ...orange,
        ...gold,
        ...yellow,
        ...lime,
        ...green,
        ...cyan,
        ...blue,
        ...geekblue,
        ...purple,
        ...magenta
    ]
    const handleChangeSelect =(value) => {
        setColor(value)
    }
    return (
        <div className="category-form">
            <Formik
            initialValues={{
                name:'',
                desc:'',
            }}
            validationSchema={valSchema}
            validateOnBlur
            onSubmit={(values) => FormSubmit(values)}
            >
                {({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, isSubmitting}) => (
                <form onSubmit={handleSubmit}>
                    <div className={errors.name && touched.name && 'ant-form-item-has-error'}>
                        <Input onChange={handleChange} onBlur={handleBlur} value={values.name} name="name" size="large" placeholder="Name category" /><br/>
                        {errors.name && touched.name && <p style={{color:"#ff0000"}}>{errors.name}</p> }
                    </div>
                    <br/>
                    <div className={errors.desc && touched.desc && 'ant-form-item-has-error'}>
                        <TextArea size="large" onChange={handleChange} onBlur={handleBlur} value={values.desc} name="desc" placeholder="Description" showCount maxLength={128}   />
                        {errors.desc && touched.desc && <p style={{color:"#ff0000"}}>{errors.desc}</p>}
                    </div>
                    <br/>

                    <Button htmlType="submit" type="primary" >Добавить категорию</Button>
                    <Select className={'selectColor'}  defaultValue="#ff5500" style={{ width: 120,backgroundColor: color ?  color : "#ff5500"}} onChange={(e)=>handleChangeSelect(e)}>
                        {colorsList.map((item)=><Option style={{backgroundColor:item}} value={item}>{item}</Option>)}
                    </Select>
                </form>
                )}
            </Formik>

        </div>
    );
};

export default CategoryForm;