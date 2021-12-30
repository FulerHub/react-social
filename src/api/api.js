import axios from "axios";

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://river-fuler.ru/react/wp-json/',
});
const getToken = () =>{
    return localStorage.getItem('token');
}

export const defaultOptions = () => {
    const token = getToken()
    return {
        headers: {
            "Authorization": "Bearer " + token
        }
    }
}