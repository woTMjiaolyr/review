Function.prototype._call = function (context) {
    //判断调用对象
    if (typeof this !== 'function') {
        console.error('type error');
    }
    //判断context是否传入，若未传入则设为window
    context = context || window;
    //将调用函数设为对象的方法
    context.fn = this;
    //接收参数 返回的args还是个数组 一会需要展开
    let args = [...arguments].slice(1);
    //获取执行结果
    let result = context.fn(...args);
    //删除方法
    delete context.fn;
    //返回
    return result;
}