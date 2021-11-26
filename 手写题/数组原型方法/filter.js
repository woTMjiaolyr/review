
// filter() 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。 

// callback 用来测试数组的每个元素的函数。
// 返回 true 表示该元素通过测试，保留该元素，false 则不保留
// callback 接受三个参数：element当前元素，index元素索引，array被遍历的数组本身
// thisArg 执行 callback 时，用于 this 的值。

Array.prototype.filter = function (callback, thisArg) {
    if (this === undefined) {
        throw new TypeError('this is null or not undefined');
    }
    if (typeof callback !== 'function') {
        throw new TypeError('this is null or not undefined');
    }
    const res = [];
    const O = Object(this); // 强制转换对象
    const len = O.length >>> 0; // >>>无符号移位,（删右侧，左侧用0填充），保证len是正整数
    for (let i = 0; i < len; i++) {
        if (i in O) {
            if (callback.call(thisArg, O[i], i, O)) {
                res.push(O[i]);
            }
        }
    }
    return res;
}

// 利用reduce实现
Array.prototype.reduce_filter = function (callback, thisArg) {
    if (this === undefined) {
        throw new TypeError('this is null or not undefined');
    }
    if (typeof callback !== 'function') {
        throw new TypeError('this is null or not undefined');
    }
    const res = [];
    this.reduce((prev, cur, index, array) => {
        if (callback.call(thisArg, cur, index, array)) {
            res[index] = cur;
        }
    }, 0)
    return res;
}

// 利用reduce实现
Array.prototype.reduce_filter = function (callback, thisArg) {
    if (typeof callback === 'function') {
        return this.reduce((prev, cur, index, array) => {
            callback.call(thisArg, cur, index, array) ? prev.push(cur) : null;
            return prev;
        }, [])
    } else {
        throw new TypeError('callback is not function');
    }

}