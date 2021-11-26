### 一、严格模式 
    1. 是ES5添加的运行模式，目的如下：
         * a.消除js语法的不合理不严谨之处，减少怪异行为
         * b.保证代码运行的安全
         * c.投稿编译效率，增加运行速度
    2. 区别：
         * a.禁止this关键字指向全局对象
         * b.禁止使用with语句
         * c.对象不能有重名的属性
修改一下

### 二、运算符、运算符优先级   
    如下代码的输出？为什么？
``` JavaScript
var obj1 = {a:1, b:2};
var obj2 = {a:1, b:2};
console.log(obj1 == obj2);
console.log(obj1 = obj2);
console.log(obj1 == obj2);
```

### 三、数据处理
    遍历对象 
``` JavaScript
    var obj = {
      name:'小明',
      age:18,
      sex:'man'
    }
    for(var key in obj) {
      console.log(key);  // name,age,sex
      console.log(obj[key]); //小明,18,man
    
    Object.keys(obj)   Object.values(obj) //结果分别为key或value组成的数组
    Object.getOwnPropertyNames(obj) //能返回所有属性，包括不可枚举的，上面两个只能遍历可枚举的属性
```

### 四、js对象
    1.
       js对象就是Object  
       js内置对象Array：Math：Number：String：Date：JSON（ES5新增内置对象）
    2.
       var name = "sex"
       var company = {
         name: "qdywxs",
         age: 3,
         sex: "男"
       }
       console.log(company[name])  // 输出 男
       console.log(company.name)   // 输出 qdywxs

### 五、函数
   1. **闭包**是什么：闭包就是指有权访问另一个函数作用域中的变量的函数(闭包就是将函内部函数外部连接起来的一座桥梁。)
       更周全的解释方法：*******
         由于在JS中，变量的作用域属于函数作用域，在函数执行后作用域就会被清理、内存也随之被   收回，但是由于闭包是建立在一个函数内部的子函数，由于其可访问上级作用域的原因，即使   上级函数执行完，作用域也不会随之销毁，这时的子函数—也就是闭包，便拥有了访问上级作用   域中的变量的权限，即使上级函数执行完后，作用域内的值也不会被销毁。
   2. 闭包的作用：
          1） 一个是可以读取函数内部的变量
          2） 另一个就是让这些变量的值始终保存在内存中
   3. 闭包的应用：
       一个 Ajax 请求的成功回调
       一个事件绑定的回调方法
       一个 setTimeout 的延时回调
       一个函数内部返回另一个匿名函数，这些都是闭包
   ``` JavaScript
     function makeCounter() {
           var count = 0
           return function () {
               return count++
           };
       }
       var counter = makeCounter()   //函数执行(会创建一个执行上下文)   返回一个闭包给   counter
       var counter2 = makeCounter(); //函数执行(会创建另一个新的执行上下文) 
       console.log(counter()) // 0
       console.log(counter()) // 1
       console.log(counter2()) // 0     
       console.log(counter2()) // 1      分别是两个执行上下文（执行环境）中的count，二者   毫无关系
   ```
   4. 闭包的特性
       函数内部嵌套函数
       函数内部可以引用外部的变量
       参数和变量不会被垃圾回收机制回收
   5. 闭包的this指向
       闭包的this指向的是window
   6. 使用递归实现1加到100
   ``` JavaScript
       function add(num){
           if(num==100){
               return num; 
           }
           return num+add(num+1);
       }
   ```
   7. 垃圾回收机制
      含义：执行环境会找出那些不再继续使用的变量，然后释放其占用的内存。
      如何回收：
            老生代算法：标记清除算法 标记压缩算法
            新生代算法： scavenge GC， 分为两个空间From和To，当from占满时，算法启动，检查   from中存活的对象复制到to中，失活的对象就会销毁。
                    复制完成后将两个空间互换，这样GC算法就结束了。
   8. **执行上下文**
       定义：当js引擎解析到可执行代码片段（通常是函数调用阶段）的时候，就会先做一些执行前的   准备工作，这个“准备工作”，就叫做执行上下文，或者叫执行环境
             其中准备工作包括：变量对象的定义，作用域链的扩展，提供调用者的对象引用的信息。
       分类：全局执行上下文  函数执行上下文
       执行上下文包括： 1.变量对象  2.活动对象(跟前者是一个东西，只不过是处于不同的状态和阶段)  3.作用域链  4.调用者信息
   9. **作用域链** scope chain
       作用域:规定了如何查找变量，也就是确定当前执行代码对变量和函数的访问权限。
       当查找变量的时候，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级（法层面上的父级）执行上下文的变量对象中查找，
       一直找到全局上下文的变量对象，也就是全局对象。这样**由多个执行上下文的变量对象成的链表就叫做 作用域链**。
       
### 六、数组
###### 1.用 splice 函数分别实现 push、pop、shift、unshift 方法   splice()方法返回的是数组，里面元素是被修改的内容
``` JavaScript
    function Push(arr, value){     //push返回的数修改后数组长度
        arr.splice(arr.length, 0, value) 
        return arr.length 
    }
    function Pop(arr) {            // pop返回的是pop出来的元素
        return arr.splice(arr.length-1, 1)[0]  //pop返回的是数，应该把splice返回的数组中把数取出来 
    }
    function Shift(arr) {          //返回的同样是取出来的元素
        return arr.splice(0,1)[0]   //同样需要把返回的数组转成数字
    } 
    function Unshift(arr,value) {  // 返回数组新长度  
        arr.splice(0,0,value) 
        return arr.length 
    }
```

