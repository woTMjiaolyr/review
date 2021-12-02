Function.prototype._bind = function (context) {
    if (typeof this !== 'function') {
        console.error('type error');
    }
    var self = this,
        args = arguments.slice(1);
    return function Fn() {
        return self.apply(
            this instanceof Fn ? this : context,
            args.concat(...arguments));
    }
}
/*
1.添加方法
2.执行方法，获得结果(执行的时候都参数都需要展开)
3.删除方法
4.返回结果
*/
Function.prototype._apply = function (context) {
    if (typeof this !== 'function') {
        console.error('type error');
    }
    let result = null;
    context = context || window;
    context.fn = this;
    // 接受的是数组
    if (arguments[1]) {
        result = context.fn(...arguments[1]);
    } else {
        result = content.fn();
    }
    delete context.fn;
    return result;

}
Function.prototype._call = function () {
    if (typeof this !== 'function') {
        console.error('type error');
    }
    let result = null;
    context = context || window;
    context.fn = this;
    // 接收参数
    let args = [...arguments].slice(1);
    result = content.fn(...args);
    delete context.fn;
    return result;
}

// 利用call apply 求数组最值
var arr = [1, 3, 7, 22, 677, -1, 2, 70];
Math.max.apply(Math, arr);
// 利用call apply 做继承
function Animal(name) {
    this.name = name;
    this.showName = function () {
        console.log(this.name);
    }
}
function Cat(name) {
    Animal.call(this, name);
}
var cat = new Cat("TONY");
cat.showName(); //TONY
// 将伪数组转化为数组
Array.prototype.slice.call(伪数组);
// 判断数据类型
function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}
console.log(Object.prototype.toString.call(arr1)); // [object Array] 
console.log(Object.prototype.toString.call(str1)); // [object String] 
console.log(Object.prototype.toString.call(obj1)); // [object Object] 
console.log(Object.prototype.toString.call(null)); // [object Null]

// 实现一个方法，使得：add(2, 5) 和 add(2)(5) 的结果都为 7
function add(x, y) {
    if (arguments.length === 1) {
        return (z) => x + z;
    } else {
        return x + y;
    }
}
//函数柯里化 版本一
function curry(fn) {
    // 获取原函数的参数长度
    const argLen = fn.length;
    // 保存当前传入的参数  将类数组转化为数组，并取index=1往后的参数
    const presentArgs = [].slice.call(arguments, 1);
    // 返回一个新函数
    return function () {
        // 新函数会继续传参
        const curArgs = preArgs.concat([...arguments]);
        // 合并之前所有的参数
        const allArgs = [...presentArgs, ...curArgs];
        if (allArgs.length >= argLen) {
            // 如果参数够了，直接执行
            return fn.apply(this, allArgs);
        } else {
            // 如果不够，继续柯里化，参数有fn和之前传入的参数
            return curry.call(null, fn, ...allArgs);
        }
    }
}
function add(a, b, c) {
    return a + b + c;
}
var curried = curry(add);
curried(1, 2, 3); // 6
curried(1, 2)(3); // 6
curried(1)(2, 3); // 6
curried(1)(2)(3); // 6
curried(7)(8)(9); // 24
// 柯里化简洁版
const curry = (fn, ...args) =>
    args.length < fn.length
        ? (...arguments) => curry(fn, ...args, ...arguments)
        : fn(...args);

