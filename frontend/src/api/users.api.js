import request from './index';

const url = '/users'

request.interceptors.request.use(function(config){
    const token = localStorage.getItem('token')
    config.headers['Authorization'] = `Bearer ${token}`
    return config
})


class UserAPI{

    async get(userID){
        if(userID){
            const response = await request.get(`${url}/${userID}`)
            return response.data
        }else{
            const response = await request.get(url)
            return response.data
        }
    }

    async update(userID, data){
        const response = await request.put(`${url}/${userID}/update`, data)
        return response.data 
    }

    async delete(userID){
        const response = await request.delete(`${url}/${userID}/delete`)
        return response.data
    }

    async resetPassword(userID, data){
        const response = await request.put(`${url}/${userID}/reset-password`, data)
        return response.data 
    }
}

export default new UserAPI()