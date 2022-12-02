// Navy and white
const colorNavy = 'hsl(205deg 79% 11%)';
const colorWhite = 'hsl(0deg 0% 100%)';

// Gray
const colorGray = 'hsl(0deg 0% 87%)';

// Bright colours
const colorPink = 'hsl(335deg 85% 49%)';
const colorCandyPink = 'hsl(334deg 79% 89%)';
const colorOrange = 'hsl(11deg 81% 55%)';
const colorLightOrange = 'hsl(31deg 94% 65%)';
const colorLemon = 'hsl(56deg 100% 73%)';
const colorBlue = 'hsl(237deg 41% 44%)';
const colorTeal = 'hsl(175deg 100% 36%)';
const colorCyan = 'hsl(179deg 92% 77%)';

// Gradients
// https://www.joshwcomeau.com/gradient-generator?colors=faa751|e6126a&angle=0&colorMode=hsl&precision=8&easingCurve=0.333|1|0.666|0
const gradientPinkLightOrange =
    'linear-gradient(0deg, hsl(31deg 94% 65%) 0%, hsl(24deg 94% 63%) 21%, hsl(18deg 93% 61%) 30%, hsl(12deg 91% 59%) 39%, hsl(6deg 91% 58%) 46%, hsl(360deg 89% 56%) 54%, hsl(354deg 88% 54%) 61%, hsl(348deg 88% 52%) 69%, hsl(341deg 87% 50%) 79%, hsl(335deg 85% 49%) 100%)';
// https://www.joshwcomeau.com/gradient-generator?colors=8efaf8|e6126a&angle=0&colorMode=hcl&precision=8&easingCurve=0.333|1|0.666|0
const gradientPinkCyan =
    'linear-gradient(0deg, hsl(179deg 92% 77%) 0%, hsl(187deg 100% 70%) 21%, hsl(190deg 100% 63%) 30%, hsl(196deg 100% 63%) 39%, hsl(207deg 100% 70%) 46%, hsl(231deg 100% 78%) 54%, hsl(267deg 79% 73%) 61%, hsl(304deg 56% 61%) 69%, hsl(325deg 75% 57%) 79%, hsl(335deg 85% 49%) 100%)';
// https://www.joshwcomeau.com/gradient-generator?colors=fff577|00baa9&angle=0&colorMode=hcl&precision=8&easingCurve=0.333|1|0.666|0
const gradientTealLemon =
    'linear-gradient(0deg, hsl(56deg 100% 73%) 0%, hsl(67deg 82% 71%) 21%, hsl(79deg 75% 71%) 30%, hsl(93deg 68% 71%) 39%, hsl(111deg 60% 71%) 46%, hsl(132deg 56% 67%) 54%, hsl(148deg 56% 61%) 61%, hsl(159deg 55% 55%) 69%, hsl(168deg 61% 47%) 79%, hsl(175deg 100% 36%) 100%)';
// https://www.joshwcomeau.com/gradient-generator?colors=42469c|e6126a&angle=90&colorMode=hcl&precision=8&easingCurve=0.333|1|0.666|0
const gradientPinkBlue =
    'linear-gradient(90deg, hsl(237deg 41% 44%) 0%, hsl(256deg 40% 44%) 21%, hsl(272deg 42% 44%) 30%, hsl(287deg 45% 42%) 39%, hsl(301deg 49% 41%) 46%, hsl(313deg 58% 43%) 54%, hsl(320deg 67% 45%) 61%, hsl(326deg 76% 46%) 69%, hsl(330deg 83% 47%) 79%, hsl(335deg 85% 49%) 100%)';
// https://www.joshwcomeau.com/gradient-generator?colors=e6126a|f9cbdf&angle=0&colorMode=hcl&precision=8&easingCurve=0.333|1|0.666|0
const gradientCandyPinkPink =
    'linear-gradient(0deg, hsl(335deg 85% 49%) 0%, hsl(338deg 81% 57%) 21%, hsl(339deg 82% 63%) 30%, hsl(339deg 83% 67%) 39%, hsl(339deg 83% 71%) 46%, hsl(338deg 84% 75%) 54%, hsl(337deg 84% 79%) 61%, hsl(336deg 83% 82%) 69%, hsl(335deg 82% 85%) 79%, hsl(334deg 79% 89%) 100%)';
