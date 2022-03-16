##### 1. 在构造函数调用 super 并将 props 作为参数传入的作用是啥？
      在调用 super() 方法之前，子类构造函数无法使用this引用，ES6 子类也是如此。将 props 参数传递给 super() 调用的主要原因是在子【构造函数】中能够通过this.props来获取传入的 props。
##### 2. 受控组件和非受控组件
      受控组件：
        在HTML中，标签<input>、<textarea>、<select>的值的改变通常是根据用户输入进行更新。在React中，可变状态通常保存在组件的状态state属性中，并且只能使用 setState()更新（必须通过onChange属性），而呈现表单的React组件也控制着在后续用户输入时该表单中发生的情况，以这种由React控制的输入表单元素而改变其值的方式，称为：“受控组件”。
      非受控组件：
        表单数据由DOM本身处理。即不受setState()的控制，与传统的HTML表单输入相似，input输入值即显示最新值（使用 ref从DOM获取表单值）
      总结：
        页面中所有输入类的DOM如果是现用现取的称为非受控组件，而通过setState将输入的值维护到了state中，需要时再从state中取出，这里的数据就受到了state的控制，称为受控组件。
##### 3.如何 React.createElement ？
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
)
上述代码用React.createElement实现
const element = React.createElement(
  'h1',      // 标签名称
  {className: 'greeting'},  // 属性
  'Hello, world!'   // 子节点
);

##### 4.讲讲什么是 JSX ？ 
        将原始 HTML 模板嵌入到 JS 代码中。JSX 代码本身不能被浏览器读取，必须使用Babel和webpack等工具将其转换为传统的JS。
##### 5.为什么不直接更新state呢？
        如果试图直接更新state（引用类型），则不会重新渲染组件。
        需要使用setState()方法来更新 state。它会对对组件state对象的更新。
        要想办法创建新的引用（newState）
        当state改变时，组件通过重新渲染来响应。
##### 6.生命周期
        1.有四个阶段：
           1. Initialization：在这个阶段，组件准备设置初始化状态和默认属性。
           2. Mounting：react 组件已经准备好挂载到浏览器 DOM 中。这个阶段包括componentWillMount和componentDidMount生命周期方法。
           3. Updating：在这个阶段，组件以两种方式更新，发送新的 props 和 state 状态。此阶段包括shouldComponentUpdate、componentWillUpdate和componentDidUpdate生命周期方法。
           4. Unmounting：在这个阶段，组件已经不再被需要了，它从浏览器 DOM 中卸载下来。这个阶段包含 componentWillUnmount 生命周期方法。
        除以上四个阶段外还有一个错误处理的阶段：
           5. Error Handling：在这个阶段，不论在渲染的过程中，还是在生命周期方法中或是在任何子组件的构造函数中发生错误，该组件都会被调用。这个阶段包含了 componentDidCatch 生命周期方法。
      componentWillMount:在渲染之前执行，用于根组件中的 App 级配置。    
      
      componentDidMount：在第一次渲染之后执行，可以在这里做AJAX请求，DOM 的操作或状态更新以及设置事件监听器。
      
      componentWillReceiveProps：在初始化render的时候不会执行，它会在组件接受到新的状态(Props)时被触发，一般用于父组件状态更新时子组件的重新渲染
            
      shouldComponentUpdate：确定是否更新组件。默认情况下，它返回true。如果确定在state 或 props 更新后组件不需要在重新渲染，则可以返回false，这是一个提高性能的方法。
           
      componentWillUpdate：在shouldComponentUpdate返回 true 确定要更新组件之前件之前执行。
      
      componentDidUpdate：它主要用于更新DOM以响应props或state更改。
            
      componentWillUnmount：它用于取消任何的网络请求，或删除与组件关联的所有事件监听器。

           React16之后开始新的声明周期：
             1. Render 阶段：用于计算一些必要的状态信息。这个阶段可能会被 React 暂停，这一点和React16 引入的 Fiber 架构（我们后面会重点讲解）是有关的；
             2. Pre-commit阶段：所谓“commit”，这里指的是“更新真正的 DOM 节点”这个动作。所谓Pre-commit，就是说我在这个阶段其实还并没有去更新真实的 DOM，不过 DOM 信息已经是可以读取的了；
             3. Commit 阶段：在这一步，React 会完成真实 DOM 的更新工作。Commit 阶段，我们可以拿到真实 DOM（包括 refs）。
