/*
  js引擎在代码正式执行前会做一个预处理工作：
   1.收集变量  var
   2.收集函数  function(){}
   
  执行上下文 执行上下文对象
   理解：代码执行的环境
   时机：代码正式执行前会进入到执行环境
   工作：
    1.创建变量对象
      a.变量     b.函数奇函数的参数
    2.确认this的指向
      a. window  b. 调用其的对象
    3.创建作用域链
      父级作用域链+当前的变量对象

    扩展： 执行上下文是个对象
      ECObj={
        变量对象：{ 变量，函数，函数的形参 }，
        scopeChain：父级作用域链+当前的变量对象，
        this:{ window || 调用其对象 }
      }
*/

console.log(username);
var username = 'tom';

fun();
function fun() {
  console.log('fun()');
}

/*
  由于变量提升，上面代码等同于：
*/
var username;
console.log(username);
username = 'tom';

function fun() {
  console.log('fun()');
}
fun();

// 块级作用域
for (let i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, i * 500);
}

for (var i = 0; i < 5; i++) {
  (function (i) {
    setTimeout(function () {
      console.log(i);
    }, i * 500);
  })(i)
}

