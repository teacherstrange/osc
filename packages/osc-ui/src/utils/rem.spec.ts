import { rem } from './rem';

test('returns a calculated rem value', () => {
    expect(rem(16)).toBe(1);
    expect(rem(32)).toBe(2);
    expect(rem(48)).toBe(3);
});
