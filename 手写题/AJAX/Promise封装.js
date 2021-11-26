function getJSON(url) {
    let promise = new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function () {  // 状态监听函数
            if (xhr.readyState == 4) {
                if (xhr.status === 200 || xhr.status === 304) {
                    resolve(xhr.response);
                } else {
                    reject(new Error(xhr.statusText));
                }
            }
        }
        xhr.onerror = function () {  // 请求失败时的监听函数
            reject(new Error(xhr.statusText));
        }
        xhr.send(); // 若为post请求，括号内传参
    })
    return promise;
}