//工厂模式

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