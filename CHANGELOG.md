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

## [0.12.0](https://github.com/Open-Study-College/osc/compare/v0.11.0...v0.12.0) (2022-11-17)


### 🧪 Tests

* add tests for image component ([f3ebd60](https://github.com/Open-Study-College/osc/commit/f3ebd605a2de7b5acb7de3c0c29babc6770d823f))


### ✨ Features

* add cloudinary image module to sanity ([8364864](https://github.com/Open-Study-College/osc/commit/8364864bc179250c92f913da5361131d0854ddb5))
* add image component to osc-ui ([ecae6e2](https://github.com/Open-Study-College/osc/commit/ecae6e20d6f6fa47ad1cb02ca320299cae2219bf))
* add image module to osc-ecommerce ([50ad4e2](https://github.com/Open-Study-College/osc/commit/50ad4e211b8d1627ac19ec027a6a2b1fcd9d794f))
* replace media plugin with cloudinary ([430c79f](https://github.com/Open-Study-College/osc/commit/430c79f2626b38f1fc4708b917bb2e44c1334787))


### ♻️ Refactors

* move classname prop so classes are applied to the image element ([8035eea](https://github.com/Open-Study-College/osc/commit/8035eeabaf5c099666882e255290eead38d10f54))
* update carousel component to make use of the image component ([e9068b6](https://github.com/Open-Study-College/osc/commit/e9068b6f39216935fcd045e90d46825a55a0a717))
* update test data to match new shape of image ([ebda4bd](https://github.com/Open-Study-College/osc/commit/ebda4bd05b5542eb06005c54c90c5af5005d3605))


### 📝 Documentation

* adds storybook docs ([e920461](https://github.com/Open-Study-College/osc/commit/e92046164c288d62c86248ea98fd45b7f2503065))

## [0.11.0](https://github.com/Open-Study-College/osc/compare/v0.10.0...v0.11.0) (2022-11-17)


### 📦 General Housekeeping / Package Updates

* add content module types ([898d3af](https://github.com/Open-Study-College/osc/commit/898d3afe756355bd56d89c68fd8394d406f7f949))
* install portableText dependency ([3c4de53](https://github.com/Open-Study-College/osc/commit/3c4de5388d2d0852b5dac656e7df2a8a6b90ad53))
* removed unused product annotation schema ([b6af40f](https://github.com/Open-Study-College/osc/commit/b6af40f3eee37e7b1561053bf9e7edfa0ad2f206))


### ♻️ Refactors

* move dynamic links above our static links ([f6e9fc9](https://github.com/Open-Study-College/osc/commit/f6e9fc93a9d1dca210b7c63655e379bfc6bd4b66))
* remove export from dynamicLinks const ([25f8026](https://github.com/Open-Study-College/osc/commit/25f802653e7d7281f9729a66e06211db3d2f37e4))


### 🐛 Bugs

* **list:** add null check for classnames so we don't load an empty class attribute ([e52a975](https://github.com/Open-Study-College/osc/commit/e52a97545eb63f3dd84599493eca7405499d9db5))
* adds missing page types to query ([a29e997](https://github.com/Open-Study-College/osc/commit/a29e9978ca25b3cd26c2cb823cb6c00b63cd0c7c))
* make sure only one stylesheet per type of module gets loaded ([f493645](https://github.com/Open-Study-College/osc/commit/f4936452294d8312d40b4ffa14a29e2b8c8b0e37))


### ✨ Features

* **content:** replaces chakra components ([154381a](https://github.com/Open-Study-College/osc/commit/154381a39608bb09365e1d56cfcd087f86a07f2e))
* **hook:** adds spacing hook ([09b4de7](https://github.com/Open-Study-College/osc/commit/09b4de796227494025b18de1976a6f58ab2c7351))
* add color picker input to sanity ([ba7a45a](https://github.com/Open-Study-College/osc/commit/ba7a45accb61c0b646056b91334f919326c2be71))
* add content schema to sanity ([9743994](https://github.com/Open-Study-College/osc/commit/9743994ce64bebb5636d70a62c051e3efce3c36c))
* add query for content component ([2ebb48e](https://github.com/Open-Study-College/osc/commit/2ebb48e8c8c9063e9a32a7a7b096790ee1a6c706))
* adds content component ([7b0bc9b](https://github.com/Open-Study-College/osc/commit/7b0bc9b4063d733724b2c6c085e81c520ffc35d0))
* adds content component to modules ([25eacbd](https://github.com/Open-Study-College/osc/commit/25eacbdc0724fc25ee26507328a5f03c94104b0b))
* adds dynamic links from remix-utils ([089e954](https://github.com/Open-Study-College/osc/commit/089e95469e8575017955cb503deafd4a0e6c0b58))
* adds dynamic links to routes ([97ea112](https://github.com/Open-Study-College/osc/commit/97ea1128c6b98b5aa5c1cd0e9b0e2a5652d7c75c))

## [0.10.0](https://github.com/Open-Study-College/osc/compare/v0.9.0...v0.10.0) (2022-11-15)


### ✨ Features

* adds robots.txt resource route ([7149f8d](https://github.com/Open-Study-College/osc/commit/7149f8db223506ee4c57f2714c6d11764f8da687))
* adds sitemap resource route ([29d1e5b](https://github.com/Open-Study-College/osc/commit/29d1e5b4c195112dbf071281de290dd708ccb914))


### 🐛 Bugs

* ensure protocol to return https ([194991f](https://github.com/Open-Study-College/osc/commit/194991fbbcc30367a1b4cb6936443a0643fb4d5c))

