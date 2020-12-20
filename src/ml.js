const { SafeRequest, Request } = require('./lib');
const brain = require('brain.js');
const net = new brain.recurrent.LSTM();
const fs = require('fs');

const safeRequest = new SafeRequest();
const ip = safeRequest.ip;
const mac = safeRequest.mac;

// const trainingData = [
// 	{ input: [ip], output: 1 },
// 	{ input: [mac], output: 1 },
// ];

const data = [
	{ input: [1], output: [1] },
	{ input: [0], output: [0] },
];

net.train(data, {
	errorThresh: 0.005,
	iterations: 10000,
	log: true,
	logPeriod: 10,
	learningRate: 0.1,
});

const json = JSON.stringify(net.toJSON());
fs.writeFileSync('trained-net.json', json);

console.log(net.run([1]));
// console.log(net.run(new Request().ip));
console.log(net.run([0]));
// console.log(net.run(new Request().mac));
