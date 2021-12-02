/* 
1. 原型链继承
   优点：操作简单
   缺点：
   1、父类使用this声明的属性被所有实例共享。原因是实例化是父类一次性赋值到子类实例的原型上，它会将父类通过this声明的属性也赋值到子类原型上。例如在父类中一个数组值，在子类的多个实例中，无论哪一个实例去修改这个数组的值，都会影响到其他子类实例。
   2、创建子类实例时，无法向父类构造函数传参，不够灵活。

*/
function Father() {
    this.text = '1';
}
Father.prototype.someFn = function () {
    console.log(1);
}
Father.prototype.someValue = '2';

function Son() {
    this.text1 = 'text1';
}
// 函数原型指向构造函数的实例
Son.prototype = new Father();

/* 
2. 借用构造函数
   优点：
   1、可以向父类传递参数。
   2、解决父类this声明的属性会被实例共享的问题。
   缺点：
   1、只能继承父类通过this声明的属性/方法。不能继承父类prototype上的属性/方法。
   2、父类方法无法复用。每次实例化子类，都要执行父类函数。重新声明父类所定义的方法，无法复用。
*/
function Father(...arr) {
    this.some = '父类属性';
    this.params = arr;
}
Father.prototype.someFn = function () {
    console.log(1);
}
Father.prototype.someValue = '2';
function Son(fatherParams, ...sonParams) {
    // Father的this指向Son的this
    // 使用call调用父类，Father将会立即被执行，并且将父类的Father的this指向
    // Son的this。实例化子类，this将指向new期间创建的新对象，返回该新对象。
    Father.call(this, ...fatherParams);
    this.text = '子类属性';
    this.sonParams = sonParams;
}
var fatherParams = [];
var sonParams = [];
var sonInstance = new Son(fatherParams, ...sonParams);

/*
3. 组合继承 （原型链+call借用）
   优点：
   1、解决原型链继承父类this声明的属性或者方法被共享的问题。
   2、解决借用构造函数解决不能继承父类prototype对象上的属性/方法问题。
   缺点：
   1、调用了父类函数两次，造成一定的性能问题。
   2、因调用两次父类，导出父类通过this声明的属性和方法被生成两份的问题。
   3、原型链上下文丢失，子类和父类通过prototype声明的属性和方法都存在与子类prototype上。
*/
function Son() {
    Father.call(this, paras);
}
Son.prototype = new Father();
Child.prototype.constructor = Child;
const child = new Child();

/*
4. ES6

    子类必须在constructor方法中代用super方法，否则新建实例将会报错，这是因为子类自己的this对象，必须先通过父类的构造函数完成塑性，得到父类的属性和方法，然后对其加工，加上子类自己的属性和方法。如果不调用super方法，子类将得不到this对象。如果没有定义constructor方法，这个方法会被默认的添加。

    ES6的继承实质是先将父类实例对象的方法和属性加到this上面，然后在用子类的构造函数修改this。
*/
class Point { }
class ColorPoint extends Point { }