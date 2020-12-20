const config = require('./config');
const fs = require('fs');
const brain = require('brain.js');

const normalize = require('./funcs')(config.countries);

const net = new brain.NeuralNetwork();

const json = JSON.parse(fs.readFileSync('trained-net2.json'));
net.fromJSON(json);

const data = fs.readFileSync(`${config.fileName}.txt`, 'utf-8').split('\n');
let count = 0;
for (const request of data) {
	if (request === '') continue;
	if (net.run(normalize(JSON.parse(request))) > 0.1) count++;
}
console.log(count);