##### 7.什么是 React Hooks？
        Hook可以让React函数组件具有状态和其他React特性，提供类似componentDidMount和componentDidUpdate等生命周期方法。
        常用hooks：
          State Hook: React.useState()
          Effect Hook: React.useEffect()
          Ref Hook: React.useRef()
        其中，可以把 useEffect Hook 看做如下三个函数的组合
            componentDidMount()    加一个空数组（谁也不监控）
            componentDidUpdate()   
    	      componentWillUnmount()  return返回一个函数

      useEffect 接收两个参数，分别是要执行的回调函数、依赖数组。
      1. 如果依赖数组为空数组，那么回调函数会在第一次渲染结束后（componentDidMount）执行，返回的函数会在组件卸载时（componentWillUnmount）执行。
      2. 如果不传依赖数组，那么回调函数会在每一次渲染结束后（componentDidMount 和 componentDidUpdate）执行。
      3. 如果依赖数组不为空数组，那么回调函数会在依赖值每次更新渲染结束后（componentDidUpdate）执行，这个依赖值一般是 state 或者 props。
```JavaScript
// componentDidMount
useEffect(()=>{
  // 需要在 ***componentDidMount*** 执行的内容
}, [])
useEffect(() => { 
  // 在 ***componentDidMount***，以及 count 更改时 ***componentDidUpdate*** 执行的内容
  document.title = `You clicked ${count} times`; 
  return () => {
    // 需要在 count 更改时 ***componentDidUpdate***（先于 document.title = ... 执行，遵守先清理后更新）
    // 以及 ***componentWillUnmount*** 执行的内容  
  } // 当函数中 Cleanup 函数会按照在代码中定义的顺序先后执行，与函数本身的特性无关
}, [count]); // 仅在 count 更改时更新
```
##### 8.为什么类方法需要绑定到类实例？
          在 JS 中，this 值会根据当前上下文变化。在 React 类组件方法中，开发人员通常希望 this 引用组件的当前实例，因此有必要将这些方法绑定到实例。
            通常在构造器constructor中：
               this.handleSubmit = this.handleSubmit.bind(this);
##### 9.什么是 React Context?
        Context 通过组件树提供了一个传递数据的方法，从而避免了在每一个层级手动的传递 props 属性。
##### 10.什么是 React Fiber?
        render()方法在更新的时候会递归比对 VirtualDOM 树，找出需要变动的节点，然后同步更新它们，如果在更新的过程中有大量的节点需要更新，就会出现长时间占用JS主线程的情况，这会导致用户触发的事件得不到响应，并且会导致掉帧，导致用户感觉到卡顿。
    Fiber主要特性是增量渲染:分批延时对DOM进行操作，避免一次性操作大量 DOM 节点，能够将渲染工作分割成块，并将其分散到多个帧中。
##### 11.如何避免组件的重新渲染？
        类式组件：
           1. PureComponent：其中的shouldComponentUpdate()会自动执行。对props和state进行浅比较（若是引用类型，只会比较地址，不会比较地址里的数据是否一致）。
           2. shouldComponentUpdate（nextProps，nextState ）：当prop或者state发生变化时，可以通过在shouldComponentUpdate生命周期函数中执行return false来阻止页面的更新，从而减少不必要的render执行。缺点是为了避免组件没有必要重新的渲染，那么就要给所有的类组件都要使用
        函数式组件：
           1. React.memo()：用memo（）将整个函数式组件包裹起来 
              本质也是一个高阶组件，与purecomponent类似，只用于函数式组件
              React.memo 只是浅层对比 props 中的复杂对象，如果想自定义比较方式，可以传入第二个参数，一个自定义的比较函数。
                const MemoHeader = memo(function() {
                  console.log("Header Render 被调用");
                  return <h2>Header</h2>
                })
