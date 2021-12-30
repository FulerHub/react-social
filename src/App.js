import './App.css';

import React from "react";
import {Route, Routes} from "react-router";
import {connect} from "react-redux";
import 'antd/dist/antd.css';
import { Button, Layout, Result} from 'antd';
import RequireAuth from "./components/RequireAuth";
import Preloader from "./components/Preloader/Preloader";
import {initializeApp} from "./redux/reducers/appReducer";

import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Sidebar from "./components/Sidebar";

import {Link} from "react-router-dom";

const Users = React.lazy(() => import("./pages/Users"))
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
const Category = React.lazy(() => import("./pages/Category"))
const SettingsContainer = React.lazy(() => import("./components/SettingsContainer"))

export function withSuspense(WrappedComponent) {
    return (props) => {
        return <React.Suspense fallback={<Preloader/>} ><WrappedComponent {...props} /></React.Suspense>
    }
}


const SuspendedUsers = withSuspense(Users)
const SuspendedProfile = withSuspense(ProfileContainer)
const SuspendedCategory = withSuspense(Category)
const SuspendedSettings = withSuspense(SettingsContainer)

class App extends React.Component{
    componentDidMount() {
        this.props.initializeApp()
    }

    render() {
        if (!this.props.initialized) return <Preloader/>
        else{
            return(
                <div id="app">

                    <Layout>
                        <Sidebar/>
                        <Layout className="site-layout">
                            <Routes>
                                <Route path="/" element={ <RequireAuth isAuth={this.props.isAuth}><SuspendedProfile /></RequireAuth>} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/registration" element={<Registration />} />
                                <Route path="users" element={<RequireAuth isAuth={this.props.isAuth}><SuspendedUsers /></RequireAuth>}>
                                    <Route path=":pageId" element={<SuspendedUsers />} />
                                    <Route index element={<SuspendedUsers />} />
                                </Route>
                                <Route path="/category" element={<RequireAuth isAuth={this.props.isAuth}><SuspendedCategory /></RequireAuth>} />
                                <Route path="profile" element={<SuspendedProfile />}>
                                    <Route path=":userId" element={<SuspendedProfile />} />
                                    <Route index element={<SuspendedProfile />} />
                                </Route>
                                <Route
                                    path="/settings"
                                    element={
                                        <RequireAuth isAuth={this.props.isAuth}>
                                            <SuspendedSettings />
                                        </RequireAuth>
                                    }
                                />
                                <Route path="*" element={ <Result
                                    status="404"
                                    title="404"
                                    subTitle="Sorry, the page you visited does not exist."
                                    extra={<Button type="primary"><Link to="/">Back Home</Link></Button>}
                                />}/>
                            </Routes>
                        </Layout>
                    </Layout>

                </div>
            );
        }

    }
}

const mapStateToProps = (state) => ({
    initialized: state.appReducer.initialized,
    isAuth: state.authReducer.isAuth
})

export default connect(mapStateToProps, {initializeApp})(App);
