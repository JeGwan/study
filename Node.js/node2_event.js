const events = require('events');
const eventEmitter = new events.EventEmitter();
const ev1Handler = function(){
  eventEmitter.emit("ev2");
}
eventEmitter.on("ev1",ev1Handler);
eventEmitter.on("ev2",function(){
  console.log("ev2 occured");
});
eventEmitter.emit("ev1");