// 手写new
function creat() {
    let obj = new Object();
    let [Con, ...args] = [...arguments];
    obj._proto_ = Con.prototype;
    let res = Con.apply(obj, args);
    return typeof res === 'object' ? res : obj;
}
// 手写instanceof   右边变量的原型是否存在于左边变量的原型链上
function _instanceof(left, right) {
    let proto = left._proto_;
    let prototype = right.prototype;
    while (true) {
        if (proto === null) return false;
        if (proto === prototype) return true;
        proto = proto._proto_;
    }
}
// 实现object.create
function create(obj) {
    function F() { };
    F.prototype = obj;
    return new F();
}
// 防抖节流
function throttle(fn, wait) {
    let curTime = 0;
    return function () {
        let nowTime = Date.now();
        if (nowTime - curTime >= wait) {
            fn();
            curTime = Date.now();
        }
    }
}
function debounce(fn, wait) {
    let timer = null;
    return function () {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn();
        }, wait)
    }
}
// 浅拷贝
// 1. ...实现
let copy1 = { ...{ x: 1 } }
// 2. Object.assign实现
let copy2 = Object.assign({}, { x: 1 })
// 3.手写函数
function shallowCopy(obj) {
    if (!obj || typeof obj !== 'Object') return;
    let newObj = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = obj[key];
        }
    }
}
// 深拷贝
// 1. JOSN.stringify()/JSON.parse()
let obj = { a: 1, b: { x: 3 } }
JSON.parse(JSON.stringify(obj))
// 2.手写
function deepCopy(obj) {
    let newObj = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = typeof obj[key] === 'Object' ? deepCopy(obj[key]) : obj[key];
        }
    }
    return newObj;
}

// 使用setTimeout模拟setInterval
// 可避免setInterval因执行时间导致的间隔执行时间不一致
setTimeout(function () {
    // doingSomething
    setTimeout(arguments.callee, interval)
}, interval)

// 原型链继承   ES5
Child.prototype = new Parent();
Child.prototype.constructor = Child;
// 构造函数继承
function Child() {
    Parent.call(this);
}

// 发布订阅模式
class EventCenter {
    constructor() {
        this.handlers = {};
    }
    // 订阅、监听
    addListener(type, handler) {
        if (!this.handlers[type]) {
            this.handlers[type] = [];
        }
        this.handlers[type].push(handler);
    }
    // 发布、触发
    dispatchEvent(type, params) {
        if (!this.handlers[type]) {
            return new Error('事件未注册');
        }
        this.handlers[type].forEach(handle => {
            handle(params);
        })
    }
    // 事件移除
    removeEventListener(type, handler) {
        if (!this.handlers[type]) {
            return new Error('事件无效');
        }
        if (!handler) {
            // 若无第二个参数，则删除type对应事件的发布和订阅
            delete this.handlers[type];
        } else {
            const index = this.handlers[type].findIndex(el => el === handler);
            if (index === -1) {
                return new Error('无绑定该事件');
            }
            this.handlers[type].slice(index, 1);
            if (this.handlers[type].length === 0) {
                delete this.handlers[type];
            }
        }
    }
}
let a = new EventCenter();

// promise
function Promise(excutor) {
    const self = this;
    self.status = 'pending';
    self.data = undefined;
    function resolve(value) {
        if (self.status === 'pending') {
            self.status = 'resolved';
            self.data = value;
        }
    }
    function reject(reason) {
        if (self.status === 'pending') {
            self.status = 'rejected';
            self.data = reason;
        }
    }
    try {
        fn(resolve, reject);
    } catch (err) {
        reject(err)
    }
}
Prmoise.prototype.then = function (onResolved, onRejected) {
    onResolved = typeof onResolved === 'function' ? onResolved : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };
    const self = this;
    return new Promise((resolve, reject) => {
        function handle(callback) {
            /* 三种情况：
                1.如果抛出异常, 新promise变为rejected, reason为抛出的异常
                2.如果返回的是非promise的任意值, 新promise变为resolved, value为返回的值
                3.如果返回的是**另一个新promise**, 此promise的结果就会成为新promise的结果 
                注：.then()或.catch()不能返回promise本身，否则会造成死循环
            */
            try {
                const result = callback(self.data);
                if (result instanceof Promise) {
                    Promise.then(resolve, reject);
                } else {
                    resolve(result);
                }
            } catch (error) {
                reject(error);
            }
        }
        if (self.status === 'resolved') {
            handle(onResolved);
        } else if (self.status === 'rejected') {
            handle(onRejected);
        }
    })
}
Promise.resolve = function (value) {
    return new Promise((resolve, reject) => {
        if (value instanceof Promise) {
            Promise.then(resolve, reject);
        } else {
            resolve(value);
        }
    })
}
Promise.reject = function (reason) {
    return new Promise((resolve, reject) => {
        reject(reason);
    })
}
Promise.all = function (promises) {   // *** 在.then中处理
    const values = new Array(promises.length);
    let count = 0;
    return new Promise((resolve, reject) => {
        promises.forEach((item, index) => {
            Promise.then(item).then(
                value => {
                    values[index] = value;
                    count++;
                    if (count === promises.length) {
                        resolve(values);
                    }
                }, reason => {
                    reject(reason);
                }
            )
        })
    })
}
Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
        promises.forEach(item => {
            Promise.resolve(item).then(
                value => {
                    resolve(value);
                },
                reason => {
                    reject(reason);
                }
            )
        })
    })
}

