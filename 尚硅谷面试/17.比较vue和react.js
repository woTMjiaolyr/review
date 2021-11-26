/*
  相同点：
   1.都有组件化开发和virtual DOM（运行效率）
   2.都支持标签属性props进行父子间的数据通信
   3.都支持数据驱动视图，不直接操作DOM，更新状态数据 界面就自动更新
   4.都支持服务器端渲染
   5.都有支持native的方案（跨平台原生应用），React的React Native，VUE的Weex

  不同点：
   1.数据绑定：vue实现了数据的双向绑定（内存数据<==>界面），react数据流动是单向的（内存数据 ==>界面）
   2.组件写法不一样，react推荐的做法是jsx，也就是把html和css全部写进js了；vue的做法是webpack+vue-loader的单文件组件格式，即html+css+js写在同一个文件
   3.state对象在react应用中不可变的，需要使用setState（）方法更新状态；在vue中，state对象不是必须的，数据有data属性在vue对象中管理this.xxx=???
*/