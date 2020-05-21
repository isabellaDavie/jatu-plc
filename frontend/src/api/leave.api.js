import axios from 'axios'

const url = '/leave'

const token = localStorage.getItem('token')

const httpClient = axios.create({
    baseURL: 'http://localhost:3500',
    timeout: 5000
});

const authInterceptor = (config) => {
    config.headers['Authorization'] =  `Bearer ${token}`;
    // console.log('config :>> ', config);
    return config;
}

httpClient.interceptors.request.use(authInterceptor);


// request.interceptors.request.use(function(config){
//     config.headers['Authorization'] = `Bearer ${token}`
//     console.log('config :>> ', config);
//     config.token = token
//     return config
// }, error =>{
//     return Promise.reject(error)
// })

class LeaveAPI{

    // token = localStorage.getItem('token')

    async get(leaveID){
        if(leaveID){
            const response = await httpClient.get(`${url}/${leaveID}`)
            return response.data
        }else{
            const response = await httpClient.get(url)
            return response.data
            
        }
    }

    async create(data){
        const response = await httpClient.post(`${url}/create`, data)
        return response.data
    }

    async update(leaveID, data){
        const response = await httpClient.put(`${url}/update/${leaveID}`, data)
        return response.data
    }

    async delete(leaveID){
        const response = await httpClient.delete(`${url}/${leaveID}/delete`)
        return response.data
    }

    async addComment(leaveID, data){
        const response = await httpClient.put(`${url}/add-comment/${leaveID}`, data)
        return response.data
    }

    async removeComment(leaveID, data){
        const response = await httpClient.put(`${url}/remove-comment/${leaveID}`, data)
        return response.data
    }
}


export default  new LeaveAPI();