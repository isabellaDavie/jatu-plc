import request from './index';

const url = '/report'

// request.interceptors.request.use(function(config){
//     const token = localStorage.getItem('token')
//     config.headers['Authorization'] = `Bearer ${token}`
//     return config
// })

class ReportsAPI{

    async get(reportID){
        if(reportID){
            const response = await request.get(`${url}/${reportID}`)
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

    async update(reportID, data){
        const response = await request.put(`${url}/update/${reportID}`, data)
        return response.data
    }

    async delete(reportID){
        const response = await request.delete(`${url}/${reportID}/delete`)
        return response.data
    }

    async addComment(reportID, data){
        const response = await request.put(`${url}/add-comment/${reportID}`, data)
        return response.data
    }

    async removeComment(reportID, data){
        const response = await request.put(`${url}/remove-comment/${reportID}`, data)
        return response.data
    }
}


export default  new ReportsAPI();