## [0.86.3](https://github.com/Open-Study-College/osc/compare/v0.86.2...v0.86.3) (2023-05-16)


### 🐛 Bugs

* add ternary to ensure textToCopy always has text ([75434c0](https://github.com/Open-Study-College/osc/commit/75434c0f48cf0438503bc66d9cfc1e93fbdd894f))

## [0.86.2](https://github.com/Open-Study-College/osc/compare/v0.86.1...v0.86.2) (2023-05-16)


### ♻️ Refactors

* **accordion:** adds accordionContext to allow us to pass variant prop through ([72aa68e](https://github.com/Open-Study-College/osc/commit/72aa68e4e465d80c0f9e5a540590bcc09da5e260))
* **accordion:** update styles so every element has a variant modifier ([b4928cc](https://github.com/Open-Study-College/osc/commit/b4928cc20573abf7dad7980ebf8cf16e2fad1405))


### 📦 General Housekeeping / Package Updates

* **accordion story:** update storybook to showcase nested primary ([ad891ec](https://github.com/Open-Study-College/osc/commit/ad891ec7a629d11f81c5e197b1bf76164f02f46e))


### 🧪 Tests

* **accordion:** update test to check for all variants ([2bc073f](https://github.com/Open-Study-College/osc/commit/2bc073fc87492dffd43cedd218207946cf0a8f4b))

## [0.86.1](https://github.com/Open-Study-College/osc/compare/v0.86.0...v0.86.1) (2023-05-05)


### 🐛 Bugs

* **product page:** moves closing div into correct place ([7b66481](https://github.com/Open-Study-College/osc/commit/7b6648161f632b4a6527eac69e38eba08cc5430f))
* **product page:** remove useParams hook and replace with params from loader ([8e07693](https://github.com/Open-Study-College/osc/commit/8e076933086aaf690cb70c14648ed6dfbce32a80))
* **product page:** restore missing imports ([fe014c6](https://github.com/Open-Study-College/osc/commit/fe014c6d7db226bc3ee13a93126eb857ef27b04a))

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

