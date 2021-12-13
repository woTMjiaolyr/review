
// 将一个数组打乱

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function fn(arr) {
    let res = [];
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        let num = Math.floor(Math.random() * (arr.length - 1));
        res.push(arr[num]);
        arr.splice(num, 1);
    }
    return res;
}

console.log(fn(arr));