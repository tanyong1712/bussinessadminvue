/*
客服中心模块  created by zj 2019/4/19
* */
import fetch from "./api/fetch"
import {dataDeal,URLParams} from "./api/data_con"


//编辑
export const updategroup = (agras) => {
    console.log(agras);
    //return fetch.put('/shelf/shelfMarketing', { params: agras });
    return Promise.resolve({"code":0,"msg":"OK","data":12});
}
//添加
export const addgroup = (agras) => {
    console.log(agras);
    //return fetch.post('/shelf/shelfMarketing', { params: agras });
    return Promise.resolve({"code":0,"msg":"OK","data":12});
}
//获取列表
export const getgroups = (agras) => {
    console.log(agras);
    //return fetch.get('/shelf/shelfMarketings', { params: agras });
    return Promise.resolve({"code":0,"msg":"OK","data":{"list":
                [
                    {
// 拼团ID（货架id）
                        "shelfMarketingId": 1234564568,
// 团购图片
                        "pic": "http://www.lenuse.cn/gas/images/0002.jpg",
// 标题
                        "name": "天赐温泉5折",
// 类型
                        "type": "实物拼团",
// 状态
                        "status": 1,
// 状态名称
                        "statusName": "已上架",
// 发起方
                        "creator": "i生活",
// 参与商家
                        "business": "杰克琼斯",
// 创建时间
                        "created": "2019-05-01 12:20:23",
// 销销量
                        "sales": 223,
// 销售额
                        "sale_amount": 12220,
                    },
                    {
// 拼团ID（货架id）
                        "shelfMarketingId": 1221,
// 团购图片
                        "pic": "http://www.lenuse.cn/gas/images/0002.jpg",
// 标题
                        "name": "天赐温泉5折",
// 类型
                        "type": "实物拼团",
// 状态
                        "status": 1,
// 状态名称
                        "statusName": "已上架",
// 发起方
                        "creator": "i生活",
// 参与商家
                        "business": "杰克琼斯",
// 创建时间
                        "created": "2019-05-01 12:20:23",
// 销销量
                        "sales": 223,
// 销售额
                        "sale_amount": 12220,
                    }
                ]
            ,"pageNum":1,"pageSize":10,"pages":2,"total":20}});
}
//获取
export const getgroup = (agras) => {
    console.log(agras);
    //return fetch.get('/shelf/shelfMarketing/'+agras);
    return Promise.resolve({"code":0,"msg":"OK","data":{"id":2,"supplierName":"\u4e0a\u6d77\u827a\u5189","compAddress":"\u4e0a\u6d77\u5e02\u91d1\u5c71\u533a\u67ab\u6cfe\u9547\u73af\u4e1c\u4e00\u8def65\u5f042\u53f71055\u5ba4","connectorName":"\u9ec4\u542f\u57f9","phone":"021-60719778","supplierType":"2","supplierStatus":"\u542f\u52a8","settleCycle":"15\u5929","fromType":"\u81ea\u8425\u5f15\u8fdb","startTime":"2018-04-09","status":1,"contractstartTime":"2019.5.16","contractendTime":"2020.5.16","settleType":"1","paymnetType":"1","bank":"\u519c\u4e1a\u94f6\u884c\u4e0a\u6d77\u5174\u5854\u652f\u884c","bankCardNum":"03855020040026704","accountName":"\u4e0a\u6d77\u827a\u5189\u8d38\u6613\u6709\u9650\u516c\u53f8","taxpayerId":"913101165588365440","legalCardNum":"","businessCert":"","generalTaxpayerCert":"","supplierFrom":"1","adminPhone":"13488110880"}});
}
//搜索拼团实物商品
export const getgroupgoods = (agras) => {
    console.log(agras);
    //return fetch.get('/shelf/commodityGoodses', { params: agras });
    return Promise.resolve({
        "code": 0,          // 状态码 【0成功 1失败】
        "msg": "请求成功",  // 返回信息
        "data": {           // 返回数据
            "pageNum": 1,  // 当前页码
            "pageSize": 10,  // 每页查询数量
            "pages": 1,      // 页数
            "total": 1,       // 总数据量
            "list": [         // 数据集合
                {
                    "goods_id": 0, // 货品id
                    "goods_name": "XX", // 品牌
                    "goods_cate_name": "XX男装", // 名称
                    "goods_status": "http://45555.com/s.jpg", // 缩图
                    "goods_brand": "男装", // 货品分类类型
                    "goods_price": 0, // 货品类型：0.产品 1.营销商品 2.销售商品
                    "goods_num": 1, // 货品状态： 1. 审核中 2.审核未通过 3. 已上架 4.已下架
                    "goods_deliver": 235.99, // 指导价-最低价
                    "goods_cost": 238.99, // 指导价-最高价
                    "goods_market_price": 90,
                    "status_time": "2019-05-07T09:07:14.578Z", // 上架时间
                    "update_time": "2019-05-07T09:07:14.578Z", // 下架时间

                }
            ]
        }
    });
}


