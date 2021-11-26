function _instanceof(left, right) {
    // 用于判断构造函数的prototype属性是否出现在对象的原型链中的任何位置
    let prototype = right.prototype,
        proto = left._proto_;
    while (true) {
        if (proto === null) return false; // 找到头了
        if (proto === prototype) return true;
        proto = proto._proto_;
    }
}
/*
  1.获取类型的原型、对象的原型
  2.然后一直循环判断对象的原型是否等于类型的原型，知道对象原型为null为止。
*/