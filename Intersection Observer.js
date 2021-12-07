
/*
用来判断元素是否进入视口“viewpoint”
*/

var io = new IntersectionObserver(callback, option);

// IntersectionObserver是浏览器原生提供的构造函数，接受两个参数
// callback是可见性变化时的回调函数，option是配置对象（可选）
// 该构造函数的返回值就是一个观察器实例，实例的observe方法可以指定观察哪个dom节点

// 开始观察  若要观察多个节点，就多次调用observe方法
io.observe(document.querySelector('div'));
// 停止观察
io.unobserve(element);
// 关闭观察器
io.disconnect();

// 一、callback参数
var io = new IntersectionObserver(
    entries => {
        console.log(entries);
    }
);
/*
    上述代码中，callback的参数（entirs）是一个数组，每一个成员都是一个IntersectionObserver对象。
*/

// 二、IntersectionObserverEntry 对象，一共有6个属性
/*
{
    time: 3893.92,                   可见性发生变化的时间
    rootBounds:ClientRect {          根元素的矩形区域的信息
        bottom: 920,
        height: 1024,
        left: 0,
        right: 1024,
        top: 0,
        width: 920
    },
    boundingClientRect: ClientRect {  目标元素的矩形区域信息
        // ...
    },
    intersectionRect: ClientRect {    目标元素与视口的交叉区域信息
        // ...
    },
    intersectionRatio: 0.54,          目标元素的可见比例，即intersectionRect占boundingClientRect的比例
    target: element                   被观察的目标元素，是一个DOM节点对象
}
*/

// 懒加载实例
function checkImgs(domSelect) {
    const imgs = Array.from(document.querySelectorAll(domSelect));
    imgs.forEach(item => io.observe(item));
}
function loadImg(el) {
    if (!el.src) {
        const source = el.getArrtibute('data-src');
        el.src = source;
    }
}
const io = new IntersectionObserver(ioes => {
    ioes.forEach(ioe => {
        const el = ioe.target;
        const intersectionRatio = ioe.intersectionRatio;
        if (intersectionRatio > 0 && intersectionRatio <= 1) {
            loadImg(el);
        }
        el.onload = () => {
            io.unobserve();
        }
    })
})
