const config = require('./config');
const fs = require('fs');
const brain = require('brainjs');
const oneHot = require('one-hot');

const readData = (fileName) => {
	const data = fs.readFileSync(fileName, 'utf8');
	const requests = data.split('\n').filter((el) => el !== '');
	const parsedRequests = [];
	for (const request of requests) {
		const parsed = JSON.parse(request);
		parsedRequests.push({
			input: [
				parseInt(parsed[0].split('User')[1]),
				...parsed[1].split(':').map((el) => parseInt(el)),
				...parsed[2].split(':').map((el) => parseInt(el, 16)),
				parsed[3].charCodeAt(0),
				parsed[3].charCodeAt(1),
			],
			output: [parsed[4] ? 1 : 0],
		});
	}
	return parsedRequests;
};

const normalize = (data) => {
	return [
		parseInt(data[0].split('User')[1]),
		...data[1].split(':').map((el) => parseInt(el)),
		...data[2].split(':').map((el) => parseInt(el, 16)),
		data[3].charCodeAt(0),
		data[3].charCodeAt(1),
	];
};

const mlConfig = {
	binaryThresh: 0.5,
	hiddenLayers: [3],
	activation: 'sigmoid',
	leakyReluAlpha: 0.01,
};

const net = new brain.NeuralNetwork(mlConfig);

net.train(readData(config.fileName));

console.log(
	net.run(
		normalize(['User129', '214:22:241:183', '29:0F:B7:A3:07:03', 'EH', false])
	)
);
