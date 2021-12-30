import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Preloader from "../Preloader/Preloader";
import {actionLoadProfile} from "../../redux/reducers/profileReducer";

const ProfileInfo = (props) => {
    const dispatch=useDispatch()
    const User = useSelector(state => state.profileReducer.profile)
    const isLoadingInfo = useSelector(state => state.profileReducer.isLoadingInfo)
    useEffect(() => {
        dispatch(actionLoadProfile(props.userid));
    },[dispatch, props.userid]);
    useEffect(() => {
        document.title = `Profile ${User?.name}`;
    },[User]);
    if(isLoadingInfo) return <Preloader/>;

    return (
        <div className="profile-info">
            <div className="profile-info__img">
                {User?.avatar_urls[96] ?
                    <img src={User.avatar_urls[96]} alt=""/>
                    : ""
                }
            </div>
            <div className="profile-info__info">
                <h2>{User.acf.first_name} {User.acf.last_name} ({User.name})</h2>
                <div className="profile-info__desc">
                    <div className="profile-info__item"><b>{User.acf.status}</b></div>
                    <div className="profile-info__item"><b>Телефон: </b>{User.acf.phone}</div>

                </div>
            </div>

        </div>
    );
};

export default ProfileInfo;