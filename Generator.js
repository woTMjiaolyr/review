function* func1() {
    console.log(666);
    yield '777'
    console.log(888);
}

const generObj = func1();
console.log(generObj);
// generobj为遍历器对象，
const back1 = generObj.next();
// .next()返回的back1为对象，其中有value 和 done两个属性
console.log(back1);
// 迭代对象中，value是yield后面的值或函数返回值，done为布尔型，若后面没有代码了，那就为true，否则为false
console.log(back1.value);
console.log(back1.done);
const back2 = generObj.next();
console.log(back2);