##### 12.如何避免在React重新绑定实例？
        1.将事件处理程序定义为内联箭头函数
        2.使用箭头函数来定义方法  ***  用的时候直接 onClick={this.onIncrement}
        3.使用带有 Hooks 的函数组件
##### 13.你对虚拟dom和diff算法的理解，实现render函数
      虚拟DOM：
        虚拟DOM本质上是JavaScript对象,是对真实DOM的抽象表现。通过事务处理机制，将多次DOM修改的结果一次性的更新到页面上，从而有效的减少页面渲染的次数，减少修改DOM的重绘重排次数，提高渲染性能。
      diff算法：
        diff 算法探讨的就是虚拟 DOM 树发生变化后，生成 DOM 树更新补丁的方式。它通过对比新旧两株虚拟 DOM 树的变更差异，将更新补丁作用于真实 DOM，以最小成本完成视图更新。具体流程如下：
          1. 真实的 DOM 首先会映射为虚拟 DOM；
          2. 当虚拟 DOM 发生变化后，就会根据差距计算生成 patch，这个 patch 是一个结构化的数据，内容包含了增加、更新、移除等；
          3. 根据 patch 去更新真实的 DOM，反馈到用户的界面上。
          
      render函数:
        根据tagName生成父标签,读取props，设置属性，如果有content，置innerHtml或innerText,如果存在子元素，遍历子元素递归调用rende方法，将生成的子元素依次添加到父元素中，并返回根元素。
##### 14.关于react的优化方法
        1. 不要使用数组下标作为key
        2. 利用shouldComponentUpdate和PureComponent避免过多render function;
        3. render里面尽量减少新建变量和bind函数，传递参数是尽量减少传递参数的数量。
        4. 尽量将props和state扁平化，只传递component需要的 props（传得太多，或者层次传得太深，都会加重shouldComponentUpdate里面的数据比较负担），慎将component当作props传入
###### 14.5 React key 是干嘛用的 为什么要加？key 主要是解决哪一类问题的?
        1. Keys 是 React 用于追踪哪些列表中元素被修改、被添加或者被移除的辅助标识。在开发过程中，我们需要保证某个元素的 key 在其同级元素中具有唯一性。
        2. 在 React Diff 算法中 React 会借助元素的 Key 值来判断该元素是新近创建的还是被移动而来的元素，从而减少不必要的元素重渲染此外，React 还需要借助 Key 值来判断元素与本地状态的关联关系。
        注意事项：
             1. key值一定要和具体的元素—一对应；
             2. 尽量不要用数组的index去作为key；
             3. 不要在render的时候用随机数或者其他操作给元素加上不稳定的key，这样造成的性能开销比不加key的情况下更糟糕。
##### 15.React事件机制
        1. react自身实现了一套自己的事件机制，包括事件注册、事件的合成、事件冒泡、事件派发等，虽然和原生的是两码事，但也是基于浏览器的事件机制下完成的。
        2. 我们都知道react的所有事件并没有绑定到具体的dom节点上而是绑定在了document 上，然后由统一的事件处理程序来处理，同时也是基于浏览器的事件机制（冒泡），所有节点的事件都会在document 上触发
        3. 合成事件的目的：抹平不同浏览器之间的兼容性差异；利用事件委托机制，几乎所有事件的触发都代理到了document，而不是DOM节点本身，简化了DOM，事件处理逻辑，减少了内存开销，在组件挂载销毁时统一订阅和移除事件,达到性能优化;
##### 16.高阶组件的作用：
        高阶组件是参数为组件，返回值为新组件的函数。HOC是纯函数，没有副作用。例如Redux的connect组件。
        作用：
            代码复用，逻辑抽象，抽离底层准备（bootstrap）代码
            渲染劫持
            State 抽象和更改
            Props 更改
        具体应用：
            1. 权限控制：利用高阶组件的 条件渲染 特性可以对页面进行权限控制，权限控制一般分为两个维度：页面级别和 页面元素级别
            2. 组件渲染性能追踪：借助父组件子组件生命周期规则捕获子组件的生命周期，可以方便的对某个组件的渲染时间进行记录
            3. 页面复用

