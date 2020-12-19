const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + 1;

const macAddr = () =>
	'XX:XX:XX:XX:XX:XX'.replace(/X/g, function () {
		return '0123456789ABCDEF'.charAt(Math.floor(Math.random() * 16));
	});

const locales = ['af', 'jp', 'ua', 'de', 'en', 'sc', 'it', 'ch', 'au', 'ru'];

function Request() {
	this.user = `user${random(1, 100)}`;
	this.ip = `${random(0, 255)}.${random(0, 255)}.${random(0, 255)}.${random(
		0,
		255
	)}`;
	this.mac = macAddr();
	this.time = `${random(0, 23)}:${random(0, 59)}`;
	this.locale = locales[random(0, locales.length)];
}

function SafeRequest() {
	this.user = `user${random(1, 100)}`;
	this.ip = '0.0.0.0';
	this.mac = '00:00:00:00:00:00';
	this.time = `${random(0, 23)}:${random(0, 59)}`;
	this.locale = 'ua';
}

module.exports = { random, Request, SafeRequest };
