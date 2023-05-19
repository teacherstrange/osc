/**
 * Creates a throttled function that only invokes `func` at most once per `interval` milliseconds.
 *
 * @param func The function to throttle.
 * @param interval The number of milliseconds to throttle invocations to.
 * @returns A throttled function that will invoke `func` at most once per `interval` milliseconds.
 */
export const throttle = (func: Function, interval: number) => {
    // Initialize the variable used to track whether or not the func can be called
    let enableCall = true;

    return function (...args: any[]) {
        if (!enableCall) return;

        // Set enableCall to false before calling the function
        enableCall = false;
        func.apply(this, args);

        // Switch enableCall back on after the interval has passed
        setTimeout(() => (enableCall = true), interval);
    };
};
