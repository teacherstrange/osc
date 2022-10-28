import { installGlobals } from '@remix-run/node';
import '@testing-library/jest-dom/extend-expect';

installGlobals();

expect.extend({
    arrayIncludesSome: (received: any[], expected: any[]) => {
        const someExist = expected.some((value: any) => {
            return received.includes(value);
        });

        if (!someExist) {
            return {
                message: () => `expected ${received} to include ${expected}`,
                pass: false
            };
        }

        return {
            pass: true
        };
    }
});
