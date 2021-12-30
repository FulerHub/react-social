import React from 'react';
import {Navigate, useLocation} from "react-router";


function RequireAuth({ children, isAuth }) {
    let location = useLocation();
    if (!isAuth) {
        return <Navigate to="/login" state={{ from: location }} />;
    }
    return children;
}

export default RequireAuth;
