# [0.5.0](https://github.com/Open-Study-College/osc/compare/v0.4.1...v0.5.0) (2022-10-21)


### Bug Fixes

* add missing seo query fragment ([65b730b](https://github.com/Open-Study-College/osc/commit/65b730b91e01173885c19f3305314e53583397ba))
* adds missing optional chaining ([9b8cba1](https://github.com/Open-Study-College/osc/commit/9b8cba139681ddf57964df2267b3c0c8e0d187d9))
* changes build command to use default dist folder ([349a4b1](https://github.com/Open-Study-College/osc/commit/349a4b1180f7408f4086470723504e4895dff675))
* ensure vitest doesn't try and run e2e tests ([9a0e3cc](https://github.com/Open-Study-College/osc/commit/9a0e3cc6a0e3d017656d8a1c6a5c08c2370c5fdf))
* fixes incorrect app name ([e075b6d](https://github.com/Open-Study-College/osc/commit/e075b6dfc98473f76f2c10ef6ef45e6caaa5f5e5))
* moves sanity env up so they are available for build command ([6b80bf9](https://github.com/Open-Study-College/osc/commit/6b80bf9290c158aed05ce103c11518e38a3a2459))
* remove redundant classname causing test failure ([0f015c2](https://github.com/Open-Study-College/osc/commit/0f015c268f315d048b32bd34f4d01f36f94ada80))
* remove redundant css import statement ([2699c8f](https://github.com/Open-Study-College/osc/commit/2699c8f5f5853416e7c1f5c8b16466cac331d339))
* removes cypress tests added after rebase ([0af3218](https://github.com/Open-Study-College/osc/commit/0af3218feff9790bd22a8630fd81b8966d72a3db))
* renames incorrect package ([7d1efa8](https://github.com/Open-Study-College/osc/commit/7d1efa887a43fda7e61dc29bc7a5633799f18892))
* restore buildx steps ([bb8e174](https://github.com/Open-Study-College/osc/commit/bb8e1743fe6f72181afa6842d8973f6dae2ee48c))
* restore docker steps to workflow ([8ec95db](https://github.com/Open-Study-College/osc/commit/8ec95db90f4773b2f6708ec3bf93b7e9bd8aea94))
* workflow doesn't need to copy .env file ([c67274a](https://github.com/Open-Study-College/osc/commit/c67274a0a86804ad797009f8d529251f1785760e))
* workflow should include run or uses ([42bc0b9](https://github.com/Open-Study-College/osc/commit/42bc0b9a02d97cb6f1675fada971e4f0d93a3d93))


### Features

* add a canonical link tag for all pages to access ([c2f5335](https://github.com/Open-Study-College/osc/commit/c2f53359c9b5147e7e710dde32beca795f10999c))
* add cors header to allow studio seo pane to fetch site ([71548d0](https://github.com/Open-Study-College/osc/commit/71548d0df0edd6eb29505f47ef657155e187b066))
* add express server for deployment on fly.io ([6edb69d](https://github.com/Open-Study-College/osc/commit/6edb69d695bd3da1636f47f4dde0da841e56ec91))
* add public studio folder to gitignore ([04a3a4c](https://github.com/Open-Study-College/osc/commit/04a3a4ccbff2de23f0094a82dd5386084cc336a8))
* adds a noindex field to sanity pages ([59400d0](https://github.com/Open-Study-College/osc/commit/59400d0e167951b4f50e05d8f4cd3e3dbf6fe67b))
* adds canonical url field to sanity pages ([8ebf0d4](https://github.com/Open-Study-College/osc/commit/8ebf0d427cab6f11843b58c9c8f0a9d2ea785c01))
* adds e2e tests to check seo settings ([5fa6601](https://github.com/Open-Study-College/osc/commit/5fa66017730df961b6321b7f8c05bc1641db0911))
* adds fly.toml file to studio ([639cca3](https://github.com/Open-Study-College/osc/commit/639cca3e536eb90cb09bcd0265cf1da61caf88e2))
* adds function to create a canonical url ([764beb4](https://github.com/Open-Study-College/osc/commit/764beb4b94b1fba833203d7ad176987b6a0d5e7c))
* adds function to create an object to pass to the remix meta function ([c1e31cd](https://github.com/Open-Study-College/osc/commit/c1e31cd08b4f03b990355f5de1e716b80403d93c))
* adds global seo controls to sanity settings ([9e1e876](https://github.com/Open-Study-College/osc/commit/9e1e876ef17a37914d8b9d5555f6949c08da4180))
* adds global seo settings to meta function ([0058c9a](https://github.com/Open-Study-College/osc/commit/0058c9aceaf55139a49cfd777b232e933de2a95f))
* adds global seo settings to settings query ([85eeb94](https://github.com/Open-Study-College/osc/commit/85eeb94f00c764f39702cef9ecf33e6185e38ae7))
* adds helper script to create new user in the db ([a0f8f1f](https://github.com/Open-Study-College/osc/commit/a0f8f1f4773e7dce1447ff7e3bb03ef3c6ba9db1))
* adds helper script to delete user in the db ([0f6ad80](https://github.com/Open-Study-College/osc/commit/0f6ad8051656942d3cc25b2ce0b769d1b27ac4f7))
* adds keywords to sanity seo settings ([fcc8e30](https://github.com/Open-Study-College/osc/commit/fcc8e30aedb79074dd81112aa044c47487bc8ba8))
* adds playwright config file ([9103bc4](https://github.com/Open-Study-College/osc/commit/9103bc4aba23259051de1e56d46635d679bd2836))
* adds rule to ignore testing-library rules in e2e directory ([187af18](https://github.com/Open-Study-College/osc/commit/187af18ceecda7b0556213278bebf6afcd53919e))
* adds script to build osc-studio ([f78ca46](https://github.com/Open-Study-College/osc/commit/f78ca463aac7fa33ae5d169187bf8ba5acc4fdde))
* adds script to run after all tests and cleanup the db ([8ac0662](https://github.com/Open-Study-College/osc/commit/8ac06629b6b28aeb8b93f134903b1ae87a9e7e8b))
* adds script to run before all tests, seed the db and log user in ([9300bc3](https://github.com/Open-Study-College/osc/commit/9300bc3ea5ff8e50132ca506652be8d70986d936))
* adds smoke test to check login is working ([cfec31e](https://github.com/Open-Study-College/osc/commit/cfec31ea5803d343707f1efcc3d7d29bcc255588))
* adds studio dockerfile ([62d11f0](https://github.com/Open-Study-College/osc/commit/62d11f0e869a3777b7184430a226b6e83b91293d))
* adds workflow for deploying studio to fly.io ([66b5dc3](https://github.com/Open-Study-College/osc/commit/66b5dc343f0fa3926204f27ffd6f83174a182549))
* create Badge component, tests and stories ([5d65544](https://github.com/Open-Study-College/osc/commit/5d655442fe071a9c8dda9e114ad66c3eae5ae93d))
* installs playwright ([dbd6591](https://github.com/Open-Study-College/osc/commit/dbd659185dadc9a21e2b1242677e053d9dd34f4a))
* installs sanity-seo-pane plugin ([4046b85](https://github.com/Open-Study-College/osc/commit/4046b85919b0afae570b264b00e9a57c77e36469))
* moves buildCanonicalfunction into metaTags folder ([264f11f](https://github.com/Open-Study-College/osc/commit/264f11f33f6cb1ffae02ab23d81ea22eb88e18e0))
* removes cypress directory and config ([d1171c4](https://github.com/Open-Study-College/osc/commit/d1171c4e362eb4706b930307766e5d6546988082))
* removes cypress env file ([a3e29e2](https://github.com/Open-Study-College/osc/commit/a3e29e2dbbea8c4c0ffbc9eb5ad7428db522c9b8))
* removes cypress exclude path ([552cd6d](https://github.com/Open-Study-College/osc/commit/552cd6dc24587e0451a41b9637b979fa6aa6d4ec))
* replace cypress files with playwright files in gitignore ([3c599d8](https://github.com/Open-Study-College/osc/commit/3c599d8b32205aba18a8ff0c1d088080241382bd))
* replaces cypress ci workflow with playwright ([10d822b](https://github.com/Open-Study-College/osc/commit/10d822b6fc65fa4105ee459d9f6cb8354580bb05))
* rewrites routes smoke test in playwright ([65f6a35](https://github.com/Open-Study-College/osc/commit/65f6a35415db7043c2cf3284b146b8b2af65c83b))
* uninstall cypress and cypress testing-libaray ([d02f98b](https://github.com/Open-Study-College/osc/commit/d02f98b1c08183f6531d31f26ada3d3292e4d6df))
* update sanity types ([2b79526](https://github.com/Open-Study-College/osc/commit/2b7952639643947070250a8e408e9e7756739412))
* update seo query ([453d4a9](https://github.com/Open-Study-College/osc/commit/453d4a98742fbf714b59cef9424c8c9494dbc98b))
* updates e2e scripts to use playwright ([3c4736b](https://github.com/Open-Study-College/osc/commit/3c4736b078d832fce7ea711f2f61d5665511e38e))



## [0.4.1](https://github.com/Open-Study-College/osc/compare/v0.4.0...v0.4.1) (2022-10-14)


### Bug Fixes

* bundle d.ts file from index.js ([e96d044](https://github.com/Open-Study-College/osc/commit/e96d044f567c86e69c9ca92a8b5dccb9bd47102b))



# [0.4.0](https://github.com/Open-Study-College/osc/compare/v0.3.0...v0.4.0) (2022-10-14)


### Bug Fixes

* adds api token to vitest env ([1843f91](https://github.com/Open-Study-College/osc/commit/1843f911f6465b4b56f367e23d1219c2228a2166))
* adds sanity secrets to vitest workflow ([3e1f834](https://github.com/Open-Study-College/osc/commit/3e1f8341af1eb17174680a6c6ee4d52cf3e0cbec))
* replace sanityClient with picosanity ([a5341fa](https://github.com/Open-Study-College/osc/commit/a5341fa2f604d48109658e6d03ac28b78e508fea))
* replaced token with dataset secret ([009abd0](https://github.com/Open-Study-College/osc/commit/009abd063dbbbbe4396d16c9fcdccc6e3a006851))
* update config to allow vitest to read process.env ([4a3e15e](https://github.com/Open-Study-College/osc/commit/4a3e15e03406c3d3d1a3f8a14563dc56551defc6))


### Features

* adds e2e test to test pages don't hang ([7800478](https://github.com/Open-Study-College/osc/commit/78004786ef1f925b123895b6377843244ff66b11))
* adds mock request object ([ca324b6](https://github.com/Open-Study-College/osc/commit/ca324b6931aa92206ca550fb453dde6f6ed93481))
* adds unit tests ([31107db](https://github.com/Open-Study-College/osc/commit/31107dbc5d3401d0c0baa77ed44e316f2de89d04))


### Reverts

* Revert "test: log result for testing CI" ([1d70bb3](https://github.com/Open-Study-College/osc/commit/1d70bb35a465118d9f55aba06e40a6d3937b165c))



# [0.3.0](https://github.com/Open-Study-College/osc/compare/v0.2.0...v0.3.0) (2022-10-13)


### Bug Fixes

* removes args from child list to prevent passing props by accident ([804e006](https://github.com/Open-Study-College/osc/commit/804e0068d051a73d3372676128d2fdeca2972123))


### Features

* adds a mock function for window.matchMedia ([ce58312](https://github.com/Open-Study-College/osc/commit/ce5831296c27c3d0157ebb5f291fb83a0a4cd102))
* adds helper function to capitalize first letter of a word ([217d215](https://github.com/Open-Study-College/osc/commit/217d21573f08ca3baa43d405b48351f78d8f42b9))
* adds list component ([3a7aaf5](https://github.com/Open-Study-College/osc/commit/3a7aaf534b3b784238864793d68e8c500a77aa11))
* adds listitem component ([9ff3f5e](https://github.com/Open-Study-College/osc/commit/9ff3f5e2a23c10cb8c77cbb0b1839e2dd6ad1aa0))
* adds module component to loop through modules ([f3f6d45](https://github.com/Open-Study-College/osc/commit/f3f6d4578810530e6ed9125b14a9afcac16ec53f))
* adds module component to route templates ([7ab1afb](https://github.com/Open-Study-College/osc/commit/7ab1afbef79d26694d7c9050abe304db30d954af))
* adds modules query ([9697087](https://github.com/Open-Study-College/osc/commit/96970875404aefa1f6662e2df48d0ced5a97767e))
* adds sanity trustpilot type ([eec94d2](https://github.com/Open-Study-College/osc/commit/eec94d2fe1bad8f7ee678056a9c7c012ea4bce0d))
* adds stories for list and listitem ([c2530fe](https://github.com/Open-Study-College/osc/commit/c2530fefe69ee168caa6b2fbe22d1089402b61aa))
* adds tests for list ([2f81031](https://github.com/Open-Study-College/osc/commit/2f81031d4e085c67144d20462c34d6e27fd294eb))
* adds Trustpilot component ([f873af1](https://github.com/Open-Study-College/osc/commit/f873af122fc507bb83257942ea08785c695c30b5))
* adds Trustpilot component tests ([a337665](https://github.com/Open-Study-College/osc/commit/a33766526d0f04ae9042fa04545d3b8662782499))
* adds trustpilot module schema to Sanity ([983e877](https://github.com/Open-Study-College/osc/commit/983e877b6709c5bbc8a69f81ea3da34d741aaad4))
* adds Trustpilot object to Window interface ([b99dfd8](https://github.com/Open-Study-College/osc/commit/b99dfd84271a61bef4e0b3060ec629e412c8e206))
* adds useEffect to adjust the height when the browser has a  narrow width ([bb93831](https://github.com/Open-Study-College/osc/commit/bb93831b6819ea63fa637da304d6fa785af47949))
* export trustpilot component from osc-ui ([23cd742](https://github.com/Open-Study-College/osc/commit/23cd742a0c5fcd1a8c0130372e27be371ea26b5d))



# [0.2.0](https://github.com/Open-Study-College/osc/compare/v0.1.29...v0.2.0) (2022-10-13)


### Bug Fixes

* add dev script for osc-studio ([7dc6291](https://github.com/Open-Study-College/osc/commit/7dc62918d1bb7c168994c4201485ef8c40fbe471))
* add footer test to osc-academic-hub and change name of header accordion ([a6bd937](https://github.com/Open-Study-College/osc/commit/a6bd937aadd82c53b1ae8ee44a192da21d6f2b88))
* added visitandcheck function to cypress ([6385dd6](https://github.com/Open-Study-College/osc/commit/6385dd62553b5e79de1aca938944721833770d52))
* adds fallback to empty string if class is falsey ([eb5f791](https://github.com/Open-Study-College/osc/commit/eb5f791a2a1ca04dd026aea38289a7e35d24d972))
* adds home option to the url resolver ([ddc4b99](https://github.com/Open-Study-College/osc/commit/ddc4b99a66cc9eeb65c1e5952529bbba0627ad0b))
* adds sanity secrets to cypress workflow ([10832a4](https://github.com/Open-Study-College/osc/commit/10832a4a4d2d3b4f60b2b7de63f5ad625d632374))
* adds slug to blog page so preview pane renders ([73f4780](https://github.com/Open-Study-College/osc/commit/73f478033bc83c63d98ca32028049877648ddf51))
* adds updatedAt field ([868aae6](https://github.com/Open-Study-College/osc/commit/868aae678740ea5879fae34cdea869cb21cb8415))
* change port for cypress run in ecommerce and academic-hub ([f6580c6](https://github.com/Open-Study-College/osc/commit/f6580c6c662217f745522c471f08279d5287264f))
* debug cypress run ([362bd60](https://github.com/Open-Study-College/osc/commit/362bd602141fc32bdf089ef4412477d5f22fb8f8))
* fixes slug undefined error in homepage preview ([6559c46](https://github.com/Open-Study-College/osc/commit/6559c4694b4773c59cf5ec2508a75de86b54ab02))
* ignore push error in cypress ([3e352d6](https://github.com/Open-Study-College/osc/commit/3e352d618bf1aa73aa5cf326a242237d59e4382e))
* pass vapidkeys to cypress ([bd8cc5a](https://github.com/Open-Study-College/osc/commit/bd8cc5a76e6bfa91556abba386a441f37ec650ea))
* remove cached gitignore ([0dafe7c](https://github.com/Open-Study-College/osc/commit/0dafe7ce2954fd947490f1f9457a7408b68bf9fd))
* remove lock file to try and get build to work ([cc38715](https://github.com/Open-Study-College/osc/commit/cc3871590848fbf03fa41b950c9bfff1d8f64ea9))
* remove studio from packages to prevent react version error ([6e58f63](https://github.com/Open-Study-College/osc/commit/6e58f630c920686ea6fa15ce93ff508c090ca2ad))
* rename footer test to header ([ac34955](https://github.com/Open-Study-College/osc/commit/ac34955a31410ad7892fd461200e3d0df5e525f4))
* replace start:mocks with test:e2e:run ([b2cc860](https://github.com/Open-Study-College/osc/commit/b2cc8609ceae0b9f11db586a58830ec2bfc039f2))
* revert changes to ecommerce port ([831f0ab](https://github.com/Open-Study-College/osc/commit/831f0abeb596dd1ae787b1fc7b9542259444c3d7))
* revert port change in ecommerce index.tsx ([935e30d](https://github.com/Open-Study-College/osc/commit/935e30da3ee105bf4415798f3e56311616e77ff8))
* revision undefined error in iframe ([8765f27](https://github.com/Open-Study-College/osc/commit/8765f27721201d91b610abc840028124d61f6c7b))
* testing tooling ([984cad4](https://github.com/Open-Study-College/osc/commit/984cad462f3daac60a8f200fe46c951a03323ede))
* typo in cypress test and missing error-ignoring function in cypress ([cb053a5](https://github.com/Open-Study-College/osc/commit/cb053a5931bc9ef4eb1412bc1e007fec1611bb5b))
* update cypress tests to use visitAndCheck function ([697f5fb](https://github.com/Open-Study-College/osc/commit/697f5fb9b000b554840e65f8c987d54e72738532))
* update entry.worker.js ([47d49ad](https://github.com/Open-Study-College/osc/commit/47d49ad13036715d400f91cbdeedce55df2d1bd1))
* update msw in devdeps ([d012e7a](https://github.com/Open-Study-College/osc/commit/d012e7a103a1635ce8e344cb20f46c978ffabd43))
* update tsconfig.json ([d92e3a0](https://github.com/Open-Study-College/osc/commit/d92e3a0aaa7830086455b4cd5058030d38b91642))
* updates as per pr review comments ([fcd8035](https://github.com/Open-Study-College/osc/commit/fcd8035d507ce27954ffdf92717a972c54269a4d))
* wrap header component inside router inside vitest test ([a26c06e](https://github.com/Open-Study-College/osc/commit/a26c06e897bd5e993248790f6cab7b79a8f80115))


### Features

* adds groq queries ([6e71a59](https://github.com/Open-Study-College/osc/commit/6e71a59963eacc8e7294e7da5d9fbe5992ed6168))
* adds live preview pane ([d07230f](https://github.com/Open-Study-College/osc/commit/d07230f64891af729a190ee10d64371724dc5a9c))
* adds preview component ([297b16f](https://github.com/Open-Study-College/osc/commit/297b16f1d345fd57f4200287d881d2d27639e8e5))
* adds preview to index route ([0ae48cb](https://github.com/Open-Study-College/osc/commit/0ae48cbe40b3cc4237db4044dce2cf14c69f549b))
* adds routes for sanity pages ([8858845](https://github.com/Open-Study-College/osc/commit/8858845de596ebe292005f46f1d3c5450671e24a))
* adds sanity secrets to docker scripts ([a6440f3](https://github.com/Open-Study-College/osc/commit/a6440f3afb31950a2b678ad8b2d228112e41225c))
* adds sanity settings to document object ([8360d60](https://github.com/Open-Study-College/osc/commit/8360d600f0dc3842ef35bbad85fdd63878f83bc4))
* adds step to build osc-ui before testing ([8f0a340](https://github.com/Open-Study-College/osc/commit/8f0a34097523f0efbdb50385831a9f3d74c38004))
* adds store to SanityPage type ([acce04f](https://github.com/Open-Study-College/osc/commit/acce04f60add819d33fe60b2cc4dfd8d4c8e549f))
* installs sanity studio to packages ([88ba907](https://github.com/Open-Study-College/osc/commit/88ba907de40248b9be4fa81c771d8d9e5503229b))
* updated files to ts ([3b2a9c7](https://github.com/Open-Study-College/osc/commit/3b2a9c7ceafcbdaaf0e0048c96eb286b0d43b8e4))


### Reverts

* Revert "feat: adds sanity secrets to docker scripts" ([3fccca4](https://github.com/Open-Study-College/osc/commit/3fccca476457de75723e84c356d3224ee2578fa1))



