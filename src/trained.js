const fs = require('fs');
const json = JSON.parse(fs.readFileSync('trained-net.json'));
const brain = require('brain.js');
const net = new brain.recurrent.LSTM();
const { SafeRequest, Request } = require('./lib');

const safeRequest = new SafeRequest();
const ip = safeRequest.ip;
const mac = safeRequest.mac;

net.fromJSON(json);
net.run(new Request().ip);

console.log(net.run([1]));
console.log(net.run([0]));
// console.log(net.run(ip));
// console.log(net.run(new Request().ip));
// console.log(net.run(mac));
// console.log(net.run(new Request().mac));