##### 17.React元素与组件的区别？
        React元素是react的最小基本单元，我们可以使用JSX创建一个React元素。
        React 中有三种构建组件的方式。React.createClass()、ES6 class和无状态函数。
        组件是由元素构成的；元素数据结构是普通对象，而组件数据结构是类或纯函数。
          纯函数：
            1. 函数的返回结果只依赖于它的参数。
            2. 函数执行过程里面没有副作用（副作用：一个函数执行过程对产生了外部可观察的变化那么就说这个函数是有副作用的）。
##### 18.React 高阶组件、Render props、hooks 有什么区别，为什么要不断迭代？
        HOC高阶组件：
            HOC是一种组件的设计模式，HOC接受一个组件和额外的参数（如果需要），返回一个新的组件。HOC 是纯函数，没有副作用。
          优点∶ 逻辑服用、不影响被包裹组件的内部逻辑。
          缺点∶ hoc传递给被包裹组件的props容易和被包裹后的组件重名，进而被覆盖
        Render props：
            具有render prop的组件接受一个返回React元素的函数，将render的渲染逻辑注入到组件内部。
          优点：数据共享、代码复用，将组件内的state作为props传递给调用者，将渲染逻辑交给调用者。
          缺点：无法在 return 语句外访问数据、嵌套写法不够优雅
        Hooks：
            可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。
          hook解决了hoc的prop覆盖的问题，同时使用的方式解决了render props的嵌套地狱的问题。
        hook的优点如下∶
            使用直观；
            解决hoc的prop 重名问题；
            解决render props 因共享数据 而出现嵌套地狱的问题；
            能在return之外使用数据的问题。
    总结：Hoc、render props和hook都是为了解决代码复用的问题，但是hoc和render props都有特定的使用场景和明显的缺点。hook是react16.8更新的新的API，让组件逻辑复用更简洁明了，同时也解决了hoc和render props的一些缺点。
    
    Render props:
        就是用来关注功能一样，ui界面不一样横向关注点。 
        有这样一个场景，在编辑用户，我们需要一个用户数据的表单，然后在个人中心的时候，我们也需要一个用户的表单，但是这两个界面长的是布局啥的都不一样，无法达到界面复用。功能都是展示用户数据。这是就可以用到Render props。
        代码链接：https://blog.csdn.net/qq_41499782/article/details/114754784?ops_request_misc=&request_id=&biz_id=102&utm_term=render%20props&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-3-114754784.nonecase&spm=1018.2226.3001.4187
        使用：
            1.创建公共的复用组件
            2.在复用组件的render方法直接返回 this.props.children（this.state）
            3.在使用组件的地方回调函数的参数就是children的值（接收到的参数就是复用组件中的this.state）
##### 19.哪些方法会触发 React 重新渲染？重新渲染 render 会做些什么？
        重新渲染：setState（）方法被调用；  父组件重新渲染
        会做什么：
            1. 会对新旧 VNode 进行对比，也就是我们所说的Diff算法。
            2. 对新旧两棵树进行一个深度优先遍历，这样每一个节点都会一个标记，在到深度遍历的时候，每遍历到一和个节点，就把该节点和新的节点树进行对比，如果有差异就放到一个对象里面
            3. 遍历差异对象，根据差异的类型，根据对应对规则更新VNode
##### 20.对React中Fragment的理解，它的使用场景是什么？
        可以不用必须有一个真实的DOM根标签了
        在React中，组件返回的元素只能有一个根元素。为了不添加多余的DOM节点，我们可以使用Fragment标签来包裹所有的元素，Fragment标签不会渲染出任何元素。
    官方解释：
        React 中的一个常见模式是一个组件返回多个元素。Fragments 允许你将子列表分组，而无需向 DOM 添加额外节点
##### 21. React中可以在render访问refs吗？为什么？
        React通过ref获取组件对应的DOM元素，但是在render阶段DOM还没有生成，无法获取 DOM。DOM 的获取需要在 pre-commit 阶段和 commit 阶段。
