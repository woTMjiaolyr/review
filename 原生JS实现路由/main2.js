(function () {
    var Router = function () {
        this.routers = {}; //保存路由
        this.curUrl = ''; //获取当前的hash值
    }

    Router.prototype.init = function () {
        window.addEventListener('hashchange', this.reloadPage.bind(this));
    }

    Router.prototype.reloadPage = function () {
        // 获取当前的hash值
        this.curUrl = location.hash.substring(1) || '/';
        //运行hash值对应的函数
        this.routers[this.curUrl]();
    }

    Router.prototype.map = function (key, callback) {
        this.routers[key] = callback
    }
    window.oRou = Router;
})()

var oRouter = new oRou();
oRouter.init();

oRouter.map('/', function () {
    var oSidebar = document.querySelector('sidebar');
    oSidebar.innerHTML = '我是主页'
})

oRouter.map('/html', function () {
    var oSidebar = document.querySelector('sidebar');
    oSidebar.innerHTML = '我是html'
})

oRouter.map('/css', function () {
    var oSidebar = document.querySelector('sidebar');
    oSidebar.innerHTML = '我是css'
})

oRouter.map('/JavaScript', function () {
    var oSidebar = document.querySelector('sidebar');
    oSidebar.innerHTML = '我是JavaScript'
})