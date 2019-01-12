//工厂模式

//调用
const cake = DessertMaker.factory('cake');
const sweet = DessertMaker.factory('sweet');
cake.addFlavor();
sweet.addFlavor();

//实现

//不是手动去new工厂原型的实例，而是通过传入工厂不同的类型，由工厂原型的方法去调用相应的构造函数，实例化对象并返回。
//工厂原型上的工厂方法会构造出一个继承工厂对象的实例并让构造函数的原型指向这个实例，然后执行构造函数生成实例返回
//各个类型的构造函数都定义在工厂对象的类上，通用方法都在工厂对象的原型上，各个构造函数内部定义个性的一些属性

function DessertMaker() {}

DessertMaker.prototype.addFlavor = function() {
  return `I want to make a ${this.flavor}`
}

DessertMaker.factory = function(type) {
  const constr = type;
  let newcake;
  if(typeof DessertMaker[constr] !== 'function') {
    throw {
      name: 'ERROR',
      message: `${constr} dosen't exist`
    }
  }
  
  //构造函数原型继承父类
  if(typeof DessertMaker[constr].prototype.addFlavor !== 'function') {
    DessertMaker[constr].prototype = new DessertMaker();
  }
  newcake = new DessertMaker[constr];
  return newcake;
}

DessertMaker.Cake = function() {
  this.flavor = 'cake'
}

DessertMaker.Sweet = function() {
  this.flavor = 'sweet'
}

//Object 内置的工厂对象
const o = new Object();
const n = new Object(1);
const s = Object('1');
const b = Object(true);

console.log(o.constructor === Object);
console.log(n.constructor === Number);
console.log(s.constructor === String);
console.log(b.constructor === Boolean);