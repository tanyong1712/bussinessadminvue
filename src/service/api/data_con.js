
export const pageSize = 20;
export const pageNo = 1;
export const dataDeal = (obj) => {
    if (obj === null || obj === undefined) {
        return obj;
    }
    if (obj.pageNo === null || obj.pageNo === undefined || obj.pageNo === '') {
        obj.pageNo = pageNo;
    }
    if (obj.pageSize === null || obj.pageSize === undefined || obj.pageNo === '') {
        obj.pageSize = pageSize;
    }
    return obj;
}

export const URLParams = (obj) => {
    const params = new URLSearchParams();
    if (obj === null || obj === undefined) {
        return params;
    }
    for(let i in obj){
        params.append(i, obj[i]);
    }
    return params;
}
