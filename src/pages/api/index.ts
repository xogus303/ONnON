import axios, { CancelTokenStatic } from 'axios';

const CancelToken = axios.CancelToken;
let source:any = null;


const basicApi = async (method: string, path: string, data?) => {
    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
    let url = 'http://localhost:3010'

    if (source){
        console.log('exist cancel token', source);
        source()
    }
    const cancel = new CancelToken(function executor(c){
        source = c
    })

    if (method == 'get' || method == 'delete'){
        return axios[method](url+path, {headers, cancelToken: cancel})
        .then(res => {
            source = null
            return res
        })
    } else {
        return axios[method](url+path, data, {headers, cancelToken: cancel})
        .then(res => {
            source = null
            return res
        })
    }
}

export default {
    hello: () => basicApi('get', '/hello'),
    SignUp: (data) => basicApi('post', `/api/user/signup`, data),
    SignIn: (data) => basicApi('post', `/api/user/signin`, data),
}