###### 2.for...of、 for...in 和 forEach、map 的区别？
    for of :  具有iterator 接口, 就可以用for of 循环遍历它的成员（属性值）
	      for...of 循环可以使用的范围包括 数组、Set、和Map结构，某些类似数组的对象,Generator对象，
	      以及字符串。 for...of 循环调用遍历器接口，数组的遍历器接口只返回具有数组索引的属性，对象普通
	      对象，for...of 结构不能直接使用，会报错，必须部署了Iterator 接口后才能使用。可以中断循环。 
    for..in : 遍历对象自身的和继承的可枚举的属性，不能直接获取属性值，可以中断循环
    
    forEach : Array.forEach  可以直接调用的方法，遍历数组，没有返回值
    
    map :     数组遍历。返回的是新数组
###### 3.数组中哪些API可以改变原数组？
   1. sort（）；返回改变数组
   2. reverse（）；返回改变数组
   3. pop（）；返回弹出元素
   4. push（）；返回插入数组的长度
   5. shift（）；返回弹出元素
   6. unshift（）；返回插入数组的长度
   7. splice（）；返回删除的元素
###### 4.如何判断一个变量是否是数组？
   1. Array.isArray(arr)
   2. 判断父对象是否是构造函数Array 的原型对象
       arr.__proto__==Array.prototype
   3. 判断父对象的构造函数是否是Array
       arr.constructor==Array
###### 5.实现一个函数flatter将多为数组拍平
``` JavaScript
    function flatten(arr){
        let res=[];
        for(let i=0;i<arr.length;i++){
            if(Array.isArray(arr[i])){
                res=res.concat(flatten(arr[i]));
            }else{
                res.push(arr[i]);
            }
        }
    }
```
### 七、面对对象
###### 1.new操作符的实现步骤：  ***（手写new操作符？？？）***
   * a.创建一个对象
   * b.将构造函数的作用域赋给新对象，也就是将对象的_proto_属性指向构造函数的prototype属性
   * c.为这个对象添加属性和方法，构造函数中的this指向该对象
   * d.返回新的对象
###### 2.通过 new 的方式创建对象和通过 字面量 创建有什么区别？
       字面量创建对象，不会调用 Object构造函数, 简洁且性能更好;
    new Object() 方式创建对象本质上是方法调用，涉及到在proto链中遍历该方法，当找到该方法后，又会生产方法调用必须的 堆栈信息，方法调用结束后，还要释放该堆栈，性能不如字面量的方式。
       通过对象字面量定义对象时，不会调用Object构造函数。
###### 3.typeof和instanceof
   * a.typeof 操作符返回一个字符串，表示未经计算的操作数的类型
   * b.instanceof 运算符用于检测构造函数的 prototype(原型对象)属性是否出现在某个实例对象的原型链（_proto_）上
``` JavaScript
    function _instanceof (left, right){
            let proto=left._proto_;
            let prototype=right.prototype;
            while(true){
                if(proto==null) return false; //找到头了还没找到
                if(proto==prototype) return true;
                proto=proto._proto_;
            }
        }
```
        
###### 4.原型和原型链
    __proto__（原型链）作为不同对象之间的桥梁，用来指向创建它的构造函数的原型对象的；
    每个对象的__proto__都是指向它的构造函数的原型对象prototype;
    每个函数都有一个属性——prototype（原型）。这个prototype的属性值是一个对象（属性的集合），默认只有一个叫做constructor的属性，指向这个函数本身。
###### 5.实现继承
  原型链继承 Son.prototype=new Parent();
            Son.prototype.constructor=Son;

### 八、js提供的对象
###### 1.正则表达式 面试题
    1. 写一个函数 isValidUsername(str) ，判断用户输入的是不是合法 的用户名 （长度 6-20 个字符，只能包括字母、数字、下划线）？
    2. 写一个函数 isPhoneNum(str) ，判断用户输入的是不是手机号？
    3. 写一个函数 isEmail(str) ，判断用户输入的是不是邮箱？
    4. 写一个函数 trim(str) ，去除字符串两边的空白字符？
    5. \d，\w，\s，[a-zA-Z0-9]，\b，.，*，+，?，x{3}，^，$ 分别是什么？
    6. 什么是贪婪模式和非贪婪模式？
###### 2.Date  面试题
    写一个函数，参数为时间对象毫秒数的字符串格式，返回值为字符串。假设参数为时间对象毫秒数 t，
    根据 t 的时间分别返回如下字符串：
      - 刚刚（t 距当前时间不到 1 分钟时间间隔）
      - 3 分钟前（t 距当前时间大于等于 1 分钟，小于 1 小时）
      - 8 小时前（t 距离当前时间大于等于 1 小时，小于 24 小时）
      - 3 天前（t 距离当前时间大于等于 24 小时，小于 30 天）
      - 2 个月前（t 距离当前时间大于等于 30 天小于 12 个月）
      - 8 年前（t 距离当前时间大于等于 12 个月）
      function friendlyDate(time) {
        // 补充
      }
      var str = friendlyDate("1556286683394") // x 分钟前（以当前时间为准）
      var str2 = friendlyDate("1555521999999") // x 天前（以当前时间为准）
