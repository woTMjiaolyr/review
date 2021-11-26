// reduce() 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。
// callback四个参数：
//   1. accumulator累计器累计回调的返回值; 它是上一次调用回调时返回的累积值，或initialValue
//   2.3.4 currentValue index array
Array.prototype.reduce = function (callback, initialValue) {
    if (this == undefined) {
        throw new TypeError('this is null or not defined');
    }
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }
    const O = Object(this);
    const len = O.length >>> 0;
    let accumulator = initialValue;
    let k = 0;
    // 如果第二个参数为undefined的情况下，则数组的第一个有效值作为累加器得到初始值
    if (accumulator === undefined) {
        while (k < len && !(k in O)) { // 找第一个有效值
            k++;
        }
        if (k >= len) {   // 没找到就报错
            throw new TypeError('Reduce of empty array with no initial value')
        }
        accumulator = O[k++]; // 找到了就赋初值
    }
    while (k < len) {
        if (k in O) {
            // callback.call(undefined,accumulator,O[k],k,O);
            accumulator = callback(accumulator, O[k], k, O);
        }
        k++;
    }
    return accumulator;
}