/*
客服中心模块  created by zj 2019/4/19
* */
import fetch from "./api/fetch"
import {dataDeal,URLParams} from "./api/data_con"


//编辑
export const updatesupplier = (agras) => {
    console.log(agras);
    //return fetch.put('/wms/supplierEdit', { params: agras });
    return Promise.resolve({"code":0,"msg":"OK","data":12});
}
//添加
export const addsupplier = (agras) => {
    console.log(agras);
    //return fetch.post('/wms/supplierAdd', { params: agras });
    return Promise.resolve({"code":0,"msg":"OK","data":12});
}
//获取供应方列表
export const getsupplier = (agras) => {
    console.log(agras);
    //return fetch.get('/wms/supplierList', { params: agras });
    return Promise.resolve({"code":0,"msg":"OK","data":{"list":[{"id":1,"supplierName":"\u4e0a\u6d77\u827a\u5189","compAddress":"\u4e0a\u6d77\u5e02\u91d1\u5c71\u533a\u67ab\u6cfe\u9547\u73af\u4e1c\u4e00\u8def65\u5f042\u53f71055\u5ba4","connectorName":"\u9ec4\u542f\u57f9","phone":"021-60719778","supplierType":"\u7ecf\u9500\u5546\u91c7\u8d2d","supplierStatus":"\u542f\u52a8","settleCycle":"15\u5929","fromType":"\u81ea\u8425\u5f15\u8fdb","startTime":"2018-04-09","status":1},{"id":2,"supplierName":"\u4e0a\u6d77\u82ac\u68a6","compAddress":"\u4e0a\u6d77\u95f5\u884c\u533a\u4e2d\u6625\u8def7319\u53f74\u5c42E-3\u5ea7","connectorName":"\u674e\u6d77\u5c71","phone":"021-54796576","supplierType":"\u81ea\u8425\u91c7\u8d2d","supplierStatus":"\u542f\u52a8","settleCycle":"7\u5929","fromType":"\u81ea\u8425\u5f15\u8fdb","startTime":"2018-05-09","status":4}],"pageNum":1,"pageSize":10,"pages":2,"total":20}});
}
//获取供应方
export const getonesupplier = (agras) => {
    console.log(agras);
    //return fetch.get('/wms/supplier/'+agras);
    return Promise.resolve({"code":0,"msg":"OK","data":{"id":2,"supplierName":"\u4e0a\u6d77\u827a\u5189","compAddress":"\u4e0a\u6d77\u5e02\u91d1\u5c71\u533a\u67ab\u6cfe\u9547\u73af\u4e1c\u4e00\u8def65\u5f042\u53f71055\u5ba4","connectorName":"\u9ec4\u542f\u57f9","phone":"021-60719778","supplierType":"2","supplierStatus":"\u542f\u52a8","settleCycle":"15\u5929","fromType":"\u81ea\u8425\u5f15\u8fdb","startTime":"2018-04-09","status":1,"contractstartTime":"2019.5.16","contractendTime":"2020.5.16","settleType":"1","paymnetType":"1","bank":"\u519c\u4e1a\u94f6\u884c\u4e0a\u6d77\u5174\u5854\u652f\u884c","bankCardNum":"03855020040026704","accountName":"\u4e0a\u6d77\u827a\u5189\u8d38\u6613\u6709\u9650\u516c\u53f8","taxpayerId":"913101165588365440","legalCardNum":"","businessCert":"","generalTaxpayerCert":"","supplierFrom":"1","adminPhone":"13488110880"}});
}

