
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
    return newObj;
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