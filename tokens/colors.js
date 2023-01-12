// *----------------------------------*/
//  #COLOUR TOKENS
// *----------------------------------*/
//
//  Defines global colours for use in the theme.
//
// *----------------------------------*/

// Brand colours
const colorPink = 'hsl(335deg 85% 49%)';
const colorNavy = 'hsl(205deg 79% 11%)';
const colorTeal = 'hsl(175deg 100% 33%)';
const colorLightOrange = 'hsl(31deg 94% 65%)';
const colorCandyPink = 'hsl(334deg 79% 89%)';
const colorCyan = 'hsl(179deg 92% 77%)';
const colorBlue = 'hsl(237deg 41% 44%)';
const colorOrange = 'hsl(11deg 81% 55%)';
const colorLemon = 'hsl(56deg 100% 73%)';

// Neutral colours
const colorWhite = 'hsl(0deg 0% 100%)';
const colorLightestGrey = 'hsl(0deg 0% 98%)';
const colorSoftGrey = 'hsl(0deg 0% 96%)';
const colorPaleGrey = 'hsl(0deg 0% 93%)';
const colorGrey = 'hsl(0deg 0% 87%)';
const colorMidGrey = 'hsl(0deg 0% 79%)';
const colorDarkGrey = 'hsl(0deg 0% 73%)';
const colorDarkestGrey = 'hsl(0deg 0% 60%)';

// Semantic colours
const colorError = 'hsl(0deg 93% 48%)';
const colorError20 = 'hsl(0deg 93% 55% / 20%)';
const colorNotice = 'hsl(202deg 93% 55%)';
const colorNotice20 = 'hsl(202deg 93% 55% / 20%)';
const colorSuccess = 'hsl(144deg 66% 55%)';
const colorSuccess20 = 'hsl(144deg 66% 55% / 20%)';
const colorWarning = 'hsl(47deg 96% 50%)';
const colorWarning20 = 'hsl(47deg 96% 50% / 20%)';

// Gradients
// https://www.joshwcomeau.com/gradient-generator?colors=faa751|e6126a&angle=0&colorMode=hsl&precision=8&easingCurve=0.333|1|0.666|0
const gradientPinkLightOrange =
    'hsl(31deg 94% 65%) 0%, hsl(24deg 94% 63%) 21%, hsl(18deg 93% 61%) 30%, hsl(12deg 91% 59%) 39%, hsl(6deg 91% 58%) 46%, hsl(360deg 89% 56%) 54%, hsl(354deg 88% 54%) 61%, hsl(348deg 88% 52%) 69%, hsl(341deg 87% 50%) 79%, hsl(335deg 85% 49%) 100%';
// https://www.joshwcomeau.com/gradient-generator?colors=8efaf8|e6126a&angle=0&colorMode=hcl&precision=8&easingCurve=0.333|1|0.666|0
const gradientPinkCyan =
    'hsl(179deg 92% 77%) 0%, hsl(187deg 100% 70%) 21%, hsl(190deg 100% 63%) 30%, hsl(196deg 100% 63%) 39%, hsl(207deg 100% 70%) 46%, hsl(231deg 100% 78%) 54%, hsl(267deg 79% 73%) 61%, hsl(304deg 56% 61%) 69%, hsl(325deg 75% 57%) 79%, hsl(335deg 85% 49%) 100%';
// https://www.joshwcomeau.com/gradient-generator?colors=fff577|00baa9&angle=0&colorMode=hcl&precision=8&easingCurve=0.333|1|0.666|0
const gradientTealLemon =
    'hsl(56deg 100% 73%) 0%, hsl(67deg 82% 71%) 21%, hsl(79deg 75% 71%) 30%, hsl(93deg 68% 71%) 39%, hsl(111deg 60% 71%) 46%, hsl(132deg 56% 67%) 54%, hsl(148deg 56% 61%) 61%, hsl(159deg 55% 55%) 69%, hsl(168deg 61% 47%) 79%, hsl(175deg 100% 36%) 100%';
// https://www.joshwcomeau.com/gradient-generator?colors=42469c|e6126a&angle=90&colorMode=hcl&precision=8&easingCurve=0.333|1|0.666|0
const gradientPinkBlue =
    'hsl(237deg 41% 44%) 0%, hsl(256deg 40% 44%) 21%, hsl(272deg 42% 44%) 30%, hsl(287deg 45% 42%) 39%, hsl(301deg 49% 41%) 46%, hsl(313deg 58% 43%) 54%, hsl(320deg 67% 45%) 61%, hsl(326deg 76% 46%) 69%, hsl(330deg 83% 47%) 79%, hsl(335deg 85% 49%) 100%';
// https://www.joshwcomeau.com/gradient-generator?colors=e6126a|f9cbdf&angle=0&colorMode=hcl&precision=8&easingCurve=0.333|1|0.666|0
const gradientCandyPinkPink =
    'hsl(335deg 85% 49%) 0%, hsl(338deg 81% 57%) 21%, hsl(339deg 82% 63%) 30%, hsl(339deg 83% 67%) 39%, hsl(339deg 83% 71%) 46%, hsl(338deg 84% 75%) 54%, hsl(337deg 84% 79%) 61%, hsl(336deg 83% 82%) 69%, hsl(335deg 82% 85%) 79%, hsl(334deg 79% 89%) 100%';
