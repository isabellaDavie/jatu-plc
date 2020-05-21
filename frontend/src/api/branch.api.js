import request from './index';

const url = '/branch'

request.interceptors.request.use(function(config){
    const token = localStorage.getItem('token')
    config.headers['Authorization'] = `Bearer ${token}`
    return config
})

class BranchAPI{

    async get(branchID){
        if(branchID){
            const response = await request.get(`${url}/${branchID}`)
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

    async update(branchID, data){
        const response = await request.put(`${url}/${branchID}/update`, data)
        return response.data
    }

    async delete(branchID){
        const response = await request.delete(`${url}/${branchID}/delete`)
        return response.data
    }
}


export default  new BranchAPI();