###### 3.JSON 
   1. JSON 格式的数据需要遵循什么规则？
       1.并列的数据之间用逗号(,)分隔
       2.映射用冒号(:)表示
       3.并列数据的集合(数组)用方括号([])表示
       4.映射的集合(对象)用大括号({})表示
   2. 使用 JSON 对象实现一个简单的深拷贝函数（deepCopy）？
       JSON.parse(JSON.stringify(json)); 只针对简单的json对象，若对象中含有函数，则不能使用此方法
   3. XML 和 JSON 的区别？
       XML特点：
            1.有且只有一个根节点
            2.数据传输的载体
            3.所有标签都需要自定义
            4.是纯文本文件
       JSON特点：
            1.json对象，就是在{}中储存键值对，键和值之间用冒号分割，键值对之间用逗号，键和值都要用双引号
            2.json数组：就是[]中储存多个json对象，json对象之间用逗号分割
       二者相同点：
            都是数据传输的载体，并且具有跨平台跨语言的特性
       二者区别：
            1.传输同样格式的数据，xml需要更多的字符进行描述
            2.流行的是基于json的数据传输
            3.xml的层次结构比json更清晰        
   4. 深拷贝和浅拷贝的区别？如何实现？
``` JavaScript
        //浅拷贝：
            function shallowCopy(obj) {
                if (!obj || typeof obj !== 'object') return;
                let newObj=Array.isArray(obj)?[]:{};
                for(let key in obj){
                    if(obj.hasOwnProperty(key)){
                        newObj[key]=obj[key];
                    }
                }
                return newObj;
            }
        //深拷贝：
            function deepCopy(obj) {
                if (obj === null) return null;// 排除typeof null=='object'的情况
                if (typeof obj !== 'object') return obj;
                if (obj instanceof Date) return new Date(obj);  // 日期
                if (obj instanceof RegExp) return new RegExp(obj); // 正则
                let newObj = new obj.constructor;
                for (let key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        newObj[key] = deepCopy(obj[key]); // 与浅拷贝的区别在于此
                    }
                }
                return newObj;
            }
   
```
         

### 九、浏览器提供的对象
#### DOM
###### 1. 什么事virtual DOM，为何要用虚拟dom？
   真实的DOM中，过多的内容修改，会带来多次的页面重绘，极大的损耗页面的性能；仅仅修改虚拟DOM中内容，不会造成页面的排版与重绘，修改后一次性比较并修改真实DOM中需要修改的部分，最后并在真实DOM中进行回流和重绘。这个过程中不管对虚拟DOM修改了多少次，最后页面只会发生一次重绘，提高页面性能。（前端性能优化的一个秘诀就是尽可能少操作DOM）
###### 2. 如何添加、移除、复制、创建和查找节点？
    添加：appendChild()  内部末尾插入 
    替换：replaceChild(newElement, oldElement)
    移除：removechild()
    复制：cloneNode() 
    插入：insertBefore(要插入节点，参照节点) 内部指定位置插入  insertAfter()
    创建：createElement()
    查找：getElementById() querySelector()
###### 3. offsetWidth/offsetHeight,clientWidth/clientHeight,scrollWidth/scrollHeight的区别
    （1）offsetWidth/offsetHeight返回值包含content + padding + border ，如果有滚动条， 也不包含滚动条
    （2）clientWidth/clientHeight返回值只包含content + padding，如果有滚动条，也不包含 滚动条
    （3）scrollWidth/scrollHeight返回值包含content + padding + 溢出内容的尺寸
###### 4. attribute 和 property 的区别是什么？  
    （1） property和attributies都是properties的子集，而每个attribute是attributies的子集
    （2） attribute可以理解为特性，可以自定义，直接在html标签上添加的和使用setAttribute添加的情况一致，即html标签添加的都是attribute属性；
    （3） property则是使用xx.xx进行更改，通常来讲，更改互相影响（value除外）；
    （4） setAttribute()的两个参数，都必须是***字符串***。即对特性Attribute只能赋值字符串，而对属性Property就可以赋任何类型的值了。
    （5） 当添加新的非默认属性时，是不互通的
    （6） 一些特殊属性，则需要特殊对待。
###### 5. 批量操作css。
     var element= document.getElementById(”id”);
   1. 复杂方法，销毁原样式并重建，增加浏览器开销
``` JavaScript
     element.style.width=”20px”;
     element.style.height=”20px”;
     element.style.border=”solid 1px red”;
     //封装函数：
      function setStyle(obj, css) {
          for (let atr in css) {
              obj.style[atr] = css[atr];
          }
      }
      setStyle(element, { width: "200px", height: "70px", display: "block" })
```
   2. 简便方法 obj.style.cssText(”样式”)；这种写法可以尽量避免页面的多次reflow，提高页面性能。
``` JavaScript
     element.style.cssText="width:20px;height:20px;border:solid 1px red;";   //字符串类型，每个样式间用分号隔开
             //但是会覆盖掉之前所有（包括没被修改）的样式，之前的样式全部消失，优化后封装函数
             function setStyle(obj, addCss) {   
                 let sty=obj.style;  //先保留旧的样式
                 sty.cssText=sty.cssText+addCss; // 新样式斜后面，优先级更高，会覆盖前面需要被修改的样式
             }
```
     
