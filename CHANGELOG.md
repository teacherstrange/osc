## [0.101.0](https://github.com/Open-Study-College/osc/compare/v0.100.0...v0.101.0) (2023-06-08)


### ♻️ Refactors

* **add to cart:** move add to cart into cart actions directory ([c43db65](https://github.com/Open-Study-College/osc/commit/c43db6572e6156b43738d28cea96413857bf86e7))
* **product form:** replace is-loading class with data-anim ([0a97170](https://github.com/Open-Study-College/osc/commit/0a971707e12104d7a3021defad8c574a7f3ea0a0))


### 📦 General Housekeeping / Package Updates

* **cart:** group pending line functions ([08826b2](https://github.com/Open-Study-College/osc/commit/08826b24bbd039fa7229cc3fbb7fe8fd19c7150c))


### ✨ Features

* **alert:** adds an alert component to display a generic error message ([ca511d9](https://github.com/Open-Study-College/osc/commit/ca511d96160b08ee87e97fe6835d5eb36d138376))
* **cart:** add error log to the ErrorAlert component ([221eab6](https://github.com/Open-Study-College/osc/commit/221eab6c56650ad1de5b4d056a5aef4506c53023))
* **cart:** add error message if fetcher returns with an error ([fcb1aff](https://github.com/Open-Study-College/osc/commit/fcb1affb97d7139d11a321fcdd70fe2f53e17ff5))
* **cart:** add fallback errors from action ([26cb635](https://github.com/Open-Study-College/osc/commit/26cb635678fdfd7c8d5b518a6ee4f7b75e0e1006))
* **cart:** add loading prop to cart components ([a4c9044](https://github.com/Open-Study-College/osc/commit/a4c90449b594990a9669c22c67308ccb59a796e1))
* **cart:** add pending fetcher states ([d4ed59d](https://github.com/Open-Study-College/osc/commit/d4ed59db71a1c47257051e0425f4c1e50a3dbfbb))
* **cart:** add remove from cart form ([f7c2a0c](https://github.com/Open-Study-College/osc/commit/f7c2a0c9bc7f1dff8524c866a29e8314a2d1040f))
* **cart:** add remove from cart function ([ea918b6](https://github.com/Open-Study-College/osc/commit/ea918b6293d9ef62b37f598e7f442d6165e9a6c8))
* **cart:** add removed from cart message component ([5f430f7](https://github.com/Open-Study-College/osc/commit/5f430f73da51b2c00b39bd31f74ee8439228c335))
* **cart:** disable remove button when fetcher is running ([e6343a5](https://github.com/Open-Study-College/osc/commit/e6343a5ac2012f5a63c75febc6ca7643639e2b64))
* **cart:** display remove line item message ([c79d5db](https://github.com/Open-Study-College/osc/commit/c79d5dba6ab48a0eaaebd859704380167aead41f))
* **cart:** wrap switch steps in try catch ([8ed5f7c](https://github.com/Open-Study-College/osc/commit/8ed5f7cf13ed897198c8a252a6f232b0697b4a48))
* **ecommerce:** add utility to remove marks from portable text ([df3269b](https://github.com/Open-Study-College/osc/commit/df3269b3e980d3473fc09194791a69299f8acb3c))
* **styles:** adds shimmer anim styles ([bd284e0](https://github.com/Open-Study-College/osc/commit/bd284e0a4bf86dbccdfa6ee8b22e626989f1c6a9))
* **util:** add utility function to compare array values ([e1f603a](https://github.com/Open-Study-College/osc/commit/e1f603a8e06a28651d165b1b8c06a894d057a425))
* **utils:** adds util to check if a fetcher is in a pending state ([65a1047](https://github.com/Open-Study-College/osc/commit/65a10477acf786351db3bedfcd2a78053f7ea822))
* **utils:** adds utility to check if fetcher returns data with an error ([d917bd4](https://github.com/Open-Study-College/osc/commit/d917bd428d5b5d97adad657f26aea1a1255f92ae))

## [0.100.0](https://github.com/Open-Study-College/osc/compare/v0.99.0...v0.100.0) (2023-06-08)


### 🐛 Bugs

* **cart:** replace ID with index so key works ([eaf5be6](https://github.com/Open-Study-College/osc/commit/eaf5be6039e18411efd0a2376875db112d80cef5))
* **cart:** update check so we only try and display content if the body of the description is present ([6340c93](https://github.com/Open-Study-College/osc/commit/6340c939468bafd9713ca41996671797de2d908e))


### 📦 General Housekeeping / Package Updates

* **cart:** update variant syntax ([8a05d7a](https://github.com/Open-Study-College/osc/commit/8a05d7add0fbb830092515de62fa6c7ad5754250))
* remove console log ([36b4682](https://github.com/Open-Study-College/osc/commit/36b468205bda50f54ffbc2a5255e8783e4b4bd05))
* remove unused type ([2a445d7](https://github.com/Open-Study-College/osc/commit/2a445d7712f2afa88df9c34489dff31403d6a95d))


### 🧪 Tests

* **cart:** adds test for isGiftVoucher util ([6b0be13](https://github.com/Open-Study-College/osc/commit/6b0be13eb4affe5e936adaee69b7305dbe310145))


### ♻️ Refactors

* **cart:** move cart layout into own component ([5a67d09](https://github.com/Open-Study-College/osc/commit/5a67d09110a1ccbcc6a7b623f398514cb68a9a45))
* **cart:** move cart query into queries directory ([a061fa2](https://github.com/Open-Study-College/osc/commit/a061fa2d71ce7d96a7a011d15b11fdc6b1ce206f))
* **cart:** update which buttons are shown/hidden on mobile ([bd94242](https://github.com/Open-Study-College/osc/commit/bd94242d4f565e75a18e82048caaa2e14f2e71bd))
* **cart:** use smaller spacing class to account for p margin ([cb0c11a](https://github.com/Open-Study-College/osc/commit/cb0c11af3b3e065f3e421ffc7dba1d2d8bc444b4))
* **product form:** change existing item check to use product id ([fff19dc](https://github.com/Open-Study-College/osc/commit/fff19dce9ca15254b30c6c3a65980a6251f03572))


### ✨ Features

* **cart:** add background colour to cart page ([2736152](https://github.com/Open-Study-College/osc/commit/2736152ad69981fe17c5aee365113eb07eccf438))
* **cart:** add basic layout for the cart ([cee698c](https://github.com/Open-Study-College/osc/commit/cee698cc30473f8718cf1e71fa7fc83e78f0f650))
* **cart:** add cart cards ([38ee9ba](https://github.com/Open-Study-College/osc/commit/38ee9ba30ac4d9c97d2a0339f48f44d5878d95a6))
* **cart:** add description from sanity to card ([0d7115f](https://github.com/Open-Study-College/osc/commit/0d7115f7385f50f9df33720480929beb9a4628bb))
* **cart:** add empty cart message component to cart route ([d545bf3](https://github.com/Open-Study-College/osc/commit/d545bf3e4a7abded5cef525bac154ce5ee738103))
* **cart:** add empty cart message settings to sanity ([9e9e14d](https://github.com/Open-Study-College/osc/commit/9e9e14d639d111e947f2195eb741b3c9ef764889))
* **cart:** add flourishes to cart ([101796c](https://github.com/Open-Study-College/osc/commit/101796cf716eb9a6970ba9fe46c6998e2919b700))
* **cart:** add height auto utility to bring cart cards inline ([8f641a8](https://github.com/Open-Study-College/osc/commit/8f641a82a3696510e235319ae7b2fb858bc735ce))
* **cart:** add product options and sku to cart query ([4f98500](https://github.com/Open-Study-College/osc/commit/4f985000edead609a44914e6bc74cb2223ef8275))
* **cart:** add responsive classes and settings ([0eb94ba](https://github.com/Open-Study-College/osc/commit/0eb94baa4ce453fad36be25a91bfc724c64dca6e))
* **cart:** add spacing class to cards ([07e914c](https://github.com/Open-Study-College/osc/commit/07e914c6e613add7060ac720e4a95e55c60f6f30))
* **cart:** adds sticky utility class ([2539d87](https://github.com/Open-Study-College/osc/commit/2539d8791a1daeb18511c37ccca3a7bcb04b5902))
* **cart:** integrate line item commponent with cart ([497b6c8](https://github.com/Open-Study-College/osc/commit/497b6c88ab17dfc0901cec08cd9e6370416b70c4))
* **cart:** updates addLines function to exclude existing lines when adding to the cart ([be56e25](https://github.com/Open-Study-College/osc/commit/be56e2545c495ff51b9fb87e297932c8ac5568c0))
* **ecommerce:** add cart and wishlist to paths const ([a7a088a](https://github.com/Open-Study-College/osc/commit/a7a088a6048660cf284d0241a8affa51b66866c1))
* **ecommerce:** add utility to remove marks from portable text ([b121d86](https://github.com/Open-Study-College/osc/commit/b121d863c3cc581ccf22a95350c7f4b568a22c30))
* **ecommerce:** adds helper to add Sanity data into cart line item object ([56fc37e](https://github.com/Open-Study-College/osc/commit/56fc37e4473177bbfb2e41c35f49defc7a80c20c))
* **ecommerce:** adds utilities to get and set shopify ids ([a2b84b5](https://github.com/Open-Study-College/osc/commit/a2b84b59ce050a7912d577aa38be32b326c0e461))
* **line item:** export component from osc-ui ([11271d5](https://github.com/Open-Study-College/osc/commit/11271d54f76237a45ef74afdae324e3aaf65d77e))
* **product:** adds functionality to prevent adding multiple of the same courses ([96b566b](https://github.com/Open-Study-College/osc/commit/96b566bce146bf46f169214bbf01985bc89ae53c))
* **product:** adds product type to variant query fragment ([f48f2f4](https://github.com/Open-Study-College/osc/commit/f48f2f41272fa2cfbade9badbe54b3d618828630))
* **product:** pass conditional label to add to cart form ([65860ea](https://github.com/Open-Study-College/osc/commit/65860ea808148d674a124d990f696cd3e2f37088))
* **product form:** add message to form when product already exists in cart ([257439e](https://github.com/Open-Study-College/osc/commit/257439ed7a6cde04825878c3fa4d809bcb8ee009))
* **product form:** update added to cart message ([f580eb3](https://github.com/Open-Study-College/osc/commit/f580eb379005f3584307a0328b5c54c8f424cad0))
* **styles:** adds margin auto utility ([4fdf3ac](https://github.com/Open-Study-College/osc/commit/4fdf3ac0ef1fa79e7149864a4204629a7050de51))
* **utils:** adds helper function to check if product is a gift voucher ([cdda5f7](https://github.com/Open-Study-College/osc/commit/cdda5f71283be3006e52a1aae3cf4dba0d846911))

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