##### 22. React setState是同步还是异步？
        setState 并不是单纯同步/异步的，它的表现会因调用场景的不同而不同。在源码中，通过 isBatchingUpdates 来判断setState 是先存进 state 队列还是直接更新，如果值为 true 则执行异步操作，为 false 则直接更新。
    做异步设计是为了性能优化、减少渲染次数：
        1. setState设计为异步，可以显著的提升性能。如果每次调用 setState都进行一次更新，那么意味着render函数会被频繁调用，界面重新渲染，这样效率是很低的；最好的办法应该是获取到多个更新，之后进行批量更新；
        2. 如果同步更新了state，但是还没有执行render函数，那么state和props不能保持同步。state和props不能保持一致性，会在开发中产生很多的问题；
##### 23.React中的setState批量更新的过程是什么？
        调用 setState 时，组件的 state 并不会立即改变， setState 只是把要修改的 state 放入一个队列， React 会优化真正的执行时机，并出于性能原因，会将 React 事件处理程序中的多次React 事件处理程序中的多次 setState 的状态修改合并成一次状态修改。 最终更新只产生一次组件及其子组件的重新渲染，这对于大型应用程序中的性能提升至关重要。(在同一个方法中多次 setState 的合并动作不是单纯地将更新累加。对于相同属性的设置，React 只会为其保留最后一次的更新)
##### 24.React中setState的第二个参数作用是什么？
        setState 的第二个参数是一个可选的回调函数。这个回调函数将在组件重新渲染后执行。等价于在 componentDidUpdate 生命周期内执行。通常建议使用 componentDidUpdate 来代替此方式。在这个回调函数中你可以拿到更新后 state 的值.
##### 25.在React中组件的props改变时更新组件的有哪些方法？
        生命周期函数getDerivedStateFromProps：将新的props更新到组件的state中
        这是一个静态函数，也就是这个函数不能通过this访问到class的属性，也并不推荐直接访问属性。而是应该通过参数提供的nextProps以及prevState来进行判断，根据新传入的props来映射到state。
        需要注意的是，如果props传入的内容不需要影响到你的state，那么就需要返回一个null，这个返回值是必须的，所以尽量将其写到函数的末尾：
```JavaScript
static getDerivedStateFromProps(nextProps, prevState) {
    const {type} = nextProps;
    // 当传入的type发生变化的时候，更新state
    if (type !== prevState.type) {
        return {
            type,
        };
    }
    // 否则，对于state不进行任何操作
    return null;
}
```
##### 26.React中怎么检验props？验证props的目的是什么？
        1. React为我们提供了PropTypes以供验证使用。当我们向Props传入的数据无效（向Props传入的数据类型和验证的数据类型不符）就会在控制台发出警告信息。它可以避免随着应用越来越复杂从而出现的问题。并且，它还可以让程序变得更易读。
        2. 如果项目汇中使用了TypeScript，那么就可以不用PropTypes来校验，而使用TypeScript定义接口来校验props。
```JavaScript
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

Greeting.propTypes = {
  name: PropTypes.string
};
```
##### 27.React-Router怎么设置重定向？
```JavaScript
当请求 /users/:id 被重定向去 '/users/profile/:id'：
<Switch>
  <Redirect from='/users/:id' to='/users/profile/:id'/>
  <Route path='/users/profile/:id' component={Profile}/>
</Switch>
```
##### 28.Redux 怎么实现属性传递，介绍下原理:
        react-redux 数据传输∶ view-->action-->reducer-->store-->view。
        看下点击事件的数据是如何通过redux传到view上：
          1. view 上的AddClick 事件通过mapDispatchToProps 把数据传到action ---> click:()=>dispatch(ADD)
          2. action 的ADD 传到reducer上
          3. reducer传到store上 const store = createStore(reducer);
          4. store再通过 mapStateToProps 映射穿到view上text:State.text