###### 6. 当鼠标放置在 li 元素上，会在 img-preview 里展示当前 li 元素的 data-img对应的图片（当有多个子元素时，可以利用事件委托）
``` JavaScript
    <ul>
        <li data-img="1.png">鼠标放置查看图片1</li>
        <li data-img="2.png">鼠标放置查看图片2</li>
        <li data-img="3.png">鼠标放置查看图片3</li>
    </ul>
    <div class="img-preview"></div>
    //方法一：直接以innerHTML的形式插入字符串，字符串里面就是一个带src属性的img标签
    //        innerHTML属性获取的是元素对象内包含html代码的内容  <div>你好</div>
    //        innerText属性只获得元素对象内的文本内容            你好
        <script>
            var ulElement = document.querySelector('ul');
            var divElement = document.querySelector('div');
            //事件委托
            ulElement.addEventListener('mouseover', function (e) {
                var img = e.target.getAttribute('data-img'); //获取图片src
                divElement.innerHTML = '<img src="' + img + '">'; 
            })
        </script>
    //方法二：创建一个img标签并先插入div，最后改img的src属性
        <script>
            var ulElement = document.querySelector('ul');
            var divElement = document.querySelector('div');
            var imgElement = document.createElement('img'); //创建img并插入div中
            divElement.appendChild(imgElement);
            //事件委托
            ulElement.addEventListener('mouseover', function (e) {
                imgElement.src = e.target.getAttribute('data-img'); //获取图片src
            })
        </script>
```
#### DOM
###### 1. url如何编码解码？为什么要编码？
    URL编码只是简单的在特殊字符的各个字节（16进制）前加上”%”即可。
###### 2.iframe有哪些缺点？
    1.iframes阻塞页面加载，影响网页加载速度，iframe加载完毕后才会触发window.onload事件，动态设置src可解决这个问题。
    2.加载了新页面，增加了css与js文件的请求，即额外增加了HTTP请求，增加了服务器负担。
    3.有时iframe由于页面挤占空间的原因出现滚动条，造成布局混乱。
    4.不利于SEO，搜索引擎的爬虫无法解读iframe的页面。
    5.有些小型的移动设备如手机等无法完全显示框架，兼容性较差。
    6.iframe与主页面是共享链接池的，若iframe加载时用光了链接池，则会造成主页面加载阻塞。

###### 3.判断用户浏览器类型
```JavaScript
        var mobileAgent = new Array("iphone", "ipod", "ipad", "android", "mobile", "blackberry");
            var browser = navigator.userAgent.toLowerCase(); // 返回用户浏览器类型，并转小写
            //  navigator.platform 返回浏览器所在的系统平台
            for (var i = 0; i < mobileAgent.length; i++) {
                if (browser.indexOf(mobileAgent[i]) != -1) {
                    flag= true;
                    break
                }
            };
```
#### 定时器
###### 1. setTimeout、setInterval、requestAnimationFrame 各有什么特点？
    setTimeout 通过设置一个间隔时间不断改变图像，达到动画效果。该方法在一些低端机 上会出现卡顿、抖动现象。这种现象一般有两个原因：
       1. setTimeout 的执行时间并不是确定的。(时间到就进入任务队列，但能不能马上执行还得等主线程空闲不空闲)
       2. 刷新频率受屏幕分辨率和屏幕尺寸影响，不同设备的屏幕刷新率可能不同， setTimeout 只能设置固定的时间间隔，这个时间和屏幕刷新间隔可能不同
    以上两种情况都会导致 setTimeout 的执行步调和屏幕的刷新步调不一致，从而引 起丢帧现象。
    requestAnimationFrame优势：
       1. 提升性能，防止掉帧：
             使用 requestAnimationFrame 执行动画，最大优势是能保证回调函数在屏幕每一次刷 新间隔中只被执行一次，这样就不会引起丢帧，动画也就不会卡顿。
       2. 节约资源，节省电源：
             a.使用 setTimeout 实现的动画，当页面被隐藏或最小化时，定时器 setTimeout 仍 在后台执行动画任务，此时刷新动画是完全没有意义的
             b.使用 requestAnimationFrame，当页面处于未激活的状态下，该页面的屏幕刷新任 务会被系统暂停，由于 requestAnimationFrame 保持和屏幕刷新同步执行，所以也 会被暂停。当页面被激活时，动画从上次停留的地方继续执行，节约 CPU 开销。
    区别：
        ** 引擎层面：
           setTimeout 属于 JS 引擎，存在事件轮询，存在事件队列。
           requestAnimationFrame 属于 GUI 引擎，发生在渲染过程的中重绘重排部分，与电脑分辨路保持一致。
        ** 性能层面：
           当页面被隐藏或最小化时，定时器 setTimeout 仍在后台执行动画任 务。
           当页面处于未激活的状态下，该页面的屏幕刷新任 务会被系统暂停，requestAnimationFrame 也会停止。
        ** 应用层面：
           利用 setTimeout，这种定时机制去做动画，模拟固定时间刷新页面。
           requestAnimationFrame 由浏览器专门为动画提供 的 API，在运行时浏览器会自动优化方法的调用，在特定性环境下可以有效节省了 CPU 开销。

###### 2.实现一个节流函数
```JavaScript
        function throttle(fn, wait) { //时间戳版本
            let curTime = Date.now();
            return function () {
                let nowTime = Date.now();
                if (nowTime - curTime >= wait) {
                    fn();
                    //更新时间戳
                    curTime = Date.now();
                }
            }
        }
        function throttle(fn, wait) {  //定时器
            let timeOut;
            return function(){
                if(!timeOut){
                    timeOut=setTimeout(function(){
                        fn();
                        timeOut=null;  //wait时间之后才被清除
                    },wait)
                }
            }
            
        }
```
##### 3.实现一个防抖函数
    防抖和节流的区别：
        防抖：一个时间段内再触发就重新执行并重新计时
        节流：一个时间段内再触发也不执行，之后时间过了之后才会执行
```JavaScript
        function debounce(callback, delay) { //防抖
            let timer;
            return function () {
                clearTimeout(timer);
                timer = setTimeout(() => { callback(...arguments) }, delay)
            }
        }
```
##### 4.setTimeout 倒计时为什么会出现误差？
    由于JS引擎的事件循环机制，使得 setTimeout 和 setInterval 指定的回调函数，必须等到本轮事件循环的所有同步任务都执行完后，并检查是否到了指定时间，如果到了才会开始执行。因此不能保证指定的任务，一定会按照预定时间执行。

