import axios from 'axios';

const request = axios.create({
    baseURL:'http://localhost:3500',
    headers: {
        "Content-Type": "application/json",
        // anything you want to add to the headers
    }
});


const token = () => localStorage.getItem('token')

const authInterceptor = (config) => {
    config.headers['Authorization'] = `Bearer ${token()}`
    return config
}

// strictRequest.interceptors.request.use(authInterceptor)


export default request