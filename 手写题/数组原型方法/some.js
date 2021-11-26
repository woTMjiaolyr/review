// some() 方法测试数组中是不是至少有1个元素通过了被提供的函数测试。
// 它返回的是一个Boolean类型的值。
Array.prototype.some = function (callback, thisArg) {
    if (this == undefined) {
        throw new TypeError('this is null or not defined');
    }
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }
    const O = Object(this);
    const len = O.length >>> 0;
    for (let i = 0; i < len; i++) {
        if (i in O) {
            if (callback.call(thisArg, O[i], i, O)) {
                return true;
            }
        }
    }
    return false;
}