##### 5.简单解释单线程、任务队列的概念？
    1. 单线程
        无论什么时候都只有一个JavaScript线程在运行JavaScript程序
    2.任务队列
        1.所有同步任务都在主线程上执行，形成一个执行栈。
        2.主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。
        3.一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
        4.只要主线程空了，就会去读取"任务队列"，这就是JavaScript的运行机制。
    3.多线程的优缺点
        优点: 1、将耗时较长的操作（网络请求、图片下载、音频下载、数据库访问等）放在子线程中执行，可以防止主线程的卡死；
              2、可以发挥多核处理的优势，提升cpu的使用率。 
        缺点: 1、每开辟一个子线程就消耗一定的资源； 
              2、会造成代码的可读性变差；3、如果出现多个线程同时访问一个资源，会出现资源争夺的情况。

##### 6.简述同步和异步区别
    同步：
        就是发出一个功能调用时，在没有得到结果之前，该调用就不返回或继续执行后续操作。这时程序是阻塞的，只有接收到返回的值或消息后才往下执行其他的命令。
        简单的说，同步就是必须一件一件事做，等前一件做完了才能做下一件事。
    异步：
        与同步相对，当一个异步过程调用发出后，调用者在没有得到结果之前，就可以继续执行后续操作。当这个调用完成后，一般通过状态、通知和回调来通知调用者。

##### 7.JS 延迟加载的方式有哪些？
    1. <script>标签定义了defer属性。用途：表明脚本在执行时不会影响页面的构造。也就是说，脚本会被延迟到整个页面都解析完毕之后再执行。
    2. <script>标签定义了async属性。与defer属性类似，但是不能保证脚本按顺序执行/不能保证加载顺序
    3.动态创建dom方式
```JavaScript
    <script type="text/javascript">  
            function downloadJSAtOnload() {  
                // 这些代码应被放置在</body>标签前(接近HTML文件底部)
                   varelement = document.createElement("script");  
                   element.src = "defer.js";  
                   document.body.appendChild(element);  
               }  
            window.onload =downloadJSAtOnload;  
    </script> 
```
    4.让js最后加载。把js外部引入的文件放到页面底部，来让js最后引入，从而加快页面加载速度

##### 5.defer 和 async区别？
    defer：
        1. defer只适用于外联脚本，如果script标签没有指定src属性，只是内联脚本，不要使用defer
        2. 如果有多个声明了defer的脚本，则会按顺序下载和执行
        3. defer脚本会在DOMContentLoaded和load事件之前执行
    async：
        1. 只适用于外联脚本，这一点和defer一致
        2. 如果有多个声明了async的脚本，其下载和执行也是异步的，不能确保彼此的先后顺序
        3. async会在load事件之前执行，但并不能确保与DOMContentLoaded的执行先后顺序

### 十、JS对象 
##### 1. DOM 事件模型是什么？
       通俗理解，事件是用户或者浏览器自己执行的某种动作，是文档或浏览器发生的一些交互瞬间，比如点击（click）按钮等，这里的click就是事件的名称。js和html之间的交互是通过事件实现的，DOM支持大量的事件。

##### 2. 解释 DOM2 事件传播机制？
        DOM0级：
            1.浏览器会把一些常用的事件挂载到元素对象的私有属性上，实现DOM0级事件绑定；
            2.DOM0级的事件监听，移除时只需将其属性值设置为null即可；
            3.注意：DOM0级的时间监听，只能为其指定一个事件处理函数，当指定多个时，后面的会覆盖前面的。
            4.DOM0级通常有两种事件绑定方式：  只会在冒泡阶段触发
```JavaScript
       // 1.直接上事件处理程序作为html的属性值（字符串）
        <div onclick="clickFn()">点击一下</div>
        <script>
          function clickFn(){
            alert('点了我一下');
          }
        </script>
       // 2.通过js将事件处理程序添加到元素属性上
        <div>点击一下</div>
        <script>
          document.querySelector('div').onclick = clickFn;
          function clickFn(){
             alert('点了我一下');
          }
        </script>
```
        DOM2级：
           当需要添加多个不同的监听函数，使用addEventListener，遵从先添加先触发原则
           DOM2级事件模型（事件流）分三个阶段：捕获阶段、目标阶段、冒泡阶段
            1.捕获节段：事件从document对象沿着文档树向下传播给节点。如果目标的任何一个祖先专门注册了事件监听函数，name在事件传播的过程中就会运行这些函数（DOM0级事件模型没有捕获阶段）
            2.目标阶段：发生在目标节点自身，直接注册在目标上的事件监听函数将运行。
            3.冒泡阶段：这个阶段事件将从目标元素向上传播会Document对象（与捕获相反的阶段）。虽然所有事件都受捕获阶段的支配，但并不是所有类型的事件都冒泡。
        *** 事件注册方式：
            1. target.addEventListener(eventType, listener[, useCapture]) 添加
                eventType ————> 事件名称，大小写敏感
                listener ————> 监听函数
                useCapture ————> 可选参数，默认false，表示监听函数只在冒泡阶段被触发。
            2. target.removeEventListener()，参数与上面一样，写的时候必须相同
##### 3. 解释以下概念：事件传播机制、阻止传播、取消默认事件？
        1. 事件传播机制：DOM2级事件模型的三个阶段
        2. 阻止传播：stopPropagation方法阻止事件在 DOM 中继续传播，防止再触发定义在别的节点上的监听函数，但是不包括在当前节点上其他的事件监听函数。
