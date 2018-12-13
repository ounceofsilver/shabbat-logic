const { isItShabbat, is } = require('./src/Shabbat');
const { fridaySunset, havdala, candleLighting } = require('./src/HebrewTimes');
const { sunset, nextOfWeek, ofWeek } = require('./src/DayMath');

module.exports = {
	isItShabbat,
	is,

	fridaySunset,
	havdala,
	candleLighting,

	sunset,
	nextOfWeek,
	ofWeek,
}
