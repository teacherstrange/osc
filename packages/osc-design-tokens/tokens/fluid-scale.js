// *----------------------------------*/
//  #FLUID SCALE TOKENS
// *----------------------------------*/
//
//  Defines global settings for the fluid scale.
//  (values are in px)
//
// *----------------------------------*/

// Every spacing metric should be based on this. 16px is the default font size set by bowsers.
const baseFontSize = 16;

const minViewportWidth = 375;
const maxViewportWidth = 1440;

const minScale = 1.2;
const maxScale = 1.3;

const minFontSize = 16;
const maxFontSize = 20;

module.exports = {
    'base-font-size': baseFontSize,
    steps: [
        '2xs', // fluid sizing (min - max) = 9px
        'xs', // fluid sizing (min - max) = 11px
        's', // fluid sizing (min - max) = 13px - 15px
        'm', // fluid sizing (min - max) = 16px - 20px
        'l', // fluid sizing (min - max) = 19px - 26px
        'xl', // fluid sizing (min - max) = 23px - 35px
        '2xl', // fluid sizing (min - max) = 27px - 47px
        '3xl', // fluid sizing (min - max) = 33px - 63px
        '4xl', // fluid sizing (min - max) = 39px - 83px
        '5xl', // fluid sizing (min - max) = 47px - 110px
        '6xl', // fluid sizing (min - max) = 57px - 147px
        '7xl', // fluid sizing (min - max) = 68px - 195px
    ],
    'min-viewport': {
        width: minViewportWidth,
        'font-size': minFontSize,
        scale: minScale,
    },
    'max-viewport': {
        width: maxViewportWidth,
        'font-size': maxFontSize,
        scale: maxScale,
    },
};
