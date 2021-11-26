// forEach() 方法对数组的每个元素执行一次给定的函数。
// 与map的区别是forEach没有返回值（undefined）
// forEach 不会直接改变调用它的对象，但是那个对象可能会被 callback 函数改变

// callback 接受三个参数：currentValue当前元素，index元素索引，array被遍历的数组本身
// thisArg 执行 callback 时，用于 this 的值。

Array.prototype.forEach = function (callback, thisArg) {
    if (this === undefined) {
        throw new TypeError('this is null or not undefined');
    }
    if (typeof callback !== 'function') {
        throw new TypeError('this is null or not undefined');
    }
    const O = Object(this);
    const len = O.length >>> 0;
    for (let i = 0; i < len; i++) {
        if (i in O) {
            callback.call(thisArg, O[i], i, O);
        }
    }
}