```JavaScript
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
class App extends React.Component{
    render(){
        let { text, click, clickR } = this.props;
        return(
            <div>
                <div>数据:已有人{text}</div>
                <div onClick={click}>加人</div>
                <div onClick={clickR}>减人</div>
            </div>
        )
    }
}
const initialState = {
    text:5
}
const reducer = function(state,action){
    switch(action.type){
        case 'ADD':
            return {text:state.text+1}
        case 'REMOVE':
            return {text:state.text-1}
        default:
            return initialState;
    }
}

let ADD = {
    type:'ADD'
}
let Remove = {
    type:'REMOVE'
}

const store = createStore(reducer);

let mapStateToProps = function (state){
    return{
        text:state.text
    }
}

let mapDispatchToProps = function(dispatch){
    return{
        click:()=>dispatch(ADD),
        clickR:()=>dispatch(Remove)
    }
}

const App1 = connect(mapStateToProps,mapDispatchToProps)(App);

ReactDOM.render(
    <Provider store = {store}>
        <App1></App1>
    </Provider>,document.getElementById('root')
)
```
##### 29.Redux 中间件是什么？接受几个参数？
        Redux 的中间件提供的是位于 action 被发起之后，到达 reducer 之前的扩展点，换而言之，原本 view -→> action -> reducer -> store 的数据流加上中间件后变成了 view -> action -> middleware -> reducer -> store ，在这一环节可以做一些"副作用"的操作，如异步请求、打印日志等。
##### 30.4. 虚拟 DOM 的引入与直接操作原生 DOM 相比，哪一个效率更高，为什么
        1. 虚拟DOM相对原生的DOM不一定是效率更高，如果只修改一个按钮的文案，那么虚拟 DOM 的操作无论如何都不可能比真实的 DOM 操作更快。在首次渲染大量DOM时，由于多了一层虚拟DOM的计算，虚拟DOM也会比innerHTML插入慢。它能保证性能下限，在真实DOM操作的时候进行针对性的优化时，还是更快的。所以要根据具体的场景进行探讨。
        2. 在整个 DOM 操作的演化过程中，其实主要矛盾并不在于性能，而在于开发者写得爽不爽，在于研发体验/研发效率。虚拟 DOM 不是别的，正是前端开发们为了追求更好的研发体验和研发效率而创造出来的高阶产物。虚拟 DOM 并不一定会带来更好的性能，React 官方也从来没有把虚拟 DOM 作为性能层面的卖点对外输出过。虚拟 DOM 的优越之处在于，它能够在提供更爽、更高效的研发模式（也就是函数式的 UI 编程方式）的同时，仍然保持一个还不错的性能。
##### 31.diff算法
        将当前组件与该组件在上次更新时对应的Fiber节点比较（也就是俗称的Diff算法），将比较的结果生成新Fiber节点。

        在render阶段更新Fiber节点时，我们会调用 reconcileChildFibers 对比 current Fiber 和 JSX 对象构建 workInProgress Fiber。

