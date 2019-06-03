/*
仓储中心模块  created by zj 2019/4/19
* */
import fetch from "./api/fetch"
import {dataDeal,URLParams} from "./api/data_con"

/*
用户登录
* */
export const getProductBrands = (param) => {
    //return fetch.get('/csr-wms/productBrands',{params:dataDeal(param)} )
    return Promise.resolve({"code":0,"msg":"OK","data":12});
}

export const getNetworks = () => {
    //return fetch.get("/user/networks")
    return Promise.resolve({"code":0,"msg":"OK","data":12});
}
export const postRateList = (param) => {
    //return fetch.get('/api/csr-wms/shippingTemplates',{params:dataDeal(param)})
    return Promise.resolve({
        "code": 0,
        "data": {
            "pageNum": 1,
            "pageSize": 10,
            "total": 12,
            "pages": 1,
            "list": [
                {
                    "id": 1,
                    "name": "标准邮费",
                    "usageAmount": '娜爱侬',
                    "createTime": "2019-05-05 22:26:15",
                    "creator": null,
                    "updateTime": null,
                    "updater":  'admin'
                },
                {
                    "id": 2,
                    "name": "华北地区",
                    "usageAmount": '娜爱侬',
                    "createTime": "2019-05-05 22:27:07",
                    "creator": null,
                    "updateTime": null,
                    "updater":  'admin'
                },
                {
                    "id": 3,
                    "name": "华南地区",
                    "usageAmount": '娜爱侬',
                    "createTime": "2019-05-05 22:31:21",
                    "creator": null,
                    "updateTime": null,
                    "updater": 'admin'
                },

            ]
        },
        "msg": "OK"
    });
}
export const copyPosterModel = (param) => {
    //return fetch.post('/api/csr-wms/shippingTemplate/copy',URLParams(param))
    return Promise.resolve({"code":0,"msg":"OK","data":12});
}
export const deletePost = (param) => {
    //return fetch.delete('/api/csr-wms/shippingTemplate',{params:URLParams(param)})
    return Promise.resolve({"code":0,"msg":"OK","data":12});
}
export const getBrandDetail = (param) => {
    //return fetch.get('/api/csr-wms/productBrand/'+param.id)
}
export const editBrand = (param) => {
    //return fetch.put('/api/csr-wms/productBrand',URLParams(param))
}
export const addBrand = (param) => {
    //return fetch.post('/api/csr-wms/productBrand',URLParams(param))
}
export const addPostModel = (param) => {
    //return fetch.post('/api/csr-wms/shippingTemplate',URLParams(param))
    return Promise.resolve({"code":0,"msg":"OK","data":12});
}
export const updatePostModel = (param) => {
    //return fetch.put('/api/csr-wms/shippingTemplate',URLParams(param))
    return Promise.resolve({"code":0,"msg":"OK","data":12});
}
export const getPostModel = (param) => {
    //return fetch.get('/api/csr-wms/shippingTemplate/'+param)
    return Promise.resolve({"code":0,"data":{"id":1,"areas":"重庆,四川","name":"标准邮费","firstItem":1,"firstPrice":10.00,"superimposedItem":0,"superimposedPrice":0.00,"usageAmount":null,"ownerId":22,"remark":null,"createTime":"2019-05-05 22:26:15","creator":null,"updateTime":null,"updater":null},"msg":"OK"});
}
export const getAreaList = () => {
    //return fetch.get('/api/csr-op/op/region/')
    return Promise.resolve({"code":0,"data":[{"regionId":1,"status":1,"regionName":"华北地区","createTime":"2019-03-06 01:16:09","updateTime":"2019-03-06 01:16:09","operator":1},{"regionId":2,"status":1,"regionName":"西南地区","createTime":"2019-03-06 01:44:12","updateTime":"2019-03-13 22:55:23","operator":1},{"regionId":4,"status":1,"regionName":"华中地区","createTime":"2019-03-10 03:59:04","updateTime":"2019-03-10 03:59:42","operator":1},{"regionId":10,"status":1,"regionName":"测试大区0510","createTime":"2019-05-10 22:50:01","updateTime":"2019-05-11 11:53:10","operator":1}],"msg":"SUCCESS"});
}
export const getAreaByRegion = (param) => {
    //return fetch.get('/api/csr-op/op/region/'+ param.regionId )
    return Promise.resolve({"code":0,"data":[{"areaId":1,"areaName":"北京市","areaPid":0,"areaSort":0,"areaLevel":1,"areaStatus":1,"firstLetter":"BJS","fullLetter":"bei jing shi","operator":null},{"areaId":6,"areaName":"辽宁省","areaPid":0,"areaSort":0,"areaLevel":1,"areaStatus":1,"firstLetter":"LNS","fullLetter":"liao ning sheng","operator":null},{"areaId":11,"areaName":"浙江省","areaPid":0,"areaSort":0,"areaLevel":1,"areaStatus":1,"firstLetter":"ZJS","fullLetter":"zhe jiang sheng","operator":null},{"areaId":16,"areaName":"河南省","areaPid":0,"areaSort":0,"areaLevel":1,"areaStatus":1,"firstLetter":"HNS","fullLetter":"he nan sheng","operator":null}],"msg":"SUCCESS"});
}
export const getGoods = (param) => {
    //return fetch.get('/api/csr-shelf/commodityGoodses',{params:dataDeal(param)})
    return Promise.resolve({"code":0,"msg":"OK","data":12});
}

export const postNetwork = (param) => {
    //return fetch.post('/user/network', dataDeal(param))
    return Promise.resolve({"code":0,"msg":"OK","data":12});
}

export const putNetwork = (param) => {
    //return fetch.put('/user/network/setRole', dataDeal(param))
    return Promise.resolve({"code":0,"msg":"OK","data":12});
}

export const getFetch = (param) => {
    //return fetch.get('/user/networks',{params:dataDeal(param)} )
    return Promise.resolve({"code":0,"msg":"OK","data":12});
}

export const Login = (params) => {
    //return fetch.post('/aaa/authentication/user/entry',URLParams(params))
    return Promise.resolve({"code":0,"msg":"OK","data":12});
}
