## [0.32.0](https://github.com/Open-Study-College/osc/compare/v0.31.0...v0.32.0) (2023-01-30)


### ✨ Features

* **ecommerce:** preloads spritesheet ([1ecf6af](https://github.com/Open-Study-College/osc/commit/1ecf6af565ce6479d0d9901ca1b1eb7655e2b00f))
* **ecommerce:** rule to server deps bundle to prevent unhandled syntax error with svgs ([eb56c69](https://github.com/Open-Study-College/osc/commit/eb56c693c9ad111c3d453abb30189f72e3bbb7bf))
* **studio:** adds custom icon picker and spritesheet ([09e0d96](https://github.com/Open-Study-College/osc/commit/09e0d966e8a7a601a1e3d3dc94e0959897d19297))
* add dist folder to staticDirs so we can reference the spritesheet ([88ec773](https://github.com/Open-Study-College/osc/commit/88ec77339ffd98a1234594e6e3ef74dd00168146))
* adds an icon component ([7cad44b](https://github.com/Open-Study-College/osc/commit/7cad44b706b67d7471d9e887383be698b16f7a46))
* adds custom icons ([57576ab](https://github.com/Open-Study-College/osc/commit/57576ab8e7839716f139bfe2df233a044dbb63a8))
* adds custom rollup plugin to generate a spritesheet ([330722e](https://github.com/Open-Study-College/osc/commit/330722e39924e4491ce40f602561776597eac836))


### ♻️ Refactors

* remove menu icon ([5bb8059](https://github.com/Open-Study-College/osc/commit/5bb805900ffdba29d36391a9be2e1aae60943232))
* renames icons with more generic name ([b066ac7](https://github.com/Open-Study-College/osc/commit/b066ac7af867104cb51ffba1f1063285d7bbba47))
* **tag:** updates accessible icon within the tag ([f2e3edc](https://github.com/Open-Study-College/osc/commit/f2e3edc7531870efde3be1a7a9d0dee28e6e7b5d))
* update regex to match all instances ([b163bec](https://github.com/Open-Study-College/osc/commit/b163bec45d4d3718c96494a05888450a6f5384ab))

## [0.31.0](https://github.com/Open-Study-College/osc/compare/v0.30.0...v0.31.0) (2023-01-30)


### ✨ Features

* add "isDisabled" story and descriptions ([68a750a](https://github.com/Open-Study-College/osc/commit/68a750a1226cc9c69bc892708bfe84c5ecd333cc))
* add error handling/styling for "Has Validation" ([2e6d128](https://github.com/Open-Study-College/osc/commit/2e6d128e05f4e5d46191af9f3a199fa3fb56f879))

## [0.30.0](https://github.com/Open-Study-College/osc/compare/v0.29.1...v0.30.0) (2023-01-30)


### ✨ Features

* add Slider component, styling and tests ([008f622](https://github.com/Open-Study-College/osc/commit/008f62250e9c8dcd5a1b1b170771cd93110f0e1b))


### ♻️ Refactors

* mock out ResizeObserver, make same change in Popover component and remove package ([a897e77](https://github.com/Open-Study-College/osc/commit/a897e776b3e1234a11f6538b89392cfc1e19df40))
* remove React fragment ([977a2d4](https://github.com/Open-Study-College/osc/commit/977a2d4347b8d427ba21dea4f97c2910eaa6b40a))
* remove useEffect and set value directly in useState ([191d1b1](https://github.com/Open-Study-College/osc/commit/191d1b1c4c459a3dcc109f66cc1ee84288b8d38c))
* remove useEffect import ([7d35023](https://github.com/Open-Study-College/osc/commit/7d3502391a8c87af2c53d5d724e74ebac1f27e0e))
* removes react FC type from components ([1e4ab18](https://github.com/Open-Study-College/osc/commit/1e4ab18475520761d836eddcd9b2c01a1a731b41))
* simplify and move into two separate stories ([72326fa](https://github.com/Open-Study-College/osc/commit/72326fa16f9f6af1305730b5f4c939e75f73535d))


### 🐛 Bugs

* adds missing children type ([e250054](https://github.com/Open-Study-College/osc/commit/e25005467abdbf6429239b81a586e52a03a3bd36))
* updates props to correct type ([4b9639e](https://github.com/Open-Study-College/osc/commit/4b9639efbdfc9d369bd113d04feb4aa3c591d239))

## [0.29.1](https://github.com/Open-Study-College/osc/compare/v0.29.0...v0.29.1) (2023-01-30)


### ♻️ Refactors

* add countLimiter util ([ba852d2](https://github.com/Open-Study-College/osc/commit/ba852d2c345ad026a61194426f8596918c7ee636))
* add Fallback gradient component, add logic for max count and update css/tests ([e940042](https://github.com/Open-Study-College/osc/commit/e940042eaf811da3639a915ceccb1561e22a0640))
* add notification dot ([9bd34d9](https://github.com/Open-Study-College/osc/commit/9bd34d9b62943f261b0b3f9ed6c4b1e52b124b76))
* move "overflow:hidden" to "fallback" class ([dcb1291](https://github.com/Open-Study-College/osc/commit/dcb129183bacbdb44345784655fee76667192340))
* move fallback class conditionally to Root and tidy up scss ([454f1c2](https://github.com/Open-Study-College/osc/commit/454f1c2812987ee0984b40235f6618ec1acffb3f))
* move notification and count into one property ([b411061](https://github.com/Open-Study-College/osc/commit/b4110611b356d4b1a97721327c974e59ad364844))

## [0.29.0](https://github.com/Open-Study-College/osc/compare/v0.28.0...v0.29.0) (2023-01-27)


### 📦 General Housekeeping / Package Updates

* removes colour picker plugin ([1bba79a](https://github.com/Open-Study-College/osc/commit/1bba79a0b202b8261911027e66974ff85ad266ef))


### 🐛 Bugs

* **accordion:** add font weight to accordion header ([7254f3d](https://github.com/Open-Study-College/osc/commit/7254f3da47e0fd326460da4213fdb506b4d764c7))
* add missing component import ([beafe9c](https://github.com/Open-Study-College/osc/commit/beafe9ca798f7957037160a4b596a5ad8cb56aa7))
* **build:** adds commonjs plugin to bundle our tokens correctly ([84938a2](https://github.com/Open-Study-College/osc/commit/84938a2f269e3f94296388f982a97e1cdc6a2db7))
* remove rule setting trailing comma on scss files ([1dbef14](https://github.com/Open-Study-College/osc/commit/1dbef14eb98ac9692977fdc91e4fde4fdf6ad0fc))
* **styles:** fixes typo in color ([bdd82a9](https://github.com/Open-Study-College/osc/commit/bdd82a9bab8df84780859776e56d2eadc49a135f))


### ✨ Features

* **content component:** adds custom input for setting content background color ([1f8874e](https://github.com/Open-Study-College/osc/commit/1f8874e4d75555dfbe784a64726686f6c1418029))
* **content component:** adds markup for decorators ([01bcb7a](https://github.com/Open-Study-College/osc/commit/01bcb7a7ed4f22abd7c3d886e3e9aa16bb0c4b9f))
* **content module:** adds decorators for users to style text ([e94d5dc](https://github.com/Open-Study-College/osc/commit/e94d5dcd2bf8e5ca43798295cfae5e57d33da42c))
* **list:** adds numeric list style ([009208d](https://github.com/Open-Study-College/osc/commit/009208d3e2be999830b02596fede9c8748c1cccb))
* **styles:** adds content component styles ([d439b87](https://github.com/Open-Study-College/osc/commit/d439b87b51627358ecfe88ca94ba3f9a5c95efbd))
* **styles:** adds gradient text-color ([2dd64f3](https://github.com/Open-Study-College/osc/commit/2dd64f32a268bb7e1ea18c8e92bcd937d4334eda))
* **styles:** adds semi-bold typography token ([6e73418](https://github.com/Open-Study-College/osc/commit/6e73418dbddc35505f39e1368b5f715b0b51db3e))
* **styles:** updates list styling ([b352e8f](https://github.com/Open-Study-College/osc/commit/b352e8f765bda5a4792d4a5f879bce2e2521722c))
* **styles:** updates the line height for font sizes ([d257b9e](https://github.com/Open-Study-College/osc/commit/d257b9e07cdd658ad72db515118dcbb7aa968c68))
* **styles:** updates update global body font size ([04e324b](https://github.com/Open-Study-College/osc/commit/04e324b12144ca2a9af21abc586a4b99aa773216))


### ♻️ Refactors

* **accordion:** explicitly set font-weight so we don't inherit ([e90b613](https://github.com/Open-Study-College/osc/commit/e90b613c89872308c529f64ece8eda51c4410783))
* **tokens:** updates fluid scale maxScale value ([89a2a70](https://github.com/Open-Study-College/osc/commit/89a2a705a42a51d2a1d8332e63ce6618e2c0e256))
* replace variant picker with color picker ([97ba747](https://github.com/Open-Study-College/osc/commit/97ba74779faf4e41c353cd5e4172f02443a8e2dd))
* updates query to account for new shape ([10c231c](https://github.com/Open-Study-College/osc/commit/10c231cb68a6e1b9527a8e3ce8d9cb1190e25dda))
* updates spacing values to match tokens ([dd9e516](https://github.com/Open-Study-College/osc/commit/dd9e5160b2b374c321766de904825a1c88cc7a6f))
* **styles:** updates font sizes per heading ([aade89f](https://github.com/Open-Study-College/osc/commit/aade89f9fb9b82346808c8bde743719fbe348106))

