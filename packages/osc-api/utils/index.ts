/**
 * Create a promise which resolves after provided timeout in ms
 *
 * Note that given the js event loop you will never be able to guarantee
 * this timeout too precisely but it should at least be safe to assume
 * "at least this time in ms will have passed"
 */
export const wait = (timeout: number) => {
    return new Promise<void>((resolve) => {
        const wait = setTimeout(() => {
            clearTimeout(wait);
            resolve();
        }, timeout);
    });
};
