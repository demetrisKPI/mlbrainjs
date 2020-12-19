const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + 1;

const macAddr = () =>
	'XX:XX:XX:XX:XX:XX'.replace(/X/g, function () {
		return '0123456789ABCDEF'.charAt(Math.floor(Math.random() * 16));
	});

const locales = ['af', 'jp', 'ua', 'de', 'en', 'sc', 'it', 'ch', 'au', 'ru'];

function Request() {
	this.user = `${user}${random(1, 100)}`;
	this.ip = `${random(0, 255)}.${random(0, 255)}.${random(0, 255)}.${random(
		0,
		255
	)}`;
	this.mac = macAddr;
	this.time = `${random(0, 23)}${random(0, 59)}`;
	this.locale = locales[random(0, locales.length)];
}

// function UnsafeRequest() {
// 	Request.call(this, user, time);
// }

// UnsafeRequest.prototype = Object.create(Request.prototype);
// UnsafeRequest.prototype.constructor = Request;