// 图片懒加载
let img = document.querySelectorAll('img');
let num = img.length;
let n = 0; // 用来优化，每次不用从第一张开始遍历
let clientHeight = document.body.clientHeight;
function lazyLoad() {
    let scrollTop = document.body.scrollTop;
    for (let i = n; i < num; i++) {
        if (clientHeight + scrollTop > img[i].offsetTop) {
            if (img[i].getAttribute('src') === './abc.png') {
                img[i].src = img[i].getAttribute('data-src');
            }
            n = i + 1;
        }
    }

}

// rem实现原理  ??????
function setRem() {
    let doc = document.documentElement;
    let width = doc.getBoundingClientRect().width;
    let rem = width / 75;  // ?????
    doc.style.fontSize = res + 'px';
}
window.addEventListener('resize', setRem);

// 手写Ajax
let xhr = new XMLHttpRequest();
xhr.open(method, url, async);
ShadowRoot.onreadystatechange = () => {
    if (xhr.readyState == 4) {
        if (xhr.status === 200) {
            console.log(xhr.response);
        }
    }
}
xhr.send();

// 拖拽功能
window.onload = function () {
    // drag处于决定定位状态
    let drag = document.getElementById('box');
    drag.onmousedown = function (e) {
        var e = e || window.enevt;
        // 鼠标与拖拽元素边界的距离 = 鼠标与可视边界的距离 - 拖拽元素与边界的距离
        let diffX = e.clientX - drag.offsetLeft;
        let diffY = e.clientY - drag.offsetTop;
        drag.onmousemove = function (e) {
            // 拖拽元素移动的距离 = 鼠标与可视边界的距离 - 鼠标与拖拽元素边界的距离
            // 元素x/y = 现在鼠标x/y - 原来鼠标x/y + 原来元素 x/y
            let left = e.clientX - diffX;
            let top = e.clientY - diffY;
            // 避免拖出可视区
            if (left < 0) {
                left = 0;
            } else if (left > window.innerWidth - drag.offsetWidth) {
                left = window.innerWidth - drag.offsetWidth;
            }
            if (top < 0) {
                top = 0;
            } else if (top > window.innerHeight - drag.offsetHeight) {
                top = window.innerHeight - drag.offsetHeight;
            }
            drag.style.left = left + 'px';
            drag.style.top = top + 'px';
        }
        drag.onmouseup = function (e) {
            // 当鼠标弹起时不在移动
            this.onmousedown = null;
            this.onmouseup = null;// 预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动） ????
        }
    }
}

// 数组去重
const newArr = [...new Set(arr)];
const newArr = Array.from(new Set(arr));
function resetArr(arr) {
    let res = []
    arr.forEach(item => {
        if (res.indexOf(item) === -1) {
            res.push(item)
        }
    })
    return res
}

// 获取url参数
function getParams(url) {
    const res = {}
    if (url.includes('?')) {
        const str = url.split('?')[1]
        const arr = str.split('&')
        arr.forEach(item => {
            const key = item.split('=')[0]
            const val = item.split('=')[1]
            res[key] = decodeURIComponent(val)
        })
    }
    return res
}

