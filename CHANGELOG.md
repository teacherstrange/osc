## [0.40.0](https://github.com/Open-Study-College/osc/compare/v0.39.0...v0.40.0) (2023-02-15)


### ✨ Features

* **academic-hub:** adds spritesheet provider to osc-academic-hub ([36e08a3](https://github.com/Open-Study-College/osc/commit/36e08a30a70667dac0c9239f2f7bc3240086cbdd))
* **ecommerce:** adds spritesheet provider to osc-ecommerce ([6f17b1f](https://github.com/Open-Study-College/osc/commit/6f17b1f6091619604ebc16d26b7f8eef04ef6512))
* **icon:** adds react context to create a provider for our spritesheet ([e346aa6](https://github.com/Open-Study-College/osc/commit/e346aa616eef08a9230be5104bc298c6b444f585))
* **storybook:** wraps storybook preview in spritesheet provider ([081840c](https://github.com/Open-Study-College/osc/commit/081840cadb1b79bd4b95f8759d488361e914256a))


### ♻️ Refactors

* **icon:** update provider props ([d3639d1](https://github.com/Open-Study-College/osc/commit/d3639d1420f426bdbf80f1e18bc544f50f054e58))


### 🧪 Tests

* **select:** wraps tests in the SpritesheetProvider ([c5c1ff5](https://github.com/Open-Study-College/osc/commit/c5c1ff55b8095dbbe9e62c3a616dcbdbaf578e4e))

## [0.39.0](https://github.com/Open-Study-College/osc/compare/v0.38.0...v0.39.0) (2023-02-15)


### ✨ Features

* add TextArea component, styles and tests ([aeb3d99](https://github.com/Open-Study-College/osc/commit/aeb3d9909d3cab1bd2fc6845164851a1e5fcf1b4))


### ♻️ Refactors

* **textarea:** update class on textarea ([4db8dbb](https://github.com/Open-Study-College/osc/commit/4db8dbbdfd2aa04215ca6baf1edfaa23b5dcc0f4))
* add disabled variant to label and textarea elements ([e7e464d](https://github.com/Open-Study-College/osc/commit/e7e464d43c81dffedbabb2a83e19c3d28609d617))
* add Meta type casting in ([746c6b5](https://github.com/Open-Study-College/osc/commit/746c6b517eb81623fa7b4efd502d68039c4709db))
* add resize:vertical so users can manually resize the textarea vertically ([ab83ca6](https://github.com/Open-Study-College/osc/commit/ab83ca611eb3457380c68e560292834c40ba88ab))
* add scrollbar gutter ([974e2bf](https://github.com/Open-Study-College/osc/commit/974e2bf7eb71599238b4695436dba9e488945f23))
* correct css selector ([cd3d1f0](https://github.com/Open-Study-College/osc/commit/cd3d1f0b5376950180e94c79ba854a72fd22aed7))
* nest selectors inside of "c-textarea" ([ad4ae97](https://github.com/Open-Study-College/osc/commit/ad4ae97d4c29319fd8f868a7fab95dfbdfa7d500))
* update colours with tokens and remove pointer events when disabled ([839ac7c](https://github.com/Open-Study-College/osc/commit/839ac7c75f03492c1202733b23477c5e74b39172))
* update to match/use TextInput classes ([a83597d](https://github.com/Open-Study-College/osc/commit/a83597d6af8a04b07e78104f18601a31d21c75e3))

## [0.38.0](https://github.com/Open-Study-College/osc/compare/v0.37.0...v0.38.0) (2023-02-14)


### ✨ Features

* add Select and Label components ([d88e17d](https://github.com/Open-Study-College/osc/commit/d88e17d9ecaed5a3f6d01706606f390737951929))


### ♻️ Refactors

* add argTypes ([59dcae5](https://github.com/Open-Study-College/osc/commit/59dcae57b6e4dd02011c9347769c705dd36bd559))
* add aria-label and add Radix Label component ([1d33560](https://github.com/Open-Study-College/osc/commit/1d3356026de05fac444a81204bf5f2ea90e99cc8))
* add GroupVariants type ([612822b](https://github.com/Open-Study-College/osc/commit/612822b63364556ca473af0e081abeb7fe4c2a26))
* add Radix Select package ([c093a7a](https://github.com/Open-Study-College/osc/commit/c093a7a68dfc04e50b22d79adde4516494b9a334))
* add secondary background color variable ([ff27bb9](https://github.com/Open-Study-College/osc/commit/ff27bb9c6e848b2afcc55f63581e5504aa4018c0))
* create a font-size variable ([027f31e](https://github.com/Open-Study-College/osc/commit/027f31e3239ebe7e37a027e9d111daaccbee9f8c))
* enable Select to be opened on Label click ([1218919](https://github.com/Open-Study-College/osc/commit/121891973822d92f17ce99ca63bbbfe56dfbeff9))
* pass all props through to SelectItem ([fca6b6e](https://github.com/Open-Study-College/osc/commit/fca6b6e69c48cf78a7d53dacab8362f7c02928bb))
* pass value prop rather than spreading props ([942973b](https://github.com/Open-Study-College/osc/commit/942973ba0065def5bdf20d0d924bb2646d489630))
* remove async from tests ([47fd16b](https://github.com/Open-Study-College/osc/commit/47fd16b8e407492bc649020d71fc1735d2a36139))
* remove console log ([fa80b8a](https://github.com/Open-Study-College/osc/commit/fa80b8a19190fc352040d71ab7cccf966ec27f13))
* remove FC type ([1cf6495](https://github.com/Open-Study-College/osc/commit/1cf649541675409a2859c405ab024c99ceb7a204))
* remove pointer cursor for Select labels ([eade38f](https://github.com/Open-Study-College/osc/commit/eade38f72b36bae1c95962c8d670cdada99e7e53))
* set directly to Description type ([3bf937f](https://github.com/Open-Study-College/osc/commit/3bf937f16344cac79041dc638a1dd4c546831231))
* simplify props, add jsdoc descriptions and add disabled styling for SelectItem ([7b0f617](https://github.com/Open-Study-College/osc/commit/7b0f61749908143844339003f2c9b0cbae601487))
* update box-shadow to use "shadow" color token ([d0cf65a](https://github.com/Open-Study-College/osc/commit/d0cf65ae1be79d1f9a59ffc5a575ff3c17630773))
* update colors to use hsl values ([1b32334](https://github.com/Open-Study-College/osc/commit/1b32334131bd38c0392ddf5dd9bca9e22e0971c9))
* update error handling ([372dbc9](https://github.com/Open-Study-College/osc/commit/372dbc90ba33126d65f60819e0e0516937d068e5))
* update icons ([4326b88](https://github.com/Open-Study-College/osc/commit/4326b883ef399351ff07b908bf00b5273c2de18c))
* update padding to use em unit ([6f6011d](https://github.com/Open-Study-College/osc/commit/6f6011d37be1497d294beecd14cbc33217664021))
* update tests and make "wasSubmitted" optional ([559a6c7](https://github.com/Open-Study-College/osc/commit/559a6c7ca7d4dae723dc60895c0bdf9974d63d0d))
* update to use em rather than px ([cab87ed](https://github.com/Open-Study-College/osc/commit/cab87ed0bd9378f99c8c0a46aa8240e4bbbb7f13))
* update with correct tokens ([2a9834f](https://github.com/Open-Study-College/osc/commit/2a9834fc2a7736ae8e593fe4a38f49c8f3a74c8b))
* update z-index for Select and remove from Button ([effd135](https://github.com/Open-Study-College/osc/commit/effd1357e1bd322b17dc3c1b16e3ca8e7de53775))
* use correct color tokens and update sizings to use "em" units where necessary ([12aab68](https://github.com/Open-Study-College/osc/commit/12aab68be7141fa5b53444de09657e5bf82fe1b7))
* use named imports at top of file ([57cdeb0](https://github.com/Open-Study-College/osc/commit/57cdeb0b9c671ce06e8b7d7364df62616bf342d3))


### 🐛 Bugs

* **tokens:** replaces height with min-height ([ca488b0](https://github.com/Open-Study-College/osc/commit/ca488b020f0558213af882e8eee939b1cd67edb1))

## [0.37.0](https://github.com/Open-Study-College/osc/compare/v0.36.0...v0.37.0) (2023-02-14)


### ✨ Features

* add RadioGroup component, styles and tests ([38b9ecb](https://github.com/Open-Study-College/osc/commit/38b9ecbf85d5f3529b0a4746469352a167c2d976))


### ♻️ Refactors

* **tokens:** updates radios with new variables ([a3d367a](https://github.com/Open-Study-College/osc/commit/a3d367aba162538f57a6bfcba670b3fa18b79b7e))
* add conditional for showing the description ([a9c917d](https://github.com/Open-Study-College/osc/commit/a9c917de0ac0e5f588936084e932db0084d54064))
* add cursor:pointer to the radio items ([b14f523](https://github.com/Open-Study-College/osc/commit/b14f52340927739e0d57de4007267c29f94c299e))
* add font-weight token ([00162ab](https://github.com/Open-Study-College/osc/commit/00162aba9e4687bbbafc84618678453e41126ec5))
* ensure indicator size is always relative to the item size ([e7b1e0c](https://github.com/Open-Study-College/osc/commit/e7b1e0ca8f9fd3f8541a6404f4f2ea2de1bce2bb))
* re-order selectors and remove no-descending-specificity ([7a1e496](https://github.com/Open-Study-College/osc/commit/7a1e4969dbd1ed2c797858986b10c9f56b960883))
* remove 'aria-labelledby' - not required with fieldset/legend ([2c6b388](https://github.com/Open-Study-College/osc/commit/2c6b388de433d3c73df8b6a2f4e6ee5cda836163))
* update Label usage to receive "name" as a prop ([e0027c1](https://github.com/Open-Study-College/osc/commit/e0027c19c728d79b477e19c3601da1961f51403c))
* update scss to use correct colour tokens ([1782a74](https://github.com/Open-Study-College/osc/commit/1782a74866f7ae4d16bc93a158b052213e0f39fc))
* use fieldset and legend for description and make it required ([dc7320a](https://github.com/Open-Study-College/osc/commit/dc7320a0f6ce1abb71d31e94a5242863f6e5fd8a))

## [0.36.0](https://github.com/Open-Study-College/osc/compare/v0.35.0...v0.36.0) (2023-02-14)


### ✨ Features

* add Checkbox  component, styles and tests ([1bd7ddd](https://github.com/Open-Study-College/osc/commit/1bd7ddd0200b29d086d6063b0675c08732d285d3))


### ♻️ Refactors

* add fieldset and optional legend ([b434684](https://github.com/Open-Study-College/osc/commit/b43468447f61f3ee2783a3abaaf83b15b1050501))
* add sizes variable, change value to rem and use math.div to create ratio ([8baac31](https://github.com/Open-Study-College/osc/commit/8baac31af9d132a38a32316aa0620d28c012d44d))
* nest selectors inside of "c-checkbox" ([d3e4ff6](https://github.com/Open-Study-College/osc/commit/d3e4ff6d737356ea8d79c2f6825c7b743725589c))
* remove aria-labelledby and update aria-label to use value ([45b6c76](https://github.com/Open-Study-College/osc/commit/45b6c76262f7d33dceb057c501d24ccf919d9b37))
* remove redundant import ([36f9367](https://github.com/Open-Study-College/osc/commit/36f936743cb5fb2ab5351f9e760a5d76f4bc200d))
* update class name and use --icon-size variable ([441f98c](https://github.com/Open-Study-College/osc/commit/441f98cd81bb87cbe700b85ae6b9a01fdf988100))
* update colours with tokens, set cursor to pointer and add padding-top for error message ([3d5f05f](https://github.com/Open-Study-College/osc/commit/3d5f05fdfc0049d6ef1efa45193be04602f93a31))
* update Icon ([d1e34a4](https://github.com/Open-Study-College/osc/commit/d1e34a4ba4060b7e6d76e7984a0973f5dde251b3))
* update Label and styles ([6ce065a](https://github.com/Open-Study-College/osc/commit/6ce065adf6e4c48c2e964a7cda1c599b146d5c06))
* update with correct tokens ([6ca3ed9](https://github.com/Open-Study-College/osc/commit/6ca3ed9b4f81ae2548d41e93e5e595061172d64e))

