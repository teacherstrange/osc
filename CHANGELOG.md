## [0.69.0](https://github.com/Open-Study-College/osc/compare/v0.68.1...v0.69.0) (2023-04-12)


### 📦 General Housekeeping / Package Updates

* **drawer:** update comments ([b15aaa6](https://github.com/Open-Study-College/osc/commit/b15aaa6d2c54741dda47e499bd1edc14adfcde7f))
* install radix dialog primitive ([1a47c13](https://github.com/Open-Study-College/osc/commit/1a47c1328d803c94f477a2304a8156f5d58acf48))


### ✨ Features

* **button:** add no-shadow modifier class ([b209f8f](https://github.com/Open-Study-College/osc/commit/b209f8f795ff3e7ba5c23464502c64ae01881c7b))
* **drawer:** add custom container target ([da40485](https://github.com/Open-Study-College/osc/commit/da404853750b9162d265ebdec1229f85c3682d8b))
* **drawer:** add drawer component and initial styles ([71b25d6](https://github.com/Open-Study-College/osc/commit/71b25d67f793860fed7eed281203f972ea4df3c6))
* **drawer:** add primary styles ([02f38ad](https://github.com/Open-Study-College/osc/commit/02f38ad28b47803f453733b4ff86ae55967e6b82))
* **drawer:** add stopPropogation to prevent bubbling on trigger click ([d42bb15](https://github.com/Open-Study-College/osc/commit/d42bb151ac075bcc4b786e343ed429c99e2e503a))
* **drawer:** adds container component ([a09b95c](https://github.com/Open-Study-College/osc/commit/a09b95cf0be4e332d694de189fb725731380d4ec))
* **drawer:** ensure the is-full modifier always fills the height of the screen ([1d1e3ec](https://github.com/Open-Study-College/osc/commit/1d1e3ec5e3ae93d45daac52d1ee90ebc0fb99b30))
* **drawer:** set vertical media queries so we can access drawer on shorter screens ([f249c46](https://github.com/Open-Study-College/osc/commit/f249c46d0c4e8c267262fd45cc24a9c7399ec628))
* **drawer:** update stories ([77d9989](https://github.com/Open-Study-College/osc/commit/77d9989fae654bec9f23894a58337e2010e0149a))
* **drawer:** update stories ([faff85b](https://github.com/Open-Study-College/osc/commit/faff85b143808f8ceefc478d4c2f88ff620d9034))
* **icon:** add large modifier class to icon ([aab1525](https://github.com/Open-Study-College/osc/commit/aab1525f0b1e1e85c968eaf6a37402ce347ef93c))


### 🧪 Tests

* **drawer:** adds tests for drawer ([45c5fd4](https://github.com/Open-Study-College/osc/commit/45c5fd40d92d16dee8a89494701665231ce55cd5))
* **drawer:** remove test for css custom properties ([794d6a0](https://github.com/Open-Study-College/osc/commit/794d6a0b8ad032b5f3e1f6d5dee906505a4b1a3f))
* **drawer:** update tests to include click event ([735f8ce](https://github.com/Open-Study-College/osc/commit/735f8cef95f6a420540d9a2750938081df9bb44f))


### 🐛 Bugs

* **drawer:** add mq to allow us to scroll on narrow screens ([a953189](https://github.com/Open-Study-College/osc/commit/a953189315661c929885bb23f989785f9573c1af))
* **drawer:** add not wrapper around the pinned trigger to allow focus styles ([1ca0196](https://github.com/Open-Study-College/osc/commit/1ca0196720f99de5019a04b7848da709ac2ebdaf))
* **drawer:** allow overflow on full height drawer ([76a2194](https://github.com/Open-Study-College/osc/commit/76a219457c2d2c69cbbe04111d1d474318124a74))
* **drawer:** get height of the button and remove it from the width of pinned drawer ([b18ef05](https://github.com/Open-Study-College/osc/commit/b18ef057e049fda216f8c1c03b7bfef5e8b168db))
* **drawer:** update minHeight to use dvh over vh to account for virtual searchbar on mob ([bcc3edb](https://github.com/Open-Study-College/osc/commit/bcc3edbf42beac5983a71eeeb6d2c11cf6c4609e))


### ♻️ Refactors

* **drawer:** add initial visibility property ([4c7dc75](https://github.com/Open-Study-College/osc/commit/4c7dc75e60f1defc60f90c04035b706a2d50e5c0))
* **drawer:** add stopPropgation to drawer story ([4c12725](https://github.com/Open-Study-College/osc/commit/4c127251db978312e7aa8cf0999e390170203671))
* **drawer:** ensure fill height variant has no max-height ([08e159a](https://github.com/Open-Study-College/osc/commit/08e159a168dc7ab5207e962126ad1defae11a07a))
* **drawer:** forceMount the portal so Safari is happy ([3360c17](https://github.com/Open-Study-College/osc/commit/3360c1780762ca0a92274457c0f31f4a5f7a4ea7))
* **drawer:** move heights into variables ([bc60919](https://github.com/Open-Study-College/osc/commit/bc6091957d46feb4af8b008a1243cba0bb924029))
* **drawer:** remove max height from full height variant ([c163d6e](https://github.com/Open-Study-College/osc/commit/c163d6ee6299b00f36e8a5158be31172c5f11930))
* **drawer:** remove pointer-events rule ([8472922](https://github.com/Open-Study-College/osc/commit/847292283e0c31b2efacb3550ce243ef530c7b80))
* **drawer:** remove translation from inner btn ([73674dc](https://github.com/Open-Study-College/osc/commit/73674dce20a7fae4719b5eae8829fce126b60d08))
* **drawer:** replace trigger animations with transitions ([e95b5b7](https://github.com/Open-Study-College/osc/commit/e95b5b7188645efb4b00440e326406d3a7cf7c8e))
* **drawer:** simplify breakpoints ([54b530a](https://github.com/Open-Study-College/osc/commit/54b530a97a953e8b76fa04264fe6951c2bb0a12b))
* **drawer:** update heading font-size ([8d298ba](https://github.com/Open-Study-College/osc/commit/8d298ba05a85d9769d891e1e95cb7bded806e4f0))
* **drawer:** update trigger so we can open/close without needing to forceMount ([79470f8](https://github.com/Open-Study-College/osc/commit/79470f830b2afa9a25acaba4598cd62cc79c39f1))
* **header:** merges ref and forwardedRef ([e877fe5](https://github.com/Open-Study-College/osc/commit/e877fe5022a5b5907ef326db72ae55bdc794f717))

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

