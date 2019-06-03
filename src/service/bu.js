/*
客服中心模块  created by zj 2019/4/19
* */
import fetch from "./api/fetch"
import {dataDeal,URLParams} from "./api/data_con"


//获取BU
export const getbu = (agras) => {
    console.log(agras);
    //return fetch.get('/account/bu/myAssert', { params: agras })
    return Promise.resolve({"code":0,"msg":"OK","data":{"realBuValue":1222,"blockBuValue":44444}});
}
//获取BUlist
export const getbulist = (agras) => {
    console.log(agras);
    //return fetch.get('/account/bu/flow/list', { params: agras })
    return Promise.resolve({"code":0,"msg":"OK","data":{"list":[{"behaviorTagEnglish":"2019-05-09","behaviorName":"每日签到","partnerName":"TTTTTTTT","partnerEnglish":"TTTTTTTT","flowTime":"2019-04-09 00:00:02","buValue":"10","buType":"1"},{"behaviorTagEnglish":"2019-05-09","behaviorName":"每日签到","partnerName":"TTTTTTTT","partnerEnglish":"TTTTTTTT","flowTime":"2019-04-08 00:00:02","buValue":"10","buType":"1"}],"pageNum":1,"pageSize":10,"pages":2,"total":20}});
}
