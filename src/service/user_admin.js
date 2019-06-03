/*
客服中心模块  created by zj 2019/4/19
* */
import fetch from "./api/fetch"
import {dataDeal,URLParams} from "./api/data_con"


//获取供应商员工账户管理
export const getMerchantAccountList= (agras) => {
    //console.log(agras);
    //return fetch.get('/csr-uc/merchantAccount/list', { params: agras })
        return Promise.resolve(
            {
                "code": 0, // 状态码 【0成功 1失败】
                "msg": "请求成功",// 返回信息
                "data": {
                        "pageNum": 1,  // 当前页码
                        "pageSize": 0, // 每页数量
                        "pages": 0,    // 页数
                        "total": 0,    // 总记录数
                        "list":[{ 
                            "networkId": 0,          // 员工网络身份证id
                            "phone": "15688888888",  // 员工手机号
                            "name": "小梦",        // 员工姓名
                            "roleName": "管理员",    // 员工角色
                            "remark": "备注",        // 备注信息
                            "roleId":0,         //角色ID
                            
                         },
                         { 
                            "networkId": 1,          // 员工网络身份证id
                            "phone": "13659854884",  // 员工手机号
                            "name": "M安逸",        // 员工姓名
                            "roleName": "运营商账号",    // 员工角色
                            "remark": "备注",        // 备注信息
                            "roleId":0,         //操作权限
                         },
                         { 
                            "networkId": 2,          // 员工网络身份证id
                            "phone": "13265895485",  // 员工手机号
                            "name": "四玺丸子",        // 员工姓名
                            "roleName": "财务账号",    // 员工角色
                            "remark": "备注",        // 备注信息
                            "roleId":0,         //角色ID
                         },
                         { 
                            "networkId": 3,          // 员工网络身份证id
                            "phone": "132569852246",  // 员工手机号
                            "name": "火羊宝",        // 员工姓名
                            "roleName": "客户账号",    // 员工角色
                            "remark": "备注",        // 备注信息
                            "roleId":0,         //角色ID
                         },
                         { 
                            "networkId":4,          // 员工网络身份证id
                            "phone": "13284759485",  // 员工手机号
                            "name": "admin",        // 员工姓名
                            "roleName": "总管理账户",    // 员工角色
                            "remark": "备注",        // 备注信息
                            "roleId":1,         //角色ID
                         },
                        ] 
                 }
            }
        );
}
//供应商员工账号添加
export const addPostaAmin = (agras) => {
    console.log(agras);
    //return fetch.POST('/csr-uc/merchantAccount', { params: agras })
    return Promise.resolve({
        "code": 0,        // 状态码 【0成功 1失败】
        "msg": "请求成功",// 返回信息
        "data": 123456    // 新增员工的网络身份证id
    });
}

//供应商员工账号编辑
export const putEdit = (agras) => {
    console.log(agras);
    //return fetch.put('/csr-uc/merchantAccount', { params: agras })
    return Promise.resolve({
        "code": 0,        // 状态码 【0成功 1失败】
        "msg": "请求成功",// 返回信息
        "data": 123456    // 新增员工的网络身份证id
    });
}

//供应商员工账号删除
export const getDetele = (agras) => {
    console.log(agras);
    //return fetch.delete('/csr-uc/merchantAccount', { params: agras })
    return Promise.resolve({
        "code": 0, // 状态码 【0成功 1失败】
        "msg": "请求成功",// 返回信息
    });
}



//供应商员工信息移交
export const putTransfer = (agras) => {
    console.log(agras);
    //return fetch.put('/csr-uc/merchantAccount/transfer', { params: agras })
    return Promise.resolve({
        "code": 0, // 状态码 【0成功 1失败】
        "msg": "请求成功",// 返回信息
    });
}

//发送验证码
export const postSendOut = (agras) => {
    console.log(agras);
    //return fetch.put('aaa/authentication/sms/notice', { params: agras })
    return Promise.resolve({
        "code":0, // 状态码 【0成功 1失败】
        "msg": "请求成功",// 返回信息
    });
}

//短信验证码
export const getSendOut = (agras) => {
    console.log(agras);
    //return fetch.put('aaa/authentication/sms/send', { params: agras })
    return Promise.resolve({
        "code":0, // 状态码 【0成功 1失败】
        "msg": "请求成功",// 返回信息
    });
}

//供应商总管理员手机号码修改
export const modifyPhone = (agras) => {
    console.log(agras);
    //return fetch.put('/csr-uc/merchantAccount/admin', { params: agras })
    return Promise.resolve({
        "code": 0, // 状态码 【0成功 1失败】
        "msg": "请求成功",// 返回信息
    });
}











