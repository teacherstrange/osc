## [0.81.0](https://github.com/Open-Study-College/osc/compare/v0.80.0...v0.81.0) (2023-04-26)


### ✨ Features

* **cart:** add useCart hook so we can access cart data on frontend ([a92e4fe](https://github.com/Open-Study-College/osc/commit/a92e4fecaceddb04c2ccc54e7e28202ec49ef8d1))
* **cart:** adds a basic cart for displaying items ([05a8a84](https://github.com/Open-Study-College/osc/commit/05a8a84f9b7dd8948a66c1077898ad39a8702959))
* **cart:** adds product name to cart line item ([eb55fcb](https://github.com/Open-Study-College/osc/commit/eb55fcb558bd45603b37f87ef1c008693c88c360))
* **cart:** export the cart data from the root ([b735263](https://github.com/Open-Study-College/osc/commit/b7352639dce67177e53bc8227646841359c9f68b))
* **product page:** adds add to cart form ([d8b18b5](https://github.com/Open-Study-College/osc/commit/d8b18b59be79d8c9da6f9c6f0096268030225a4e))
* **styles:** adds full width utility ([82bad10](https://github.com/Open-Study-College/osc/commit/82bad10ca8c5bdb316f9fb251b1355d6c8c43ce0))


### ♻️ Refactors

* **cart:** rename getCart as cart.helpers ([a1faa18](https://github.com/Open-Study-College/osc/commit/a1faa180e3b390f585aefc566acbb67683a672c6))
* **getcart:** destructure the args into the function body ([616cacc](https://github.com/Open-Study-College/osc/commit/616cacc6699d4193c1567818df2ecc17fbad7930))
* **prduct form:** move is loading state onto the whole form ([b41677b](https://github.com/Open-Study-College/osc/commit/b41677bb60fba3cb935ee3389b138be9de8755d6))


### 📦 General Housekeeping / Package Updates

* update docstrings ([3f6f304](https://github.com/Open-Study-College/osc/commit/3f6f304a80046fb400d3a9defd3fa272ee7f9b31))

## [0.80.0](https://github.com/Open-Study-College/osc/compare/v0.79.0...v0.80.0) (2023-04-26)


### 📦 General Housekeeping / Package Updates

* **ecommerce:** enable v2 future flag for replacing useTransition ([1d4c2f5](https://github.com/Open-Study-College/osc/commit/1d4c2f54a534ac4035c37132b52934ab14661d7a))


### ♻️ Refactors

* **product form:** add form element styles ([f4412d2](https://github.com/Open-Study-College/osc/commit/f4412d2c8ddbaefcdf98f0a5be5440c59ffa89df))


### ✨ Features

* **product form:** add Form component functionality to update selected option ([0552425](https://github.com/Open-Study-College/osc/commit/0552425e2dccae4609da67e0a48fbd1ce24fc365))
* **product form:** adds loading states ([7880d17](https://github.com/Open-Study-College/osc/commit/7880d17e2488fc16e0f307f8978ecfad579ffa2c))

## [0.79.0](https://github.com/Open-Study-College/osc/compare/v0.78.1...v0.79.0) (2023-04-24)


### ✨ Features

* add testimonials document to sanity ([50c182b](https://github.com/Open-Study-College/osc/commit/50c182b403a95570176b91a54aa73a8463234a51))

## [0.78.1](https://github.com/Open-Study-College/osc/compare/v0.78.0...v0.78.1) (2023-04-21)


### 🐛 Bugs

* **studio:** adds missing faqs import file ([00d5336](https://github.com/Open-Study-College/osc/commit/00d533661241a0380f1d3c6cdcf26b98a96a92ac))

## [0.78.0](https://github.com/Open-Study-College/osc/compare/v0.77.0...v0.78.0) (2023-04-20)


### ♻️ Refactors

* **product form:** adjust layout classes ([3858b02](https://github.com/Open-Study-College/osc/commit/3858b02213af1c429da5ca223a7fba38c42d7195))
* **product page:** abstract save for later button into it's own component ([67eb7cc](https://github.com/Open-Study-College/osc/commit/67eb7cc8daae01a4b19fc3df2bcc79e375ac4a06))
* **product page:** move product form into it's own file ([9985614](https://github.com/Open-Study-College/osc/commit/9985614953e7897cd243542081294e0bd7eec482))
* **radio group:** pass description value as innerHtml so we can pass headings ([629461c](https://github.com/Open-Study-College/osc/commit/629461c0f09e1966535c572ffe5cf034cdc5868f))
* **styles:** move font-face declarations into _font.scss ([046bfce](https://github.com/Open-Study-College/osc/commit/046bfcebacc9e270a5aac64cd0e5d251a4733726))


### 📦 General Housekeeping / Package Updates

* remove comment ([f7ef8dd](https://github.com/Open-Study-College/osc/commit/f7ef8dd43c66559f9a15930fa68b66b296e95bde))
* **ecommerce:** remove placeholder stylesheet ([2d74496](https://github.com/Open-Study-College/osc/commit/2d744963b752fc213fc43e9477982d874c89532c))
* **price:** finsih writing comment ([37e0347](https://github.com/Open-Study-College/osc/commit/37e034789760e5fc8b74185b7d2c8dee59c90d84))
* **ui:** export required components for product page ([dc16faf](https://github.com/Open-Study-College/osc/commit/dc16fafe212285efc968cc0f5070c5fb989dadeb))


### ✨ Features

* **price:** wrap price in selectedVariant check so it will quietly fail ([35558b8](https://github.com/Open-Study-College/osc/commit/35558b8f3f8cce3bda429c227f81ff390af61737))
* **product form:** add color utility to headings ([f0b4340](https://github.com/Open-Study-College/osc/commit/f0b434069e0e6e056657d5e1a335116d4654f3b4))
* **product form:** add initial product form ([2ff4260](https://github.com/Open-Study-College/osc/commit/2ff426017c8dc036b923d49775cfeb80ada20f23))
* **product form:** add positioning for the form ([a451e0c](https://github.com/Open-Study-College/osc/commit/a451e0c870d74639ae05bfa7896cfcd83d6a7040))
* **product form:** adds styles for price component ([6d21591](https://github.com/Open-Study-College/osc/commit/6d21591f1aebae9874adfdbbf4328bc70ce1b799))
* **product form:** adds styles for product form ([14d8fe7](https://github.com/Open-Study-College/osc/commit/14d8fe7613699b5532facb6092ddf28f0d607bb6))
* **product form:** apply direction and gap to radio group ([40aa144](https://github.com/Open-Study-College/osc/commit/40aa1443b9d43f2733fd88a94cdc802ab58120e9))
* **product form:** extract price into it's own component ([33fb2e5](https://github.com/Open-Study-College/osc/commit/33fb2e5468f2066d6154b1893030b37672344961))
* **product form:** import label styles ([57fc2a9](https://github.com/Open-Study-College/osc/commit/57fc2a9dc2d1382446e9d1568c5247a6de06e9fb))
* **product form:** pass heading to radio group legend ([afd90c7](https://github.com/Open-Study-College/osc/commit/afd90c71f509c9a77c90011ef0afd695a1ee05c7))
* **product page:** adds payment option radio button to form ([9858bb4](https://github.com/Open-Study-College/osc/commit/9858bb4097dfca10ad1a7f506cedf545d9f35e9d))
* **product page:** adds product page scss file ([98aa9e6](https://github.com/Open-Study-College/osc/commit/98aa9e647f748e4f292e4d8f7915f7fd878d3217))
* **product page:** adds selected variant options to form ([281b919](https://github.com/Open-Study-College/osc/commit/281b91923d72b9ea674ca5ae6ad7ac3568fa3675))
* **product page:** import stylesheets ([8939974](https://github.com/Open-Study-College/osc/commit/8939974fe289cf3701fc72b1b7d22d3d21caa040))
* **product page:** update product query to include full variant fragment ([4da5f82](https://github.com/Open-Study-College/osc/commit/4da5f82690dd5b3641704ed99ba8268b091985ae))
* **radio group:** adds direction and classname props ([adac8bf](https://github.com/Open-Study-College/osc/commit/adac8bfaa1444ebd9553caeb63eb41c8cddc4187))
* **styles:** adds 0 value to scales map ([a327898](https://github.com/Open-Study-College/osc/commit/a32789891e5a138e43222faf9e15d297c6407cf2))


### 🐛 Bugs

* **product form:** add overflow-x: clip to o-page to fix position sticky on form ([e8c5561](https://github.com/Open-Study-College/osc/commit/e8c5561e802bb9f849d0420156ab5c2d6a2ceb8a))

