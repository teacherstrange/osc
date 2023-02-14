# OSC Styles

This directory contains the styles for the OSC UI. The styles are written in [Scss](http://sass-lang.com/) and most of the config is handled by our design tokens.

## Getting started

The folder structure is broken down loosely following the [SMACSS methodology](http://smacss.com/). This is a way of organising our styles that helps to keep them maintainable and scalable. There is a breakdown of what is in each folder in the `main.scss` file.

Classnames are named following the [BEMIT methodology](https://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/) but please refer to our frontend standards which can be found [here](https://www.notion.so/openstudycollege/Front-end-Standards-8d04fcca21da43e3971fc762eef72683).

## Using token values

There will be times where you want to use a token value in your Scss. To do this you can use the one of the `get-token` functions located in `styles/tools/functions/_get-tokens`. This function takes a token name and returns the value of that token. E.g.

```scss
p {
    color: get-token('default.primary');
}
```

Mostly you will utilise the sass variables which can all be found in `styles/settings` but colours will still need to utilise the CSS Variables approach.

## Colours

Colours follow the; "primary", "secondary", "tertiary", etc. naming convention. This is to help keep the colours consistent across the site.

You will see in the compiled css that the colours are handled by css custom properties and will be prefixed with `--color-`. e.g.

```css
:root {
    --color-primary: hsl(335deg, 85%, 49%);
    --color-secondary: hsl(205deg, 79%, 11%);
    --color-tertiary: hsl(0deg, 0%, 100%);
    --color-quaternary: hsl(175deg, 100%, 36%);
    ...;
}
```

Our colours are defined in the `tokens/colors.js` file.

## Typography

Typography is managed in a couple of places depending on what you are trying to achieve.

Changing the font family, font weight and other typographical settings unrelated to sizing is handled by the `tokens/typography.js` file.

Similarly to colours the font families are defined by the "primary" and "secondary" naming convention.

The maps that generate the classes and non token styles are handled in the `typography/_font.scss` file.

Font sizing is handled by our fluid scale described below.

## Fluid Scale

The fluid scale is a way of defining a set of font sizes that will scale with the viewport. This allows us to set a font size that will look good on any screen size without needing to use multiple media queries.

The fluid scale not only handles font sizes but also our spacing attributes. This allows us to have a consistent visual harmony. Fonts and spaces are named following the t-shirt sizing convention e.g. "s", "m", "l", "xl", etc..

The fluid scale is defined in the `tokens/typography.js` file and based on those tokens the scale will be calculated and applied to the css variables on the `:root` element each will be prefixed with either `--font` or `--space`.

```css
:root {
    --space-scale-xl: clamp(23.04px, 1.16vw + 18.7px, 35.38px);
    --space-scale-2xl: clamp(27.65px, 1.82vw + 20.82px, 47.05px);
    --space-scale-3xl: clamp(33.18px, 2.76vw + 22.82px, 62.58px);
    --space-scale-4xl: clamp(39.81px, 4.08vw + 24.52px, 83.23px);

    --font-scale-xl: clamp(1.44rem, 1.16vw + 1.16875rem, 2.21125rem);
    --font-scale-2xl: clamp(1.728125rem, 1.82vw + 1.30125rem, 2.940625rem);
    --font-scale-3xl: clamp(2.07375rem, 2.76vw + 1.42625rem, 3.91125rem);
    --font-scale-4xl: clamp(2.488125rem, 4.08vw + 1.5325rem, 5.201875rem);
}
```

**Note:** You will notice that the space-scale variables use px whereas the font-scale variables use rem. This is to combat an interesting case where increasing the font size will also increase the padding/margin of the box. You can read more about this here: https://www.joshwcomeau.com/css/surprising-truth-about-pixels-and-accessibility/#bonus-rem-quality-of-life

Following that you can either use the assigned sass variables `$space-*` or `$fs-*` to set the spacing depending on your need.

## Media Queries

Media queries are handled by the `tokens/breakpoints.js` file. These are used to generate the media queries. The values in the file are treated as pixels and will be handled by the scss to convert them into rems if necessary.

### Usage

We have a mixin defined called `mq` located in `styles/tools/_mq.scss`. The associated sass variables can be found in `styles/settings/_mq.scss`

```scss
@include mq($mq-mob) {
    // styles
}
```

## Grid

Unlike the other items the grid isn't handled by `js` tokens. Instead it it all handled in the `styles/objects/_grid.scss` file.

By default we have a 12 column grid and the gap is handled by our fluid spacing values.

### Usage

The grid is made up of two parts. The grid container and the grid items. The grid container is defined by the `o-grid` class. The grid items are defined by the `o-grid__col` class.

The grid items can be sized by adding the `o-grid__col--*` class. Or offset using the `o-grid__col--start-*` class.

```html
<div class="o-grid">
    <div class="o-grid__col  o-grid__col--3">Grid item</div>
    <div class="o-grid__col  o-grid__col--3">Grid item</div>
    <div class="o-grid__col  o-grid__col--3">Grid item</div>
</div>
```

To change the width of the column on different device sizes you can add an `@` followed by the breakpoint name. e.g. `o-grid__col--3@mob`.

```html
<div class="o-grid">
    <div
        class="o-grid__col  o-grid__col--12  o-grid__col--6@mob  o-grid__col--4@tab  o-grid__col--3@desk"
    >
        Grid item
    </div>
    <div
        class="o-grid__col  o-grid__col--12  o-grid__col--6@mob  o-grid__col--4@tab  o-grid__col--3@desk"
    >
        Grid item
    </div>
    <div
        class="o-grid__col  o-grid__col--12  o-grid__col--6@mob  o-grid__col--4@tab  o-grid__col--3@desk"
    >
        Grid item
    </div>
</div>
```
