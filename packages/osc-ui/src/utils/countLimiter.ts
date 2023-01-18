/**
 * If count > limit then returns the limit plus an optional suffix
 *
 * @param count The value to check limiting on
 * @param limit The limit which can not be exceeded
 * @param limitSuffix A suffix that can be added if limit is exceeded
 * @returns A string value
 */

export const countLimiter = (count: string | number, limit: number = 100, limitSuffix?: string) => {
    if (!count) return;

    if (+count > limit) {
        if (limitSuffix) return `${limit}${limitSuffix}`;
        return limit;
    }

    return count;
};
