import {defaultOptions, instance} from '../api';
export const PostAPI = {
    addPost(title,content,categories,userid){
       return instance.post('wp/v2/notes',{ title: title, content: content, categories: categories,acf:{userid:userid},status: 'publish' },defaultOptions()).then(res => res.data).catch(err=>console.log(err.response));
    },
    updatePost(postID,text,categories){
        return instance.post('wp/v2/notes/'+postID,{ title: text,content: text,categories: categories},defaultOptions()).then(res => res.data);
    },
    deletePost(postID){
        return instance.delete('wp/v2/notes/'+postID,defaultOptions()).then(res => res.data);
    },
    getPosts(){
        return instance.get('wp/v2/notes').then(res => res.data);
    },
    getPostsUser(userID){
        return instance.get('wp/v2/notes/?userid='+userID).then(res => res.data);
    },
}