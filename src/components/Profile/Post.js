import React, { createElement } from 'react';

import {Comment, Tooltip, Avatar, Input, Tag, Select, Button, Skeleton} from 'antd';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import {Formik} from "formik";
import * as yup from "yup";
import {Link} from "react-router-dom";
const {TextArea} = Input;
const { Option } = Select;
class Post extends React.Component {
    constructor(props) {
        super(props);
        const newDate = new Date(this.props.date);
        let options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timezone: 'UTC',
            hour: 'numeric',
            minute: 'numeric',
        };
        this.state = {
            id: this.props.id ? this.props.id : 0,
            user: this.props.user ,
            text: this.props.text ? this.props.text : "",
            category: this.props.category ? this.props.category : 0,
            date: newDate.toLocaleString("ru", options),
            edit: false,
            select: this.props.category ? this.props.category : 0,
            likes: this.props.likes ? this.props.likes : 0,
            isLike: false,
        };
    }
    ChangeCategory(value){
        const categories= Object.values(value);
        this.setState({
            select: categories
        })
    }
    ChangePost (){
        if(this.state.edit){
            this.setState({edit: false});
        }
        else{
            this.setState({edit: true});
        }
    }
    DeletePost(){
        this.props.DeletePost(this.props.id);
    }

    like(){
        if(!this.state.isLike){
            this.setState({likes:this.state.likes+1,isLike: true});
        }else {
            this.setState({likes:this.state.likes-1,isLike: false});
        }
    }
    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    FormSubmit(values){
        this.props.UpdatePost(this.props.id,values.text,this.state.select)
        this.setState({edit: false});
    }
    render() {
        if(this.props.isLoading) return <Skeleton avatar paragraph={{ rows: 2 }} />;

        const actions = [
            <Tooltip key="comment-basic-like" title="Like">
              <span onClick={()=>this.like()}>
                {createElement(this.state.isLike === true ? HeartFilled : HeartOutlined)}
                  <span className="comment-action"> {this.state.likes}</span>
              </span>
            </Tooltip>,
            this.props.myID === this.props.author ?<span onClick={()=>this.ChangePost()}> {!this.state.edit ? "Edit" : "Done"}</span> : "",
            (this.props.myID === this.props.author ||  this.props.who === this.props.myID) ?<span onClick={()=>this.DeletePost()}>Delete</span>: "",
        ];
        const cats= this.props.categories.filter(item=> this.state.category.indexOf(item.id) !== -1);
        const catTagList = cats.map(item =>  <Tag key={item.id} color={item.acf.color}>{item.name}</Tag>);
        const CatList = this.props.categories.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>);
        const valSchema = yup.object().shape({
            text: yup.string().typeError('This field only accepts text').required('This field is required').min(3,'The field must be at least 3 characters long'),
        })
        return (
            <div className="post">
                <Comment
                    actions={actions}
                    author={<Link to={"/profile/"+this.props.user.id}>{this.props.user.name}</Link>}
                    avatar={<Avatar src={this.props.user.avatar_urls[48]} alt="Han Solo" />}
                    content={!this.state.edit ?
                        <p>{this.state.text}</p>
                        :
                        <Formik
                            initialValues={{
                                text: this.state.text
                            }}
                            validationSchema={valSchema}
                            validateOnBlur
                            onSubmit={(values) => this.FormSubmit(values)}
                        >
                            {({values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, isSubmitting}) => (
                                <form onSubmit={handleSubmit}>
                                    <Select defaultValue={this.state.category} placeholder="Select category" mode="multiple" size="large" style={{ width: '100%',marginBottom:'20px' }} onChange={(e)=>this.ChangeCategory(e)}>
                                        {CatList}
                                    </Select>
                                    <TextArea name="text" showCount maxLength={100} style={{ marginBottom:'20px'  }} onChange={handleChange} onBlur={handleBlur}  value={values.text} placeholder="New message"/>
                                    {errors.text && touched.text && <p style={{color:"#ff0000"}}>{errors.text}</p> }
                                    <Button htmlType="submit" size="large" type="primary">Update</Button>

                                </form>


                            )}
                        </Formik>

                    }
                    datetime={
                        <Tooltip >
                            <span>{this.state.date}</span>
                           {catTagList}
                        </Tooltip>
                    }
                />
            </div>

        );
    }
}

export default Post;
