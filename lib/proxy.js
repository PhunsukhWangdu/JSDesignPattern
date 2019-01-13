//代理模式 介于对象的客户端和对象本身之间 对该对象的访问进行保护

//包装一个对象以控制它的访问 react高阶组件类似 proxy同

//延迟初始化 合并http请求->50ms以内的请求进行合并 对用户不易察觉

const proxy = {
  ids:[],
  delay:50,
  timeout:null,
  callback:null,
  context: null,
  makeRequest: (id, callback, context) => {
    this.ids.push(id);
    this.callback = callback;
    this.context = context;
    if(!this.timeout) {
      this.timeout = setTimeout(
        () => this.flush(), this.delay
      )
    }
  },
  flush: () => {
    http.makeRequest(this.ids, this.handler);
    this.timeout = null;
    this.ids = [];
  },
  handler: (data) => {
    const len = data.length;
    if(len === 1) {
      this.callback.call(this.context, data[0]);
      return
    }
    data.forEach(
      (v) => {
        this.callback.call(this.context, v);
      }
    )
  }
}