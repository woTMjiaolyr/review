// 利用promise控制并发数量 (带并发限制的异步调度器)
// 递归 方法一
class Schedule {
    constructor(maxNum) {
        this.list = [];
        this.maxNum = maxNum;
        this.workingNum = 0
    }
    // 利用add函数将promisecreater放入队列
    add(promiseCreater) {
        this.list.push(promiseCreater);
    }
    // 启动(初始化)，刚开始用for循环来控制并发数量。
    start() {
        for (let i = 0; i < this.maxNum; i++) {
            this.doNext();
        }
    }
    // 继续执行下一个promise
    doNext() {
        if (this.list.length && this.workingNum < this.maxNum) {
            const promise = this.list.shift();
            this.workingNum++;
            promise().then(() => {
                this.workingNum--;
                // 前一个任务完成，利用递归将后续任务启动
                this.doNext();
            })
        }
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
    schedule.add(() => timeout(time).then(() => { console.log(order) }))
}
addTask(1000, 1);
addTask(500, 2);
addTask(300, 3);
addTask(400, 4);
schedule.start();


