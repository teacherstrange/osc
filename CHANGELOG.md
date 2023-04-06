## [0.68.0](https://github.com/Open-Study-College/osc/compare/v0.67.1...v0.68.0) (2023-04-06)


### ✨ Features

* **ecommerce:** adds constants file containing route paths ([30803db](https://github.com/Open-Study-College/osc/commit/30803db14e71c25047d978e6e9647f039f45be23))
* **studio:** adds paths constant object ([2668409](https://github.com/Open-Study-College/osc/commit/2668409c260f7508fbafea7e42d10426ec13d98c))


### ♻️ Refactors

* **ecommerce:** renames products route to courses ([df4bafe](https://github.com/Open-Study-College/osc/commit/df4bafe0d189249e990f8787897b393fb299fd4d))
* **ecommerce:** update hard coded paths to use PATHS constant ([d978476](https://github.com/Open-Study-College/osc/commit/d978476691b8a018f03c84ca5eaf560b5976459f))
* **ecommerce:** update internal links to use buildUrls helper ([56da2a0](https://github.com/Open-Study-College/osc/commit/56da2a00f260a56165dac2cbf7744dfe1165c6fb))
* **studio:** update hard coded paths to use PATHS constant ([691e741](https://github.com/Open-Study-College/osc/commit/691e741f5fe3a79e6271df5bd716272c4ca74054))


### 🐛 Bugs

* **ecommerce:** cast return of getComponentStyles as LinkDescriptor ([2aad2b5](https://github.com/Open-Study-College/osc/commit/2aad2b5d9aca33d5ccf4e877a75d1ff04d458070))
* **ecommerce:** wrap string in fragment to fix TS reactnode error ([77ffa51](https://github.com/Open-Study-College/osc/commit/77ffa5137a82ae8651c8abbaf57209df438d08a1))

## [0.67.1](https://github.com/Open-Study-College/osc/compare/v0.67.0...v0.67.1) (2023-04-06)


### 🧪 Tests

* **content media:** adds tests for content media component ([21e7ebd](https://github.com/Open-Study-College/osc/commit/21e7ebdb1c4e2a52a4a2232427df3f5673bbdb5e))

## [0.67.0](https://github.com/Open-Study-College/osc/compare/v0.66.0...v0.67.0) (2023-04-06)


### ✨ Features

* **modal:** add an alert modal component ([8ae3c0e](https://github.com/Open-Study-College/osc/commit/8ae3c0ef0ac6335333602a9e6e92c75877ea8e4a))


### 🐛 Bugs

* **modal:** add id to input in story ([a2cd985](https://github.com/Open-Study-College/osc/commit/a2cd985edffeb9b5e16b1926da34ada5e371a52d))


### ♻️ Refactors

* **modal:** extract modal into more composable parts ([c87a902](https://github.com/Open-Study-College/osc/commit/c87a90225c5ed703c14b181a91ff8189b1707ae7))
* **modal:** update modal styles ([d5a2bef](https://github.com/Open-Study-College/osc/commit/d5a2bef109e9be456f039169b649b379c77411b8))
* **modal:** update tests to work with new markup ([e9f9fb5](https://github.com/Open-Study-College/osc/commit/e9f9fb53fafa13c3e8fabf0100f86b2f38aa1789))

## [0.66.0](https://github.com/Open-Study-College/osc/compare/v0.65.0...v0.66.0) (2023-04-05)


### ✨ Features

* **ecommerce:** adds function to create an array of unique objects ([198743b](https://github.com/Open-Study-College/osc/commit/198743b2c43ac67d77f34b90b2988c39da802a64))


### ♻️ Refactors

* **carousel:** move ecom carousel into it's own component ([de64a5c](https://github.com/Open-Study-College/osc/commit/de64a5c8ef4c68110f256e8c97736ae7730fdc74))
* **carousel:** update carousel settings in Sanity ([0f1ee2f](https://github.com/Open-Study-College/osc/commit/0f1ee2f64620ab2b9557b48468af4db0a984188c))
* **ecommerce:** add stylesheet dependencies to each module in the  loop ([fdf686e](https://github.com/Open-Study-College/osc/commit/fdf686ee3dbb08e118c88957406d4ca60cbc9bc5))
* **ecommerce:** dedupe stylesheets array ([192adfe](https://github.com/Open-Study-College/osc/commit/192adfe22aff9e1c87a6d10884756d5fcc0e1062))
* **ecommerce:** remove carousel from root styles ([6d64957](https://github.com/Open-Study-College/osc/commit/6d64957fb2e89f9d2fc0ff173b001daeecac0548))

## [0.65.0](https://github.com/Open-Study-College/osc/compare/v0.64.4...v0.65.0) (2023-03-28)


### 🧪 Tests

* **ecommerce:** adds test for content media ([053dd7f](https://github.com/Open-Study-College/osc/commit/053dd7f68ddbe43992a66d49989aef2ad34d5548))


### 📦 General Housekeeping / Package Updates

* update lock file ([b6a96c8](https://github.com/Open-Study-College/osc/commit/b6a96c889fbf595b518fa7c670b29badb4e5fc54))


### ♻️ Refactors

* **content:** adds horizontal padding options to content component ([debbab0](https://github.com/Open-Study-College/osc/commit/debbab07d17c0dc95fe5f5375919d47c49c6842e))
* **ecommerce:** import osc-design-tokens package ([e87ce9d](https://github.com/Open-Study-College/osc/commit/e87ce9ddb4dd69041059ff823d023cb877b78b4b))
* **ecommerce:** move perView function into outer scope ([2ef4e45](https://github.com/Open-Study-College/osc/commit/2ef4e4586155e2384f4dda3a0832a977f3da410a))
* **studio:** add arrows to partialCarouselSettings ([e8cb913](https://github.com/Open-Study-College/osc/commit/e8cb9131fd1490172d3dac7265d6c4ad9b9c4f93))
* **studio:** add ts support to content media modules ([7928528](https://github.com/Open-Study-College/osc/commit/792852826e520cee8db92903c71c77233fd00097))
* **studio:** move carouselName out of partial settings ([8f8a308](https://github.com/Open-Study-College/osc/commit/8f8a3083918f8e900962d12190f849dac9a32862))
* **studio:** moves image into it's own object ([9a036a2](https://github.com/Open-Study-College/osc/commit/9a036a2bcd8adccfde7885f5d009c1125cfe789b))
* **studio:** remove settings tab from content media ([6cf07fb](https://github.com/Open-Study-College/osc/commit/6cf07fb5ed4430ecbbf90888ce23316aec9a233a))
* **studio:** renamed heroCarouselSettings to more generic partialCarouselSettings ([b1e5e2b](https://github.com/Open-Study-College/osc/commit/b1e5e2b9804d47c6436d2a91ba542993759c44f6))
* **studio:** replace carouselSettings with partial on content media images ([2e00b98](https://github.com/Open-Study-College/osc/commit/2e00b98efe43eb7cdd64673967ca0a8ead0781ae))
* **studio:** update contentMedia carousel settings ([d8fb3ca](https://github.com/Open-Study-College/osc/commit/d8fb3ca1f13102c0e474deb2bbc7feb6646010ce))


### ✨ Features

* **ecommerce:** adds carousel option for media ([259bd28](https://github.com/Open-Study-College/osc/commit/259bd2899c32a5cbd0c4850e45dd1d12f719e970))
* **ecommerce:** adds content media component ([7565597](https://github.com/Open-Study-College/osc/commit/75655975549b3791ecfba337b2ca78008b254d3c))
* **ecommerce:** adds content media query ([8650c34](https://github.com/Open-Study-College/osc/commit/8650c340ef48ea97044f5ade9667d0b69af403b5))
* **studio:** add spacing to cms controls ([7650f49](https://github.com/Open-Study-College/osc/commit/7650f49d01be32c847df2eef6b4bae0a4b1f7d50))
* **studio:** add ts to shouldShow function in hero module ([087482c](https://github.com/Open-Study-College/osc/commit/087482c72732ed6027326714c25af73f325a193e))
* **studio:** add validation to media fields ([3e6aa03](https://github.com/Open-Study-College/osc/commit/3e6aa0301f366eceb59620dfd1ac11e17263f633))
* **studio:** adds content media module ([540a624](https://github.com/Open-Study-College/osc/commit/540a6241e94e1eef7430b493dd37bcddd662ea58))


### 🐛 Bugs

* **ecommmerce:** add check to make sure media exists in content media ([4c53571](https://github.com/Open-Study-College/osc/commit/4c53571b4ef18d4be5bf749f3a4a893ab330b04e))
* **Image:** add early return to Image component if no src is provided ([bc44757](https://github.com/Open-Study-College/osc/commit/bc447579f70feb7a0e52108fd9a23da9ae0ac1c8))
* **studio:** adds optional chaining to shouldShow ([14f591a](https://github.com/Open-Study-College/osc/commit/14f591a0e16e313a5cd07802020457d4facd2034))
* **studio:** remove unused group ([e9c72ee](https://github.com/Open-Study-College/osc/commit/e9c72ee9a1009ff3144a995c6407798014f8a43e))
* **studio:** restore imports missed during rebase ([a3e50b6](https://github.com/Open-Study-College/osc/commit/a3e50b62f427f8f594ab0749cbec5903254234e4))

