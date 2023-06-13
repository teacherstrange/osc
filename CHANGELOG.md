## [0.107.0](https://github.com/Open-Study-College/osc/compare/v0.106.1...v0.107.0) (2023-06-13)


### ✨ Features

* add docker compose file so we can test docker locally ([c63afa1](https://github.com/Open-Study-College/osc/commit/c63afa13b4e6e682943cc9733da3edc547c3b4d6))
* add reusable workflows to deploy prod and preview apps ([f0706cd](https://github.com/Open-Study-College/osc/commit/f0706cda53edb5ea61da88771ab585dca28dc6d3))
* add workflow to destroy preview apps ([39cc659](https://github.com/Open-Study-College/osc/commit/39cc659b8c09fcfa5e1209e3eb1eb86f585b8cc3))
* add workflows to call reusable workflows based on certain conditions ([7cdfe7a](https://github.com/Open-Study-College/osc/commit/7cdfe7a2c8d11b8a5ec5cbfde69221fbbd419be7))


### 🐛 Bugs

* disable seo pane ([301f27e](https://github.com/Open-Study-College/osc/commit/301f27e724c5eb187deae70c11bde169c5399aec))


### ♻️ Refactors

* add a separate tests workflow ([1e25dbd](https://github.com/Open-Study-College/osc/commit/1e25dbdebec797971edcadaf4abc604ff99bcd62))
* add correct datasets to ecommerce environments ([5bab8ca](https://github.com/Open-Study-College/osc/commit/5bab8ca848bf9c811765e9e0b2fb11dcbfed544c))
* add planetscale actions to individual workflows ([ec88733](https://github.com/Open-Study-College/osc/commit/ec8873342b2c25cf0057509d5d035f68cb50db6c))
* add safety conditions to allow apps to run without menus ([f7cdc93](https://github.com/Open-Study-College/osc/commit/f7cdc9346deeb2c8e0ebab044dd34409c43766ba))
* move dockerfiles into packages ([c3694f0](https://github.com/Open-Study-College/osc/commit/c3694f0879e61d3dde4a9605621e1011907e58b9))
* move nx packages into prod deps so we can use to run in docker ([1d89f79](https://github.com/Open-Study-College/osc/commit/1d89f793bf02d47b015f07dfb4d20109cdea9adc))
* remove composite actions ([dafc85f](https://github.com/Open-Study-College/osc/commit/dafc85f23fc4fe97e243f434442389e4da1006b0))
* remove pr toml files ([5c1fe77](https://github.com/Open-Study-College/osc/commit/5c1fe7725ad562cebfb6c1ba3b67e00b1f2f5e67))
* remove workflow files ([0648811](https://github.com/Open-Study-College/osc/commit/0648811ed70498e6211ee255bd485d4bf0036bf9))
* replace fetch with nx-set-sha action ([b40d9cc](https://github.com/Open-Study-College/osc/commit/b40d9cc1100e24d71350aad52d2c843869286b29))
* update chromatic workflow to work without actions ([fb044a2](https://github.com/Open-Study-College/osc/commit/fb044a29ad51625dc933e531d0990bc328c215a5))
* update pr branch name ([f11f63d](https://github.com/Open-Study-College/osc/commit/f11f63d180b9cf7071a0257e3db606df31233656))
* update studio start script to run the server ([fc16fc4](https://github.com/Open-Study-College/osc/commit/fc16fc4931ba5f1312546ca86810903757e20fa1))


### 📦 General Housekeeping / Package Updates

* remove unused cancel script ([aa7a7ad](https://github.com/Open-Study-College/osc/commit/aa7a7ad7808d6767ad579b8cf20f8d6a69a5571d))
* update README with ci/cd details ([4fc3ff7](https://github.com/Open-Study-College/osc/commit/4fc3ff7e23a99a771504e3a4e8ffd3288e0d476e))

## [0.106.1](https://github.com/Open-Study-College/osc/compare/v0.106.0...v0.106.1) (2023-06-13)


### 🐛 Bugs

* pass the query through as the value for the TextInput ([0f1f42d](https://github.com/Open-Study-College/osc/commit/0f1f42d114eda043d67c91bfc516c0b069ee7e05))

## [0.106.0](https://github.com/Open-Study-College/osc/compare/v0.105.0...v0.106.0) (2023-06-12)


### 🐛 Bugs

* spread props and pass to Content to stop classNames from getting overridden ([425af24](https://github.com/Open-Study-College/osc/commit/425af245b698f4e2c6c7ed1f9ac2d4c0323d3056))


### ✨ Features

* add basic setup and some Widgets ([d687b10](https://github.com/Open-Study-College/osc/commit/d687b102286bd848683fddd63b732fc2cd7c962e))
* add ClearRefinements widget ([bc83235](https://github.com/Open-Study-College/osc/commit/bc832359d6abc37cc43ed3276e9cd97b32c1078d))
* create client side getClient file for Sanity requests ([a39c4b6](https://github.com/Open-Study-College/osc/commit/a39c4b6bdcced57f2018b7ffd428524b268aec18))


### ♻️ Refactors

* add accordion and slider labels ([a0e2d84](https://github.com/Open-Study-College/osc/commit/a0e2d84a0f7e3a8b29a90cadde53bed24ab74b99))
* add check on setExternalValue ([7145c29](https://github.com/Open-Study-College/osc/commit/7145c292f751ce40af0217ac7ee4a557eb4d3a35))
* add className prop to Label component ([1471b94](https://github.com/Open-Study-College/osc/commit/1471b94bf7c6735a6dabaab2cede56160b73602e))
* add className to description prop and add gap to trigger for tertiary modifier ([5deeb30](https://github.com/Open-Study-College/osc/commit/5deeb300a9ebe57f76fd563e831a7288ab666443))
* add className to sliderClasses ([84838ec](https://github.com/Open-Study-College/osc/commit/84838ecbeb39287d36cb5fb106c578edc55cad09))
* add CollectionCards and rename primary/grouped_by indexes ([07350db](https://github.com/Open-Study-College/osc/commit/07350dbab6507d6e0f9ec5002473119d3d64e5f2))
* add comment ([acd3209](https://github.com/Open-Study-College/osc/commit/acd32091f6b05956b65b9631574e62269578564c))
* add comment on uniqueProductVariants function ([a577012](https://github.com/Open-Study-College/osc/commit/a57701216facfa45179898c29dcf99382bc439f3))
* add const assertion ([961cfa3](https://github.com/Open-Study-College/osc/commit/961cfa3a36737c9c3d0f9da041b37c48bb017b4a))
* add container-width-3xs and update Search component to use this ([cedd479](https://github.com/Open-Study-College/osc/commit/cedd4791ff4a02bfc5f8a53f261e34a1e698d38a))
* add display count option to Checkbox ([4fa4e59](https://github.com/Open-Study-College/osc/commit/4fa4e591769ef32b0ee4c6eb35ecb99878c9edf4))
* add Highlight to Hit component ([ac088fe](https://github.com/Open-Study-College/osc/commit/ac088fe317f1754ff213e8ecb26e656e806d7f35))
* add link for CollectionCards ([20d3c56](https://github.com/Open-Study-College/osc/commit/20d3c5665ee7d010216dd7c1085fcb0fa7f6c9dc))
* add NoResult component ([218ec3a](https://github.com/Open-Study-College/osc/commit/218ec3a2ac96a2aadc7e8b5721c7da85ea788414))
* add product hitsPerPage as env_var ([b770cb5](https://github.com/Open-Study-College/osc/commit/b770cb5a55e82283bff87c856d6ce27244b88734))
* add RefinementList components to search route ([6f730c2](https://github.com/Open-Study-College/osc/commit/6f730c29c39b68700a998b85c8dfc66e8f1916b4))
* add RefinementSlider ([f9013b9](https://github.com/Open-Study-College/osc/commit/f9013b911de08124fd24c7331d9d64714432b48d))
* add SearchBox, refactors to tidy up files, and styling adjustments ([acc3408](https://github.com/Open-Study-College/osc/commit/acc3408a4710ebca1489102fed058c3031d638c4))
* add setExternalValue prop nad pass to onValueChange ([e7602aa](https://github.com/Open-Study-College/osc/commit/e7602aa1239a8b5f30a86dbaee108b241715d3d7))
* add sortby and listby code, refactor collections to use correct index & remove Browse api ([8e83c41](https://github.com/Open-Study-College/osc/commit/8e83c4115bae2cfb98f06913ee6467ba357bcfab))
* add SpriteSheetProvider back in and remove redundant type ([f901acf](https://github.com/Open-Study-College/osc/commit/f901acff6e7dd8e0b3409aa8b7cecdd64f679e4e))
* add styling tweaks ([9222462](https://github.com/Open-Study-College/osc/commit/9222462e2bad7f2c668f771f358cf040d3dcfe95))
* add tweaks to CourseCard to correct layout ([dbc703c](https://github.com/Open-Study-College/osc/commit/dbc703c6b95990491269234f735fd25b853044b4))
* add uniqueId for checkbox ids ([6701ec6](https://github.com/Open-Study-College/osc/commit/6701ec6ece839f5c92022ec97222dd73c5c43b26))
* allow props to be optional ([8797d83](https://github.com/Open-Study-College/osc/commit/8797d83d8cff22834566880e07f6b0f2afa9c8ad))
* combine sanity/algolia data and integrate into existing CollectionCard component ([5e1c954](https://github.com/Open-Study-College/osc/commit/5e1c954d45d3bfb736baa620f25e559d28122171))
* correct description of prop ([d6c4dc4](https://github.com/Open-Study-College/osc/commit/d6c4dc4b1fb4ac4242fc5e005849e96612be9cc9))
* correct name of prop ([22f6861](https://github.com/Open-Study-College/osc/commit/22f68611d398fd5511f1cdcaee27225a181fdab2))
* correct styling on CollectionCards ([feebe0c](https://github.com/Open-Study-College/osc/commit/feebe0cbc7e839055bf2a055ddf836ce20956887))
* enable value of checkbox to be set from outside the component and make it controlled ([180db7d](https://github.com/Open-Study-College/osc/commit/180db7d10b9bee06df56760ff56bd43229b93db1))
* fix slider by adding local state back in and a prop for setting external state ([e436c27](https://github.com/Open-Study-College/osc/commit/e436c27e56dddd70cc2f81da85c8a8763d842a57))
* if TextInput is quaternary variant, move icon outside of input container div ([e289b15](https://github.com/Open-Study-College/osc/commit/e289b15e6419148c1dfd2d5680b58e3719059c9b))
* increase icon size ([ecf95b9](https://github.com/Open-Study-College/osc/commit/ecf95b90581f669411288f27d3f6a03ddc32b1b1))
* increase padding for Slider ([e28ee96](https://github.com/Open-Study-College/osc/commit/e28ee9638e075023d2957f577bc95d0cb64815a3))
* move components into Refinements folder ([5d006fb](https://github.com/Open-Study-College/osc/commit/5d006fbaaa6558cf9ca564c35df660f58af88732))
* move Search page route up a level ([f57383f](https://github.com/Open-Study-College/osc/commit/f57383f549790502d81f9803b8a804b8b794e886))
* refactor out some components to make return JSX  more DRY and clean ([657988f](https://github.com/Open-Study-College/osc/commit/657988f88d2afc29bfffa20d0b65fc97b6466aea))
* remove "count" out of Checkbox and incorporate directly in RefinementList ([072b5af](https://github.com/Open-Study-College/osc/commit/072b5af095557dca399d08c3f8c6491a778e565a))
* remove console log ([d15fa35](https://github.com/Open-Study-College/osc/commit/d15fa359666cbf8c9c0af09263145d16a5687708))
* remove margin and increase size of accordion header ([8c0bfbd](https://github.com/Open-Study-College/osc/commit/8c0bfbd12a30e078fc3d1bc14865e677b2413612))
* remove onSale code from SortBy component ([cfd340c](https://github.com/Open-Study-College/osc/commit/cfd340c419e70a6a7ab312fe2aca661fea5fa776))
* remove redundant code ([d732f6a](https://github.com/Open-Study-College/osc/commit/d732f6a2faa705ddd2d99c07a9bd13aee4350cd6))
* remove wrapping divs ([6a0dd66](https://github.com/Open-Study-College/osc/commit/6a0dd66b1a1b3b5b275a3df8061d5671c64645b6))
* set gridview to full grid width [@tab](https://github.com/tab) breakpoint ([d9a90e0](https://github.com/Open-Study-College/osc/commit/d9a90e0c9c142e7c6f220407e9a0d3d442935c04))
* set view to list/grid respectively when isGreaterThanTab is true ([c8f1df5](https://github.com/Open-Study-College/osc/commit/c8f1df53179d1fc766ddc81d426cbac6041c53c1))
* show "for" conditionally when there is a query ([bcfd6ee](https://github.com/Open-Study-College/osc/commit/bcfd6ee79dee3652546520e7e9d4593cc713a94b))
* show results list regardless of query ([ccebc6d](https://github.com/Open-Study-College/osc/commit/ccebc6dab9cb1e0fe2f0e7214c2c908c91f6b158))
* tweak name of sortby options and set a default ([49c25e9](https://github.com/Open-Study-College/osc/commit/49c25e9e5a1d667cb708f2173b147024b8aeeaac))
* tweaks to media query conditions for o-containers ([489b852](https://github.com/Open-Study-College/osc/commit/489b852e8ec90576091f600a3f9d3cb454a73a14))
* update button to link to the correct course path ([99694f3](https://github.com/Open-Study-College/osc/commit/99694f3c8d2e83c9f87bc998346485205d4ac5fc))
* update env.sample ([0420361](https://github.com/Open-Study-College/osc/commit/04203616e62d60a8d114bf152448b7ab9a8d3bb1))
* update query and resulting image data compilation ([bf7fa21](https://github.com/Open-Study-College/osc/commit/bf7fa21c7b7cc1400549b2ff26b3771f03e32000))
* update Slider to pass useState into the component ([58dab70](https://github.com/Open-Study-College/osc/commit/58dab70c4de650dc6b55f089361d9d8a01ee4647))
* update title names for Refinement data ([86aa0bd](https://github.com/Open-Study-College/osc/commit/86aa0bd8eb83416269540c70dfa6e3919aa174b2))
* use "sm" size variant in Price component ([f987d60](https://github.com/Open-Study-College/osc/commit/f987d60e95624c3824d8abb19aac84821d0ca45c))
* wrap CardTitle in span and add flex/max-width properties ([e7644a9](https://github.com/Open-Study-College/osc/commit/e7644a9b9a6daae03b6fcc3cc30f34863bc197a5))

## [0.105.0](https://github.com/Open-Study-College/osc/compare/v0.104.0...v0.105.0) (2023-06-09)


### ✨ Features

* **cart:** adds buyer id mutation to cart ([c60f6cb](https://github.com/Open-Study-College/osc/commit/c60f6cb13656bd71ec11daac97506e308d00d7f4))
* **cart:** adds function to update buyer id ([4042e4f](https://github.com/Open-Study-College/osc/commit/4042e4fc153305d28ba25dfdf4c6a0b14c6bce2e))
* **cart:** wrap buyer id in try catch ([91377f4](https://github.com/Open-Study-College/osc/commit/91377f4a3cc075eb97f17907dce1b27f6a67e90a))

## [0.104.0](https://github.com/Open-Study-College/osc/compare/v0.103.1...v0.104.0) (2023-06-09)


### 🐛 Bugs

* **ecommerce:** update tests to match new data ([aff4acf](https://github.com/Open-Study-College/osc/commit/aff4acff2cfcee693c02305ed49675926d9e308e))
* **hero:** make sure content width always fills the space ([c1066d6](https://github.com/Open-Study-College/osc/commit/c1066d60898cea2d2cd43fd35777eb5dd69ca73d))
* **modules:** adds missing key prop ([0da4600](https://github.com/Open-Study-College/osc/commit/0da4600a2c033f9b6f996abe3e13873b9d177d93))
* **tests:** update mock test data ([b79e963](https://github.com/Open-Study-College/osc/commit/b79e963032292380faf6955b1dea956142f298e1))


### 📦 General Housekeeping / Package Updates

* update theme type ([9095e26](https://github.com/Open-Study-College/osc/commit/9095e263ec87a70565888386065c8dd616945e56))
* **row:** fix typo ([2cd5ca0](https://github.com/Open-Study-College/osc/commit/2cd5ca0e8c9818f9efb9bef217d800c9f703a6f8))
* **sanity:** add description to row settings ([28d314c](https://github.com/Open-Study-College/osc/commit/28d314c6962f01d330f0c378bccb225adeec73c2))


### ✨ Features

* **accordion:** wrap component in row ([4f7e069](https://github.com/Open-Study-College/osc/commit/4f7e0698209653a320a81c35da4890da5c6da1e4))
* **carousel:** add row wrapper to carousel ([a570e33](https://github.com/Open-Study-College/osc/commit/a570e336df736c92190012026da80f591d467e20))
* **row:** add default spacing to row ([3eb0aad](https://github.com/Open-Study-College/osc/commit/3eb0aadd52520141de2618b33309da7ca0b843be))
* **types:** update sanity types ([380cc82](https://github.com/Open-Study-College/osc/commit/380cc829c2f3ee6c0eb5f431e8c8a315ddb19cbf))
* remove outdated inner content component props ([dc9f6ac](https://github.com/Open-Study-College/osc/commit/dc9f6ac035a326b0bfa29cde39e8e19de12e14c4))
* **accordion:** add isFlush prop ([ba03069](https://github.com/Open-Study-College/osc/commit/ba0306910fc8bf4f1a323f167b75461cab8217fe))
* **accordion:** add row settings to accordion schema ([411b1b4](https://github.com/Open-Study-College/osc/commit/411b1b4e9d104d9494e4b15307dd3488813f1e99))
* **cards:** add row to cards component ([c838569](https://github.com/Open-Study-College/osc/commit/c838569fecce2c88945345494ba874584ffca569))
* **content:** adds row settings to content module ([ade4a9c](https://github.com/Open-Study-College/osc/commit/ade4a9c9121c9b8d76955be3323727423914a140))
* **content:** remove spacing and background colour from component ([31332fb](https://github.com/Open-Study-College/osc/commit/31332fb5787a837f15037ab13a23ae93e715aac3))
* **content media:** add row wrapper to carousel ([490f691](https://github.com/Open-Study-College/osc/commit/490f6915b3d0ebb41f96b626e27c3acdbbffd623))
* **forms:** add background colour to form ([c022ec3](https://github.com/Open-Study-College/osc/commit/c022ec3b0e54dbb6e86913c08a8bfdf31b5171b9))
* **forms:** add row settings to form module in sanity ([78c34f8](https://github.com/Open-Study-College/osc/commit/78c34f89482caa9486a1dd04b1ecc99d888e9824))
* **image:** add row settings to image ([f504edb](https://github.com/Open-Study-College/osc/commit/f504edb467e1d33f117622c158d629cfb3057311))
* **recommended products:** add row wrapper to recommended products ([5900efd](https://github.com/Open-Study-College/osc/commit/5900efd7bd48cea26b5c979ca0533409dde64b50))
* **row:** adds row component ([5495a09](https://github.com/Open-Study-College/osc/commit/5495a094e3769ab1de5fb7acbb201d3f88fab86f))
* **row:** adds row settings schema to sanity ([5ed0577](https://github.com/Open-Study-College/osc/commit/5ed05777725da3712b11534122b9ecdd13dfdcd5))
* **row:** adds slot from radix to ecommerce ([2fa49b8](https://github.com/Open-Study-College/osc/commit/2fa49b865ab1e30505e22dd147224a51b145220b))
* **tabs:** add isFlush prop ([1e5cf43](https://github.com/Open-Study-College/osc/commit/1e5cf43f7115f27c87dd997bbd4af8b93f838bae))
* **tabs:** add row wrapper to tabs ([fce406c](https://github.com/Open-Study-College/osc/commit/fce406c22f947e4a22c13b77e0d799593c826e50))
* **text grid:** add row settings to text grid ([03d138d](https://github.com/Open-Study-College/osc/commit/03d138d860185fa91f0e20f52e567d39fe8b0212))
* **video:** add row settings to video ([559330e](https://github.com/Open-Study-College/osc/commit/559330e1824149e7eb90c88f7205c20329db6007))


### ♻️ Refactors

* **content:** move content into own file and wrap with row component ([681f6e8](https://github.com/Open-Study-College/osc/commit/681f6e85ee81bd8e4225a2a9b8f55e1e3f2ee6eb))
* **forms:** add forms module component ([9ba7b2a](https://github.com/Open-Study-College/osc/commit/9ba7b2aede45dd89643e1a392fc585a21edf4e90))
* **image:** move image into image module component ([c67bf6c](https://github.com/Open-Study-College/osc/commit/c67bf6c9e935b34ceaccc6a099187998bc9bf64e))
* **row:** bottom margin from row block selector ([9ee8b8f](https://github.com/Open-Study-College/osc/commit/9ee8b8f19dcd3ca765af9324508e0135b022d822))
* rename settings to rowSettings to avoid conflicts ([3ce499d](https://github.com/Open-Study-College/osc/commit/3ce499d09ce1b5290a744ccee15af046d7089281))

