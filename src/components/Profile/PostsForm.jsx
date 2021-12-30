import React from 'react';
import {connect} from "react-redux";

import {
    Input,
    Button,
    Select

} from 'antd';
import {Formik} from "formik";
import * as yup from "yup";
import {actionAddPost} from "../../redux/reducers/profileReducer";

const { Option } = Select;
const { TextArea } = Input;
class PostsForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            category: [],
            userid: this.props.userid
        };

    }
    handleChangeCat(value) {
       const categories= Object.values(value);
       this.setState({
            category: categories
        })
        console.log(categories)
    }
    FormSubmit(values){
        const Post = {
            title:{
                rendered: values.text
            } ,
            content: {
                rendered: values.text
            },
            categories: this.state.category,
            acf:{
                likes:0,
                userid:this.state.userid
            }
        }

        this.props.AddPost(Post)
        values.text = ''
        this.setState({
            category: []
        })
    }
    render() {
        const CatList = this.props.categories.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>);
        const valSchema = yup.object().shape({
            text: yup.string().typeError('Это поле принимает только текст').required('Это поле обязательное').min(3,'Поле должно состоять не менее чем из 3 символов'),
        })
        return (
            <div>
                <Formik
                    initialValues={{
                        text:''
                    }}
                    validationSchema={valSchema}
                    validateOnBlur
                    onSubmit={(values) => this.FormSubmit(values)}
                >
                    {({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, isSubmitting}) => (
                        <form onSubmit={handleSubmit}>
                            <Select value={this.state.category} placeholder="Выбор категории" mode="multiple" size="large" style={{ width: '100%',marginBottom:'20px' }} onChange={(e)=>this.handleChangeCat(e)}>
                                {CatList}
                            </Select>
                            <TextArea name="text" showCount maxLength={100} style={{ marginBottom:'20px'  }} onChange={handleChange} onBlur={handleBlur}  value={values.text} placeholder="Новая запись"/>
                            {errors.text && touched.text && <p style={{color:"#ff0000"}}>{errors.text}</p> }
                            <Button loading={this.props.isSending}  htmlType="submit" size="large" type="primary">Опубликовать</Button>

                        </form>


                        )}
                </Formik>

            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isSending: state.profileReducer.isSending
})
function mapDispatchToProps(dispatch) {
    return {
        AddPost(post) {
            dispatch(actionAddPost(post));
        },

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostsForm);
