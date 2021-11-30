function loadImage(src) {
    const promise = new Promise((resolve, reject) => {
        const img = document.createElement('img');
        img.onload = function () {
            resolve(img);
        }
        img.onerror = function () {
            reject(new Error('图片加载失败'))
        }
        img.src = src;
    })
    return promise;
}
const url = loadImage('https://jsdjahjhjshja.com');
url.then(img => {
    console.log('img', img);
}).catch((e) => {
    console.log('error', e);
})