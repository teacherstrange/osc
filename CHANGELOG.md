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

## [0.28.0](https://github.com/Open-Study-College/osc/compare/v0.27.0...v0.28.0) (2023-01-27)


### 📦 General Housekeeping / Package Updates

* **button:** update variant defaults ([22529d7](https://github.com/Open-Study-College/osc/commit/22529d70ebc686fcb87341fb8fc881d90ca669b4))
* **storybook:** set a background for our stories ([52076b0](https://github.com/Open-Study-College/osc/commit/52076b07c7345a9d7c8a521fa3bf2006ecd51234))
* remove redundant comment ([3555dc4](https://github.com/Open-Study-College/osc/commit/3555dc4840e5507b0b56a01c7470d08f523eb254))
* update typescript target ([74e1198](https://github.com/Open-Study-College/osc/commit/74e11980a6973d36a3c98ff21b1cf53bb6116ec4))


### 🐛 Bugs

* update variant type ([f934a8d](https://github.com/Open-Study-College/osc/commit/f934a8ddfebb4ed09a1d77384bd0e5c6b462de34))


### ✨ Features

* **button:** add button variants to Sanity ([d0059dc](https://github.com/Open-Study-College/osc/commit/d0059dc12f515091316df40735502abb1ace134e))
* **button:** add gradient variations ([1c888ce](https://github.com/Open-Study-College/osc/commit/1c888ce68642af6b8e0d6881422276e98c290ee1))
* **button:** add is-full class ([8dc0abd](https://github.com/Open-Study-College/osc/commit/8dc0abd5840f2a6deeef9e946b8ce83d24f676c8))
* **button:** adds button styles ([53d3c8e](https://github.com/Open-Study-College/osc/commit/53d3c8e7d6e3921960e047a6890209b16f87f77c))
* **button:** adds full width prop ([016a419](https://github.com/Open-Study-College/osc/commit/016a419cae9f1f1d95959202859aedadc82a8f1d))
* **button:** adds inverse colour styles ([2cb2bc3](https://github.com/Open-Study-College/osc/commit/2cb2bc3f400b4b66fa77c19401daa72236b0571f))
* **button:** adds lg variant ([22ec31a](https://github.com/Open-Study-College/osc/commit/22ec31a610aa3fdda8a47567ab60acba91a059e6))
* **button:** adds new stories ([c881782](https://github.com/Open-Study-College/osc/commit/c88178268f77d255d9f240e8a3bab0ba33426901))
* **button:** adds shape prop ([dfe52ec](https://github.com/Open-Study-College/osc/commit/dfe52ec18ac945a1456d64766e4972183ed9a091))
* **button:** adds small variant styles ([e847c3b](https://github.com/Open-Study-College/osc/commit/e847c3b13e56e56424b94347bff69d5a001b2fcc))
* **ecommerce:** add buttons array to content ([c328245](https://github.com/Open-Study-College/osc/commit/c32824519f653487a8ab2cc97d9bc5ade42b9e5a))
* **styles:** adds xsml and xxsml letter spacing ([784fa29](https://github.com/Open-Study-College/osc/commit/784fa29b51b1199e926772165b7499519a14ad17))
* **tokens:** adds letter spacing options to tokens ([f45baf9](https://github.com/Open-Study-College/osc/commit/f45baf949d687f4f1fa0e925fa30082c7eaae31b))


### ♻️ Refactors

* **button:** adds forwardRef to button ([20b5eb2](https://github.com/Open-Study-College/osc/commit/20b5eb2d4c9d18cd5f05b7e0c5aabadb18522cb7))
* **button:** moves styles out of mixin ([71777be](https://github.com/Open-Study-College/osc/commit/71777be4b7994cac0cbb5bf3d112ab4fb0abaefc))
* **button:** moves type descriptions from storybook to jsdoc ([fe3447f](https://github.com/Open-Study-College/osc/commit/fe3447f9cba6e3759108af90e67653751625a416))
* **button:** rebuilds the stylesheet as a sass map ([4a278c5](https://github.com/Open-Study-College/osc/commit/4a278c5e72fa36adb77f77939f02dd7701efd56a))
* **button:** replace shape prop with isPill boolean ([5632315](https://github.com/Open-Study-College/osc/commit/563231529417a8963f49be9ff348bfa41719fd48))
* **button:** update jsdoc typescript comments ([86d762e](https://github.com/Open-Study-College/osc/commit/86d762ebfb94c7aa78baee936ed410efca640e9c))
* **button:** update stories ([26d2915](https://github.com/Open-Study-College/osc/commit/26d29159a8e79c61e9551c7b245a175c7c23b34f))
* **button:** update tests to match new selectors ([0912788](https://github.com/Open-Study-College/osc/commit/09127880d5064b98194c64364f2f5fe824d68464))
* **button:** update variant names ([b68a8eb](https://github.com/Open-Study-College/osc/commit/b68a8eb4c1c1052cdced30c599ed799f2f372168))
* **storybook:** remove background color ([905ec2b](https://github.com/Open-Study-College/osc/commit/905ec2b0a89c0668554434861a59e7fb7c813372))
* **tokens:** update colour variables ([5af88c3](https://github.com/Open-Study-College/osc/commit/5af88c3d2188a85ce22f8ded9025614714f93e49))
* **tokens:** updates dark theme neutral color tokens ([4388a18](https://github.com/Open-Study-College/osc/commit/4388a188c08fc0933c367e2ae2d3594385b3c818))

