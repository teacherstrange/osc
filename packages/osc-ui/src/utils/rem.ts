/**
 * Calculates the rem value of a number, based on the base font size of 16px
 *
 * @param n A number in px to convert to rem
 * @returns A number in rem
 * @example rem(32) // 2
 */
export const rem = (n: number) => n / 16;
