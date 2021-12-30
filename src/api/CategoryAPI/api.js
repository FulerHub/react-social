import {defaultOptions, instance} from '../api';
export const CategoryAPI = {
    addCategory(text,desc,color,authorID){
       return instance.post('wp/v2/categories',{slug:text+authorID, name: text,description: desc,acf:{color: color,acfauthor: authorID}},defaultOptions()).then(res => res.data).catch(err=>err.response);
    },
    updateCategory(categoryID,text,desc,color, authorID){
        return instance.post('wp/v2/categories/'+categoryID,{ name: text,description: desc,acf:{color: color,acfauthor: authorID}},defaultOptions()).then(res => res.data);
    },
    deleteCategory(id){
        return instance.delete('wp/v2/categories/'+id+'?force=true',defaultOptions()).then(res => res.data);
    },
    getCategoryUser(userID){
        return instance.get('wp/v2/categories/?acfauthor='+userID).then(res => res.data);
    },
}