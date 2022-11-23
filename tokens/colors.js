// Generic colours
const colorPink = 'hsl(335deg 85% 49%)';
const colorNavy = 'hsl(250deg 35% 20%)';
const colorWhite = 'hsl(0deg 0% 100%)';
const colorMint = 'hsl(171deg 50% 50%)';
const colorGray = 'hsl(0deg 0% 95%)';
const colorBlack = 'hsl(0deg 0% 7%)';

// Accent colours
const colourLightPink = 'hsl(331deg 73% 83%)';
const colourLightBlue = 'hsl(183deg 47% 70%)';
const colourMidBlue = 'hsl(236deg 38% 43%)';
const colourRed = 'hsl(9deg 81% 57%)';
const colourYellow = 'hsl(55deg 72% 69%)';

// States
const colorError = 'hsl(0deg 61% 44%)';
const colorSuccess = 'hsl(107deg 49% 38%)';
const colorNotice = 'hsl(34deg 100% 42%)';
const colorDisabled = 'hsl(220deg 4% 87%)';

// Shadows
const colorShadow = 'hsla(0deg 0% 7% / 50%)';
const colorShadowL = 'hsla(204deg 204% 204% / 100%)';

module.exports = {
    default: {
        primary: colorPink,
        secondary: colorNavy,
        tertiary: colorWhite,
        quaternary: colorMint,
        quinary: colorGray,
        senary: colorBlack,
        septenary: colourLightPink,
        octonary: colourLightBlue,
        nonary: colourMidBlue,
        denary: colourRed,
        duodenary: colourYellow,
        error: colorError,
        success: colorSuccess,
        notice: colorNotice,
        disabled: colorDisabled,
        shadow: colorShadow,
        'shadow-l': colorShadowL
    },
    dark: {
        primary: colorPink
    }
};
