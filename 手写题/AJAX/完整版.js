function Ajax(option) {
    // 请求地址
    const url = option.url;
    // 请求方法 (默认为get)
    const method = option.method.toLowerCase() || 'get';
    // 是否异步
    const async = option.async;
    // 请求参数
    const data = option.data;

    let xhr = new XMLHttpRequest();
    // 处理超时
    if (option.timeout && option.timeout > 0) {
        xhr.timeout = option.timeout;
    }
    return new Promise((resolve, reject) => {
        xhr.ontimeout = () => reject('请求超时');
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                    resolve(xhr.response)
                } else {
                    reject();
                }
            }
        }
        xhr.onerror = err => reject(err);
        // 处理请求参数
        let paramArr = [];
        let encodeData;
        if (data instanceof Object) {
            for (let key in data) {
                // 参数需要通过encodeURIComponent进行编码   
                paramArr.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
            }
            encodeData = paramArr.join('&');
        }
        // get请求拼接参数   get请求就直接拼接在url后面，post请求就把参数作为参数传给xhr.send()
        if (method === 'get') {
            const index = url.indexOf('?');
            if (index === -1) {
                url += '?'   // 没有？了，说明前面没有参数，加？后面开始拼参数
            } else if (index !== url.length - 1) {
                url += '&';  // 有？说明前面已经有参数了，加&后面继续拼
            }
            url += encodeData;
        }
        // 初始化
        xhr.open(method, url, async);
        if (method === 'get') {
            xhr.send();
        } else {
            // post请求需要设置请求头
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
            xhr.send(encodeData);
        }
    })
}

// 获取url参数  decodeURIComponent用来解码
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

// 测试
const user = getParams('http://www.baidu.com?user=%E9%98%BF%E9%A3%9E&age=16')
console.log(user) // { user: '阿飞', age: '16' }