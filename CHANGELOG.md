## [0.113.0](https://github.com/Open-Study-College/osc/compare/v0.112.0...v0.113.0) (2023-06-21)


### 🧪 Tests

* **header:** fix broken header tests ([dcd5be2](https://github.com/Open-Study-College/osc/commit/dcd5be26bd4ad0aaf4259b7faa9e01d0d8656a76))


### ✨ Features

* **ecommerce:** add isSticky prop to header on ecommerce site ([5e08854](https://github.com/Open-Study-College/osc/commit/5e088549570576fc8b38e650ff9c5f1306b47cfd))
* **header:** add is-scrolled class when window is scrolled past the offset value ([09233da](https://github.com/Open-Study-College/osc/commit/09233da0a65a302eeda2300f64f1bb1e2e715b1f))
* **header:** add sticky modifier class and styles ([b377ad9](https://github.com/Open-Study-College/osc/commit/b377ad9007fd95883dcbf183ec67bc72ba8e7f87))
* **header:** add useScroll hook to track scroll position ([50d612f](https://github.com/Open-Study-College/osc/commit/50d612f4c7395334c2c8938c2ec6c5cfa856aed6))
* **header:** adds sticky modifier to header ([0b3e486](https://github.com/Open-Study-College/osc/commit/0b3e4862d70ae3e888770f901091f2c12ebca270))
* **header:** restructure the header component for better styling when sticky is applied ([30b482c](https://github.com/Open-Study-College/osc/commit/30b482c8e277bf12e7f0b2c7792018e3268ccd1b))


### ♻️ Refactors

* **drawer:** remove offset reset to account for the sticky header on ecommerce ([22511cf](https://github.com/Open-Study-College/osc/commit/22511cf2b7c68d7da0fe5af5843eb0ac78ca5fc5))
* **header:** add a header__inner element to allow background colour to span full width ([6890267](https://github.com/Open-Study-College/osc/commit/6890267be004776bf18d42b9641ff54564300dd8))

## [0.112.0](https://github.com/Open-Study-College/osc/compare/v0.111.0...v0.112.0) (2023-06-20)


### 📦 General Housekeeping / Package Updates

* **add to cart:** remove duplicated isDisabled prop ([25e8d5b](https://github.com/Open-Study-College/osc/commit/25e8d5bd935e61138846fb737a44ee149178bdf4))
* **line item:** remove console log ([c46232d](https://github.com/Open-Study-College/osc/commit/c46232dc276a3cb13b970fe2d0aeab535a6fb3bf))


### ✨ Features

* **anim:** make shimmer animation more obvious ([3939fc9](https://github.com/Open-Study-College/osc/commit/3939fc95aa298b047e3bf19246de378a68cc21a2))
* **button:** add condition to position the spinner differently if there is no loading text ([52f787b](https://github.com/Open-Study-College/osc/commit/52f787b3a7d24730837364ee0c6e511a251ab93d))
* **cart:** add loading spinner to cart forms ([ef4ca38](https://github.com/Open-Study-College/osc/commit/ef4ca388cb521ed11eb622dbc8cd33fd16b1eebc))
* **cart:** reduce size of discounted value ([ed73d8b](https://github.com/Open-Study-College/osc/commit/ed73d8bdd69aefca4eeb6c2a9644f8ddbe75103b))
* **styles:** adds visually hidden utility class ([79fc18e](https://github.com/Open-Study-College/osc/commit/79fc18e4cb7845e8f429391173990cad4ce03cbd))


### ♻️ Refactors

* **button:** remove default loading text ([45a620b](https://github.com/Open-Study-College/osc/commit/45a620b2194ec052d17d8a1bdd392de307a31959))

## [0.111.0](https://github.com/Open-Study-College/osc/compare/v0.110.0...v0.111.0) (2023-06-14)


### ✨ Features

* **studio:** add pretty colour names to color picker ([0c04883](https://github.com/Open-Study-College/osc/commit/0c04883ae27ae49ab863ddc1e43ffab7b9a1a36a))
* **studio:** sort the colours alphabetically by their pretty name ([fdfb7d2](https://github.com/Open-Study-College/osc/commit/fdfb7d2633a1b62f1131caceabe76fa855cd6084))
* **studio:** update colour picker filter logic to check for pretty name ([0f3d162](https://github.com/Open-Study-College/osc/commit/0f3d16292ea5a1a99802c010b02a0fbc77c40b9c))
* **studio:** update colour picker value to render value ([8461814](https://github.com/Open-Study-College/osc/commit/84618145e9b03fa785fab9de816e38eebd0a4cd8))
* **studio:** update constants file to use typescript ([a4852a4](https://github.com/Open-Study-College/osc/commit/a4852a4a02a3c6051094b0b97116995f59266a7e))
* **studio:** update gradient pretty names ([9d7315f](https://github.com/Open-Study-College/osc/commit/9d7315fb70e35a8d41d79dc48caa864c7e93632b))

## [0.110.0](https://github.com/Open-Study-College/osc/compare/v0.109.0...v0.110.0) (2023-06-14)


### ✨ Features

* add env var for forgot password ([3eae495](https://github.com/Open-Study-College/osc/commit/3eae495e6a0a81f38bcc005283db4d69ee5529e6))

## [0.109.0](https://github.com/Open-Study-College/osc/compare/v0.108.0...v0.109.0) (2023-06-13)


### ✨ Features

* add url param routing ([2c0e628](https://github.com/Open-Study-College/osc/commit/2c0e6286cb95633f20063bb59ede33950b476241))


### ♻️ Refactors

* add asArray function ([9b996b6](https://github.com/Open-Study-College/osc/commit/9b996b6b6664658d56cc129f278263fc3e1619a6))
* add instantsearch routers to remix config ([29b5814](https://github.com/Open-Study-College/osc/commit/29b58144b5b18290b0294bd21dd2730846f7ae88))
* pass current values through to inputs ([7fb7033](https://github.com/Open-Study-College/osc/commit/7fb70334d6b5eb6a760cbf0eca31003c3d89e9f7))
* put props.value first ([5830935](https://github.com/Open-Study-College/osc/commit/5830935fa0c7366c7748955efa2fe9855242e8a9))
* remove "start" parameter ([4875d93](https://github.com/Open-Study-College/osc/commit/4875d931a90b38808215ce70eba925951f66f4d6))
* remove console logs ([6615c1d](https://github.com/Open-Study-College/osc/commit/6615c1da7e79f7ee90d094c90b9d2f1fc2afb6fd))
* remove duplicate file ([3ba40ae](https://github.com/Open-Study-College/osc/commit/3ba40aefe01c1618a4738d4a55992bb10ad31624))

