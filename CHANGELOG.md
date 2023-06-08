## [0.99.0](https://github.com/Open-Study-College/osc/compare/v0.98.0...v0.99.0) (2023-06-08)


### 📦 General Housekeeping / Package Updates

* update playwright so we can use UI mode ([f2f19f3](https://github.com/Open-Study-College/osc/commit/f2f19f3bc8cde0964bd3a42980b43018795e637c))


### ✨ Features

* **product page:** adds initial e2e tests for the product page flow ([576de83](https://github.com/Open-Study-College/osc/commit/576de83fd4c8557aa48ae4c0df6a2703a4cfe909))


### 🐛 Bugs

* **e2e:** update locator for outside click test ([0f8f4a4](https://github.com/Open-Study-College/osc/commit/0f8f4a413bf2e771ba999c116a50af19586f4384))
* **product form:** add disabled prop to form buttons when transition isn't idle ([79f7c2d](https://github.com/Open-Study-College/osc/commit/79f7c2d7c6d4f25d8133c6b65984e69af9c78577))

## [0.98.0](https://github.com/Open-Study-College/osc/compare/v0.97.0...v0.98.0) (2023-05-26)


### ♻️ Refactors

* **line item:** replace divs with group component ([6fc26bb](https://github.com/Open-Study-College/osc/commit/6fc26bb5e03660ae1d30de368aa717251f61b066))
* **price:** wrap component in forwardRef to fix error when used in a Slot ([323bca6](https://github.com/Open-Study-College/osc/commit/323bca6a05056e0500ddbb2499fe701936e68c1e))


### ✨ Features

* **checkbox:** add secondary styles to label ([475ceff](https://github.com/Open-Study-College/osc/commit/475ceffae7c8294d1d4aba5c024ecb0b0265e85b))
* **line item:** add asChild prop to help reduce markup ([46320b8](https://github.com/Open-Study-College/osc/commit/46320b8875a6d67cf9a988605727921d20356fc9))
* **line item:** add line item tests ([bd32eca](https://github.com/Open-Study-College/osc/commit/bd32eca8edcc5726b34b05910dd11997d59192da))
* **line item:** adds initial line item component ([63dd328](https://github.com/Open-Study-College/osc/commit/63dd328b17e77626dbc61f1d461303a730029977))
* **line item:** adds tertiary variant ([7917827](https://github.com/Open-Study-College/osc/commit/7917827497750c0f414501a1a9c8ee40a6fafed3))
* **line item:** adds variant support ([5e3e24a](https://github.com/Open-Study-College/osc/commit/5e3e24a9c5d75be682ff097b0b6f13fcd5731887))
* **line item:** align primary items to the top ([255f6d4](https://github.com/Open-Study-College/osc/commit/255f6d41a07cb943333b8ccdbd31e14e0e7aa942))
* **line item:** update storybook docs ([841408c](https://github.com/Open-Study-College/osc/commit/841408c903985ea493413686f434b710cffe2acc))
* **line item:** update styles so price won't wrap ([f451a76](https://github.com/Open-Study-College/osc/commit/f451a76d9adfb4f9c98acba104bab7d05d4c0e74))

## [0.97.0](https://github.com/Open-Study-College/osc/compare/v0.96.0...v0.97.0) (2023-05-26)


### ♻️ Refactors

* **card styles:** move border styles into modifier class ([6da41d9](https://github.com/Open-Study-College/osc/commit/6da41d9b6a285222b1406e33a7ed3238d8d6b25a))
* **card styles:** move shadow styles into modifier class ([4e2096f](https://github.com/Open-Study-College/osc/commit/4e2096fb1f12abbc52d09f68579bc433e7392d1f))
* **card styles:** move underline styles into own modifier ([0f4d828](https://github.com/Open-Study-College/osc/commit/0f4d8287f35e97643e7f28c4d99c8ed0646fcc55))
* **cards:** replace is-small class with --small modifier ([8484b71](https://github.com/Open-Study-College/osc/commit/8484b717da581cde07159cbeafbde0824d60306c))
* **cards:** update title and subtitle styles to be handled by modifier classes ([7de6a09](https://github.com/Open-Study-College/osc/commit/7de6a098d2782e49467babf51bc45e09fe58a1a8))


### ✨ Features

* **accordion:** adds quaternary accordion style ([4a7ccbe](https://github.com/Open-Study-College/osc/commit/4a7ccbe3a79d40336d3005abfcdad84f0bc3bf33))
* **cards:** add bold utility to price ([9e1ddb6](https://github.com/Open-Study-College/osc/commit/9e1ddb686ad660da016dcfccba73f49f51241cdd))
* **cards:** adds body width modifier ([acea449](https://github.com/Open-Study-College/osc/commit/acea4493d8ba7fc1e05d7accb23da5361b38a547))
* **cards:** adds cart card story ([83d25e3](https://github.com/Open-Study-College/osc/commit/83d25e3ee50e7640fb8bdf1c48f5a56bd620470a))
* **cards:** adds responsive accordion story ([bad7eb7](https://github.com/Open-Study-College/osc/commit/bad7eb7b1bc992963070afd4d080609ae0d48d56))
* **cards:** adds transparency modifier ([0ccb6b4](https://github.com/Open-Study-College/osc/commit/0ccb6b470a3878a21de165905037d18df5777dce))
* **label:** add dark colour modifier ([99b270e](https://github.com/Open-Study-College/osc/commit/99b270e24501bdfe43df6a285e25ad789949228f))
* **select:** add inline-wrap variant ([f6774d0](https://github.com/Open-Study-College/osc/commit/f6774d0c57af326b35c516e6890da28814b30b0d))
* **select:** add modifier classes and props ([59c639a](https://github.com/Open-Study-College/osc/commit/59c639aee32f231f9991960d68a828c4bd0493e3))
* **styles:** add justify content utility class ([021bc9d](https://github.com/Open-Study-College/osc/commit/021bc9d1334471e6e3a166609cfb12bde07b4f23))


### 🐛 Bugs

* **button:** udpate fg colour for better contrast ([4a16ac0](https://github.com/Open-Study-College/osc/commit/4a16ac05360a4863ea5e07762076dd650d7692f5))
* **cards:** update course card in ecommerce to use new props ([b8916a4](https://github.com/Open-Study-College/osc/commit/b8916a43e3995a604337f6c204fc5ced87e43936))

## [0.96.0](https://github.com/Open-Study-College/osc/compare/v0.95.0...v0.96.0) (2023-05-26)


### ♻️ Refactors

* **callout:** separate styles into primay/secondary modifiers ([7a25482](https://github.com/Open-Study-College/osc/commit/7a25482b62d8d0bf4f3a00ed3f86cbed6960ddea))


### ✨ Features

* **callout:** add offset prop to content as well ([1595d17](https://github.com/Open-Study-College/osc/commit/1595d177f984046d3af72e47219469dcbea69a03))
* **callout:** add prop to offset the footer when needed ([cc6c13e](https://github.com/Open-Study-College/osc/commit/cc6c13e0d97862480b9aeec2aa0528dc436181b9))
* **callout:** add secondary story ([548ab41](https://github.com/Open-Study-College/osc/commit/548ab410e13d4b7032b9a4cf0d0b99f6666cae60))
* **callout:** add willshrink prop to the content area ([4280d40](https://github.com/Open-Study-College/osc/commit/4280d40e687b7b50f2fe3f7490c71e113c033843))
* **callout:** adds context to pass variant through sub components ([86eb26e](https://github.com/Open-Study-College/osc/commit/86eb26e4b1eadf1d8c7bddaa2354f436edb030cf))


### 🐛 Bugs

* **content:** add hyphens property to c-content on x-small screens to allow long words to wrap ([faed532](https://github.com/Open-Study-College/osc/commit/faed53259572a129306557a9d3164289d175b9ef))

## [0.95.0](https://github.com/Open-Study-College/osc/compare/v0.94.0...v0.95.0) (2023-05-26)


### ✨ Features

* **checkbox:** adds size prop/modifier to checkbox ([444a18a](https://github.com/Open-Study-College/osc/commit/444a18a2a5042c6800f4c50025bcac641abd0f41))
* **checkbox:** set default sizes to stories ([1d410b5](https://github.com/Open-Study-College/osc/commit/1d410b5e65da857ef59204c1edc580c09949729a))
* **label:** adds size modifier to label ([07b094f](https://github.com/Open-Study-College/osc/commit/07b094fc9085441cc4a0994439b62f2645a5bff6))