基本概念：一个DOM节点在某一时刻最多会有4个节点和他相关。Diff算法的本质是对比1和4，生成2。
          current Fiber。如果该DOM节点已在页面中，current Fiber代表该DOM节点对应的Fiber节点。
          workInProgress Fiber。如果该DOM节点将在本次更新中渲染到页面中，workInProgress Fiber代表该DOM节点对应的Fiber节点。
          DOM节点本身。
          JSX对象。即ClassComponent的render方法的返回结果，或FunctionComponent的调用结果。JSX对象中包含描述DOM节点的信息。

      一、为了降低算法复杂度，React的diff会预设三个限制：
          1. 只对同级比较，跨层级的dom不会进行复用
          2. 不同类型节点生成的dom树不同，此时会直接销毁老节点及子孙节点，并新建节点
          3. 可以通过key来对元素diff的过程提供复用的线索，
      二、​在 reconcileChildFibers 中会根据 ## newChild ## 的类型来进入单节点的diff或者多节点diff：
          1. 当newChild类型为object、number、string，代表同级只有一个节点
          2. 当newChild类型为Array，同级有多个节点
      三、单节点diff
          1. key和type相同表示可以复用节点
          2. key不同直接标记删除节点，然后新建节点
          3. key相同type不同，标记删除该fiber及和兄弟fiber标记删除，然后新创建节点
      四、多节点diff 有节点（属性、类型）更新；节点数量变化；节点位置变化
          老节点存在于current fiber中，通过sibling连接成链表，而newChildren存在于jsx当中，首先让newChildren[i]与oldFiber对比，然后让i++、nextOldFiber = oldFiber.sibling。
          
          第一次遍历处理只处理更新的节点，第二轮处理新增或删除的节点，第三次遍历处理移动的节点。

          第一次遍历： 
                  1. key不同，第一次循环结束
                  2. newChildren或者oldFiber遍历完，第一次循环结束
                  3. key同type不同，标记oldFiber为DELETION
                  4. key相同type相同则可以复用
                  
                  newChildren遍历完，oldFiber没遍历完，在第一次遍历完成之后将oldFiber中没遍历完的节点标记为DELETION，即删除的DELETION Tag
          第二次遍历：
                   1. newChildren和oldFiber都遍历完，只需一轮完成组件更新。多节点diff过程结束
                   2. newChildren没遍历完，oldFiber遍历完。意味着有新增节点。将剩下的newChildren的节点标记为Placement，即插入的Tag
                   3. newChildren遍历完，oldFiber没遍历完。意味着有节点被删除了。所以需要遍历剩下的oldFiber，依次标记Deletion。
                   4. newChildren和oldFiber没遍历完，则进入节点移动的逻辑
          第三次遍历：
                  主要逻辑在placeChild函数中，

              eg.1 更新前节点顺序是ABCD，更新后是ACDB
                  1. newChild中第一个位置的A和oldFiber第一个位置的A，key相同可复用，lastPlacedIndex=0
                  2. newChild中第二个位置的C和oldFiber第二个位置的B，key不同跳出第一次循环，将oldFiber中的BCD保存在map中
                  3. newChild中第二个位置的C在oldFiber中的index=2 > lastPlacedIndex=0不需要移动，lastPlacedIndex=2
                  4. newChild中第三个位置的D在oldFiber中的index=3 > lastPlacedIndex=2不需要移动，lastPlacedIndex=3
                  5. newChild中第四个位置的B在oldFiber中的index=1 < lastPlacedIndex=3,移动到最后
                  图片：https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/993e4e187fa942eba9daf498d256b42d~tplv-k3u1fbpfcp-watermark.awebp

              eg.2 更新前节点顺序是ABCD，更新后是DABC
                  1. newChild中第一个位置的D和oldFiber第一个位置的A，key不相同不可复用，将oldFiber中的ABCD保存在map中，lastPlacedIndex=0
                  2. newChild中第一个位置的D在oldFiber中的index=3 > lastPlacedIndex=0不需要移动，lastPlacedIndex=3
                  3. newChild中第二个位置的A在oldFiber中的index=0 < lastPlacedIndex=3,移动到最后
                  4. newChild中第三个位置的B在oldFiber中的index=1 < lastPlacedIndex=3,移动到最后
                  5. newChild中第四个位置的C在oldFiber中的index=2 < lastPlacedIndex=3,移动到最后
                  图片：https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a68bcf387d1e4b149d4f283e22ac1839~tplv-k3u1fbpfcp-watermark.awebp
     
文章链接：https://react.iamkasong.com/diff/preparehtml#diff%E7%9A%84%E7%93%B6%E9%A2%88%E4%BB%A5%E5%8F%8Areact%E5%A6%82%E4%BD%95%E5%BA%94%E5%AF%B9

##### 为什么不能用index做key？
          当数组顺序发生变化是但元素内容未变化，index的key会重新渲染

##### Hooks

1. 手写useState
```JavaScript
let lastState = []
let stateIndex = 0
function useState(initState) {
    lastState[stateIndex] = lastState[stateIndex] || initState;
    const currentIndex = stateIndex
    function setState(newState) {
        lastState[stateIndex] = newState
        render()
    }
    return [lastState[stateIndex++],setState]
}
```
2. useMemo  官方定义：const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
        useMemo帮我们缓存了某个值，比如组件中某个数组/对象需要通过大量计算得到,而这个值依赖于某一个state,我们希望只在依赖的state改变之后计算而不是任意state改变之后都会计算,这无疑会造成性能上的问题。
