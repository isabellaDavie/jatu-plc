import request from './index';

const url = '/users'

class Authentication{

    async authenticate(credentials){
       const response = await request.post(`${url}/login`, credentials)
       return response.data
    }

    async register(data){
        const response = await request.post(`${url}/register`, data)
        return response.data
    }
}

export default  new Authentication();