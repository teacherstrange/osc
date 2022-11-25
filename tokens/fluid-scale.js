// Every spacing metric should be based on this. We reset the document to allow 10px to dictate our px to rem calculations.
const baseFontSize = 10;

const minViewportWidth = 375;
const maxViewportWidth = 1440;

const minScale = 1.2;
const maxScale = 1.33;

const minFontSize = 16;
const maxFontSize = 20;

module.exports = {
    'base-font-size': baseFontSize,
    steps: [
        'micro',
        'milli',
        'centi',
        'zeta',
        'epsilon',
        'delta',
        'gamma',
        'beta',
        'alpha',
        'omega',
        'kilo',
        'mega'
    ],
    'min-viewport': {
        width: minViewportWidth,
        'font-size': minFontSize,
        scale: minScale
    },
    'max-viewport': {
        width: maxViewportWidth,
        'font-size': maxFontSize,
        scale: maxScale
    }
};
