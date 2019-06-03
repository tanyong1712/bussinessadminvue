/*
客服中心模块  created by zj 2019/4/19
* */
import fetch from "./api/fetch"
import {dataDeal,URLParams} from "./api/data_con"


//获取订单数据
export const getapiorders = (agras) => {
    console.log(agras);
    //return fetch.get('/csr-order/orders', { params: agras })
    return Promise.resolve({"code":0,"msg":"OK","data":{"list":[{"id":1,"fhmethod":"自营发货","orderNo":"JFPB8290462883275","orderTime":"2019-05-09 17:41:33","paymentTime":"2019-05-09 17:42:33","buyerId":"27d7c0bd-1f8b-11e9-a6df-fcaa1499bd8c","freight":"1","orderAmount":"220","paymentMethod":"\u5fae\u4fe1","statusName":"\u5f85\u53d1\u8d27","detailVos":[{"id":10950,"goodsName":"相宜本草红景天美白护肤品套装","goodsSpecification":"\u65e0","goodsPrice":"220","good_pic":"http:\/\/umshop.oss-cn-hangzhou.aliyuncs.com\/upload\/image\/BoGFzPgS9q05jJ7VlvxCqVQyUi17DIEzCe5o6OvT.jpeg","goodsNum":"1","afterSalesStatus":"\u65e0"}]},{"id":2,"fhmethod":"自营发货","orderNo":"JFPB82904628432432","orderTime":"2019-05-10 17:41:33","paymentTime":"2019-05-10 17:42:33","buyerId":"27d7c0bd-1f8b-11e9-a6df-fcaa1499bd8c","freight":"1","orderAmount":"1880","paymentMethod":"\u5fae\u4fe1","statusName":"\u5f85\u53d1\u8d27","detailVos":[{"id":10949,"goodsName":"相宜本草红景天美白护肤品套装","goodsSpecification":"\u65e0","goodsPrice":"1880","good_pic":"http:\/\/umshop.oss-cn-hangzhou.aliyuncs.com\/upload\/image\/BoGFzPgS9q05jJ7VlvxCqVQyUi17DIEzCe5o6OvT.jpeg","goodsNum":"1","afterSalesStatus":"\u65e0"}]}]}});
}
//订单修改
export const updateorder = (agras) => {
    console.log(agras);
    //return fetch.put('/csr-order/order', { params: agras })
    return Promise.resolve({"code":0,"msg":"OK"});

}
//获取订单详情
export const getorder = (id) => {
    console.log(id);
    //return fetch.get('/csr-order/order/'+id)
    return Promise.resolve({"code":0,"msg":"OK","data":{"id":1,"orderNo":"JFPB8290462883275","payNo":"JFPB825465465465","orderTime":"2019-05-09 17:41:33","paymentTime":"2019-05-09 17:42:33","dexcelTime":"2019-05-09 19:42:33","deliveryTime":"2019-05-09 22:42:33","transactionTime":"2019-05-12 17:42:33","buyerId":"27d7c0bd-1f8b-11e9-a6df-fcaa1499bd8c","buyerName":"陈圣林","buyerPhone":"187****255","freight":"1","buyerProvincial":"\u91cd\u5e86","buyerMunicipal":"\u6e1d\u4e2d\u533a","buyerAddress":"\u91cd\u5e86\u5e02\u6e1d\u4e2d\u533a\u89e3\u653e\u7891","orderAmount":"220","paymentMethod":"\u5fae\u4fe1","statusName":"\u5f85\u53d1\u8d27","childrenOrders":[{"goodsId":1,"goodsName":"相宜本草红景天美白护肤品套装","goodsSpecification":"\u65e0","goodsPrice":"220","good_pic":"http:\/\/umshop.oss-cn-hangzhou.aliyuncs.com\/upload\/image\/BoGFzPgS9q05jJ7VlvxCqVQyUi17DIEzCe5o6OvT.jpeg","goodsNum":"1","afterSalesStatus":"\u65e0"}]}});
}

//获取供应商结算单
export const getsuppliers = (agras) => {
    console.log(agras);
    //return fetch.get('/csc/statement/supplier/page', { params: agras })
    return Promise.resolve({"code":0,"msg":"OK","data":{"list":[{"id":1,"createTime":"2019-05-01","settlementTime":"7\u5929","supplierName":"\u5546\u57ce\u81ea\u8425","phone":"18716200255","companyName":"\u5546\u57ce\u81ea\u8425","creditCode":"91500103***38177Q","payee":"\u9648\u5723\u6797","bankAccountNo":"621081 12****789 0000","bankBranch":"\u91cd\u5e86\u5efa\u8bbe\u94f6\u884c\u5927\u576a\u8fd0\u884c","costAmount":"2000","logisticsAmount":"10","refundAmount":"0","payableAmout":"2010","status":"1","abnormal":"TTTTTTTT","invalid":"1"},{"id":2,"createTime":"2019-05-08","settlementTime":"7\u5929","supplierName":"\u5546\u57ce\u81ea\u8425","phone":"18716200255","companyName":"\u5546\u57ce\u81ea\u8425","creditCode":"91500103***38177Q","payee":"\u9648\u5723\u6797","bankAccountNo":"621081 12****789 0000","bankBranch":"\u91cd\u5e86\u5efa\u8bbe\u94f6\u884c\u5927\u576a\u8fd0\u884c","costAmount":"1533.1","logisticsAmount":"100","refundAmount":"0","payableAmout":"1633.1","status":"1","abnormal":"TTTTTTTT","invalid":"0"}],"pageNum":1,"pageSize":10,"pages":2,"total":20}});
}
//获取供应商结算单
export const updatesuppliers = (agras) => {
    console.log(agras);
    //return fetch.put('/csc/statement/supplier', { params: agras })
    return Promise.resolve({"code":0,"msg":"OK"});
}
//获取平台结算单
export const getplatform = (agras) => {
    console.log(agras);
    //return fetch.get('/csc/statement/platform/page', { params: agras })
    return Promise.resolve({"code":0,"msg":"OK","data":{"list":[{"id":1,"createTime":"2019-05-08","orderWeChatPay":"100","orderAlipayPay":"0","orderOtherPay":"0","orderTotalAmount":"100","incomeWeChatPay":"100","incomeAlipayPay":"0","incomeOtherPay":"0","incomeTotalAmount":"100","costAmount":"80","refundAmount":"0","payableAmout":"100","status":"1"},{"id":2,"createTime":"2019-05-09","orderWeChatPay":"200","orderAlipayPay":"0","orderOtherPay":"0","orderTotalAmount":"200","incomeWeChatPay":"200","incomeAlipayPay":"0","incomeOtherPay":"0","incomeTotalAmount":"200","costAmount":"160","refundAmount":"0","payableAmout":"200","status":"1"}],"pageNum":1,"pageSize":10,"pages":2,"total":20}});
}
