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

## [0.35.0](https://github.com/Open-Study-College/osc/compare/v0.34.1...v0.35.0) (2023-02-14)


### ✨ Features

* add TextInput component, styles and tests ([bb60e71](https://github.com/Open-Study-College/osc/commit/bb60e715e2da14cee0e2050e132c458ccd492140))


### ♻️ Refactors

* **tokens:** adds a error box shadow ([56a5892](https://github.com/Open-Study-College/osc/commit/56a5892a358aa7d9f3c6423c3f89311b7c9e1e95))
* add "display:flex" ([039007d](https://github.com/Open-Study-College/osc/commit/039007d3d0b7df530f634489d7ab584f30fb79b3))
* add argTypes ([07ac81d](https://github.com/Open-Study-College/osc/commit/07ac81ddd01722e660c10e9bec1fd7eb9189dae9))
* add boolean as a type ([6e3d77f](https://github.com/Open-Study-College/osc/commit/6e3d77f7bc08f71a4bd0fac22cec4555c44918da))
* add eslint disable-next-line for useEffect ([a0f953f](https://github.com/Open-Study-College/osc/commit/a0f953fc6bf2a79a21132d19748001a7953e4790))
* add jsdoc descriptions, remove native "type" prop and consolidate "Icon" into its own type ([33edb41](https://github.com/Open-Study-College/osc/commit/33edb41cf573f1576100fc26a20b0e1d850d3ef7))
* add placeholder colour styling ([62aaed7](https://github.com/Open-Study-College/osc/commit/62aaed7c8166d23248396f94744d4f59180b5b98))
* add Variants type ([fa2820c](https://github.com/Open-Study-College/osc/commit/fa2820cd4fc4765225e2d7e51431b426a0ef65a9))
* add VisuallyHidden component as an option in the Label component ([91ad177](https://github.com/Open-Study-College/osc/commit/91ad177edf67b0a56b0e9d73f5b498c1bd547588))
* move label transform into a variable ([aa7be8b](https://github.com/Open-Study-College/osc/commit/aa7be8bb48e40f886a48698420ff2c63c2570650))
* move placeholder styling into separate partials file ([8b67ea4](https://github.com/Open-Study-College/osc/commit/8b67ea430a37554fe072b81aad9266347e6fb079))
* nest "required" selector and change padding to "em" unit ([a7b035c](https://github.com/Open-Study-College/osc/commit/a7b035ccab6d4c6978aeb93449adc5b85a5b6bfc))
* nest selectors inside of "c-input" ([bbaed35](https://github.com/Open-Study-College/osc/commit/bbaed35dde8c47cafeaf253577b75602d2caa290))
* reduce svg size ([ffc6206](https://github.com/Open-Study-College/osc/commit/ffc6206bdd3df832a9cd86df39f541042fcfa42c))
* remove explicit passing in of "placeholder" prop ([a0ce3bc](https://github.com/Open-Study-College/osc/commit/a0ce3bceee29a200a9a71f8d7eb1c16d4d138549))
* remove useEffect and set defaultValue directly in useState ([4c92fb9](https://github.com/Open-Study-College/osc/commit/4c92fb994e79ff9cc68a2e6e71345683e672fcce))
* remove useEffect import ([1005d5f](https://github.com/Open-Study-College/osc/commit/1005d5fe973dbc8e55667cf6b81313495a630ba1))
* replace font size centi with font size base variable ([1e6ab18](https://github.com/Open-Study-College/osc/commit/1e6ab1880b9a542048b4b48b86b9d6cf1244b91b))
* tidy up conditional components ([40264fb](https://github.com/Open-Study-College/osc/commit/40264fbe06c342dab4a9510753a54841cdee2517))
* update "Action" type ([22063ce](https://github.com/Open-Study-College/osc/commit/22063cefa4ce9236e5d960bb814bc4368ce85ade))
* update argument types ([2fab9db](https://github.com/Open-Study-College/osc/commit/2fab9db4512e95811c3021458d7d7ad6b6b9465f))
* update error handling ([f9ee15b](https://github.com/Open-Study-College/osc/commit/f9ee15b7978c1400e39b27a1a6e838149f125782))
* update iconography ([add1ba5](https://github.com/Open-Study-College/osc/commit/add1ba5c28396ca143e29ee6bdff48ff72613771))
* update padding to use calculation based on base font size ([e6505d4](https://github.com/Open-Study-College/osc/commit/e6505d4fcc55cf32216f235e2f4752a277b5c008))
* update styling ([4be6750](https://github.com/Open-Study-College/osc/commit/4be6750303c6335a1fb1c268acf2120454e51230))
* update styling for input width & input button ([0c4cdf7](https://github.com/Open-Study-College/osc/commit/0c4cdf75a085c7e9af4e6a85ecd561e2a28f3931))
* update styling with correct tokens and "em" unit usage ([65bb9aa](https://github.com/Open-Study-College/osc/commit/65bb9aa78efe64e22c38dac4b0de088422422a37))
* update to use sass variables and remove usage of font-base-scale ([8c4694b](https://github.com/Open-Study-College/osc/commit/8c4694ba0d46d6d9a795f227f62296e94c696d2a))
* update tokens ([dbbfdbe](https://github.com/Open-Study-College/osc/commit/dbbfdbec89ff568b8655fcd8c2c32136f78e3100))
* update with spacing/shadow/timing variables and remove c-label positioning ([db5983b](https://github.com/Open-Study-College/osc/commit/db5983b032533ec07e50d02d7b2e7955fc427652))

## [0.34.1](https://github.com/Open-Study-College/osc/compare/v0.34.0...v0.34.1) (2023-02-14)


### 🐛 Bugs

* add image back into build process ([86af618](https://github.com/Open-Study-College/osc/commit/86af6189208abdd4fd4b77ead77be360b8808701))
* add radix package to studio and update nvmrc ([535c7ba](https://github.com/Open-Study-College/osc/commit/535c7ba51fc553541333e87574c6cd21aa815990))
* condtional token path ([059f156](https://github.com/Open-Study-College/osc/commit/059f1561905060268465109da9ae358ca203a1ab))
* declare image as a build arg ([ecd5319](https://github.com/Open-Study-College/osc/commit/ecd531955492506d17cfbdcb68f6e2617599d9eb))
* image id and studio conditionals ([fb386f3](https://github.com/Open-Study-College/osc/commit/fb386f3ad2bd6c910b80301654375984447a60e0))
* image tags ([3213c68](https://github.com/Open-Study-College/osc/commit/3213c687a62822f75d2a7255e111b6d26b9b2aed))
* revert short_sha to github sha ([a02e909](https://github.com/Open-Study-College/osc/commit/a02e9098f3bb18f063f3195bbf234b3692b8e05d))
* sanity_studio_ci is defined ([d537742](https://github.com/Open-Study-College/osc/commit/d537742db8b60c7e7b3e8b313d2dda113fadc0a9))
* sanity_studio_ci is now readonly ([5fd3e82](https://github.com/Open-Study-College/osc/commit/5fd3e820305370a7b741fc53a92359997adae3b4))
* short sha ([6aec899](https://github.com/Open-Study-College/osc/commit/6aec8996fba4fa0e992a7e31bf7deac2a88e20cc))
* typo in body.tsx osc-studio ([5d27a68](https://github.com/Open-Study-College/osc/commit/5d27a686ce6049b2d129f011984452aaeb3499e2))
* update dockerfiles with ENV SANITY_STUDIO_CI="true" ([88f7256](https://github.com/Open-Study-College/osc/commit/88f7256ea83561571fec2c3baedc512d457a4406))
* update sample env.file in studio ([5ede79b](https://github.com/Open-Study-College/osc/commit/5ede79bb89a2ba3803f1cb1536dddb6c6da4ec76))
* use short sha when searching for image ([c902995](https://github.com/Open-Study-College/osc/commit/c902995ace022020d15cc6ff800a5ac4b6b70be0))
* used buildx action v2 ([b6f21e1](https://github.com/Open-Study-College/osc/commit/b6f21e1d3b6438eb02509c77d10aef8b2c28a714))

