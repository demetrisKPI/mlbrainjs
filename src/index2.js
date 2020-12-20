const config = require('./config');
const fs = require('fs');
const brain = require('brain.js');
const normalize = require('./funcs')(config.countries);

const rand = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1));
};

const randIp = () => {
	return `${rand(0, 255)}:${rand(0, 255)}:${rand(0, 255)}:${rand(0, 255)}`;
};

const randMac = () => {
	return 'XX:XX:XX:XX:XX:XX'.replace(/X/g, () => {
		return '0123456789ABCDEF'.charAt(Math.floor(Math.random() * 16));
	});
};

const randCounrty = (countries) => {
	return countries[rand(0, countries.length - 1)].code;
};

const initUsers = (config) => {
	const users = [];
	for (let i = 0; i < config.users; i++) {
		users.push([
			`User${i}`,
			randIp(),
			randMac(),
			randCounrty(config.countries),
			false,
		]);
	}
	return users;
};

const genData = (config) => {
	const initialUsers = initUsers(config);
	const requests = [];

	for (let i = 0; i < config.requestsCount * 2; i++) {
		const user = initialUsers[rand(0, config.users - 1)];
		if (rand(0, 100) < 85) {
			requests.push(user);
		} else {
			requests.push([
				user[0],
				randIp(),
				randMac(),
				randCounrty(config.countries),
				true,
			]);
		}
	}
	return requests;
};

const writeFile = (fileName, data) => {
	if (fs.existsSync(fileName)) fs.unlinkSync(fileName);
	for (const request of data) {
		fs.appendFileSync(fileName, `${JSON.stringify(request)}\n`);
	}
};

const data = genData(config);
writeFile(`${config.fileName}_train.txt`, data.slice(0, config.requestsCount));
writeFile(`${config.fileName}.txt`, data.slice(0, config.requestsCount));

const prepareData = (requests) => {
	const parsedRequests = [];
	for (const request of requests) {
		parsedRequests.push({
			input: [...normalize(request)],
			output: [request[4] ? 1 : 0],
		});
	}
	return parsedRequests;
};

const net = new brain.NeuralNetwork();

net.train(prepareData(data.slice(0, config.requestsCount)), {
	iterations: 10000,
	log: true,
	learningRate: 0.1,
});
const json = JSON.stringify(net.toJSON());
fs.writeFileSync('trained-net2.json', json);
