## [0.68.1](https://github.com/Open-Study-College/osc/compare/v0.68.0...v0.68.1) (2023-04-06)


### 🐛 Bugs

* **e2e tests:** fix incorrect port number in academic hub test command ([d73b552](https://github.com/Open-Study-College/osc/commit/d73b552bc8fef0e059584a48fedc7af5606b96f4))
* **e2e tests:** fixes typo in locator ([b79e3de](https://github.com/Open-Study-College/osc/commit/b79e3def2b4c246bcb7272e90eceff9a239c0b4a))
* **e2e tests:** updates ecommerce test locators to make them more specific ([7042a50](https://github.com/Open-Study-College/osc/commit/7042a50ada7b75e14d9bcd0a7955b38d1efa56d0))
* **workflows:** fix typo in e2e test command ([15c46bb](https://github.com/Open-Study-College/osc/commit/15c46bba3b116db421ea61fa68155cefeaf0d9dc))


### 📦 General Housekeeping / Package Updates

* update env samples ([1363b17](https://github.com/Open-Study-College/osc/commit/1363b1724ce340a428c24cae9aebc5655c6735ed))

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

