## [0.15.1](https://github.com/Open-Study-College/osc/compare/v0.15.0...v0.15.1) (2022-11-30)


### 📦 General Housekeeping / Package Updates

* uninstall happy-dom ([b84687b](https://github.com/Open-Study-College/osc/commit/b84687b714a217f8de7babb064841be7f3dbb66c))


### ♻️ Refactors

* remove manual environment setter ([ad6e134](https://github.com/Open-Study-College/osc/commit/ad6e134a242a809658634f5698359d4667b0099e))
* update environment to jsdom ([6dcf774](https://github.com/Open-Study-College/osc/commit/6dcf774b8d4065c615e2e5341c91496ff990dbdb))
* update nodeName references to match jsdom lowercase ([c9427df](https://github.com/Open-Study-College/osc/commit/c9427df66a743d3cab6eb288e1f45a89b0f6fa35))

## [0.15.0](https://github.com/Open-Study-College/osc/compare/v0.14.0...v0.15.0) (2022-11-30)


### ✨ Features

* add component, styling and stories ([d26e81a](https://github.com/Open-Study-College/osc/commit/d26e81af44f88d9ebef8715c80c042dfe980f468))


### 🧪 Tests

* add new test assertions ([fbef5af](https://github.com/Open-Study-College/osc/commit/fbef5af68a50d3a67ee6db8cbc96cd9bfd1aabf8))
* add tests ([5f43d91](https://github.com/Open-Study-College/osc/commit/5f43d916b534dbbcb5cc57285284b3a35f75e997))


### ♻️ Refactors

* add error icon ([f2d7663](https://github.com/Open-Study-College/osc/commit/f2d7663c976f6d80695821a9c0b60957b5f3b5dc))
* add parameters and argTypes to storybook and remove redundant props ([ecb2a07](https://github.com/Open-Study-College/osc/commit/ecb2a07f406ffa0a277fc58ff26bec0e5ff26af4))
* fix story to not display the icon ([2b3b992](https://github.com/Open-Study-College/osc/commit/2b3b99299d1ef3e55c9faa575b63f1f4865bd93d))
* make setting role='alert' more clear and add tests ([af774f5](https://github.com/Open-Study-College/osc/commit/af774f5d97c461ce2cbe33198fc3f52ca872dad2))
* set aria-live to polite for non-urgent alerts ([6680928](https://github.com/Open-Study-College/osc/commit/6680928cc85f8acc7753c710d3c0c5e5513d8692))
* use children props in Title and Description components ([8787d48](https://github.com/Open-Study-College/osc/commit/8787d48a77822b447a924853d69f19c7e8da025f))

## [0.14.0](https://github.com/Open-Study-College/osc/compare/v0.13.1...v0.14.0) (2022-11-30)


### ✨ Features

* **academic-hub:** adds skiplink to the academic hub ([2e5f9d4](https://github.com/Open-Study-College/osc/commit/2e5f9d44ad5f34629e047c6619fd3d4ce02c6e5e))
* **ecommerce:** adds skiplink to the ecommerce site ([9b81737](https://github.com/Open-Study-College/osc/commit/9b817372b7e05a7f19b5d9fdf425bad1437ff428))
* adds a skiplink component ([d695d5f](https://github.com/Open-Study-College/osc/commit/d695d5f91b7bcd803a6baa568d5cf746f9dd593f))
* adds a visually hidden component ([922a552](https://github.com/Open-Study-College/osc/commit/922a5523bd2539645b503f1c0846fb62fb4bbfb5))
* export visually hidden and skip link ([b1a7bb6](https://github.com/Open-Study-College/osc/commit/b1a7bb61a60812585269b2c915310f7df4e99b52))


### 🧪 Tests

* **academic-hub:** adds smoke test for the skiplink ([12fcfe3](https://github.com/Open-Study-College/osc/commit/12fcfe3461ab6d8770240617bb10b86d773eefaf))
* **ecommerce:** adds smoke test for the skiplink ([295c1a1](https://github.com/Open-Study-College/osc/commit/295c1a192f9abba97ae2ccfa19032b989d0d5cb1))
* temporarily skip auth dependant test hooks ([58a454c](https://github.com/Open-Study-College/osc/commit/58a454cb2bbacc65120a3e30f069bf2c1d420784))


### 📦 General Housekeeping / Package Updates

* **ecommerce:** fixes typo ([958baf6](https://github.com/Open-Study-College/osc/commit/958baf6a2c5c489ef90d3f700f8a7beb604ec506))

## [0.13.1](https://github.com/Open-Study-College/osc/compare/v0.13.0...v0.13.1) (2022-11-29)


### ♻️ Refactors

* **prettier:** set `trailingCommas` to `es5` ([164f0d1](https://github.com/Open-Study-College/osc/commit/164f0d1913d2f673eadb40d74704a81803cc76d5))

## [0.13.0](https://github.com/Open-Study-College/osc/compare/v0.12.0...v0.13.0) (2022-11-24)


### 📦 General Housekeeping / Package Updates

* **auth:** added .env.example ([2de2293](https://github.com/Open-Study-College/osc/commit/2de2293e7d07e5252f36c7b45553ef503b885ddd))
* **auth:** adding comments to code ([fc2522f](https://github.com/Open-Study-College/osc/commit/fc2522fc4b847132be1d2c3f4295f3b0ac91b4d4))
* **auth:** moved devDeps from root into packages inline with workspaces changes ([9402ace](https://github.com/Open-Study-College/osc/commit/9402ace9b28abbd24c183fe029cbd859ef8c60bc))
* **auth:** tidied up dependencies ([52ec9f6](https://github.com/Open-Study-College/osc/commit/52ec9f62694bf0e6f6c5dd795714a588b256ff96))
* **gateway:** tidied dependencies up ([0ab7f49](https://github.com/Open-Study-College/osc/commit/0ab7f49e1d9a114b5b8bce8ec67474b4cadb62b1))


### ♻️ Refactors

* **auth:** abstracted ApolloServer config ([f64440c](https://github.com/Open-Study-College/osc/commit/f64440c3e6e4f0ec04b04b4f741e0721baaf9f20))
* **auth:** abstracted function parameter and return type defintions ([7325c3c](https://github.com/Open-Study-College/osc/commit/7325c3c617259739d583b334e4536e0ae4ba658f))
* **auth:** abstracted function paramter/return value type def ([53f2de9](https://github.com/Open-Study-College/osc/commit/53f2de9cee65b475864ee2479f29880297a60b8c))
* **auth:** abstracted function type definitions ([4455ba4](https://github.com/Open-Study-College/osc/commit/4455ba4767f5a5921fb36fc6ccd3d70f6d886791))
* **auth:** abstracted resolver argument param type definitions ([2356968](https://github.com/Open-Study-College/osc/commit/2356968ee6addae7eb73483a5a1ba818a4482e32))
* **auth:** abstracted various type defs ([01d0cac](https://github.com/Open-Study-College/osc/commit/01d0cacb2c5a0ea77eb8f5b6363def19cc81db06))
* **auth:** added line breaks for readability ([d0b9fe2](https://github.com/Open-Study-College/osc/commit/d0b9fe280ad547070ae99807d468c028edfa2d9d))
* **auth:** cleaned up Users query resolver ([18e1292](https://github.com/Open-Study-College/osc/commit/18e12920ead708847b1e6d7943ba1854a7c9aec7))
* **auth:** destructured parameters in resolver ([70c17f1](https://github.com/Open-Study-College/osc/commit/70c17f10165e6e49ed7b140eb11cf866bc1acec1))
* **auth:** moved DB logic outside of resolver ([f39006c](https://github.com/Open-Study-College/osc/commit/f39006c9866e681db7011e1f88ed9897968cafc2))
* **auth:** remove `console.log()` ([a827aec](https://github.com/Open-Study-College/osc/commit/a827aece3805ce6eb6a20a5e6b1211fdede9cd34))
* **auth:** remove whitespace ([5f1c36a](https://github.com/Open-Study-College/osc/commit/5f1c36a2e9980c37c7ccbfd40b9b0b0340dbc3ee))
* **auth:** removed unnecessary `| null` type definition ([ec7ae0c](https://github.com/Open-Study-College/osc/commit/ec7ae0cfbb2037cd0a3ed7ed52d3c42279213931))
* **auth:** removed unnecessary `nullish` checks ([0f73434](https://github.com/Open-Study-College/osc/commit/0f734348a1c969177f947f3c55fcdf96cdecb303))
* **auth:** removed unused exports from account util ([5c028f6](https://github.com/Open-Study-College/osc/commit/5c028f65a7ed9d8260492531887217ec2c165ed4))
* **auth:** set relevant types to readonly for robustness ([89102ce](https://github.com/Open-Study-College/osc/commit/89102ce1bba70bd688a4c5999ec9bb79afd1fd05))
* changed naming convention for some entities ([10d1873](https://github.com/Open-Study-College/osc/commit/10d18739bac3fb7a5d4ae46acdbb300863bda197))
* moved gateway nodemon config outside of script definitions ([10a10b4](https://github.com/Open-Study-College/osc/commit/10a10b408bfa508fbb5c8001cb13515b53ec3bfe))


### ✨ Features

* **api-utils:** abstracted some global utilities and typeDefs into a utils package ([68487aa](https://github.com/Open-Study-College/osc/commit/68487aa48b862c38b054d539bb086801e3bbb366))
* **auth:** added `refreshToken` functionality ([0ca4109](https://github.com/Open-Study-College/osc/commit/0ca41096f0f49c29ded78cb10f22a42b85d1f1b2))
* **auth:** added 3 second wait to failed login attempts ([699cfbf](https://github.com/Open-Study-College/osc/commit/699cfbfc17677b7451428cbe596062cdf1705bc7))
* **auth:** added GraphQL Shield to restrict access ([20ca4e7](https://github.com/Open-Study-College/osc/commit/20ca4e7982e9f9bc0754b95b1a2f08e7c8ba9ba7))
* **auth:** added wait utility for awaiting a `setTimeout` ([4ebc6fe](https://github.com/Open-Study-College/osc/commit/4ebc6fe17a8ccb7b4c41e6ae5e9e54c0cf9cdf4a))
* **auth:** corrected type definition for user context ([8d7e1a1](https://github.com/Open-Study-College/osc/commit/8d7e1a12716e24b86f80827acc2c94b07327f83c))
* **auth:** graphql shield WIP ([346122d](https://github.com/Open-Study-College/osc/commit/346122d03e0b6e09861043cab3ad9e29cf8b5b48))
* **auth:** implemented constraints to createUser ([ee0071d](https://github.com/Open-Study-College/osc/commit/ee0071dbbce8c2aa2ca36d73341ddeb5037757ea))
* **auth:** implemented refresh tokens alongside JWT ([0100227](https://github.com/Open-Study-College/osc/commit/01002279c0cd574277eeb63a9892e9d41f88677d))
* **auth:** implemented zod to access .env at runtime ([ae03d62](https://github.com/Open-Study-College/osc/commit/ae03d62389fb0679079791a692b9909b38224698))
* **auth:** implementing graphql-shield to authorise requests ([a945042](https://github.com/Open-Study-College/osc/commit/a945042cab5c4d85cc5aceac5266a147b2857123))
* **auth:** removed set password pattern and extended `minLength` ([35ab53f](https://github.com/Open-Study-College/osc/commit/35ab53fc4830805f4647dfc3952add926c11a766))
* **user:** changed user name field lengths ([b79b296](https://github.com/Open-Study-College/osc/commit/b79b296b7f6e617fecf1764b7473d80bf66297f8))
* converted gateway to express ([2cbf51f](https://github.com/Open-Study-College/osc/commit/2cbf51fee09e8bf18c8cfdf0529b51e547fa02f5))
* create a new user ([d0e4a15](https://github.com/Open-Study-College/osc/commit/d0e4a153b75c853e82581a0b8be2f686096b2277))
* extend permissions to include extra user permissions ([5f1d206](https://github.com/Open-Study-College/osc/commit/5f1d206e84a329b316a17df609d2d01f26c0fce6))
* extending out auth API shcema ([381653d](https://github.com/Open-Study-College/osc/commit/381653d12fb4e5f09a71bb4d45bc1e56302b5819))
* handling JWT auth header (WIP) ([693f1d7](https://github.com/Open-Study-College/osc/commit/693f1d7a350e30526d73aef78d11c38421b079b2))
* implemented form validation via the graphql-constraint-directive ([df6e05e](https://github.com/Open-Study-College/osc/commit/df6e05e8e3c8d74a03e22353ce6fcdb1da2392a0))
* login and receive a JWT ([40e021d](https://github.com/Open-Study-College/osc/commit/40e021dc104d564adc002d7d8b56a34a6126bcb2))
* throw validation errors correctly ([846eab5](https://github.com/Open-Study-College/osc/commit/846eab54ae37c13a99a2bf870877f89d3d4af10d))


### 🐛 Bugs

* **auth:** added return statement for user query ([ae8b910](https://github.com/Open-Study-College/osc/commit/ae8b910d139cb2279d2e07ebc8182d64becfd0e2))
* **auth:** corrected type definition for permission matcher ([c6d4cbe](https://github.com/Open-Study-College/osc/commit/c6d4cbe1163e67af7056d1307b8193894cdede79))
* **auth:** replace osc-api dependency version with symlink ([f2efcfc](https://github.com/Open-Study-College/osc/commit/f2efcfc51447ef3d04a2fed9466438f2e893d789))
* **auth:** return errors instead of throwing as per `graphql-shield` docs ([f8ff33c](https://github.com/Open-Study-College/osc/commit/f8ff33cbf717b6751f6389d0e8fb29939b6547a3))

