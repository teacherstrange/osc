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

