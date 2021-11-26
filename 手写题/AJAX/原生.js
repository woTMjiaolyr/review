const URL = '/server';
let xhr = new XMLHttpRequest();
xhr.open('GET', URL, true); // 第三个参数表示异步请求
xhr.onreadystatechange = function () {  // 状态监听函数
    if (this.readyState == 4) { // 请求状态
        if (this.state === 200 || this.status === 304) {
            handle(this.response); // xhr.response请求结果
        } else {
            console.error(this.statusText);
        }
    }
}
xhr.onerror = function () {
    console.error(this.statusText);
}
xhr.send();