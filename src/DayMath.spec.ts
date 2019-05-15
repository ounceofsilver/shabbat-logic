import { DateTime } from 'luxon';

import { nextOfWeek, ofWeek, sunset } from './DayMath';
import { local } from './test/framework';

describe('DayMath', () => {
	const location = [43, -71];

	describe('ofWeek', () => {
		it('should map to numbers properly', () => {
			expect(ofWeek.Monday).toBe(1);
			expect(ofWeek.Tuesday).toBe(2);
			expect(ofWeek.Wednesday).toBe(3);
			expect(ofWeek.Thursday).toBe(4);
			expect(ofWeek.Friday).toBe(5);
			expect(ofWeek.Saturday).toBe(6);
			expect(ofWeek.Sunday).toBe(7);
		});
	});

	describe('nextOfWeek', () => {
		it('should handle basic case', () => {
			const d = local(2018, 10, 16, 20, 42, 30);
			const outcome = nextOfWeek(d, ofWeek.Saturday);
			expect(outcome.weekday).toBe(ofWeek.Saturday);
			expect(outcome.day).toBe(20);
			expect(outcome.hour).toBe(20);
			expect(outcome.minute).toBe(42);
			expect(outcome.second).toBe(30);
			expect(outcome.zone).toBe(d.zone);
		});

		it('should wrap-around to next week', () => {
			const d = local(2018, 10, 17, 20, 42, 30);
			const outcome = nextOfWeek(d, ofWeek.Monday);
			expect(outcome.weekday).toBe(ofWeek.Monday);
			expect(outcome.day).toBe(22);
			expect(outcome.hour).toBe(20);
			expect(outcome.minute).toBe(42);
			expect(outcome.second).toBe(30);
			expect(outcome.zone).toBe(d.zone);
		});

		it('should return input if day is already the requested day of week', () => {
			const d = local(2018, 10, 22, 20, 42, 30);
			const outcome = nextOfWeek(d, ofWeek.Monday);
			expect(outcome.weekday).toBe(ofWeek.Monday);
			expect(outcome.day).toBe(22);
			expect(outcome.hour).toBe(20);
			expect(outcome.minute).toBe(42);
			expect(outcome.second).toBe(30);
			expect(outcome.zone).toBe(d.zone);
		});
	});

	describe('sunset', () => {
		it('returns sunset with same zone and day as original DateTime', () => {
			[
				local(2018, 11, 19).startOf('day'),
				local(2018, 11, 19, 12),
				local(2018, 11, 19).endOf('day'),
				DateTime.utc(2018, 11, 19).startOf('day'),
				DateTime.utc(2018, 11, 19, 12),
				DateTime.utc(2018, 11, 19).endOf('day'),

				local(2018, 8, 24).startOf('day'),
				local(2018, 8, 24).endOf('day'),
			].forEach((d) => {
				const o = sunset(d, location[0], location[1]);
				expect(o.year).toBe(d.year);
				expect(o.month).toBe(d.month);
				expect(o.day).toBe(d.day);
				expect(o.zone).toBe(d.zone);
			});
		});
	});
});
