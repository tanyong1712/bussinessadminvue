/*
仓储中心模块  created by zj 2019/4/19
* */
import fetch from "./api/fetch"
import {dataDeal,URLParams} from "./api/data_con"

/*
添加品牌
* */
export const addbrand = (param) => {
    //return fetch.post('/csr-wms/productBrand',URLParams(param) )
    return Promise.resolve({"code":0,"msg":"OK","data":12});
}
/*
编辑品牌
* */
export const updatebrand = (param) => {
    //return fetch.put('/csr-wms/productBrand',URLParams(param) )
    return Promise.resolve({"code":0,"msg":"OK","data":12});
}
/*
获取品牌
* */
export const getbrand = (param) => {
    //return fetch.get('/csr-wms/productBrands',URLParams(param) )
    return Promise.resolve({
        "code": 0,
        "data": {
            "pageNum": 1,
            "pageSize": 20,
            "total": 11,
            "pages": 1,
            "list": [
                {
                    "id": 1,
                    "name": "相宜本草",
                    "englishName": "2323",
                    "thumbnails": "https://www.lenuse.cn/images/bg-1.jpg",
                    "anotherName": "232323",
                    "description": "null",
                    "remark": "null",
                    "createTime": "2019-04-30 22:48:30",
                    "updateTime": "2019-05-01 02:13:31",
                    "creator": null,
                    "updater": null
                },
                {
                    "id": 2,
                    "name": "飞科",
                    "englishName": "aaaaaaaaaaaaaaaaaaa",
                    "thumbnails": "https://www.lenuse.cn/images/bg-1.jpg",
                    "anotherName": "少时诵诗书所所所所所所",
                    "description": null,
                    "remark": null,
                    "createTime": "2019-04-30 22:54:47",
                    "updateTime": null,
                    "creator": null,
                    "updater": null
                },
                {
                    "id": 3,
                    "name": "花印",
                    "englishName": "232323",
                    "thumbnails": "https://www.lenuse.cn/images/bg-1.jpg",
                    "anotherName": "哈哈哈哈全是bug",
                    "description": "232323",
                    "remark": "2323",
                    "createTime": "2019-04-30 22:55:26",
                    "updateTime": null,
                    "creator": null,
                    "updater": null
                }
            ]
        },
        "msg": "OK"
    });
}
/*
list 产品分类
 */
export const getproductcategorys = (param) => {
    //return fetch.get('/csr-wms/productCategorys',URLParams(param) )
    return Promise.resolve({
        "code": 0,
        "data": {
            "pageNum": 1,
            "pageSize": 30,
            "total": 30,
            "pages": 1,
            "list": [
                {
                    "id": 1,
                    "name": "美妆个护",
                    "type": 1,
                    "typeName": "公共类型",
                    "pid": null,
                    "ownerId": null,
                    "remark": null,
                    "createTime": "2019-05-01 02:38:56",
                    "updateTime": null,
                    "creator": null,
                    "updater": null
                },
                {
                    "id": 2,
                    "name": "家用电器",
                    "type": 1,
                    "typeName": "公共类型",
                    "pid": 1,
                    "ownerId": null,
                    "remark": null,
                    "createTime": "2019-05-01 02:38:56",
                    "updateTime": null,
                    "creator": null,
                    "updater": null
                },
                {
                    "id": 3,
                    "name": "美妆个护",
                    "type": 1,
                    "typeName": "公共类型",
                    "pid": 2,
                    "ownerId": null,
                    "remark": null,
                    "createTime": "2019-05-01 02:38:56",
                    "updateTime": null,
                    "creator": null,
                    "updater": null
                }
            ]
        },
        "msg": "OK"
    });
}


