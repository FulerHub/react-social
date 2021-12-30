import {defaultOptions, instance} from '../api';
export const AuthAPI = {
    checkToken(){
        return instance.post('jwt-auth/v1/token/validate',null,defaultOptions()).then(res => res.data).catch(err=>err.response);
    },
    getAuthData(){
        return instance.post('wp/v2/users/me',null,defaultOptions()).then(res => res.data).catch(err=>err.response);
    },
    updateAuthData(user){
        return instance.post('wp/v2/users/me',{email:user.email,acf:{status:user.status,phone:user.phone,first_name: user.first_name,last_name: user.last_name,close: user.close}},defaultOptions()).then(res => res.data);
    },
    updateAuthPassword(password){
        return instance.post('wp/v2/users/me?password='+password,null,defaultOptions()).then(res => res.data);
    },
    getAuth(name,password){
        return instance.post('jwt-auth/v1/token',{ username: name,password: password }).then(res => res.data).catch(err => err.response);
    },
    createAuth(name,password,email){
        return instance.post('wp/v2/users/register',{ username: name,password: password,email: email }).then(res => res.data).catch(err => err.response);
    },
}