// https://www.joshwcomeau.com/gradient-generator?colors=8efaf8|00baa9&angle=90&colorMode=hcl&precision=8&easingCurve=0.333|1|0.666|0
const gradientCyanTeal =
    'linear-gradient(90deg, hsl(179deg 92% 77%) 0%, hsl(178deg 82% 73%) 21%, hsl(177deg 75% 70%) 30%, hsl(177deg 70% 66%) 39%, hsl(176deg 65% 62%) 46%, hsl(176deg 62% 58%) 54%, hsl(175deg 59% 54%) 61%, hsl(175deg 58% 50%) 69%, hsl(174deg 69% 45%) 79%, hsl(175deg 100% 36%) 100%)';
// https://www.joshwcomeau.com/gradient-generator?colors=42469c|00baa9&angle=90&colorMode=hcl&precision=8&easingCurve=0.333|1|0.666|0
const gradientBlueTeal =
    'linear-gradient(90deg, hsl(237deg 41% 44%) 0%, hsl(214deg 76% 38%) 21%, hsl(206deg 100% 36%) 30%, hsl(203deg 100% 37%) 39%, hsl(200deg 100% 38%) 46%, hsl(196deg 100% 38%) 54%, hsl(191deg 100% 37%) 61%, hsl(186deg 100% 36%) 69%, hsl(180deg 100% 35%) 79%, hsl(175deg 100% 36%) 100%)';
// https://www.joshwcomeau.com/gradient-generator?colors=e94f2d|fff577&angle=90&colorMode=hcl&precision=8&easingCurve=0.333|1|0.666|0
const gradientOrangeLemon =
    'linear-gradient(90deg, hsl(11deg 81% 55%) 0%, hsl(18deg 86% 55%) 21%, hsl(23deg 89% 56%) 30%, hsl(28deg 93% 58%) 39%, hsl(32deg 95% 59%) 46%, hsl(36deg 97% 61%) 54%, hsl(40deg 98% 64%) 61%, hsl(45deg 99% 67%) 69%, hsl(50deg 100% 70%) 79%, hsl(56deg 100% 73%) 100%)';
// https://www.joshwcomeau.com/gradient-generator?colors=fff577|8efaf8&angle=90&colorMode=hcl&precision=8&easingCurve=0.333|1|0.666|0
const gradientLemonCyan =
    'linear-gradient(90deg, hsl(56deg 100% 73%) 0%, hsl(68deg 92% 75%) 21%, hsl(83deg 96% 78%) 30%, hsl(100deg 100% 82%) 39%, hsl(123deg 100% 84%) 46%, hsl(142deg 100% 81%) 54%, hsl(156deg 100% 79%) 61%, hsl(165deg 99% 78%) 69%, hsl(172deg 96% 77%) 79%, hsl(179deg 92% 77%) 100%)';

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
        quaternary: colorTeal,
        quinary: colorGray,
        senary: colorLightOrange,
        septenary: colorCandyPink,
        octonary: colorCyan,
        nonary: colorBlue,
        denary: colorOrange,
        duodenary: colorLemon,
        error: colorError,
        success: colorSuccess,
        notice: colorNotice,
        disabled: colorDisabled,
        shadow: colorShadow,
        'shadow-l': colorShadowL,
        'gradient-primary': gradientPinkLightOrange,
        'gradient-secondary': gradientPinkCyan,
        'gradient-tertiary': gradientTealLemon,
        'gradient-quaternary': gradientPinkBlue,
        'gradient-quinary': gradientCandyPinkPink,
        'gradient-senary': gradientCyanTeal,
        'gradient-septenary': gradientBlueTeal,
        'gradient-octonary': gradientOrangeLemon,
        'gradient-nonary': gradientLemonCyan
    },
    dark: {
        primary: colorPink,
        secondary: colorWhite,
        tertiary: colorNavy
    }
};