/*
编辑产品
* */
export const updateproduct = (param) => {
    //return fetch.put('/csr-wms/product',URLParams(param) )
    return Promise.resolve({"code":0,"msg":"OK","data":667});
}
/*
添加产品
* */
export const addproduct = (param) => {
    //return fetch.post('/csr-wms/product',URLParams(param) )
    return Promise.resolve({"code":0,"msg":"OK","data":667});
}
/*
产品
* */
export const getproduct = (param) => {
    //return fetch.get('/csr-wms/product/'+param)
    return Promise.resolve({
        "code": 0,
        "data": {
            "id": 676,
            "name": "相宜本草红景天美白护肤品套装（眼霜15g+水150ml+乳120g+精华液40g）",
            'sub_title':'抗氧美白 定格年轻',
            'share_desc':'国货大赏热卖中，速抢！',
            'keyword':'相宜本草、美白、护肤',
            'goodsnum':'公斤',
            'goodsal':'0.1',
            'mart_price':368,
            "type": 1,
            "typeName": "实物",
            "productCategoryId": 1,
            "productBrandId": 1,
            "merchantId": null,
            "merchantName": null,
            "ownerId": 1,
            "remark": null,
            "createTime": "2019-05-06 00:01:09",
            "updateTime": null,
            "creator": null,
            "updater": null
        },
        "msg": "OK"
    });
}
/*
获取产品
* */
export const getproducts = (param) => {
    //return fetch.get('/csr-wms/products',URLParams(param) )
    if(param.status==2){//已上架
        return Promise.resolve({
            "code": 0,
            "data": {
                "pageNum": 1,
                "pageSize": 20,
                "total": 5,
                "pages": 1,
                "list": [

                    {
                        "id": 668,
                        "name": "飞科(FLYCO)电动剃须刀全身水洗刮胡须刀FS372",
                        "productCategoryName": "家用电器",
                        "productBrandName": "飞科",
                        "fh":'一件代发',
                        "goodsPrice":'82',
                        'goodsnum':'500',

                        "typeName": "实物",
                        "merchantName": "1",
                        "stauts":'已上架',
                        "ownerId": 1,
                        "remark": "fddf",
                        "createTime": "2019-05-05 10:14:15",
                        "updateTime": "2019-05-05 10:18:21",
                        "creator": null,
                        "updater": null
                    },
                    {
                        "id": 668,
                        "name": "飞科（FLYCO） 电吹风机家用FH6222吹风筒 负离子",
                        "productCategoryName": "家用电器",
                        "productBrandName": "飞科",
                        "fh":'一件代发',
                        "goodsPrice":'65',
                        'goodsnum':'500',

                        "typeName": "实物",
                        "merchantName": "1",
                        "stauts":'已上架',
                        "ownerId": 1,
                        "remark": "fddf",
                        "createTime": "2019-05-05 10:14:15",
                        "updateTime": "2019-05-05 10:18:21",
                        "creator": null,
                        "updater": null
                    },
                    {
                        "id": 668,
                        "name": "花印（日本原装进口）水漾润颜补水化妆水190ml",
                        "productCategoryName": "美妆个护",
                        "productBrandName": "花印",
                        "fh":'一件代发',
                        "goodsPrice":'107',
                        'goodsnum':'500',

                        "typeName": "实物",
                        "merchantName": "1",
                        "stauts":'已上架',
                        "ownerId": 1,
                        "remark": "fddf",
                        "createTime": "2019-05-05 10:14:15",
                        "updateTime": "2019-05-05 10:18:21",
                        "creator": null,
                        "updater": null
                    },

                ]
            },
            "msg": "OK"
        });
    }else if(param.status==3){//已下架
        return Promise.resolve({
            "code": 0,
            "data": {
                "pageNum": 1,
                "pageSize": 20,
                "total": 5,
                "pages": 1,
                "list": [
                    {
                        "id": 1,

                        "name": "相宜本草红景天美白护肤品套装（眼霜15g+水150ml+乳120g+精华液40g）",
                        "productCategoryName": "美妆个护",
                        "productBrandName": "相宜本草",
                        "fh":'一件代发',
                        "goodsPrice":'220',
                        'goodsnum':'500',

                        "typeName": "实物",
                        "merchantName": "1",
                        "stauts":'已下架',
                        "ownerId": 1,
                        "remark": "fddf",
                        "createTime": "2019-05-05 10:14:15",
                        "updateTime": "2019-05-05 10:18:21",
                        "creator": null,
                        "updater": null
                    }


                ]
            },
            "msg": "OK"
        });
    }else if(param.status==4){//审核中
    return Promise.resolve({
        "code": 0,
        "data": {
            "pageNum": 1,
            "pageSize": 20,
            "total": 5,
            "pages": 1,
            "list": [
                {
                    "id": 668,
                    "name": "相宜本草去死皮膏68g",
                    "productCategoryName": "美妆个护",
                    "productBrandName": "相宜本草",
                    "fh":'一件代发',
                    "goodsPrice":'24.5',
                    'goodsnum':'500',

                    "typeName": "实物",
                    "merchantName": "1",
                    "stauts":'审核中',
                    "ownerId": 1,
                    "remark": "fddf",
                    "createTime": "2019-05-05 10:14:15",
                    "updateTime": "2019-05-05 10:18:21",
                    "creator": null,
                    "updater": null
                }

            ]
        },
        "msg": "OK"
    });
    }else{
        return Promise.resolve({
            "code": 0,
            "data": {
                "pageNum": 1,
                "pageSize": 20,
                "total": 5,
                "pages": 1,
                "list": [
                    {
                        "id": 1,

                        "name": "相宜本草红景天美白护肤品套装（眼霜15g+水150ml+乳120g+精华液40g）",
                        "productCategoryName": "美妆个护",
                        "productBrandName": "相宜本草",
                        "fh":'一件代发',
                        "goodsPrice":'220',
                        'goodsnum':'500',

                        "typeName": "实物",
                        "merchantName": "1",
                        "stauts":'已下架',
                        "ownerId": 1,
                        "remark": "fddf",
                        "createTime": "2019-05-05 10:14:15",
                        "updateTime": "2019-05-05 10:18:21",
                        "creator": null,
                        "updater": null
                    },
                    {
                        "id": 668,
                        "name": "相宜本草去死皮膏68g",
                        "productCategoryName": "美妆个护",
                        "productBrandName": "相宜本草",
                        "fh":'一件代发',
                        "goodsPrice":'24.5',
                        'goodsnum':'500',

                        "typeName": "实物",
                        "merchantName": "1",
                        "stauts":'审核中',
                        "ownerId": 1,
                        "remark": "fddf",
                        "createTime": "2019-05-05 10:14:15",
                        "updateTime": "2019-05-05 10:18:21",
                        "creator": null,
                        "updater": null
                    },
                    {
                        "id": 668,
                        "name": "飞科(FLYCO)电动剃须刀全身水洗刮胡须刀FS372",
                        "productCategoryName": "家用电器",
                        "productBrandName": "飞科",
                        "fh":'一件代发',
                        "goodsPrice":'82',
                        'goodsnum':'500',

                        "typeName": "实物",
                        "merchantName": "1",
                        "stauts":'已上架',
                        "ownerId": 1,
                        "remark": "fddf",
                        "createTime": "2019-05-05 10:14:15",
                        "updateTime": "2019-05-05 10:18:21",
                        "creator": null,
                        "updater": null
                    },
                    {
                        "id": 668,
                        "name": "飞科（FLYCO） 电吹风机家用FH6222吹风筒 负离子",
                        "productCategoryName": "家用电器",
                        "productBrandName": "飞科",
                        "fh":'一件代发',
                        "goodsPrice":'65',
                        'goodsnum':'500',

                        "typeName": "实物",
                        "merchantName": "1",
                        "stauts":'已上架',
                        "ownerId": 1,
                        "remark": "fddf",
                        "createTime": "2019-05-05 10:14:15",
                        "updateTime": "2019-05-05 10:18:21",
                        "creator": null,
                        "updater": null
                    },
                    {
                        "id": 668,
                        "name": "花印（日本原装进口）水漾润颜补水化妆水190ml",
                        "productCategoryName": "美妆个护",
                        "productBrandName": "花印",
                        "fh":'一件代发',
                        "goodsPrice":'107',
                        'goodsnum':'500',

                        "typeName": "实物",
                        "merchantName": "1",
                        "stauts":'已上架',
                        "ownerId": 1,
                        "remark": "fddf",
                        "createTime": "2019-05-05 10:14:15",
                        "updateTime": "2019-05-05 10:18:21",
                        "creator": null,
                        "updater": null
                    },

                ]
            },
            "msg": "OK"
        });
    }

}
/*
上架产品
* */
export const upperproduct = (param) => {
    //return fetch.put('/csr-wms/product',URLParams(param) )
    return Promise.resolve({"code":0,"msg":"OK","data":12});
}
/*
下架产品
* */
export const lowerproduct = (param) => {
    //return fetch.put('/csr-wms/product',URLParams(param) )
    return Promise.resolve({"code":0,"msg":"OK","data":12});
}
