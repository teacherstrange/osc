## [0.95.0](https://github.com/Open-Study-College/osc/compare/v0.94.0...v0.95.0) (2023-05-26)


### ✨ Features

* **checkbox:** adds size prop/modifier to checkbox ([444a18a](https://github.com/Open-Study-College/osc/commit/444a18a2a5042c6800f4c50025bcac641abd0f41))
* **checkbox:** set default sizes to stories ([1d410b5](https://github.com/Open-Study-College/osc/commit/1d410b5e65da857ef59204c1edc580c09949729a))
* **label:** adds size modifier to label ([07b094f](https://github.com/Open-Study-College/osc/commit/07b094fc9085441cc4a0994439b62f2645a5bff6))

## [0.94.0](https://github.com/Open-Study-College/osc/compare/v0.93.0...v0.94.0) (2023-05-23)


### ♻️ Refactors

* **ecommerce:** move theme query into product query ([d84e0a3](https://github.com/Open-Study-College/osc/commit/d84e0a34ae1269c77bfea21b2e17fc6cd333785f))
* **ecommerce:** update getPageData to allow more flexible params ([a50ec89](https://github.com/Open-Study-College/osc/commit/a50ec8922f9a348907fbabab2052d988c96ed01e))
* **studio:** remove showHero schema ([fd52aeb](https://github.com/Open-Study-College/osc/commit/fd52aeb8b1d67eb344f35792f4f0c6d1308ca58e))


### ✨ Features

* **collections:** adds theme settings to collections ([3cc8726](https://github.com/Open-Study-College/osc/commit/3cc872651ccdd006ddb57425e60de02652ca72c3))
* **ecommerce:** add relative position to main element ([875b205](https://github.com/Open-Study-College/osc/commit/875b205d89086019e6e18a4c6007fcda56caec02))
* **flourishes:** adds page flourishes to pattern dropdown ([3fdbeba](https://github.com/Open-Study-College/osc/commit/3fdbeba7144552bab6438074cc6b281c1e42691f))
* **flourishes:** bring collection flourishes into ecommerce ([6d105a2](https://github.com/Open-Study-College/osc/commit/6d105a2afc607c89d730bebf1a49f00f83ef568f))
* **hero:** add flourishes to hero component in ecommerce ([11781da](https://github.com/Open-Study-College/osc/commit/11781da1d5ca0333e9bb2e4b922d62e6f6765850))
* **product page:** adds flourishes to product page ([d14d628](https://github.com/Open-Study-College/osc/commit/d14d628974e60ea1e68a46436cc95939bac3a019))
* **products:** adds collections to products query ([2cab426](https://github.com/Open-Study-College/osc/commit/2cab426257ae6d51bdd8840a3d668d79e768b663))
* **styles:** adds utility class to apply position ([c75afb3](https://github.com/Open-Study-College/osc/commit/c75afb39285b1156049c2e606c615bdc15c85748))
* **types:** adds flourish settings type to ecommerce ([9a562dd](https://github.com/Open-Study-College/osc/commit/9a562ddfea512f759a18fa5d21eb75c192e2c265))


### 🐛 Bugs

* **product page:** set upperContent type to be required to fix ts error ([c80c9b4](https://github.com/Open-Study-College/osc/commit/c80c9b488d86a91202892e1954b85dfafd017cc3))

## [0.93.0](https://github.com/Open-Study-College/osc/compare/v0.92.0...v0.93.0) (2023-05-23)


### ✨ Features

* **ecommerce:** adds flourishes to hero query ([f432784](https://github.com/Open-Study-College/osc/commit/f43278489857b4cf66324b808864e54986cc3adf))
* **ecommerce:** adds utility to map santity settings to flourish patten object ([3c53e2d](https://github.com/Open-Study-College/osc/commit/3c53e2df3791383f016a863691e236d66c7373fc))
* **hero:** add flourishes to hero component in ecommerce ([cd6f546](https://github.com/Open-Study-College/osc/commit/cd6f54614e76144c9fc38c7c31833b7ca3e54c71))
* **studio:** adds a colorpicker variant that is restricted to certain colors ([911ccad](https://github.com/Open-Study-College/osc/commit/911ccad61bd494dd3178815f1732e4ce371e4035))
* **studio:** adds flourish settings to hero modules ([dae4758](https://github.com/Open-Study-College/osc/commit/dae4758fa74f6937ca6051c3477f394aeca5e5dc))
* **types:** adds flourish settings type to ecommerce ([77f00b2](https://github.com/Open-Study-College/osc/commit/77f00b2dd87007fec5d175c06c68461037848d70))


### 🧪 Tests

* **hero:** adds test to hero to check flourishes get applied as expected ([8c70002](https://github.com/Open-Study-College/osc/commit/8c70002b9fb01f624932823fc440feab79b4b605))


### 📦 General Housekeeping / Package Updates

* remove console.log ([08659da](https://github.com/Open-Study-College/osc/commit/08659da46323937c0c3467d66c8877e52caa53ba))


### 🐛 Bugs

* **hero:** fixes hero carousel name not passing through ([2137ccf](https://github.com/Open-Study-College/osc/commit/2137ccf5b9bebdfc54bfe71f326bec7e01630b13))
* **studio:** remove fallback gradient to prevent it overriding everything ([ea9fc79](https://github.com/Open-Study-College/osc/commit/ea9fc792c903ec5731cea4444ebdba9558d20c49))
* **types:** fix ts error in test file ([1935acf](https://github.com/Open-Study-College/osc/commit/1935acfadbd2df1e3d5076589df893bf10e7f2c4))

## [0.92.0](https://github.com/Open-Study-College/osc/compare/v0.91.0...v0.92.0) (2023-05-23)


### 🧪 Tests

* **price:** update test to match new classes ([67f7ccf](https://github.com/Open-Study-College/osc/commit/67f7ccfd7cf6ad615a5b5bf89bb5be4da204aa3c))


### ♻️ Refactors

* **card:** update card price type to allow react nodes ([d9ad0cc](https://github.com/Open-Study-College/osc/commit/d9ad0cc1d1e2dfcdb7be258b5846ceb1a45ca600))
* **price:** extract price component out of osc-ecommerce and move it into osc-ui as a wrapper ([cb2b54d](https://github.com/Open-Study-College/osc/commit/cb2b54dc4cf1755efe4b68d5a360c899c30765df))
* **price:** remove ternary with inaccessible false statement ([3c8aa3e](https://github.com/Open-Study-College/osc/commit/3c8aa3e8b2c19e5df5e8e5d71f74c2b7728d4faa))
* **product page:** remove price stylesheet ([dbcd24f](https://github.com/Open-Study-College/osc/commit/dbcd24fa75b283d6acd7ecc3675c135fef49652b))


### ✨ Features

* **cards:** adds price component to course cards ([dda7417](https://github.com/Open-Study-College/osc/commit/dda7417da7b50f0899f1e46779dc85b0bd24006e))
* **price:** add missing utilitiy classes to price in ecommerce ([37db4e3](https://github.com/Open-Study-College/osc/commit/37db4e36ef6ea983bb9927e3c79d6737329cce2d))
* **price:** adds size modifier ([4d671a6](https://github.com/Open-Study-College/osc/commit/4d671a670f3241f38135124a32cdb16573df14f7))
* **price:** adds sku element class ([95388c3](https://github.com/Open-Study-College/osc/commit/95388c3bcd315b25626f0fb81bd2e7877ef36c87))
* add price stylesheet to root ([2fbd9b7](https://github.com/Open-Study-College/osc/commit/2fbd9b72aad377b5e49a7d80e623671b0d87caa4))

## [0.91.0](https://github.com/Open-Study-College/osc/compare/v0.90.1...v0.91.0) (2023-05-19)


### 📦 General Housekeeping / Package Updates

* **flourishes:** removes comment ([42af9a8](https://github.com/Open-Study-College/osc/commit/42af9a86ab53d9f0456f3376df9b7f1ca9d44693))
* **flourishes:** update storybook doc controls ([35bc094](https://github.com/Open-Study-College/osc/commit/35bc0940518174c2438949b1b2c565d20ee3aa87))


### 🧪 Tests

* **flourishes:** adds test for multiple flourishes ([56321c9](https://github.com/Open-Study-College/osc/commit/56321c985bd32f67dc8955a8b4667c5e65371ab0))


### 🐛 Bugs

* **flourishes:** remove negative zindex ([94b3248](https://github.com/Open-Study-College/osc/commit/94b324854b16a5e46e7da7d5c092ac200ce8653b))
* **flourishes:** typo ([2132d13](https://github.com/Open-Study-College/osc/commit/2132d139aca6669d5ef86b59df9a3776f55a71b9))
* **flourishes:** update path to correct type file ([c5cb4e1](https://github.com/Open-Study-College/osc/commit/c5cb4e13f34d2a74c5b03aefc6abad42080b1412))


### ✨ Features

* **flourishes:** throttle the mousemove functions ([efb0ea4](https://github.com/Open-Study-College/osc/commit/efb0ea4dff64e4a62d733b82263ba51df2360939))
* adds a throttle utility function ([4f96b58](https://github.com/Open-Study-College/osc/commit/4f96b58b3940cdd03b10e5a39eff45d674bea60b))
* **cards:** adds flourishes to cards story ([b2a16dd](https://github.com/Open-Study-College/osc/commit/b2a16ddffa42dc2b5b119df35671dc115286c39a))
* **cards:** adds position relative to card__img ([8f74aa5](https://github.com/Open-Study-College/osc/commit/8f74aa5f8a0d1533ab1c73d5826e1c01d193629a))
* **flourishes:** add multiple flourish colour support ([a1bc9fd](https://github.com/Open-Study-College/osc/commit/a1bc9fd67eb99103f79b17c1a4ba00c2bc2eb42a))
* **flourishes:** adds flourishes wrapper component ([1cc92ee](https://github.com/Open-Study-College/osc/commit/1cc92ee023c8fc69e1559750edc7e5d17d611fd0))
* **flourishes:** adds individual flourish component ([b44f12e](https://github.com/Open-Study-College/osc/commit/b44f12e95322998e1e950959d263728f6c771974))
* **flourishes:** adds modifier class to position flourish above container ([885c563](https://github.com/Open-Study-College/osc/commit/885c5636300e9b8926e037f6e9641869b51f28df))
* **flourishes:** adds more patterns ([5557462](https://github.com/Open-Study-College/osc/commit/5557462af55f20630486706eb598a3267da41047))
* **flourishes:** adds primary flourish pattern ([0207d25](https://github.com/Open-Study-College/osc/commit/0207d2531216b8451833e006666fe5030609b48f))
* **flourishes:** adds secondary pattern ([8dfa92d](https://github.com/Open-Study-College/osc/commit/8dfa92d5999b83e52b66b969dbe4ad2f6c3bd2eb))
* **flourishes:** adds size and modifier props ([45663ca](https://github.com/Open-Study-College/osc/commit/45663cafa18569dfd1dcedebc2b9dfcaf13e0e20))
* **flourishes:** adds styles ([9e728c7](https://github.com/Open-Study-College/osc/commit/9e728c770eb2dea828e5ae9183e8d63142cce296))
* **flourishes:** move hero tertiary into sass map ([28edcfc](https://github.com/Open-Study-College/osc/commit/28edcfc6d1674a49c1325284e35193f9f6fcad90))
* **hero:** add flourish patterns to hero component ([da1a81e](https://github.com/Open-Study-College/osc/commit/da1a81e4eafbeb3f01aeeda6990c1e6813ff6887))
* **hero:** adds mouseMove handler to hero ([efe2089](https://github.com/Open-Study-College/osc/commit/efe20894c082558d582735981deec7e7dbbf6581))
* **utils:** adds a merge event handler utility for working with event props ([898f2df](https://github.com/Open-Study-College/osc/commit/898f2df5ee0d6f87cc369bd0bd51dfe2c56e9bc9))


### ♻️ Refactors

* **flourishes:** add container ref so we can target the children rather than all flourishes ([68a68e9](https://github.com/Open-Study-College/osc/commit/68a68e9737219806cf34bf133ee56b8d603b60b0))
* **flourishes:** move flourish types into global osc-ui types files ([0819ad2](https://github.com/Open-Study-College/osc/commit/0819ad2f7d4e6a58b1ba68b0c8b2afc0e2891b96))
* **flourishes:** move initial pos styles into sass map ([122604e](https://github.com/Open-Study-College/osc/commit/122604ee086aaa4c6304510d523f3f12fe881570))
* **flourishes:** move mousemove events into utility function ([94c3f58](https://github.com/Open-Study-College/osc/commit/94c3f585a0b7f5e71475ed1332e6ad351c2eeaed))
* **flourishes:** move types into separate file ([3cb1b8c](https://github.com/Open-Study-College/osc/commit/3cb1b8cd3b351bf806f1ae43dd848bbb3c74e18d))
* **flourishes:** replace FlourishColor type with string ([5c84859](https://github.com/Open-Study-College/osc/commit/5c848596b61f0a3f95f0d20f848f201cf482d9a5))
* **flourishes:** set throttleInterval as prop ([d85aa07](https://github.com/Open-Study-College/osc/commit/d85aa077ece9a79d5ff4cb1468e90a1f2c964b8d))
* **flourishes:** update colour classname to be more explicit ([5c62889](https://github.com/Open-Study-College/osc/commit/5c62889e7c8b43ef28b0e721bb92e9b42f8286ca))
* **flourishes:** updates sizes ([06a49ab](https://github.com/Open-Study-College/osc/commit/06a49ab3f8aa86ae1128e9b87f4f390c350c7573))
* **handleMouseEvents:** add check for nodes length ([52ae6c9](https://github.com/Open-Study-College/osc/commit/52ae6c9406d095612898d5a6c0e2ba4ff36cd0a4))
* **hero:** remove flourish controls from main hero ([7455ed9](https://github.com/Open-Study-College/osc/commit/7455ed9da43afc49ae0de0a8cf43eeb46b7c5a66))
* **types:** extract TransformPattern out of FlourishObject ([2c774ef](https://github.com/Open-Study-College/osc/commit/2c774ef3fe1c0e33d1e1988a143d2d9213e22087))

