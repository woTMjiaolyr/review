class Person {
    constructor(name) {
        this.name = name;
        // console.log('继承了啊');
    }
    drink() {
        console.log('喝水');
    }
}

class Student extends Person {
    // constructor(name, score) {
    // // 类似于call的继承：在这里super相当于把Person的constructor给执行了，并且让方法中的this是Student的实例，super当中传递的实参都是在给Person的constructor传递。
    //     super(name);
    //     this.score = score;
    //     // super.drink();
    // }
    introduction() {
        // console.log(`我是${this.name},我的分数是${this.score}`);
        super.drink();
    }
}

const student = new Student('张三', 99);
// student.introduction();
student.drink();