interface CustomMatchers<R = unknown> {
    arrayIncludes(): R;
}

declare global {
    namespace Vi {
        interface Assertion extends CustomMatchers {}
        interface AsymmetricMatchersContaining extends CustomMatchers {}
    }
}
