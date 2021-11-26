Function.prototype._bind = function (context) {
    if (typeof this !== 'function') {
        console.error('type error');
    }
    var self = this,
        args = [...arguments].slice(1);

    //bind是返回一个函数
    return function Fn() {
        return self.apply(
            this instanceof Fn ? this : context,
            args.concat(...arguments)
        )
    }
}