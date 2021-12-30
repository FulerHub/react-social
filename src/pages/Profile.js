import React from 'react';
import {useParams} from "react-router";
import {Layout} from "antd";
import ProfileInfo from "../components/Profile/ProfileInfo";
import Preloader from "../components/Preloader/Preloader";
import PostsContainer from "../components/Profile/PostsContainer";

const {Content} = Layout;


const Profile = (props) => {
    let {userId} = useParams();
    let UserID = userId ? parseInt(userId) : props.myID
    if(props.isLoading) return <Preloader/>;
    return (
        <>
            <Content
                className="site-layout-background"
                style={{
                    margin: '10px 16px',
                    padding: 24,
                    maxHeight: 280,
                }}
            >
                <ProfileInfo userid={UserID}/>
            </Content>
            <Content
                className="site-layout-background"
                style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                }}
            >

                <PostsContainer myID={props.myID} userid={UserID}/>
            </Content>
        </>
    );
};

export default Profile;