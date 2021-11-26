function $attr(property, value) {
    //获取当前页面中的而所有标签
    let elements = document.getElementsByTagName('*');
    let arr = [];
    // 还可以写成 [].forEach.call(elements,()=>{})
    // Array.property.forEach.call(elements, item => {})
    elements = Array.from(elements); //将类数组转化为数组
    elements.forEach(item => {
        // itemvalue存储的是当前元素的property对应的属性值
        let itemValue = item.getAttribute(property);
        if (property === 'class') {
            //样式类属性名要特殊处理 一个标签有多个类名 
            new RegExp("\\b" + value + "\\b").test(itemValue) ? arr.push(item) : null;
            return;
        }
        if (itemValue === value) {
            // 获取的值和传递的值校验成功
            arr.push(item);
        }
    })

    return arr;
}

console.log($attr('myIn', 'BB'));