3. useRef   const refContainer = useRef(initialValue);
        1. 返回一个可变的 ref 对象，该对象只有个 current 属性，初始值为传入的参数( initialValue )。
        2. 返回的 ref 对象在组件的整个生命周期内保持不变
        3. 当更新 current 值时并不会 re-render ，这是与 useState 不同的地方
        4. 更新 useRef 是 side effect (副作用)，所以一般写在 useEffect 或 event handler 里
        5. useRef 类似于类组件的 this
4. useMemo和useCallback的区别
        useMemo返回的是函数计算的结果值（函数的返回值），用于缓存计算后的状态
        useCallback返回的是函数，主要用来缓存函数，
    
   

##### Vue与React对比？
        相似之处：
        
        都将注意力集中保持在核心库，而将其他功能如路由和全局状态管理交给相关的库
        都有自己的构建工具，能让你得到一个根据最佳实践设置的项目模板。
        都使用了Virtual DOM（虚拟DOM）提高重绘性能
        都有props的概念，允许组件间的数据传递
        都鼓励组件化应用，将应用分拆成一个个功能明确的模块，提高复用性
        
        不同之处：
        1）数据流
        Vue默认支持数据双向绑定，而React一直提倡单向数据流
        2）虚拟DOM
        Vue2.x开始引入"Virtual DOM"，消除了和React在这方面的差异，但是在具体的细节还是有各自的特点。
        
        Vue宣称可以更快地计算出Virtual DOM的差异，这是由于它在渲染过程中，会跟踪每一个组件的依赖关系，不需要重新渲染整个组件树。
        对于React而言，每当应用的状态被改变时，全部子组件都会重新渲染。当然，这可以通过 PureComponent/shouldComponentUpdate这个生命周期方法来进行控制，但Vue将此视为默认的优化。
        
        3）组件化
        React与Vue最大的不同是模板的编写。
        
        Vue鼓励写近似常规HTML的模板。写起来很接近标准 HTML元素，只是多了一些属性。
        React推荐你所有的模板通用JavaScript的语法扩展——JSX书写。
        
        具体来讲：React中render函数是支持闭包特性的，所以我们import的组件在render中可以直接调用。但是在Vue中，由于模板中使用的数据都必须挂在 this 上进行一次中转，所以 import 完组件之        后，还需要在 components 中再声明下。
        4）监听数据变化的实现原理不同
        
        Vue 通过 getter/setter 以及一些函数的劫持，能精确知道数据变化，不需要特别的优化就能达到很好的性能
        React 默认是通过比较引用的方式进行的，如果不优化（PureComponent/shouldComponentUpdate）可能导致大量不必要的vDOM的重新渲染。这是因为 Vue 使用的是可变数据，而React更强调数据的不        可变。
        
        5）高阶组件
        react可以通过高阶组件（Higher Order Components-- HOC）来扩展，而vue需要通过mixins来扩展。
        原因高阶组件就是高阶函数，而React的组件本身就是纯粹的函数，所以高阶函数对React来说易如反掌。相反Vue.js使用HTML模板创建视图组件，这时模板无法有效的编译，因此Vue不采用HOC来实现。
        6）构建工具
        两者都有自己的构建工具
        
        React ==> Create React APP
        Vue ==> vue-cli
        
        7）跨平台
        
        React ==> React Native
        Vue ==> Weex
        
##### vuex 和 redux 之间的区别？
      1. Redux使用的是不可变数据，而Vuex的数据是可变的。Redux每次都是用新的state替换旧的state，而Vuex是直接修改
      2. Redux在检测数据变化的时候，是通过diff的方式比较差异的，而Vuex其实和Vue的原理一样，是通过 getter/setter来比较的(如果看Vuex源码会知道，其实他内部直接创建一个Vue实例用来跟踪数据变化)


        
