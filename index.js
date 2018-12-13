const { isItShabbat, is } = require('./Shabbat');
const { fridaySunset, havdala, candleLighting } = require('./HebrewTimes');
const { sunset, nextOfWeek, ofWeek } = require('./DayMath');

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
