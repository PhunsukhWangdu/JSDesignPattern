//装饰器模式
//可以在运行时动态添加附加功能到对象中
//特征：其预期行为的可定制性。对于一些基本功能的普通对象，可以从装饰资源池中选择需要用于增强对象的功能，并按照顺序进行装饰。
//增强对象的功能，并按照顺序进行装饰


//调用方法
var sale = new Sale(100);
sale.decorate('fedtax');
sale.decorate('qubec');
sale.getPrice();


//实现

//对同一个方法的重写 获取装饰过的属性值 装饰一次继承一次 有点像redux的middleware 加强的是dispatch


function Sale(price) {
  this.price = price || 100
}

Sale.prototype.getPrice = function() {
  return this.price;
}

//继承实现
Sale.decorators = {};

Sale.decorators.fedtax = {
  getPrice: function() {
    return this.uber.getPrice() * 2
  }
}

Sale.decorators.qubec = {
  getPrice: function() {
    return this.uber.getPrice() + 5
  }
}

Sale.decorate = function(type) {
  const overide = this.constructor.decorators[type],
    F = function() {},
    newobj, i;

    //原型继承 不自己拥有构造函数中的值 也走继承
    F.prototype = this;
    newobj = new F();
    newobj.uber = F.prototype;

    //属性继承 overide中定义了要增强（重写）的属性 不是一个构造函数
    for(var key in overide) {
      overide.hasOwnProperty(key) && (newobj[key] = overide[key]);
    }
    return newobj;
}

//属性列表实现
Sale.decorators = {};

Sale.decorators.fedtax = {
  getPrice: function(price) {
    return price * 2
  }
}

Sale.decorators.qubec = {
  getPrice: function(price) {
    return price + 5
  }
}

Sale.prototype.decorate = function(type) {
  this._decoratorslist.push(type);
}

Sale.prototype.getPrice = function() {
  let { price, _decoratorslist } = this;
  _decoratorslist.forEach(
    v => {
      price = this.constructor.decorators[v].getPrice(price);
    }
  )
} 
