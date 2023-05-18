## [0.90.0](https://github.com/Open-Study-College/osc/compare/v0.89.0...v0.90.0) (2023-05-18)


### ♻️ Refactors

* **carousel:** set default slides per page ([5101f3a](https://github.com/Open-Study-College/osc/commit/5101f3adcf0ccf4a09b1149dfa55a48f6bcac58d))
* **course cards:** update cards to take data from Shopify as well as Sanity ([946e8b2](https://github.com/Open-Study-College/osc/commit/946e8b22db842eaaba25c7ccebe4e142d4410916))
* **types:** extend course card from product type ([9147dac](https://github.com/Open-Study-College/osc/commit/9147dac1fbe38c0d19ab858b5d8ef5211f4634b6))


### 📦 General Housekeeping / Package Updates

* remove unused code ([5d88c73](https://github.com/Open-Study-College/osc/commit/5d88c7332161617647f3e3050d625807c0d75e06))
* update comment on useRecommendedProducts ([dd95eb0](https://github.com/Open-Study-College/osc/commit/dd95eb0a4ea6dedaba0594c341a2032e11b863d1))


### ✨ Features

* **products:** adds query for recommended products ([40b7244](https://github.com/Open-Study-College/osc/commit/40b7244ef0274af076b205443a7798564209af22))
* **products page:** adds recommended products query ([fdef248](https://github.com/Open-Study-College/osc/commit/fdef2487e0a2bab1f5c90e1da53b55386de73e6f))
* **recommended products:** adds carousel settings to sanity object ([b3b47c1](https://github.com/Open-Study-College/osc/commit/b3b47c1ce855172cf1dd0d8926f1516e58388a4f))
* **recommended products:** adds rec products object to studio ([314ac0e](https://github.com/Open-Study-College/osc/commit/314ac0ea9c928d4e65c58031cc613c739fecf949))
* **recommended products:** adds recommended products component ([39ccdbc](https://github.com/Open-Study-College/osc/commit/39ccdbcde308a115b21ca591322fcd41ebd57b27))
* **recommended products:** adds tests for recommended products component ([b5cac3e](https://github.com/Open-Study-College/osc/commit/b5cac3ec321250a2c373f1978611380c871cd0b7))
* **recommended products:** adds useRecommendedProducts hook ([13272f5](https://github.com/Open-Study-College/osc/commit/13272f577305605616b58fd2e08ad142e30476c9))
* **recommended products:** update filter to handle course options option ([51f5a10](https://github.com/Open-Study-College/osc/commit/51f5a109577ff0d0c12e31048cb31cfc4f4809f1))
* **sanity:** adds a PRODUCT_MODULES constant ([cf58371](https://github.com/Open-Study-College/osc/commit/cf5837196edbcf294c380953ba7d5dcc8f7ca515))


### 🧪 Tests

* improve test cases ([74d33d8](https://github.com/Open-Study-College/osc/commit/74d33d8bced6a5fe8f39a8761983650dc47a0b8f))

## [0.89.0](https://github.com/Open-Study-College/osc/compare/v0.88.0...v0.89.0) (2023-05-18)


### 🐛 Bugs

* **content media:** add missing property to image ([d790199](https://github.com/Open-Study-College/osc/commit/d790199f9bf95cf4d8bd32d4d9b094eba07a8af5))


### ✨ Features

* **card:** adds image styles ([f63c853](https://github.com/Open-Study-College/osc/commit/f63c8535f0054e4e761d266397570c3efe0dbc50))
* **cards:** add data from post hero into blog card ([fa2a7ab](https://github.com/Open-Study-College/osc/commit/fa2a7ab8d9376731b084dc7c7b0ded128fccc5fa))
* **carousel:** adds image styles ([95cb242](https://github.com/Open-Study-College/osc/commit/95cb2423b29f3c2fd18b883153a68197ac03b454))
* **collection:** add theme and featured image to collection settings ([8ce7bc5](https://github.com/Open-Study-College/osc/commit/8ce7bc527c60721ba435c630bc1ec247b7316276))
* **collection card:** pull image settings from Sanity ([2488257](https://github.com/Open-Study-College/osc/commit/24882572c1c0bcb596af5e1241ebb71530e60951))
* **content media:** adds image styles ([4a788b7](https://github.com/Open-Study-College/osc/commit/4a788b754ed8cb0bbb489cdfd5d00b85c469f8dd))
* **hero:** adds image styles ([e1d3113](https://github.com/Open-Study-College/osc/commit/e1d311336281b75c2b0c628594120be7cc8063d7))
* **image:** adds image styles to Image Modules ([bd0f15b](https://github.com/Open-Study-College/osc/commit/bd0f15bc4535faf900a1cff53ff32938c89de049))
* **studio:** add theme controls to post ([321adf4](https://github.com/Open-Study-College/osc/commit/321adf42108b4d53b1327187482648ff0722092b))
* **studio:** adds css image controls to image object in Sanity ([c302e8f](https://github.com/Open-Study-College/osc/commit/c302e8fc72b9972813ffaeb5c63c35c329a4e83f))
* **video:** add image styles to video player preview image ([afd4c80](https://github.com/Open-Study-College/osc/commit/afd4c80472f5e334f96afab80bb9704e912cd569))


### ♻️ Refactors

* **cards:** add condition to only load image if image src is truthy ([c039b17](https://github.com/Open-Study-College/osc/commit/c039b17e3fd9943b85376fe762b605ed7f6160f7))
* **cards:** adds optional chain to heroData ([5cdb45e](https://github.com/Open-Study-College/osc/commit/5cdb45e222f607d219866dceb0b1f3c52b51b30e))
* **cards:** apply mix-blend-mode to featured card ([28782d9](https://github.com/Open-Study-College/osc/commit/28782d9818ec2cc15197cfc0d798334e31f209a9))
* **studio:** move theme into it's own object ([336ba05](https://github.com/Open-Study-College/osc/commit/336ba05af483111b2db963e6a3f95a022eaa592c))
* **studio:** remove background colour option from card ([bdb1f98](https://github.com/Open-Study-College/osc/commit/bdb1f985f6c1529f84dab38f1d96ee55ca3a30c3))

## [0.88.0](https://github.com/Open-Study-College/osc/compare/v0.87.0...v0.88.0) (2023-05-16)


### ✨ Features

* add Forms component into ContentMedia ([2ec9f6a](https://github.com/Open-Study-College/osc/commit/2ec9f6aea79945e900ccd17193dfa2460930c864))


### ♻️ Refactors

* add early return if card does not exist ([1db3007](https://github.com/Open-Study-College/osc/commit/1db30071a804ecb5e13a5694d8cd252d81a579d5))
* add new layout options to ContentMedia in Sanity ([afc23eb](https://github.com/Open-Study-College/osc/commit/afc23eb87eceeb980c7aef00176fbe7871503f86))
* add o-container to forms conditionally ([00ea814](https://github.com/Open-Study-College/osc/commit/00ea814341a6b3deb92887307548bc6ba631aea6))
* add optional chaining ([10c9430](https://github.com/Open-Study-College/osc/commit/10c943072eb36b3fdf63c4627b976bbedb722e5e))
* correct returns from map function ([43425e9](https://github.com/Open-Study-College/osc/commit/43425e9ad4b01c7f10723a2650ea9af053dc287f))
* create custom spacing when there is a form ([ecd22db](https://github.com/Open-Study-College/osc/commit/ecd22db26d3999777426090c590cfbed9e3790e6))
* update groq query to split out formName and formId ([e1fcc76](https://github.com/Open-Study-College/osc/commit/e1fcc76c48e0863a43e3d4ba7aed25797352a59d))

## [0.87.0](https://github.com/Open-Study-College/osc/compare/v0.86.4...v0.87.0) (2023-05-16)


### ✨ Features

* add remix routes for awards and create Sanity query ([8df0759](https://github.com/Open-Study-College/osc/commit/8df0759846f240525087f9e7edeb96e089ae2b2f))


### ♻️ Refactors

* add "award" to "includeTypes" in config.ts ([4df1e48](https://github.com/Open-Study-College/osc/commit/4df1e484dcd73ccf3c493fbb9bc08432b8ecf858))
* correct paths ([ab24d0a](https://github.com/Open-Study-College/osc/commit/ab24d0af5cd1af57cb2da86def8e4af5492688bb))
* update title ([90b9162](https://github.com/Open-Study-College/osc/commit/90b91629fd4c67c396dcd74a6f3a38599172cb7f))
* update type to "award" and cascade changes ([050591b](https://github.com/Open-Study-College/osc/commit/050591bae3ff5b27c1735a88a419128c5347fb2f))
* updates to ensure cms users can preview pages ([9aa5b50](https://github.com/Open-Study-College/osc/commit/9aa5b50cc5524dced2002cf546f975c5d027ec0b))

## [0.86.4](https://github.com/Open-Study-College/osc/compare/v0.86.3...v0.86.4) (2023-05-16)


### 🐛 Bugs

* add return statement ([fca68f9](https://github.com/Open-Study-College/osc/commit/fca68f99c86e3fda30dcaa70a187c856e445377c))
* return true from validation when contentBody is undefined ([2b25b29](https://github.com/Open-Study-College/osc/commit/2b25b29251c774f42fc4c2fca3055c1d654764f0))


### ♻️ Refactors

* add 'o-container--full' class ([8d8323e](https://github.com/Open-Study-College/osc/commit/8d8323e5f07bf71bd229edd10d38fe717d48cfc6))
* set "flush" class when fullWidth is set to true ([031d36a](https://github.com/Open-Study-College/osc/commit/031d36a15c4ba876b41897f56825aa97f7c0cb9c))

