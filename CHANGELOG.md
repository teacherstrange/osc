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

## [0.108.0](https://github.com/Open-Study-College/osc/compare/v0.107.0...v0.108.0) (2023-06-13)


### ✨ Features

* **checkbox:** add small modifier story to checkbox storybook ([d92d374](https://github.com/Open-Study-College/osc/commit/d92d3743f0405b0a05c53ac5d6dba368de652ad0))
* **checkbox:** add small modifier to checkbox ([aafaf42](https://github.com/Open-Study-College/osc/commit/aafaf426bfcb7a479017d77541fad7cc0876c3a5))
* **label:** add small modifier to label ([5c79cf9](https://github.com/Open-Study-College/osc/commit/5c79cf9cf11a0c57a51f1749cefcba0338e38509))

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

