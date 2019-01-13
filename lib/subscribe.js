class Pubisher{
  constructor(){
    this.subscribes = {
      any: [],
    }
  }
  subscribe(type='any', func) {
    let subscriber = this.subscribes[type];
    if(!subscriber) subscriber = this.subscribes[type] = [];
    subscriber.push(func);
  }
  unsubscribe(type, func) {
    const subscriber = this._testType(type);
    if(!subscriber) return
    const idx = subscriber.findIdx(
      v => Object.is(v, func)
    )
    subscriber.splice(idx, 0);
  }
  publish(type, ...argv) {
    const subscriber = this._testType(type);
    if(!subscriber) return
    subscriber.forEach(function(v){
      v.apply(this, argv)
    })
  }
  _testType(type) {
    const subscriber = this.subscribes[type];
    if(!subscriber) {
      console.log('this is no subscriber for this type');
      return false
    }
    return subscriber;
  }
}


// const _handler = {
//   add: (fn, data, fns) => {
//       fns.push(() => fn.call(null, data));
//   },
//   remove: (fn, fns) => {
//     const idx = fns.findIdx(
//       v => Object.is(v, fn)
//     )
//     fns.splice(idx, 0);
//     // var i = fns.indexOf(fn);
//     // if (i >= 0) {
//     //     fns.splice(i, 1);
//     // }
//   },
//   invoke: (sender, data, fns) => {
//       fns.forEach((fn, i) => {
//           try {
//               fn(sender, data, datas[i])
//           } catch (error) {
//               console.error(error);
//           }
//       });
//   }
// }
