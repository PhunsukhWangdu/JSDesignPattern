//调用方法
var sale = new Sale(100);
sale.decorate('fedtax');
sale.decorate('qubec');
sale.getPrice();



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
    F.prototype = this;
    newobj = new F();
    newobj.uber = F.prototype;
    for(var key in overide) {
      overide.hasOwnProperty(key) && newobj[key] = overide[key];
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