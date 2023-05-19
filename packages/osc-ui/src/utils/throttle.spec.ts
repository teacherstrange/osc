import { throttle } from './throttle';

test('should throttle function calls', () => {
    const mockFn = vi.fn();
    const delay = 100;
    const throttledFn = throttle(mockFn, delay);

    vi.useFakeTimers();

    throttledFn();
    expect(mockFn).toHaveBeenCalledTimes(1);

    // Call the function again immediately
    throttledFn();
    expect(mockFn).toHaveBeenCalledTimes(1);

    // Advance the timer by 50ms
    vi.advanceTimersByTime(50);
    throttledFn();
    expect(mockFn).toHaveBeenCalledTimes(1);

    // Advance the timer by another 50ms
    vi.advanceTimersByTime(50);
    throttledFn();
    expect(mockFn).toHaveBeenCalledTimes(2);

    vi.useRealTimers();
});
