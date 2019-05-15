import { DateTime } from 'luxon';

jest.mock('./DayMath');
jest.mock('./HebrewTimes');

const { candleLighting, fridaySunset, havdala } = jest.requireMock('./HebrewTimes');
import { is, isItShabbat } from './Shabbat';

describe('Shabbat unit', () => {
	const location = [43, -71];
	afterEach(() => {
		// sinon.reset();
	});

	describe('isItShabbat', () => {
		const times = {
			candleLighting: DateTime.utc(2018, 11, 16, 12),
			fridaySunset: DateTime.utc(2018, 11, 16, 18),
			havdala: DateTime.utc(2018, 11, 17, 18),
		}; // times are not accurate, but dates and ordering should work properly

		beforeEach(() => {
			candleLighting.mockReturnValue(times.candleLighting);
			fridaySunset.mockReturnValue(times.fridaySunset);
			havdala.mockReturnValue(times.havdala);
		});

		function testDates(dates, expectation) {
			dates
				.map(d => isItShabbat(d, location[0], location[1]))
				.forEach((o) => {
					expect(o).toEqual(expectation);
				});
		}

		it('should handle Sunday-Thursday', () => {
			testDates([
				DateTime.utc(2018, 11, 11, 12),
				DateTime.utc(2018, 11, 12, 12),
				DateTime.utc(2018, 11, 13, 12),
				DateTime.utc(2018, 11, 14, 12),
				DateTime.utc(2018, 11, 15, 12),
			],        {
				countDownTo: times.candleLighting,
				period: is.NOT_SHABBAT,
			});
		});

		it('should handle Friday before candlelighting', () => {
			testDates([
				DateTime.utc(2018, 11, 16).startOf('day'),
				DateTime.utc(2018, 11, 16, 11, 59, 59), // before noon
			],        {
				countDownTo: times.candleLighting,
				period: is.NOT_SHABBAT,
			});
		});

		it('should handle Friday after candlelighting but before sunset', () => {
			testDates([
				DateTime.utc(2018, 11, 16, 12),
				DateTime.utc(2018, 11, 16, 17, 59, 59),
			],        {
				countDownTo: times.fridaySunset,
				period: is.CANDLELIGHTING,
			});
		});

		it('should handle Friday after sunset', () => {
			testDates([
				DateTime.utc(2018, 11, 16, 18),
				DateTime.utc(2018, 11, 16).endOf('day'),
			],        {
				countDownTo: times.havdala,
				period: is.SHABBAT,
			});
		});

		it('should handle Saturday before havdala', () => {
			testDates([
				DateTime.utc(2018, 11, 17).startOf('day'),
				DateTime.utc(2018, 11, 17, 17, 59, 59),
			],        {
				countDownTo: times.havdala,
				period: is.SHABBAT,
			});
		});

		it('should handle Saturday after havdala', () => {
			const nextCandlelighting = DateTime.utc(2018, 11, 23, 18);
			candleLighting.mockReturnValue(nextCandlelighting);
			testDates([
				DateTime.utc(2018, 11, 17, 18),
				DateTime.utc(2018, 11, 17).endOf('day'),
			],        {
				countDownTo: nextCandlelighting,
				period: is.NOT_SHABBAT,
			});
		});
	});
});
