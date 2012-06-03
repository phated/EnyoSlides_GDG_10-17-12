enyo.kind({
  name: 'Socket',
  address: 'http://127.0.0.1',
  socket: null,
  // Socket.on
  // Array of objects
  // {
  //    name: 'news',
  //    callback: function(data){}
  // }
  on: [],
  // Sockect.emit
  // Array of objects
  // {
  //    name: 'my other event',
  //    data: { my: 'data' }
  // }
  emit: [],
  create: function(){
    // Has to be called to fire the super-class create method
    this.inherited(arguments);

    // Make a new socket
    this.socket = io.connect(this.address);
    // Bind arrays to on and emit
    this.connect('on', this.on);
    this.connect('emit', this.emit);
  },
  connect: function(connType, connArray){
    enyo.forEach(connArray, function(connObject){
      this.socket[connType](connObject.name, connObject.callback ? connObject.callback : connObject.data);
    }, this);
  }
});