
// 使定时器没回调

// await只能在async中使用，await后面必须跟promise才会有排队效果，跟普通函数没有排队效果

console.log(0);
await delay(1000);
console.log(1);

const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));