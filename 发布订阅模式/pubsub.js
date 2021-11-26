var Event = (function () {
    var list = {},  //订阅者列表
        listen,
        trigger,
        remove;
    // 订阅
    listen = function (key, fn) {
        if (!list[key]) {
            list[key] = [];
        }
        list[key].push(fn);
    };
    // 发布
    trigger = function () {
        //对应的key取出来 
        var key = Array.prototype.shift.call(arguments); //拿到第一个参数
        var fns = list[key];
        if (!fns || fns.length == 0) {
            return
        }
        for (var i = 0, fn; fn = fns[i++];) {
            // fn.apply(this, arguments); 可以用展开运算符写
            fn(...arguments);
        }
    };
    remove = function (key, fn) {
        var fns = list[key];
        if (!fns) {
            return false;
        }
        if (!fn) {
            fn && (fns.length = 0)
        } else {
            for (var i = fns.length; i >= 0; i--) {
                var _fn = fns[i];
                if (fn === _fn) {
                    fns.splice(i, 1);
                }
            }
        }
    };
    return {
        listen,
        trigger,
        remove,
    }
})()