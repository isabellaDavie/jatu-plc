import request from './index';

const url = '/tasks'

request.interceptors.request.use(function(config){
    const token = localStorage.getItem('token')
    config.headers['Authorization'] = `Bearer ${token}`
    return config
})

class TasksAPI{

    async get(taskID){
        if(taskID){
            const response = await request.get(`${url}/${taskID}`)
            return response.data
        }else{
            const response = await request.get(url)
            return response.data
        }
    }

    async create(data){
        const response = await request.post(`${url}/create`, data)
        return response.data
    }

    async update(taskID, data){
        const response = await request.put(`${url}/${taskID}/update`, data)
        return response.data
    }

    async delete(taskID){
        const response = await request.delete(`${url}/${taskID}/delete`)
        return response.data
    }
}


export default  new TasksAPI();