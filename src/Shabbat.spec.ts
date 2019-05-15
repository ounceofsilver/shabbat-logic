import { DateTime } from 'luxon';
import { candleLighting } from './HebrewTimes';
import { is, isItShabbat } from './Shabbat';

describe('Shabbat', () => {
	const location = [43, -71];

	describe('isItShabbat', () => {
		function testDates(dates, expectation) {
			dates.forEach((d) => {
				const o = isItShabbat(d, location[0], location[1]);
				expect(o.period).toBe(expectation);
				expect(o.countDownTo.zone).toBe(d.zone);
			});
		}

		it('should handle Sunday-Thursday', () => {
			testDates([
				DateTime.local(2018, 8, 19).startOf('day'),
				DateTime.local(2018, 8, 19, 12),
				DateTime.local(2018, 8, 19).endOf('day'),
				DateTime.local(2018, 8, 20).startOf('day'),
				DateTime.local(2018, 8, 20, 12),
				DateTime.local(2018, 8, 20).endOf('day'),
				DateTime.local(2018, 8, 21).startOf('day'),
				DateTime.local(2018, 8, 21, 12),
				DateTime.local(2018, 8, 21).endOf('day'),
				DateTime.local(2018, 8, 22).startOf('day'),
				DateTime.local(2018, 8, 22, 12),
				DateTime.local(2018, 8, 22).endOf('day'),
				DateTime.local(2018, 8, 23).startOf('day'),
				DateTime.local(2018, 8, 23, 12),
				DateTime.local(2018, 8, 23).endOf('day'),
			],        is.NOT_SHABBAT);
		});

		it('should handle Friday before candlelighting', () => {
			testDates([
				DateTime.local(2018, 8, 24).startOf('day'),
			],        is.NOT_SHABBAT);
		});

		it('should handle Friday after candlelighting but before sunset', () => {
			const cl = candleLighting(
				DateTime.fromObject({
					day: 24,
					hour: 19,
					minute: 22,
					month: 8,
					second: 30,
					year: 2018,
					zone: 'America/New_York',
				}),
				location[0],
				location[1],
			);
			testDates([
				cl.plus({ seconds: 1 }),
				cl.plus({ minutes: 17 }),
			],        is.CANDLELIGHTING);
		});

		it('should handle Friday after sunset', () => {
			testDates([
				DateTime.local(2018, 8, 24).endOf('day'),
			],        is.SHABBAT);
		});

		it('should handle Saturday before havdala', () => {
			testDates([
				DateTime.local(2018, 8, 25).startOf('day'),
			],        is.SHABBAT);
		});

		it('should handle Saturday after havdala', () => {
			testDates([
				DateTime.local(2018, 11, 24).endOf('day'),
			],        is.NOT_SHABBAT);
		});
	});
});
