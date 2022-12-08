# Tokens

Most of our configurable styles are handled in here by our tokens. Tokens are a way to define a set of variables that can be used across multiple platforms. We use tokens to define our colors, spacing, typography, and more.

These tokens are converted into valid Scss using the [JSON-to-Scss package](https://www.npmjs.com/package/json-to-scss).

## Getting started

To update any of our tokens, you will need to edit the `.js` files in this directory and run:

```bash
npm run tokens:generate
```

This will compile the tokens into Scss and output them to `packages/osc-ui/src/styles/settings/_tokens.scss`.

**Note:** Tokens should not change very often and should be considered a source of truth for our design system.

## Gotchas

When adding a new token you will need to bear in mind that the token name and value will be used as the variable name and value in the outputted Scss. This means that you should use a name that is valid as a variable name in Scss. For example, you can't use a token name that starts with a number.

Similarly you should avoid camelCasing your token as this will not be converted in the outputted Scss.

```js
// Bad
module.exports = {
    default: {
        gradientPrimary: gradientPinkLightOrange
    }
};
// Good
module.exports = {
    default: {
        'gradient-primary': gradientPinkLightOrange
    }
};
```

**Note:** that you may still use camelCased variable names as the value. This is because the variable will be converted into the value.

If there is anything you want to loop over within your Scss you should add your token value as an array. This will be converted into a list in the outputted Scss.

```js
// Bad
module.exports = {
    'font-primary': '"Outfit", helvetica, arial, sans-serif' // Compile error
};
// Good
module.exports = {
    'font-primary': ['"Outfit", helvetica, arial, sans-serif']
};
```
