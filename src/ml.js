const { SafeRequest, Request } = require('./lib');
const brain = require('brain.js');
const net = new brain.recurrent.LSTM();

const safeRequest = new SafeRequest();
//const anyRequest = new Request();

const trainingData = [
	{ input: [safeRequest.ip], output: 1 },
	{ input: [safeRequest.mac], output: 1 },
	{ input: [new Request().ip], output: 0 },
	{ input: [new Request().mac], output: 0 },
	// { input: [new Request().ip], output: 'unsafe' },
	// { input: [new Request().mac], output: 'unsafe' },
	// { input: [new Request().ip], output: 'unsafe' },
	// { input: [new Request().mac], output: 'unsafe' },
	// { input: [new Request().ip], output: 'unsafe' },
	// { input: [new Request().mac], output: 'unsafe' },
	// { input: [new Request().ip], output: 'unsafe' },
	// { input: [new Request().mac], output: 'unsafe' },
	// { input: [new Request().ip], output: 'unsafe' },
	// { input: [new Request().mac], output: 'unsafe' },
];

net.train(trainingData, {
	errorThresh: 0.005,
	iterations: 100,
	log: true,
	logPeriod: 10,
	learningRate: 0,
});

console.log(net.run(safeRequest.ip));
console.log(net.run(new Request().ip));
console.log(net.run(safeRequest.mac));
console.log(net.run(new Request().mac));
