import React from 'react';
import PostContainer from "./PostContainer";
import PostsForm from "./PostsForm";
import {List, Tag} from 'antd';
import Preloader from "../Preloader/Preloader";

class Posts extends React.Component {
    state = {
        userID: this.props.userid,
        posts: this.props.posts,
        filter: this.props.posts
    };
    refreshPosts(){

    }
    componentDidMount() {
        this.props.LoadPosts(this.state.userID)

    }
    componentDidUpdate(prevProps, prevState,snapshot) {
        if (prevProps.posts !== this.props.posts) {
            this.setState ({
                posts: this.props.posts,
                filter: this.props.posts
            });
            const uniqueAuthors = this.props.posts.map(item => item.author).filter((item, i, array) => i <= array.indexOf(item));
            this.props.LoadSelectUsers(uniqueAuthors.join(','))
        }
    }
    clickCategory (e){
        if(e.target.id !== "all"){
            let a = this.state.posts.filter(item=> {
                return item.categories.indexOf(parseInt(e.target.id)) !== -1
            })
            this.setState({
                filter: [...a]
            })
        }
        else{
            this.setState({
                filter: [...this.state.posts]
            })
        }

    }
    render() {
        if(this.props.isLoading || this.props.isLoadingInfo) return <Preloader/>;
        const CatList = this.props.categories.map(item =><div key={item?.id} className="profile-categories__item"><Tag id={item?.id} onClick={(e)=>this.clickCategory(e)} color={item?.acf.color}>{item?.name}</Tag></div>);
        return (
            <>
                <div className="profile-categories" style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    margin: '24px 0px',

                }}>
                    <div className="profile-categories__item"><Tag id={"all"} onClick={(e)=>this.clickCategory(e)} color="#cccccc">All</Tag></div>
                    {CatList}
                </div>
                {this.state.filter ?
                    <List
                        itemLayout="horizontal"
                        size="large"
                        header={(!this.props.profile.acf.close || this.props.userid === this.props.myID) && <PostsForm userid={this.state.userID} categories={this.props.categories}/> } //this.state.userID === this.props.myID
                        bordered
                        dataSource={this.state.filter}
                        renderItem={item =>  <PostContainer key={item.id} author={item?.author} who={item?.acf.userid}  id={item?.id} text={item.title.rendered} date={item?.date} likes={item?.acf.likes} category={item?.categories}/>}
                    />
                    : "No have Posts"}

            </>
        );
    }
}


export default Posts;