import { DateTime } from 'luxon';
import { getTimes } from 'suncalc';

export function sunset(day: DateTime, latitude: number, longitude: number) {
	const o = day.toObject();
	const ss = getTimes(new Date(o.year, o.month - 1, o.day), latitude, longitude).sunset;
	return day.set({
		hour: ss.getHours(),
		minute: ss.getMinutes(),
		second: ss.getSeconds(),
	});
}

export function nextOfWeek(day: DateTime, dayOfWeek: ofWeek) {
	const setted = day.set({ weekday: dayOfWeek });
	if (day.weekday > dayOfWeek) {
		return setted.plus({ days: 7 });
	}
	return setted;
}

export enum ofWeek {
	Monday = 1,
	Tuesday = 2,
	Wednesday = 3,
	Thursday = 4,
	Friday = 5,
	Saturday = 6,
	Sunday = 7,
}
