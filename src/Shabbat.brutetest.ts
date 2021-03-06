import { DateTime } from 'luxon';

import { isItShabbat } from './Shabbat';

describe('Big Shabbat Test', () => {
	function range(x, y, n = 1) {
		const numbers = [];
		for (let i = x; i < y; i += n) {
			numbers.push(i);
		}
		return numbers;
	}

	[
		{ zone: 'America/New_York', lat: 40, long: -74 },
		{ zone: 'America/Los_Angeles', lat: 34, long: -118 },
		{ zone: 'Africa/Johannesburg', lat: -26, long: 28 },
		{ zone: 'Asia/Jerusalem', lat: 32, long: 35 },
		{ zone: 'Asia/Tokyo', lat: 36, long: 140 },
		{ zone: 'Europe/London', lat: 52, long: 0 },
	].forEach(({ zone, lat, long }) => {
		it(`should work in ${zone}`, () => {
			range(1, 13, 3).forEach((month) => { // every month
				range(1, 8).forEach((day) => { // first week
					range(1, 24).forEach((hour) => { // every hour
						range(0, 60, 15).forEach((minute) => { // every 15 minutes
							const o = DateTime.fromObject({
								zone,
								day,
								hour,
								minute,
								month,
								year: 2018,
							});
							const d = isItShabbat(o, lat, long).countDownTo;
							expect(d.zone).toEqual(expect.objectContaining({ zoneName: zone }));
							expect(d.month).toBe(month);
							expect(d.year).toBe(2018);
							if ([5, 6].indexOf(o.weekday) === -1) {
								expect(d.weekday).toBe(5);
							} else {
								expect([5, 6]).toContain(d.weekday);
							}
						});
					});
				});
			});
		});
	});
});
