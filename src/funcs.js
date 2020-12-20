const parseByte = (byte) => {
	const result = byte
		.toString(2)
		.split('')
		.map((el) => parseInt(el));
	while (result.length < 8) result.unshift(0);
	return result;
};

const ip2int = (ip) => {
	const result = [];
	ip.split('.').map((el) =>
		parseByte(parseInt(el)).forEach((el) => result.push(el))
	);
	return result;
};

const mac2int = (mac) => {
	const result = [];
	mac
		.split(':')
		.map((el) => parseByte(parseInt(el, 16)).forEach((el) => result.push(el)));
	return result;
};

const getCountryId = (country, countries) => {
	let i = 0;
	while (countries[i].code !== country) i++;
	return i || 0;
};

const normalize = (countries, data) => {
	const user = parseByte(parseInt(data[0].split('User')[1]));
	const ip = ip2int(data[1]);
	const mac = mac2int(data[2]);
	const countryId = parseByte(getCountryId(data[3], countries));
	return [...user, ...ip, ...mac, ...countryId];
};

module.exports = (countries) => normalize.bind(null, countries);