```JavaScript
            // 事件传播到 p 元素后，就不再向下传播了
            p.addEventListener('click', function (event) {
              event.stopPropagation(); 
            }, true);
            
            // 事件冒泡到 p 元素后，就不再向上冒泡了 （默认情况）
            p.addEventListener('click', function (event) {
              event.stopPropagation();  // 火狐的谷歌支持，ie不支持
            }, false);
            p.addEventListener('click', function (event) {
              event.cancleBubble=true; // ie和谷歌支持
            });
```
##### 4. JS 的事件委托（事件代理）是什么，原理是什么？
        顾名思义，就是把原本需要绑定在子元素上的响应时间（click、keydown）委托给父元素，让父元素担任事件监听的职务。事件代理的原理就是DOM元素的事件冒泡。
##### 5. window.onload 和 document.onDOMContentLoaded 有什么区别？
        1. 当onload事件触发时，页面所有的DOM、样式、脚本、图片、视频等都已经加载完成了。
        2. 当onDOMContentLoaded事件触发时，只有DOM加载完成，不包括样式表、图片、视频等。
        3. 开发中我们经常给一些元素的事件绑定处理函数，但问题是，如果那个元素还没有加载到页面上，但是绑定事件已经执行完了，是没有效果的。这两个事件就是来避免这样一种情况，将绑定的函数放在这两个事件的回调中，保证能在页面的某些元素加载完毕之后在绑定事件的函数。
        4. DOMContentLoaded机制更加合理，因为我们可以容忍图片、动画延迟加载，却不可以容忍看见内容后页面不可交互。

### 十一、ES6
##### 1. for of 和 for in的区别？
       （1）for of无法循环遍历对象
       （2）for in循环遍历的是数组的键值(索引)，而for of循环遍历的是数组的值
       （3）for in 会遍历自定义属性，for of不会
##### 2. 如何改变函数内部 this 指针的指向？
##### 3. 如何判断 this？箭头函数的 this 是什么？
       箭头函数的this绑定是在箭头函数定时是就确定的，即继承福执行上下文里面的this
##### 4. call、apply 以及 bind 函数内部实现是怎么样的？
```JavaScript
        Function.prototype._call = function ((context) {  //参数一个一个传
            //1.判断调用对象this
            if (typeof this !== 'function') {
                console.error('type error');
            }
            let result = null;
            //2.获得新执行上下文（this要指向的新对象）
            context = context || window;
            //3.获得参数
            let args = [...arguments].slice(1);
            //4.将调用函数设为上下文对象的一个方法
            context.fn = this;
            //5.执行，并获得结果
            result = context.fn(...args);
            //6.删方法
            delete context.fn;
            return result;
        }
        Function.prototype._apply = function ((context) {  // 只传入两个参数，第二个参数是一个数组
            //1.判断调用对象this
            if (typeof this !== 'function') {
                console.error('type error');
            }
            let result = null;
            //2.获得新执行上下文（this要指向的新对象）
            context = context || window;
            //3.将函数设为上下文对象的一个方法
            context.fn = this;
            //4.执行
            if (arguments[1]) {
                result = context.fn(...arguments[1]);
            } else {
                result = context.fn();
            }
            delete context.fn;
            return result;
        }
        Function.prototype._bind = function (context) {
            //1.判断调用对象this
            if (typeof this !== 'function') {
                console.error('type error');
            }
            //2.获取方法和参数
            var fn = this;
            var args = [...arguments].slice(1);
            // bind返回的是一个函数
            return function Fn() {
                return fn.apply(
                    this instanceof Fn ? this : context,
                    args.concat(...arguments)
                )
            }
        }
```
##### 5. import 和 export？
        import对命名的导出需要花括号而默认的导出不需要花括号：
            export	                      Default export
            export class User {...}	      export default class User {...}
            import {User} from ...	      import User from ...

##### 6. ES6 中的 class 了解吗？ES6 中的 class 和 ES5 的类有什么区别？
        ES6中的类只是语法糖，它并没有改变类实现的本质。本质上仍然是函数