// https://www.joshwcomeau.com/gradient-generator?colors=8efaf8|00baa9&angle=90&colorMode=hcl&precision=8&easingCurve=0.333|1|0.666|0
const gradientCyanTeal =
    'hsl(179deg 92% 77%) 0%, hsl(178deg 82% 73%) 21%, hsl(177deg 75% 70%) 30%, hsl(177deg 70% 66%) 39%, hsl(176deg 65% 62%) 46%, hsl(176deg 62% 58%) 54%, hsl(175deg 59% 54%) 61%, hsl(175deg 58% 50%) 69%, hsl(174deg 69% 45%) 79%, hsl(175deg 100% 36%) 100%';
// https://www.joshwcomeau.com/gradient-generator?colors=42469c|00baa9&angle=90&colorMode=hcl&precision=8&easingCurve=0.333|1|0.666|0
const gradientBlueTeal =
    'hsl(237deg 41% 44%) 0%, hsl(214deg 76% 38%) 21%, hsl(206deg 100% 36%) 30%, hsl(203deg 100% 37%) 39%, hsl(200deg 100% 38%) 46%, hsl(196deg 100% 38%) 54%, hsl(191deg 100% 37%) 61%, hsl(186deg 100% 36%) 69%, hsl(180deg 100% 35%) 79%, hsl(175deg 100% 36%) 100%';
// https://www.joshwcomeau.com/gradient-generator?colors=e94f2d|fff577&angle=90&colorMode=hcl&precision=8&easingCurve=0.333|1|0.666|0
const gradientOrangeLemon =
    'hsl(11deg 81% 55%) 0%, hsl(18deg 86% 55%) 21%, hsl(23deg 89% 56%) 30%, hsl(28deg 93% 58%) 39%, hsl(32deg 95% 59%) 46%, hsl(36deg 97% 61%) 54%, hsl(40deg 98% 64%) 61%, hsl(45deg 99% 67%) 69%, hsl(50deg 100% 70%) 79%, hsl(56deg 100% 73%) 100%';
// https://www.joshwcomeau.com/gradient-generator?colors=fff577|8efaf8&angle=90&colorMode=hcl&precision=8&easingCurve=0.333|1|0.666|0
const gradientLemonCyan =
    'hsl(56deg 100% 73%) 0%, hsl(68deg 92% 75%) 21%, hsl(83deg 96% 78%) 30%, hsl(100deg 100% 82%) 39%, hsl(123deg 100% 84%) 46%, hsl(142deg 100% 81%) 54%, hsl(156deg 100% 79%) 61%, hsl(165deg 99% 78%) 69%, hsl(172deg 96% 77%) 79%, hsl(179deg 92% 77%) 100%';

// We need to generate gradients for each direction as we can't use a css variable which will update
const gradients = {};
const directions = ['0deg', '90deg', '180deg', '270deg'];

for (const direction of directions) {
    // Remove the 0deg option from the property name as it's the default
    let dirLabel = direction === '0deg' ? '' : `-${direction.replace('deg', '')}`;

    gradients[
        `gradient-primary${dirLabel}`
    ] = `linear-gradient(${direction}, ${gradientPinkLightOrange})`;

    gradients[
        `gradient-secondary${dirLabel}`
    ] = `linear-gradient(${direction}, ${gradientPinkCyan})`;

    gradients[
        `gradient-tertiary${dirLabel}`
    ] = `linear-gradient(${direction}, ${gradientTealLemon})`;

    gradients[
        `gradient-quaternary${dirLabel}`
    ] = `linear-gradient(${direction}, ${gradientPinkBlue})`;

    gradients[
        `gradient-quinary${dirLabel}`
    ] = `linear-gradient(${direction}, ${gradientCandyPinkPink})`;

    gradients[`gradient-senary${dirLabel}`] = `linear-gradient(${direction}, ${gradientCyanTeal})`;

    gradients[
        `gradient-septenary${dirLabel}`
    ] = `linear-gradient(${direction}, ${gradientBlueTeal})`;

    gradients[
        `gradient-octonary${dirLabel}`
    ] = `linear-gradient(${direction}, ${gradientOrangeLemon})`;

    gradients[`gradient-nonary${dirLabel}`] = `linear-gradient(${direction}, ${gradientLemonCyan})`;
}

module.exports = {
    default: {
        primary: colorPink,
        secondary: colorNavy,
        tertiary: colorWhite,
        quaternary: colorTeal,
        quinary: colorGrey,
        senary: colorLightOrange,
        septenary: colorCandyPink,
        octonary: colorCyan,
        nonary: colorBlue,
        denary: colorOrange,
        duodenary: colorLemon,
        'neutral-100': colorLightestGrey,
        'neutral-200': colorSoftGrey,
        'neutral-300': colorPaleGrey,
        'neutral-400': colorMidGrey,
        'neutral-500': colorDarkGrey,
        'neutral-600': colorDarkestGrey,
        error: colorError,
        'error-20': colorError20,
        success: colorSuccess,
        'success-20': colorSuccess20,
        notice: colorNotice,
        'notice-20': colorNotice20,
        warning: colorWarning,
        'warning-20': colorWarning20,
        ...gradients,
    },
    dark: {
        primary: colorPink,
        secondary: colorWhite,
        tertiary: colorNavy,
    },
};
