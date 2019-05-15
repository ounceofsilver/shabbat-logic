import { DateTime } from 'luxon';

import { nextOfWeek, ofWeek, sunset } from './DayMath';

export function fridaySunset(now: DateTime, latitude: number, longitude: number) {
	return sunset(
		nextOfWeek(now, ofWeek.Friday), latitude, longitude,
	);
}

export function candleLighting(now: DateTime, latitude: number, longitude: number) {
	// https://judaism.stackexchange.com/questions/4334/calculating-shabbat-candle-lighting-time
	return fridaySunset(now, latitude, longitude).minus({ minutes: 18 });
}

export function havdala(now: DateTime, latitude: number, longitude: number) {
	const sunsetSaturday = sunset(
		nextOfWeek(now, ofWeek.Saturday), latitude, longitude,
	);
	// https://www.hebcal.com/home/96/what-is-havdalah-or-when-does-shabbat-end
	// You can always end Shabbat later
	return sunsetSaturday.plus({ minutes: 42 });
}
