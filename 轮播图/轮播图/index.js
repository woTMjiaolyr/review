var slideWidth = 520;
var slides = document.querySelector('.slides');
var slidess = document.querySelectorAll('.slide');
var curIndex = 1;
var showcase = document.querySelector('.showcase');//所有事件都会冒泡到showcase上，直接事件委托
var prevTime = 0;
var timer;
var spots = document.querySelectorAll('.spot');

// 设置轮播图区域函数(初始化)
function setSlides() {
    slides.style.width = slideWidth * slidess.length + 'px';
    slides.style.left = '-' + slideWidth * curIndex + 'px';//解决第一次没有过渡效果（transitionMove）
    spots[0].classList.add('active');//解决首次打开第一个小圆点不亮的问题
}
//过渡移动
function transitionMove() {
    slides.style.left = '-' + slideWidth * curIndex + 'px';
    // 由于初始化之后slides没有left属性，所以第一次切换照片没有过渡效果（transition）
    // 解决办法就是setSlides()函数中的第二行，即初始化时就设置一个left属性
    slides.style.transition = 'left 1s';
}
//定时器移动
function timeoutMove() {
    setTimeout(() => { // 等5平滑过渡到1之后，再改变index，并且不能有过渡效果
        //到达边界之后，index改变了，但是left还没变，所以要在设置一次left
        slides.style.left = '-' + slideWidth * curIndex + 'px';
        //但是改变的时候，方向不对，要骗过用户眼睛，所以应该把过渡去掉
        slides.style.transition = 'none';//取消第七幅图的效果（但是会覆盖第六幅图的过渡效果，应设置定时器）
    }, 1000)
}
//展示下一张图片
function showNextSlide() {
    curIndex++;
    transitionMove()
    if (curIndex === slidess.length - 1) {
        curIndex = 1;
        timeoutMove()
    }
    setSpotActive();
}
//展示上一张图片
function showPreslide() {
    curIndex--;
    transitionMove()
    if (curIndex === 0) {
        curIndex = slidess.length - 2;
        timeoutMove()
    }
    setSpotActive();
}
//所有的事件绑定函数 用e.target.classList.contains()判断事件对象
function eventBind() {
    showcase.addEventListener('click', function (e) {
        // 目标元素的所有类名，并且是否contains某个类名，返回布尔值
        // console.log(e.target.classList.contains('next'));
        if (e.target.classList.contains('next')) {
            // 说明点击的是next
            // showNextSlide()
            thrttle(showNextSlide, 1300);
        } else if (e.target.classList.contains('prev')) {
            thrttle(showPreslide, 1300);
        } else if (e.target.classList.contains('spot')) {
            //第一个参数让indexof方法中的this指向spots，第二个参数是要获取其index的元素
            var index = Array.prototype.indexOf.call(spots, e.target);
            //由于轮播图的所有次序都是跟curIndex有关系，所以获取到的index应该与curIndex建立联系
            curIndex = index + 1;
            transitionMove();
            setSpotActive();
        }
    })
    showcase.addEventListener('mouseover', function () {
        pausePlay();
    })
    showcase.addEventListener('mouseout', function () {
        autoPlay()
    })
}
//自动轮播函数
function autoPlay() {
    timer = setInterval(function () {
        showNextSlide();
    }, 2000);
}
// 暂停轮播函数
function pausePlay() {
    clearInterval(timer);
}
//防抖节流函数
function thrttle(fn, delay) {
    var now = Date.now();
    if (now - prevTime >= delay) {
        fn();
        prevTime = Date.now();
    }
}
//设置小圆点选中函数  遍历一遍，对上号的加上，其他的一律取消
function setSpotActive() {
    for (let i = 0; i < spots.length; i++) {
        if (i === curIndex - 1) {
            spots[i].classList.add('active');
        } else {
            spots[i].classList.remove('active');
        }
    }
}

// 初始化函数
function init() {
    setSlides();
    eventBind();
    autoPlay();
}
init();




