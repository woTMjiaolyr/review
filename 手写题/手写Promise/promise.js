(function (window) {

    function Promise(excutor) {
        const self = this;
        self.status = 'pending';
        self.data = undefined;
        self.callbacks = []; //每个元素的结构：{ onResolved(){}, onRejected(){}}

        function resolve(value) {
            if (self.status !== 'pending') {
                return;
            }
            self.status = 'resolved';
            self.data = value;
            if (self.callbacks.length > 0) {
                // 如果有待执行的callbacks，以及异步执行
                setTimeout(() => {
                    self.callbacks.forEach(callbackObj => {
                        callbackObj.onResolved(value)
                    })
                })
            }
        }
        function reject(reason) {
            if (self.status !== 'pending') {
                return;
            }
            self.status = 'rejected';
            self.data = reason;
            if (self.callbacks.length > 0) {
                // 如果有待执行的callbacks，以及异步执行
                setTimeout(() => {
                    self.callbacks.forEach(callbackObj => {
                        callbackObj.onRejected(reason)
                    })
                })
            }
        }

        //立即同步执行excutor
        try {
            excutor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }

    Promise.prototype.then = function (onResolved, onRejected) {

        //指定一个默认的成功回调
        onResolved = typeof onResolved === 'function' ? onResolved : value => value;// 向后传递成功的值
        //promise异常穿透（默认的失败回调）
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }// 向后传递失败的值

        const self = this;

        return new Promise((resolve, reject) => {

            // 执行指定的回调函数（callback） 根据执行结果改变promise的状态
            function handle(callback) {
                /* 三种情况：
                       1.如果抛出异常, 新promise变为rejected, reason为抛出的异常
                       2.如果返回的是非promise的任意值, 新promise变为resolved, value为返回的值
                       3.如果返回的是**另一个新promise**, 此promise的结果就会成为新promise的结果 
                       注：.then()或.catch()不能返回promise本身，否则会造成死循环
                */
                try {
                    const result = callback(self.data);
                    if (result instanceof Promise) {
                        Promise.then(resolve, reject);
                    } else {
                        resolve(result)
                    }
                } catch (error) {
                    reject(error)
                }
            }

            if (self.status === 'resolved') {
                setTimeout(() => {
                    handle(onResolved)
                })
            } else if (self.status === 'rejected') {
                setTimeout(() => {
                    handle(onRejected)
                })

            } else {
                //当前promise状态为pending????
                self.callbacks.push({
                    onResolved() {
                        handle(onResolved)
                    },
                    onRejected() {
                        handle(onRejected)
                    }
                })
            }

        })
    }

    //指定失败的回调函数
    //返回一个新的promise对象
    Promise.prototype.catch = function (onRejected) {
        return this.then(undefined, onRejected)
    }

    Promise.resolve = function (value) {
        return new Promise((resolve, reject) => {
            if (value instanceof Promise) {
                value.then(resolve, reject);
            } else {
                resolve(value);
            }
        })
    }

    Promise.reject = function (reason) {
        return new Promise((resolve, reject) => {
            reject(reason)
        })
    }

    //接受一个数组，返回一个promise，当所有promise都成功时，才成功
    Promise.all = function (promises) {
        const values = new Array(promises.length); //用来保存所有成功value的数组
        let count = 0; //计数器用来保存成功promise的数量
        return new Promise((resolve, reject) => {
            promises.forEach((p, index) => {
                Promise.resolve(p).then(
                    value => { //p成功，将成功的value保存到values数组
                        values[index] = value;
                        count++;
                        if (count === promises.length) {
                            resolve(values)
                        }
                    },
                    reason => {
                        reject(reason)
                    }
                )
            })
        })
    }

    // 接受一个promise数组，其结果由第一个完成的promise决定
    Promise.race = function (promises) {
        return new Promise((resolve, reject) => {
            promises.forEach(p => {
                Promise.resolve(p).then(() => {
                    value => {
                        resolve(value)
                    },
                        reason => {
                            reject(reason)
                        }
                })
            })
        })
    }

    //向外暴露Promise函数
    window.Promise = Promise;
})(window)