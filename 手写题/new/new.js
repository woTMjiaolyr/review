/*
  1.创建一个新的空对象
  2.设置原型，将对象的原型设置为函数的prototype属性
  3.让函数的this指向这个对象，并执行构造函数的代码（为这个新对象添加属性）
  4.判断函数的返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象
  如果执行结果有返回值并且是一个对象, 返回执行的结果, 否则, 返回新创建的对象
*/
function Creat() {
  let obj = new Object();
  // 获取构造函数以及对应参数
  let [Con, ...arg] = [...arguments];
  // 原型指向
  obj._proto_ = Con.prototype; // obj=Object.creat(Constructor.prototype);
  let res = Con.apply(obj, arg);
  // 如果执行结果有返回值并且是一个对象，返回执行的结果，否则返回新创建的对象
  return typeof res === 'object' ? res : obj;
}
