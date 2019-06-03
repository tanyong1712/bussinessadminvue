import fetch from "./api/fetch"
import {dataDeal,URLParams} from "./api/data_con"

export const getHealth = () => {
    return fetch.get("/user/health",{params:{}})
}

export const postNetwork = (param) => {
    return fetch.post('/user/network', dataDeal(param))
}

export const putNetwork = (param) => {
    return fetch.put('/user/network/setRole', dataDeal(param))
}

export const getFetch = (param) => {
    return fetch.get('/user/networks',{params:dataDeal(param)} )
}

export const Login1 = (param) => {
    return fetch.get('/aaa/authentication/user/entry',{params:dataDeal(param)} )
}

export const Login = (params) => {
    return fetch.post('/aaa/authentication/user/entry',URLParams(params))
}
