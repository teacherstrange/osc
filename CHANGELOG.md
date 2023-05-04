## [0.86.0](https://github.com/Open-Study-College/osc/compare/v0.85.0...v0.86.0) (2023-05-04)


### 🐛 Bugs

* **drawer:** remove height property ([0045fdc](https://github.com/Open-Study-College/osc/commit/0045fdce003189adadcf741b6c7dea0c93dc372a))


### ✨ Features

* **button:** add hover styles to senary button ([1baaefc](https://github.com/Open-Study-College/osc/commit/1baaefc1da73057636394bf94005c8c6879b8565))
* **button:** add modifier to remove the gradient from the senary button ([321b3a5](https://github.com/Open-Study-College/osc/commit/321b3a5b9663b41f5b1ac801262ea8fb16b1bfeb))
* **drawer:** add innerClass prop to drawer content ([397f87a](https://github.com/Open-Study-College/osc/commit/397f87a0163d940e5686e8490ef9fe6f29e5d47a))
* **drawer:** export drawer from osc-ui ([8e9c8b8](https://github.com/Open-Study-College/osc/commit/8e9c8b89707a421c7221b78f28b19ddbe77b0a80))
* **ecommerce:** add ProductFormDrawer component ([1f76e65](https://github.com/Open-Study-College/osc/commit/1f76e65a4d317fd74efeb2442d11953db117480a))
* **ecommerce:** import drawer styles ([9174cd8](https://github.com/Open-Study-College/osc/commit/9174cd857e7f08e23126d8704bec4aa2d3d15f28))
* **product drawer:** add breakpoints ([a89d247](https://github.com/Open-Study-College/osc/commit/a89d24765acfa2272f2c73ba6a8bc490a0defe3d))
* **product drawer:** add classes to hide drawer trigger ([af2b38c](https://github.com/Open-Study-College/osc/commit/af2b38ca8dd1f2f65ef4c63ac116f912d5d1ef4d))
* **product form:** add ID prop so we can have two on a page ([39e1941](https://github.com/Open-Study-College/osc/commit/39e1941f49265e4e113d80c5e484ac31e774398d))
* **product form:** wrap form in forwardRef ([c0e13b5](https://github.com/Open-Study-College/osc/commit/c0e13b5ada310cede6c8b32db35a99aab90221a5))
* **product page:** add intersection observer and hide drawer when form is out of view ([86fcb48](https://github.com/Open-Study-College/osc/commit/86fcb48d41e07ec7731b4a1dd62069c6d1c2d3b0))
* **styles:** adds max-content width utility ([dd36d95](https://github.com/Open-Study-College/osc/commit/dd36d95c134d3c86574d40f4847fc8ac8e8ad14b))
* **ui:** export useIntersectionObserver hook from osc-ui ([e743704](https://github.com/Open-Study-College/osc/commit/e7437042aedf078d8c2a44c87acf35fcf8ff9947))


### ♻️ Refactors

* **button:** swap hover animation over to move icon instead ([2a6c6a8](https://github.com/Open-Study-College/osc/commit/2a6c6a8dde6bef21918ef3bd45c806de244ef5eb))
* **drawer:** adjust the offset heights ([f764015](https://github.com/Open-Study-College/osc/commit/f7640156cabd971ad3085c841c5eee2fd150e7e8))
* **drawer:** update size variants ([890f85b](https://github.com/Open-Study-College/osc/commit/890f85bb394d268730264187728702f1703adf9c))
* **product form:** add props to set the direction of the form border ([299e108](https://github.com/Open-Study-College/osc/commit/299e1083e180ed1ecf2c91e5a3c4f54dd3e19648))
* **product form:** move the radio group into it's own component and add dynamic key ([b89c0a0](https://github.com/Open-Study-College/osc/commit/b89c0a012036d653e6c1bac00da5bc9166b4b775))
* **product form:** remove props and extract product data from useLoader ([1868569](https://github.com/Open-Study-College/osc/commit/1868569aa42318907d86e05a71c362431fb7eb25))

## [0.85.0](https://github.com/Open-Study-College/osc/compare/v0.84.0...v0.85.0) (2023-05-04)


### 🧪 Tests

* **img:** add test to check for css transform classes ([784c417](https://github.com/Open-Study-College/osc/commit/784c4179e7d4b8aae14080b09a4a313a46f3f53e))


### ✨ Features

* **img:** adds css transform props/modifiers ([9206a3e](https://github.com/Open-Study-College/osc/commit/9206a3e78cbd4efe609e3106c753c57990b8b9b1))
* **img:** adds fit prop to position image fit ([fb75049](https://github.com/Open-Study-College/osc/commit/fb75049ffd8cc8a4bc0bd4b170abafd48ab70586))
* **img:** apply image mask to image when overlay is selected ([e62e3f9](https://github.com/Open-Study-College/osc/commit/e62e3f90c2e5f62a86efb29a9222f5b03c814635))
* **img:** update storybook ([4ae397b](https://github.com/Open-Study-College/osc/commit/4ae397b26889025cd66f836eca45771841a15efd))


### ♻️ Refactors

* **callout banner:** adjust o-img selector ([09d1c15](https://github.com/Open-Study-College/osc/commit/09d1c152c0e38830abf29390e104d01050443e54))
* **cards:** re-do card image selectors ([5619de2](https://github.com/Open-Study-College/osc/commit/5619de20e6e21550c16a341467403e000bba7577))
* **cards:** update img references in cards scss ([41f2c2f](https://github.com/Open-Study-College/osc/commit/41f2c2fd6a98c5c4bf57a0361311d764a71aec5a))
* **hero:** adjust o-img selector ([eb66e02](https://github.com/Open-Study-College/osc/commit/eb66e0289d4e16d990252558d5c7ad36ee7525b4))
* **video:** adjust o-img selector ([5ec32f8](https://github.com/Open-Study-College/osc/commit/5ec32f81db068cc5346d1a314e94b027e46a0e83))


### 📦 General Housekeeping / Package Updates

* remove unused variable ([bbd3fda](https://github.com/Open-Study-College/osc/commit/bbd3fdaef3d6058743395f52bdfd378b8671db0a))
* replace remix-oxygen imports with remix-node ([2d16cfd](https://github.com/Open-Study-College/osc/commit/2d16cfdb85e4dcc422eb931f3b9f6fbfe22d56fa))

## [0.84.0](https://github.com/Open-Study-College/osc/compare/v0.83.0...v0.84.0) (2023-05-04)


### 📦 General Housekeeping / Package Updates

* add PREVIEW_SESSION_SECRET example to README and env.sample ([9920e45](https://github.com/Open-Study-College/osc/commit/9920e4531b6c5a9f3be5ea0620e456d8bd7169fc))
* **ecommerce:** add /resources/preview to disallow list ([bc24464](https://github.com/Open-Study-College/osc/commit/bc244640ef914b7abfd28e5d6a496c6b8fb6e5c8))


### ♻️ Refactors

* **ecommerce:** move preview into it's own file and import using react.lazy ([8fa7d99](https://github.com/Open-Study-College/osc/commit/8fa7d99586fe9d92e2e90372fe82932e507fd7e9))
* **ecommerce:** remove custom preview components ([f0016d2](https://github.com/Open-Study-College/osc/commit/f0016d2e5a0fcc6070beda5f00908d5bca866854))
* **ecommerce:** remove groq-store and install preview-kit ([da17a98](https://github.com/Open-Study-College/osc/commit/da17a98b87deac10d84a6f880d924c66406928a9))
* **ecommerce:** remove need for token to be passed into preview ([3575259](https://github.com/Open-Study-College/osc/commit/35752595b660ea64c86e52ed09a2d82328d4e694))
* **ecommerce:** remove publicAccess property from config ([1af875a](https://github.com/Open-Study-College/osc/commit/1af875a79efe3590e6d9ae633e1fd587cd9b87c9))
* **ecommerce:** replace secret string with secret from env ([eaa64b7](https://github.com/Open-Study-College/osc/commit/eaa64b77e8dafda0ab7fa094d63c022d8f92c9c0))
* **ecommerce:** update getPageData to set preview based on session rather than url param ([6ec7d07](https://github.com/Open-Study-College/osc/commit/6ec7d070491b47ae988194617b7547a217e3d88c))
* **ecommerce:** update page preview component to allow more flexibility in returned component ([33ff548](https://github.com/Open-Study-College/osc/commit/33ff5481f467a45139ab9c1faa1e5fea13b281f4))
* **ecommerce:** update PageContent to named export ([ce813de](https://github.com/Open-Study-College/osc/commit/ce813deab7fc2fffc9a75432ad51f2fec76f168b))
* **ecommerce:** update preview mode checks to run as ternaries ([230bcc1](https://github.com/Open-Study-College/osc/commit/230bcc1677dd7dd5cc099e3569090212733c4077))
* **ecommerce:** update queries to remove drafts from request ([990f197](https://github.com/Open-Study-College/osc/commit/990f197a828d11b9391c415f4dced3acc1ba28d0))
* **ecommerce:** update route content to use page content and preview components ([aa27262](https://github.com/Open-Study-College/osc/commit/aa27262d3ba183292fa1a28a8d44c281db39bebe))
* **studio:** update resolveProductionUrl to point at preview resource route ([e38e7b3](https://github.com/Open-Study-College/osc/commit/e38e7b36b0c310ab70e60c9293ca5c25a79d1bf2))
* **types:** make upperContent of SanityProduct requried ([f7afbf2](https://github.com/Open-Study-College/osc/commit/f7afbf2c7aacaad7445e3bb7977dcdf1f9bbd312))


### ✨ Features

* **ecommerce:** add page upper content component ([9a5a317](https://github.com/Open-Study-College/osc/commit/9a5a317de527c24d94653a4e234bb10c6f3852d1))
* **ecommerce:** add preview session and resource route ([20ee18c](https://github.com/Open-Study-College/osc/commit/20ee18c31fb1a6c39f75ab867b6ef15d5e950081))
* **ecommerce:** create page content and setup preview components ([7edff2a](https://github.com/Open-Study-College/osc/commit/7edff2a903adac558e0cc47c8023b004d36baa26))
* **ecommerce:** create preview banner component ([8f1581c](https://github.com/Open-Study-College/osc/commit/8f1581c370ed9243329d5cd6bc8f2485a6cff2a0))
* **ecommerce:** setup preview config ([f7e4099](https://github.com/Open-Study-College/osc/commit/f7e4099a2c49a669d13a5ba793b18a84b9952392))
* **ecommerce:** styles the preview banner ([d0b48fb](https://github.com/Open-Study-College/osc/commit/d0b48fb539de84fb71cb7c6c81b1ea0c8aac27cf))
* **product page:** add page preview to upper page content ([2730032](https://github.com/Open-Study-College/osc/commit/2730032f37e2dd856fc36930e33bef98b1b89c77))
* **studio:** add script to generate the previewable url when site is hosted ([19937f2](https://github.com/Open-Study-College/osc/commit/19937f2b4514b83d2fb55283c5dcdc7f44f2a5b2))
* **workflows:** add PREVIEW_SESSION_SECRET to workflow files ([006d35a](https://github.com/Open-Study-College/osc/commit/006d35a7d882321a6f2b9af9a25ba093bb35265a))


### 🐛 Bugs

* **ecommerce:** declare env as a global ([760724a](https://github.com/Open-Study-College/osc/commit/760724a202f2f53cf0ff5ae2abd180088d03e575))
* **ecommerce:** pass page content to preview ([cccc2b7](https://github.com/Open-Study-College/osc/commit/cccc2b744dec5be5b88207e29a169969867ff057))

## [0.83.0](https://github.com/Open-Study-College/osc/compare/v0.82.0...v0.83.0) (2023-04-28)


### 🐛 Bugs

* **drawer:** fixes missin input props in story ([a931c07](https://github.com/Open-Study-College/osc/commit/a931c07747745a164056ea82f96ef6b08569213a))


### ✨ Features

* add awardingBodyPages into Sanity ([49cbf32](https://github.com/Open-Study-College/osc/commit/49cbf32aee16094044d7b4992935a2af88196a27))
* **drawer:** adds isRotated prop to drawer trigger ([81daea6](https://github.com/Open-Study-College/osc/commit/81daea61cc260a8531d8e8e7ba0a6cf8aa4fd24e))


### ♻️ Refactors

* add seo fields ([627f828](https://github.com/Open-Study-College/osc/commit/627f8281a9352d9f7061fd84efdf344653f0dee5))
* **drawer:** refactors styles by moving rotated styles into the --roated modifier ([4d84826](https://github.com/Open-Study-College/osc/commit/4d84826e2d460d737ade3a21653c6dd7bcf38525))

## [0.82.0](https://github.com/Open-Study-College/osc/compare/v0.81.0...v0.82.0) (2023-04-26)


### ✨ Features

* **button:** add modifiers to remove border from certain edges ([95550cd](https://github.com/Open-Study-College/osc/commit/95550cdfb1bbbea8fa3e5974056af62fbb415274))
* **button:** adds senary button variant ([7c14046](https://github.com/Open-Study-College/osc/commit/7c14046d99ddbb88a1eec93474fb30f4edda879c))

