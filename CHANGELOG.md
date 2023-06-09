## [0.103.0](https://github.com/Open-Study-College/osc/compare/v0.102.0...v0.103.0) (2023-06-09)


### 📦 General Housekeeping / Package Updates

* **cart:** remove unneeded comment ([97d7318](https://github.com/Open-Study-College/osc/commit/97d73188ca98108b90a074742bbebd2dcdebf34d))


### ✨ Features

* **cart:** add discount codes list to discount box ([efcd8b6](https://github.com/Open-Study-College/osc/commit/efcd8b661268c5d55a86539b68121e42fd0200a6))
* **cart:** add discounted values to cart total ([9f11c1f](https://github.com/Open-Study-College/osc/commit/9f11c1fbc8cfe11858ac1276064ae1efe4c97103))
* **cart:** add functionality to toggle the discount box open and closed ([05b329d](https://github.com/Open-Study-College/osc/commit/05b329dbc17a95cab9962e08ecb611c870b5b7bc))
* **cart:** add functionality to use multiple discount codes ([58c2f28](https://github.com/Open-Study-College/osc/commit/58c2f28a9c9bdd561b1ad582ea504007dcbeec17))
* **cart:** add pending states for discount code updates ([0bdaaae](https://github.com/Open-Study-College/osc/commit/0bdaaaebf09acbc0bd228831a96bdeaca60c7c00))
* **cart:** add some bottom padding to the discount box to account for button shadow ([ba470c0](https://github.com/Open-Study-College/osc/commit/ba470c02bfb05c8f2d3c51ca468309cd8266c076))
* **cart:** add styling for discount code list buttons ([964c36b](https://github.com/Open-Study-College/osc/commit/964c36b6bdd3e560fefb1fdf21b1374e93aa9f9d))
* **cart:** adds function to add a discount code ([2fb1196](https://github.com/Open-Study-College/osc/commit/2fb11960b951db24cbe00581d12943e8cc7799e7))
* **cart:** disable discount button until a value is added to the input ([5551d57](https://github.com/Open-Study-College/osc/commit/5551d57884a1454e14a80f9ea5207a249717b8a6))
* **cart:** disable discount button when pending ([9eaa878](https://github.com/Open-Study-College/osc/commit/9eaa878ae685d35cccd70ef55786ca9216512c57))
* **cart:** ensure we remove duplicate discount codes ([7f1aebe](https://github.com/Open-Study-College/osc/commit/7f1aebe5130c69bc21ee3b289160033da113a8ec))
* **cart:** import discount box component ([1fd306a](https://github.com/Open-Study-College/osc/commit/1fd306a90ec34a00dff6b1940d589e6326486496))
* **cart:** import discount box styles and dependant styles ([a33bac4](https://github.com/Open-Study-College/osc/commit/a33bac40c5ca6871c99b91027512cdb48982c2b2))
* **cart:** move discount box component and styles into own sub directory ([8d42e92](https://github.com/Open-Study-College/osc/commit/8d42e923151a76e40001d4c3bb98eeaeb06f537a))
* **cart:** transform codes to uppercase to avoid duplication ([5576df3](https://github.com/Open-Study-College/osc/commit/5576df3893afa0505bf9447a477da50117aae611))
* **cart:** update input to be controlled by state ([1c5da73](https://github.com/Open-Study-College/osc/commit/1c5da739b3ffe555aefb41c158738090732335d3))
* **discount:** add discount code component ([bae71a5](https://github.com/Open-Study-College/osc/commit/bae71a50bb512c279ca158c95a54088a67525c22))
* **text input:** allow custom classname prop to pass into input ([da35093](https://github.com/Open-Study-College/osc/commit/da35093a03e8ff890ad9a6cce84fb4d2bb60a427))


### ♻️ Refactors

* **cart:** add custom breakpoint to fix form wrapping ([34a0067](https://github.com/Open-Study-College/osc/commit/34a0067a0a4df4e67cb73ed1198739c691e82605))
* **cart:** update discount box styles to remove background colour ([abfd587](https://github.com/Open-Study-College/osc/commit/abfd587d863ead30ad2afec10898e37a2e316d47))
* **cart:** wrap discount action in try catch ([9ddb671](https://github.com/Open-Study-College/osc/commit/9ddb671a85ae7b788d2da770d96d7c7f0e19c224))
* **line item:** allow line items to wrap ([f711afc](https://github.com/Open-Study-College/osc/commit/f711afc910fec362a2b8ff7b8a2c46e2fda0be8a))
* **price:** extract selectedVariant into different props ([91e4580](https://github.com/Open-Study-College/osc/commit/91e4580206b11a1612cfcb427f90be51680ec2a5))

## [0.102.0](https://github.com/Open-Study-College/osc/compare/v0.101.0...v0.102.0) (2023-06-09)


### ✨ Features

* **cart:** add helper function to update the cart line items ([cc70d13](https://github.com/Open-Study-College/osc/commit/cc70d136ccabfaf146e0db19a17d3b62b64d610b))
* **cart:** add mutation to update the cart line items ([8c8b027](https://github.com/Open-Study-College/osc/commit/8c8b027800d9f50dd44218b4486cd9d32655ce21))
* **cart:** add product query to get the selected variant id ([33d00e9](https://github.com/Open-Study-College/osc/commit/33d00e99e55a5b405aab141f5963233e34f46051))
* **cart:** add remove from cart function ([d4edbd7](https://github.com/Open-Study-College/osc/commit/d4edbd7f393d6cd19681f41d0deb63f1d5aaa57e))
* **cart:** add update cart action to pending line ids array ([9d76060](https://github.com/Open-Study-College/osc/commit/9d760606248aa367aa76042826818685596a769d))
* **cart:** adds form to the cart card item options ([d98932d](https://github.com/Open-Study-College/osc/commit/d98932d349a64fa474ba03a60f336dc3bbb8e89c))
* **cart:** adds update cart function to cart action ([5def8fc](https://github.com/Open-Study-College/osc/commit/5def8fc3c09789ba1f3fb21d7793c1181b6a0c94))


### 🐛 Bugs

* **cart:** remove duplicate action ([07e8f7a](https://github.com/Open-Study-College/osc/commit/07e8f7adba753872c4f61e14fb41994b1d13f1cc))


### ♻️ Refactors

* **cart:** wrap update action in try catch ([89c6434](https://github.com/Open-Study-College/osc/commit/89c643484ad911fa77bb01fe36aa0b42a4d57e9f))

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

