import {defaultOptions, instance} from '../api';
export const UsersAPI = {
    getUsers(page){
        return instance.get('wp/v2/users/?page='+page+'&per_page=10', defaultOptions()).then(res => ({users: res.data, totalCount: res.headers['x-wp-total'],totalPages:res.headers['x-wp-totalpages']}));
    },
    getUser(userID){
        return instance.get('wp/v2/users/'+userID, defaultOptions()).then(res => res.data);
    },
    getPostsUsers(users){//3,5,4
        return instance.get("wp/v2/users?include="+users, defaultOptions()).then(res=>res.data);
    },
    searchUsers(name){
        return instance.get('wp/v2/users/?search='+name+'&per_page=10', defaultOptions()).then(res => res.data);
    },
}