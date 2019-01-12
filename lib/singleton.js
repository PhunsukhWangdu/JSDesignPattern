//单例模式

//静态属性
function Cake() {
  if(typeof Cake.instance === 'object') return Cake.instance;
  this.flavor = 'sweet';
  return Cake.instance = this;
}

//闭包
function Cake() {
  const instance = this;
  this.flavor = 'sweet';
  Cake = function() {
    return instance;
  }
}

function test() {
  Cake.prototype.nothing = true;
  const cake1 = new Cake();

  //构造函数已经被重写
  Cake.prototype.any = true;
  const cake2 = new Cake();

  console.log(cake1.nothing); //true
  console.log(cake1.any); //undefined

  console.log(cake2.nothing); //true
  console.log(cake2.any); //undefined

  console.log(cake1.constructor.name === 'Cake'); //true
  console.log(cake1.constructor === Cake); //false
}

//闭包改良

function Cake() {
  let instance;

  Cake = function() {
    return instance;
  }
  //保留原型属性 也等于new Cake() 只是要指向一个Cake的实例，好能继承原型链
  Cake.prototype = this;

  instance = new Cake();
  //重置构造函数指针
  instance.constructor = Cake;

  instance.flavor = 'sweet';
  return instance;
}

var Cake;
(function() {
  var instance;
  Cake = function Cake() {
    if(instance) return instance;
    instance = this;
    this.flavor = 'sweet';
    return instance;
  }
})()