```JavaScript
        1. Class类中不存在变量提升
            // es5
            var bar  = new Bar(); // 可行
            function Bar() {
                this.bar = 42;
            }
        
            //es6
            const foo = new Foo(); // Uncaught ReferenceError
            class Foo {
                constructor() {
                    this.foo = 42;
                }
            }

        2. Class内部会启用严格模式
            // es5
            function Bar() {
                // 引用一个未声明的变量
                baz = 42; // it's ok
            }
            var bar  = new Bar(); 
         
            // es6
            class Foo {
                constructor(){
                    // 引入一个未声明的变量
                    fol = 42;// Uncaught ReferenceError: fol is not defined
                }
            }
            let foo = new Foo();

        3. Class的所有方法都是不可枚举的
          // es5
            function Bar() {}   
            Bar.answer = function () {};
            Bar.prototype.print = function () {};
            console.log(Object.keys(Bar));// ["answer"]
            console.log(Object.keys(Bar.prototype))// ["print"]
            // es6
            class Foo {
                constructor(){}
                static answer() {}
                print(){}
            }
            console.log(Object.keys(Foo))// []
            console.log(Object.keys(Foo.prototype));// []

        4. class必须使用new调用
            // es5
            function Bar(){ }
            var bar = Bar();// it's ok;
            // es6
            class Foo {
        
            }
            let foo = Foo();// Uncaught TypeError: Class constructor Foo cannot be invoked without 'new'

        5. class内部无法重写类名
            // es5 
            function Bar() {
                Bar = 'Baz';
                this.bar = 42;
            }
            var bar = new Bar();
            console.log(bar);// Bar {bar: 42}
            console.log(Bar);// 'Baz'
        
            // es6
            class Foo {
                constructor(){
                    this.foo = 42;
                    Foo = 'Fol'; // Uncaught TypeError: Assignment to constant variable.
                }
            }
            let foo = new Foo();
            Foo = 'Fol';// it's ok

        6. class的继承
        // es5的子类可以通过_proto_属性找到Function.prototype,es6的子类可以通过__proto__属性找到父类
             // es5
            function Super() {}
            function Sub() {}
            Sub.prototype = new  Super();
            Sub.prototype.constructor = Sub;
            var sub = new Sub();
            console.log( Sub.__proto__ === Function.prototype);// true
        
            // es6
            class Super{}
            class Sub extends Super {}
            let sub = new Sub();
            console.log( Sub.__proto__ === Super);// true  

        7. es5与es6子类this的生成顺序不同  
        /*
        （1）es5的继承是先建立子类实例对象this,再调用父类的构造函数修饰子类实例(Surper.apply(this))。
        （2）es6的继承是先建立父类实例对象this，再调用子类的构造函数修饰this。即在子类的constructor方法中必须使用super()，之后才能使用this，如果不调用super方法，子类就得不到this对象。
            正是因为this的生成顺序不同，所有es5不能继承原生的构造函数，而es6可以继承
        */   
        // es5
        function MyES5Array() {
            Array.apply(this, arguments);
            // 原生构造函数会忽略apply方法传入的this,即this无法绑定，先生成的子类实例，拿不到原生构造函数的内部属性。
        }
        MyES5Array.prototype = Object.create(Array.prototype, {
            constructor: {
                value: MyES5Array,
                writable: true,
                configurable: true,
                enumerable: true
    
            }
        })
        var arrayES5 = new MyES5Array();
        arrayES5[0] = 3;
        console.log(arrayES5.length);// 0 
        arrayES5.length = 0;
        console.log(arrayES5[0]);// 3
    
        // es6
        class arrayES6 extends Array {
            constructor(...args){
                super(...args);
            }
        }
        let arrayes6 = new arrayES6();
        arrayes6[0] = 3;
        console.log(arrayes6.length);// 1
        arrayes6.length = 0;
        console.log(arrayes6[0]);// undefined  
```
##### 7. 知道 ECMAScript6 怎么写 class 么？为什么会出现 class 这种东西？
##### 8. 原型如何实现继承？Class 如何实现继承？Class 本质是什么？
        1. 传统的javascript中只有对象，没有类的概念。它是基于原型的面向对象语言。原型对象的特点就是讲自身的属性共享给新对象。
        2. 如果要生成一个对象实例，需要先定义一个构造函数，然后通过new操作符来完成。
        ES6引入了Class（类）这个概念，通过class关键字可以定义类。该关键字的出现使得其在对象写法上更加清晰，更像是一种面向对象的语言。
        3.类实质上就是一个函数。类自身指向的就是构造函数。所以可以认为ES6中的类其实就是构造函数的另外一种写法
##### 9. var、let 及 const 区别？
        1. var定义的变量，没有块的概念，可以跨块访问, 不能跨函数访问。
        2. let定义的变量，只能在块作用域里访问，不能跨块访问，也不能跨函数访问。
        3. const用来定义常量，使用时必须初始化(即必须赋值)，只能在块作用域里访问，而且不能修改。
```JavaScript
        // 块作用域
        {
            var a = 1;
            let b = 2;
            const c = 3;
            // c = 4; // 报错
            var aa;
            let bb;
            // const cc; // 报错
            console.log(a); // 1
            console.log(b); // 2
            console.log(c); // 3
            console.log(aa); // undefined
            console.log(bb); // undefined
        }
        console.log(a); // 1
        // console.log(b); // 报错
        // console.log(c); // 报错
     
        // 函数作用域
        (function A() {
            var d = 5;
            let e = 6;
            const f = 7;
            console.log(d); // 5
            console.log(e); // 6  
            console.log(f); // 7 
     
        })();
        // console.log(d); // 报错
        // console.log(e); // 报错
        // console.log(f); // 报错
```
##### 10. 使用解构，实现两个变量的值的交换？
        var a = 10;
        var b = 20;
        解构赋值交换两值
        [b, a] = [a, b];
##### 11. 解构赋值？
##### 12. 函数默认参数？   
        function first(x = 1, y = 2) {
            console.log(x ,y);
        }
##### 13. JavaScript 中什么是变量提升？什么是暂时性死区？
        在使用let、const声明变量之前，该变量都是不可用的。这在语法上，称为暂时性死区。使用var声明的变量不存在暂时性死区。

### 十二、Promise
##### 1. Promise 有几种状态？Promise 的特点是什么，分别有什么优缺点？
##### 2. Promise 构造函数是同步还是异步执行？then 呢？Promise 如何实现 then 处理？
##### 3. Promise 和 setTimeout 的区别？
         promise所在的异步队列优先级更高（微任务队列），而setTimeout放在宏任务队列
##### 4. 如何实现 Promise.all() ？
##### 5. 如何实现 Promise.prototype.finally() ？
        指定不管最后状态如何都会执行的回调函数。
