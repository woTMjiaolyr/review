// 利用promise控制并发数量 (带并发限制的异步调度器)

/*
 设计思路：
    1. 设计schedule类，要具有并发数量限制功能，需要定义最大可并发数量max，从传入参数中获取，。并定义当前并发任务数count，表示正在执行的任务数量。另外，定义一个待执行的任务队列list。
    2. 在添加任务add函数中，首先判断当前正在执行的任务数，
        (a) 若当前任务数达到最大容量max，则当前的任务需要阻塞在此处。具体做法为，new一个Promise对象，将其resolve函数的引用推入队列list中。只要resolve没有执行，那么当前任务就会一直阻塞在这里。
        (b) 若当前正在执行的任务没有达到最大容量，那么对count进行加1，执行当前的promisecreater，并拿到返回结果res，执行完毕后对count进行减1。若此时队列list中还有未被执行的resolve，说明之前有任务因为并发数量的限制而被阻塞，将对头的resolve弹出并执行，之后相对的被阻塞的任务就可以继续执行了。
    3. 最后返回执行结果res。

*/

class Schedule {
    constructor(maxNum) {
        this.list = [];
        this.max = maxNum;
        this.count = 0
    }
    async add(promiseCreater) {
        if (this.count >= this.max) {
            // 若当前正在执行任务数大于max
            // 阻塞在此处，等待前面的任务执行完毕后将resolve弹出并执行。
            await new Promise(resolve => { this.list.push(resolve) })
        }
        this.count++;
        const res = await promiseCreater();
        this.count--;
        // 若队列中有值，将其resolve弹出，并执行
        // 以便阻塞的任务，可以正常执行。
        this.list.length && this.list.shift()();
        return res;
    }

}
const timeout = (time) => {
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    })
}
const schedule = new Schedule(2);
const addTask = (time, order) => {
    // .then在里面
    // schedule.add(() => timeout(time).then(() => { console.log(order) }))
    // .then在外面
    schedule
        .add(() => timeout(time))
        .then(() => { console.log(order); })
}

addTask(1000, 1);
addTask(500, 2);
addTask(300, 3);
addTask(400, 4);


