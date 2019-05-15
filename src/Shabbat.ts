import { DateTime } from 'luxon';

import { ofWeek } from './DayMath';
import { candleLighting, fridaySunset, havdala } from './HebrewTimes';

export enum is {
	SHABBAT = 'SHABBAT',
	NOT_SHABBAT = 'NOT_SHABBAT',
	CANDLELIGHTING = 'CANDLELIGHTING',
}

export function isItShabbat(now: DateTime, latitude: number, longitude: number) {
	// SATURDAY
	let countDownTo: DateTime;
	let period: is;
	if (now.weekday === ofWeek.Saturday) {
		const havdalaTime = havdala(now, latitude, longitude);
		if (now < havdalaTime) {
			period = is.SHABBAT;
			countDownTo = havdalaTime;
		} else {
			period = is.NOT_SHABBAT;
			countDownTo = candleLighting(now, latitude, longitude);
		}

		// FRIDAY
	} else if (now.weekday === ofWeek.Friday) {
		const fridaySunsetTime = fridaySunset(now, latitude, longitude);
		const candleLightingTime = candleLighting(now, latitude, longitude);
		if (now >= candleLightingTime) {
			if (now < fridaySunsetTime) {
				period = is.CANDLELIGHTING;
				countDownTo = fridaySunsetTime;
			} else {
				period = is.SHABBAT;
				countDownTo = havdala(now, latitude, longitude);
			}
		} else {
			period = is.NOT_SHABBAT;
			countDownTo = candleLightingTime;
		}

		// OTHER DAYS
	} else {
		period = is.NOT_SHABBAT;
		countDownTo = candleLighting(now, latitude, longitude);
	}

	return {
		period,
		countDownTo,
	};
}