```JavaScript
        // 手写finally()
        Promise.prototype.finally = function (callback) {
          let P = this.constructor;
          return this.then(
            value  => P.resolve(callback()).then(() => value),
            reason => P.resolve(callback()).then(() => { throw reason })
          );
        };
```
##### 6. all() 的用法？
##### 7. Promise 和Async Await的区别？
        1. Promise的出现解决了传统callback函数导致的“地域回调”问题，但它的语法导致了它向纵向发展行成了一个回调链，遇到复杂的业务场景，这样的语法显然也是不美观的。而async await代码看起来会简洁些，使得异步代码看起来像同步代码，只有这一句代码执行完，才会执行下一句。
        2. async await与Promise一样，是非阻塞的。
        3. async await是基于Promise实现的，可以说是改良版的Promise，它不能用于普通的回调函数。
```JavaScript 
            //promise
            Promise.resolve().then(data=>{ 
                console.log(data)
                return "aaa"
             })
            // async await
            async function foo() {
            	console.log(await getJSON)
                return "aaa"
            }
            foo();
```
        async/await优点：
            1. 使用async函数可以让代码简洁很多，不需要想Promise一样需要then,不需要写匿名函数处理Promise的resolve的值，也不需要定义多余的data变量，还避免了嵌套代码。
            2. async/await 让 try/catch可以同时处理同步和异步的错误。在下面的示例中，try/catch不能处理JSON.parse的错误，因为它在Promise中,我们需要使用.catch,这样的错误会显得代码非常的冗余。
            3.await需要在async中使用，await后面必须跟promise才会有排队效果，跟普通函数没有排队效果。
            4.async函数执行完（不报错的情况下）会自动返回一个状态为resolved（fulfilled）的promise，也就是成功的状态，但是值却是undefined；
              函数只要有返回值，那async函数返回的promise就会有成功值
```JavaScript
            const makeRequest = () => {
                try {
                    getJSON().then(result => {
                        // this parse may fail
                        const data = JSON.parse(result)
                        console.log(data)
                    })
                } catch (err) {
                    console.log(err)
                }
            }
    
            const makeRequest = async () => {   // 不需要写.then(),也不需要定义多余的result变量，还避免了嵌套代码
                try {
                    // this parse may fail
                    const data = JSON.parse(await getJSON())
                    console.log(data)
                } catch (err) {
                    console.log(err)
                }
            }
```          

### 十三、typescript
        typescript严格要求类型
            强类型：声明变量时，一旦给变量赋值了，那么变量的数据类型就已经确定了，不可在赋值其他类型的值
            静态类型：静态类型在类型检查时，是在代码编译阶段进行的。能够更早的发现问题
        如何使用：
            安装：> npm install -g typescript
            命令行输入  tsc index.ts   将ts转化为js
            配置文件： tsc --init 可以在当前目录下生成tsconfig.json文件。让ts文件可以按照一定的规则转换成js文件
```JavaScript
// 严格额要求数字类型
let num:number = 10;  
// 参数x,y是number类型，返回值也是number
function add(x:number,y:number):number{
    return x+y;
}
```

##### 算法
```JavaScript
// 1. 将数组换成前端更易解析的树状结构
function getTree(data) {
    var newData = [],
        hash = {};
    for (var i = 0; i < data.length; i++) {
        if (!hash[data[i].province]) {
            hash[data[i].province] = {
                'province': data[i].province
            };
            hash[data[i].province]['city'] = [{ 'name': data[i].city, 'code': data[i].code }]
            newData.push(hash[data[i].province]);
        } else if (hash[data[i].province].province == data[i].province) {
            hash[data[i].province]['city'].push({ 'name': data[i].city, 'code': data[i].code })
        }
    }
    return newData;
}
var data = [{
    'province': '浙江', 'city': '温州', 'code': '10010'
}, {
    'province': '浙江', 'city': '杭州', 'code': '10011'
}, {
    'province': '安徽', 'city': '合肥', 'code': '10012'
}, {
    'province': '安徽', 'city': '马鞍山', 'code': '10013'
}, {
    'province': '浙江', 'city': '宁波', 'code': '10014'
}];
console.log(getTree(data));

// 2. 二分法
function binarySearch(arr, data) {
    var start = 0,
        end = arr.length - 1;
    while (start <= end) {
        var middle = Math.floor((start + floor) / 2);
        if(data<arr[middle]){
            end=middle-1;
        }else if(data>arr[middle]){
            start=middle+1;
        }else{
            return middle;
        }
    }
    return -1;
}
var arr = [1, 2, 3, 4, 5, 6]; 
console.log(binarySearch(arr, 2))

// 3.获取url中某个参数的值
function getUrl() {
    let url = window.location.href();
    let Url = url.split('?');
    if (Url[0] === url) {
        return ''
    };
    let obj = {};
    let arr = Url[1].split('&');
    for (let i = 0; i < arr.length; i++) {
        let arg = arr[i].split('=');
        obj[arg[0]] = arg[1];
    }
    return obj;
}

// 4.统计字符中出现最多的字母
let str = 'asddfsgsgs';
function findChar(str) {
    if (str.length == 1) {
        return str;
    }
    str = str.split('');
    var newStr = {};
    // 数组去重 和计算出现的次数
    str.forEach(function (item) {
        if (newStr[item]) {
            newStr[item]++;
        } else {
            newStr[item] = 1;
        }
    })
    var cha = ''; //存储字符
    var max = 0; //存储次数
    for (let j in newStr) {
        if (newStr[j] > max) {
            max = newStr[j]
            cha = j
        }
    }
    return cha;
}
console.log(findChar(str));
```
       





### 十三、前端工程化
##### 1. 模块化开发怎么做？
##### 2. Webpack 如何实现打包的？
##### 3. 谈谈你对 AMD、CMD 的理解？



               

        

           
                
            
        
