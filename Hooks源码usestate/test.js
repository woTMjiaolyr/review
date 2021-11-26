
let isMount = true;  // 用来判断是第一次渲染mount还是之后的更新update

let workInProgressHook = null; // 链表，保存的是每一个hook对应的数据

const fiber = {
    stateNode: App,
    memoizedState: null
}

function useState(initialState) {
    let hook;
    if (isMount) { // 第一次渲染/挂载  mount
        hook = {
            memoizedState: initialState,
            next: null,
            queue: {  // 用来存储update
                pending: null
            }
        }
        if (!fiber.memoizedState) {
            fiber.memoizedState = hook;
        } else {
            // 当有多个useState时，第一个useState需要将创建的hook赋值给fiber.memoizedState
            // 第二个往后的useState就进入这个else，即用链表的形式将多个hook连起来
            workInProgressHook.next = hook;
        }
        workInProgressHook = hook;
    } else {
        // 第二次往后的渲染   update 
        // 已经在update时为每一个useState创建了一个hook，并将这些hook用链表workInProgressHook连接
        hook = workInProgressHook;  // 因为在update时，在schedule中已经将workInProgressHook重置为fiber中保存的第一个hook
        workInProgressHook = workInProgressHook.next;
    }

    // 经过以上逻辑，我们已经取到了当前useState对应保存的数据（hook）
    // 接下来，基于数据计算新的状态
    // todo
    let baseState = hook.memoizedState; // 获取上一次的状态
    if (hook.queue.pending) {
        let firstUpdate = hook.queue.pending.next;
        do {
            const action = firstUpdate.action;
            baseState = action(baseState);
            firstUpdate = firstUpdate.next;
        } while (firstUpdate !== hook.queue.pending.next)

        hook.queue.pending = null;
    }
    hook.memoizedState = baseState;
    return [baseState, dispatchAction.bind(null, hook.queue)]
}

function dispatchAction(queue, action) {
    const update = {
        action,
        next: null
    }
    if (queue.pending === null) {
        update.next = update;
    } else {
        update.next = queue.pending.next;
        queue.pending.next = update;
    }
    queue.pending = update;
}

function schedule() {
    // 更新前将workInProgressHook重置为fiber保存的第一个Hook
    workInProgressHook = fiber.memoizedState;
    const app = fiber.stateNode();
    isMount = false;
    return app;
}

function App() {
    const [num, updateNum] = useState(0);
    console.log('ismount?', isMount);
    console.log('num:', num);
    return {
        onclick() {
            updateNum(num => num + 1);
        }
    }
}

window.app = schedule();
// App().onclick(); // 模拟组件点击