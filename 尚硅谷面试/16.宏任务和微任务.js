/*
  宏任务：
     分类：setTimeout  setInterval  requestAnimationFrame
     1.宏任务所处的队列就是宏任务队列
     2.第一个宏任务队列中只有一个任务，执行主线程的js代码
     3.宏任务队列可以有多个


  微任务：
     分类：new Promise().then()  process.nextTick
     1.微任务所处的队列就是微任务队列
     2.只有一个微任务队列
     3.在上一个宏任务队列执行完毕后如果有微任务队列就会执行微任务队列中的所有任务

*/




