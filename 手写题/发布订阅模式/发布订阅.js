// 发布订阅模式
class EventCenter {
    constructor() {
        this.handlers = {};
    }
    // 订阅、监听
    addListener(type, handler) {
        if (!this.handlers[type]) {
            this.handlers[type] = [];
        }
        this.handlers[type].push(handler);
    }
    // 发布、触发
    dispatchEvent(type, params) {
        if (!this.handlers[type]) {
            return new Error('事件未注册');
        }
        this.handlers[type].forEach(handle => {
            handle(params);
        })
    }
    // 事件移除
    removeEventListener(type, handler) {
        if (!this.handlers[type]) {
            return new Error('事件无效');
        }
        if (!handler) {
            // 若无第二个参数，则删除type对应事件的发布和订阅
            delete this.handlers[type];
        } else {
            const index = this.handlers[type].findIndex(el => el === handler);
            if (index === -1) {
                return new Error('无绑定该事件');
            }
            this.handlers[type].slice(index, 1);
            if (this.handlers[type].length === 0) {
                delete this.handlers[type];
            }
        }
    }
}