// 获取url参数
// 输入：https://toutiao.com/home?a=q&b=w&c=e&a=r
// 输出： { a: [‘q’, ‘r’], b: ‘w‘, c: ‘e’ }
function getQuery(url) {
    let queries = url.split('?')[1].split('&');
    let map = new Map();
    queries.forEach((item) => {
        let [key, val] = item.spilit('=');
        if (!map.has(key)) {
            map.set(key, val);
        } else {
            let curVal = map.get(key);
            map.set(key, [...curVal, val]);
        }
    })
    return Object.fromEntries(map);
}
function getQuery(url) {
    let quiers = url.split('?')[1].split('&');
    let obj = {};
    quiers.forEach((item) => {
        let [key, val] = item.split('='); // 要用到结果运算符
        if (!obj.hasOwnProperty(key)) {
            obj[key] = val;
        } else {
            const curVal = obj[key];
            obj[key] = [...curVal, val];
        }
    })
    return obj;
}

// 二叉树层序遍历
function order(root) {
    if (!root) return [];
    let queue = [root];
    let res = [];
    while (queue.length) {
        let len = queue.length;
        let cur = [];
        for (let i = 0; i < len; i++) {
            let node = queue.shift();
            cur.push(node.val);
            node.left && queue.push(node.left);
            node.right && queue.push(node.right);
        }
        res.push(cur);
    }
    return res;
}

// fetch请求延迟处理
let controller = new AbortController();
let signal = controller.signal;

let timeoutPromise = (delay) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('请求超时');
            controller.abort();
        }, delay);
    })
}
let request = (url) => {
    return fetch(url, {
        signal: signal
    });
}
Promise.race([timeoutPromise(5000), request('http://xxxxxxxx')])
    .then(value => {
        console.log(value);
    }).catch(error => {
        console.log(error);
    })

// 冒泡排序
function bubbleSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
}

// 快速排序
function quickSort(arr, from, to) {
    var i = from;
    var j = to;
    var key = arr[from];
    if (from >= to) {
        return;
    }
    while (i < j) {
        while (arr[j] > key && i < j) {
            j--;
        }
        while (arr[i] <= key && i < j) {
            i++
        }
        if (i < j) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    arr[from] = arr[i];
    arr[i] = key;
    quickSort(arr, from, i - 1);
    quickSort(arr, i + 1, to);
}

/*
现在来探讨 [] == ! [] 的结果为什么会是true
1、根据运算符优先级 ，！ 的优先级是大于 == 的，所以先会执行 ![]
      ！可将变量转换成boolean类型，null、undefined、NaN以及空字符串('')取反都为true，其余都为false。
      所以 ! [] 运算后的结果就是 false
   也就是 [] == ! [] 相当于 [] == false
2、根据上面提到的规则（如果有一个操作数是布尔值，则在比较相等性之前先将其转换为数值——false转换为0，而true转换为1），则需要把 false 转成 0
   也就是 [] == ! [] 相当于 [] == false 相当于 [] == 0
3、根据上面提到的规则（如果一个操作数是对象，另一个操作数不是，则调用对象的valueOf()方法，
      用得到的基本类型值按照前面的规则进行比较，如果对象没有valueOf()方法，则调用 toString()）
      而对于空数组，####[].toString() ->  ''(返回的是空字符串) ####
    也就是  [] == 0 相当于 '' == 0
4、根据上面提到的规则（如果一个操作数是字符串，另一个操作数是数值，在比较相等性之前先将字符串转换为数值）
       Number('') -> 返回的是 0
    相当于 0 == 0 自然就返回 true了
总结一下：
[] == ! []   ->   [] == false  ->  [] == 0  ->   '' == 0   ->  0 == 0   ->  true

那么对于 {} == !{} 也是同理的
关键在于 #### {}.toString() ->  NaN(返回的是NaN) ####
根据上面的规则（如果有一个操作数是NaN，则相等操作符返回 false）
总结一下：
{} == ! {}   ->   {} == false  ->  {} == 0  ->   NaN == 0    ->  false

*/

