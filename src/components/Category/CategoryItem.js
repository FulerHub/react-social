import React from 'react';
import {Button, Card, Col, Input, Select} from "antd";
import {EditOutlined,CloseOutlined} from "@ant-design/icons";
import * as yup from "yup";
import {Formik} from "formik";
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

const TextField = ({type,name,errors,touched,onChange,onBlur,defaultValue,placeholder}) => {
    return (
        <div className={errors && touched && 'ant-form-item-has-error'}>
            {type === "textarea" ?
                <TextArea onChange={onChange} onBlur={onBlur} value={defaultValue} name={name} placeholder={placeholder} showCount maxLength={128}   />
                :
                <Input onChange={onChange} onBlur={onBlur} value={defaultValue} name={name} size="large" placeholder={placeholder} />
            }
            <br/>
            {errors && touched && <p style={{color:"#ff0000"}}>{errors}</p> }
        </div>
    );
};
class CategoryItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            edit: false,
            title: this.props.name,
            description: this.props.desc,
            color: this.props.color
        }
    }
    deleteCategory() {
        this.props.deleteCategory(this.props.id)
    }
    handleChange(value) {
        this.setState({
            color: value
        })
    }
    FormSubmit(values){
        console.log(values);
        if(this.state.edit){
            this.setState({
                title: values.name,
                description: values.desc,
                edit: false,
            })
            this.props.updateCategory(this.state.id,values.name,values.desc,this.state.color,this.props.myID); //categoryID,name,desc,authorID
        }
        else{
            this.setState({
                edit: true,
            })
        }

    }

    render() {
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
        const valSchema = yup.object().shape({
            name: yup.string().typeError('Это поле принимает только текст').required('Это поле обязательное').min(3, 'Поле должно состоять не менее чем из 3 символов'),
            desc: yup.string().typeError().required('Это поле обязательное').min(3, 'Поле должно состоять не менее чем из 3 символов'),
        })
        return (
            <Col xs={24} md={24} lg={12} xl={8} xxl={6} style={{padding: '0 10px'}}>

                <Formik
                    initialValues={{
                        name: this.state.title,
                        desc: this.state.description,
                    }}
                    validationSchema={valSchema}
                    validateOnBlur
                    onSubmit={(values) => this.FormSubmit(values)}

                >
                    {({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, isSubmitting}) => (
                        <form onSubmit={handleSubmit}>
                            <Card className="card" title={this.state.edit ? <TextField name="name" errors={errors.name} touched={touched.name} onChange={handleChange} onBlur={handleBlur} defaultValue={values.name} placeholder="Name category"/> : this.state.title} bordered={false} style={{width: '100%'}}>
                                {this.state.edit ? <TextField type={"textarea"} name="desc" errors={errors.desc} touched={touched.desc} onChange={handleChange} onBlur={handleBlur} defaultValue={values.desc} placeholder="Description category"/> : <p>{this.state.description}</p>}
                                <div className="category-edit">

                                    <Button htmlType="submit" className="cat-edit" type="primary" shape="circle"><EditOutlined/></Button>
                                    <Select disabled={!this.state.edit ? true : false} className={'selectColor'}  defaultValue={this.state.color} style={{ width: 120,backgroundColor: this.state.color ?  this.state.color : "#000000"}} onChange={(e)=>this.handleChange(e)}>
                                        {colorsList.map((item)=><Option style={{backgroundColor:item}} value={item}>{item}</Option>)}
                                    </Select>
                                    <Button onClick={()=>this.deleteCategory()} danger className="cat-edit" type="primary" shape="circle"><CloseOutlined /></Button>

                                </div>

                            </Card>
                        </form>
                    )}
                </Formik>
            </Col>
        );
    }

}
export default CategoryItem;