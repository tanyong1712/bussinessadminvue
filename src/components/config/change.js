function two(num) {
    if(num<10){
        return '0' + num + ''
    }else{
        return num
    }
}

// 时间戳转化为显示格式的时间
export const timestampToTime = (timestamp) => {
    //判断时间戳是秒还是毫秒
    timestamp = timestamp >= 10000000000 ? timestamp : timestamp*1000;
    let time = new Date(timestamp);
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let day = time.getDate();
    let hour = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    return year + '/' + month  + '/' + day  + ' ' + two(hour)  + ':' + two(minutes) + ':' + two(seconds);
}

//电话号码隐藏中间四位
export const hideFullTel = (tel) => {
    let str1 = tel.substr(0,3)
    let str2 = tel.substr(7,4)
    return str1 + '****' + str2
}

//身份证号码隐藏出生年月日
export const hideFullCard = (card) => {
    let str1 = card.substr(0,6)
    let str2 = card.substr(-4)
    return str1 + '******' + str2
}


