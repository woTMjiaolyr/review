// map() 方法创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值
// 原生方法
Array.prototype.map = function (callback, thisArg) {
    if (this == undefined) {
        throw new TypeError('this is null or not defined');
    }
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }
    const res = [];
    const O = Object(this);
    const len = O.length >>> 0;
    for (let i = 0; i < len; i++) {
        if (i in O) {
            // 调用回调函数并传入新数组
            res[i] = callback.call(thisArg, O[i], i, O);
        }
    }
    return res;
}

// 利用reduce实现
Array.prototype.reduce_map = function (callback, thisArg) {
    if (this == undefined) {
        throw new TypeError('this is null or not defined');
    }
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }
    const res = [];
    let cbthis = thisArg || null; // call第一个参数传入null，则this指向全局对象
    this.reduce((prev, cur, index, array) => {
        res[index] = callback.call(cbthis, cur, index, array);
    }, 0) //这里的初始值0是给上面的prev，但是也没有用到
    return res;
}

// 利用reduce实现
Array.prototype.reduce_map = function (callback, thisArg) {
    if (typeof callback === 'function') {
        return this.reduce((prev, cur, index, array) => {
            prev.push(callback.call(thisArg, cur, index, array));
            return prev;
        }, [])
    } else {
        throw new TypeError('callback is not function');
    }
}