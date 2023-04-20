## [0.75.0](https://github.com/Open-Study-College/osc/compare/v0.74.0...v0.75.0) (2023-04-20)


### ✨ Features

* **ecommerce:** adds background colour to the main element on product pages ([b38b9bf](https://github.com/Open-Study-College/osc/commit/b38b9bfccfadd3dd12168cc58463e04db6b6fc05))
* **ecommerce:** adds utility function to get the page type ([1a6e3f2](https://github.com/Open-Study-College/osc/commit/1a6e3f2f2c6c494079edab5f0c307609025fccf9))
* **modules:** adds an isFlush prop through to modules ([01754d2](https://github.com/Open-Study-College/osc/commit/01754d2d84cefbf1f1d408314a38ee8a3ca36715))
* **product page:** adds initial layout styles ([b285254](https://github.com/Open-Study-College/osc/commit/b285254a0b6a5b87847e53ff6779b8dce44c731a))
* **product page:** adds varaint sku to query ([a306eba](https://github.com/Open-Study-College/osc/commit/a306ebad8dd605b2e46bca07b9ff004fa930650b))
* **product page:** adjusts breakpoints for upper content grid ([4478607](https://github.com/Open-Study-College/osc/commit/4478607bda6ea2e291c699d4224dedb3a6581808))
* **product page:** extend SanityProduct type from SanityPage ([b1d7c17](https://github.com/Open-Study-College/osc/commit/b1d7c178435231cf4fbd1eb98a43014aef98055d))
* **product page:** filter out duplicate skus ([5565d83](https://github.com/Open-Study-College/osc/commit/5565d8336a8d91901fcc3d7c91dea0af0eb7fce6))
* **styles:** adds new utility classes ([8120ed0](https://github.com/Open-Study-College/osc/commit/8120ed05d4992bfa918599be95e787efd7e06b9f))


### 🐛 Bugs

* **product page:** add optional chaining to variants.nodes ([0fadc1a](https://github.com/Open-Study-College/osc/commit/0fadc1a288c02387a65b8485bc0acc4c68af85d5))
* **typescript:** add Maybe generic to content fullWidth prop ([cccee2b](https://github.com/Open-Study-College/osc/commit/cccee2bfa61a2f9dbc0ddce7796952ca2e47c787))
* **typescript:** add osc-design-tokens declaration file ([0660715](https://github.com/Open-Study-College/osc/commit/066071598b8200c644177c5c4b12828cdb0064fd))


### ♻️ Refactors

* **product page:** adds optional chaining to variants check ([35a98b8](https://github.com/Open-Study-College/osc/commit/35a98b891f014e66bc48b49147145ffafa7fd553))
* **tabs:** add background color ([b759f61](https://github.com/Open-Study-College/osc/commit/b759f6171a8b1230b34679ed1921208821b18c9e))

## [0.74.0](https://github.com/Open-Study-College/osc/compare/v0.73.0...v0.74.0) (2023-04-20)


### ✨ Features

* **accordion:** add container to accordion module ([1c6ddf5](https://github.com/Open-Study-College/osc/commit/1c6ddf5350eb823bdaf8b46376b64690276848c7))
* **tabs:** add spacing controls to tabs on ecommerce ([f996bdd](https://github.com/Open-Study-College/osc/commit/f996bdd9533a1c4f60de26b47e3cc0445a761a14))
* **tabs:** add tabs query ([6b01142](https://github.com/Open-Study-College/osc/commit/6b01142a21d59d987e447f2e8ee357d974ace45f))
* **tabs:** add tabs type ([6881852](https://github.com/Open-Study-College/osc/commit/68818522cf465c5872c55ff52c483f5d66268fd8))
* **tabs:** adds tab component to osc-ecommerce ([db98527](https://github.com/Open-Study-College/osc/commit/db98527cd60d916e021055dc374204a5909ecbcc))
* **tabs:** adds tabs module to sanity ([5c3d846](https://github.com/Open-Study-College/osc/commit/5c3d846e8d17fa1cf229d98f78c9925fa774ebb2))


### 📦 General Housekeeping / Package Updates

* remove todo ([7f4de56](https://github.com/Open-Study-College/osc/commit/7f4de566c5d7f8ab9a280c3b5d77f25f99d377de))
* **tabs:** export tabs from osc-ui ([a8968df](https://github.com/Open-Study-College/osc/commit/a8968df4f9c128c7caa4991da5c85c9b4021cd52))


### 🧪 Tests

* **tabs:** adds tests for ecommerce tabs component ([09e93ea](https://github.com/Open-Study-College/osc/commit/09e93ea583a098e760656ce140c1dae0cecfc6f9))


### 🐛 Bugs

* **accordion:** fixes accordion count in the preview ([05e70b5](https://github.com/Open-Study-College/osc/commit/05e70b52312aa273eb0dd4da5e0d94ac3273aed9))
* **ecommerce:** move design token declaration into it's own file ([d5594dc](https://github.com/Open-Study-College/osc/commit/d5594dca16895f8c70280ae06646ba55ff1ee523))
* **products page:** fixes typo in returned dynamic links data ([c94a963](https://github.com/Open-Study-College/osc/commit/c94a963c28643241c5b71adb013504a29b80ef63))
* **tabs:** fix typo ([92f6884](https://github.com/Open-Study-College/osc/commit/92f6884a24a160845956e89e0245657d877ee2c6))
* **tabs:** fix typo in media query ([18b4a11](https://github.com/Open-Study-College/osc/commit/18b4a113aac12be4c7c162e59fe9b6b2780ea282))
* **tabs:** move child modules into own fragment so we can reference correctly inside tabs ([a441073](https://github.com/Open-Study-College/osc/commit/a441073b17fca13071f0d2908d951baeda2680c0))

## [0.73.0](https://github.com/Open-Study-College/osc/compare/v0.72.0...v0.73.0) (2023-04-20)


### ✨ Features

* **courses page:** adds above the fold content section to Sanity ([d4e8858](https://github.com/Open-Study-College/osc/commit/d4e88586ba08f54e07cac10e50e1bfe40fabb0d6))


### 📦 General Housekeeping / Package Updates

* **courses page:** adds description to modules section ([b8cbc9c](https://github.com/Open-Study-College/osc/commit/b8cbc9ce2b9ff6fc07bfa67cf60b071de37e6247))


### 🐛 Bugs

* **saity:** add optional chaining to prevent error when loop is undefined ([2a8c70b](https://github.com/Open-Study-College/osc/commit/2a8c70b00d1da5a087cdf54a7ab3a83feb38ea0a))

## [0.72.0](https://github.com/Open-Study-College/osc/compare/v0.71.0...v0.72.0) (2023-04-20)


### 🧪 Tests

* **tabs:** adds tabs test ([93a7788](https://github.com/Open-Study-College/osc/commit/93a77888fa9567cbbb7f97e844e739beb944c9dc))


### ✨ Features

* **tabs:** add classnames based on scroll position of overflowing triggers ([51d32bc](https://github.com/Open-Study-College/osc/commit/51d32bc499d3b1aaacff076e461ce93e672845a4))
* **tabs:** add styles ([64ffe2a](https://github.com/Open-Study-College/osc/commit/64ffe2a490b51ec4588abb4f9b24116c706194de))
* **tabs:** adds responsive styles ([b922dbf](https://github.com/Open-Study-College/osc/commit/b922dbff507ea01d6e76a54caa0562483908c962))
* **tabs:** adds semantic tags ([adc25b2](https://github.com/Open-Study-College/osc/commit/adc25b2bb4adfd67ae623f5dff6c5d9e954f144d))
* **tabs:** center tabs ([1bdbb87](https://github.com/Open-Study-College/osc/commit/1bdbb876897dc1ded69ebc9684a0e72ab6a66f04))
* **tabs:** centers trigger text ([0473eea](https://github.com/Open-Study-College/osc/commit/0473eead079c0f510de7fb77cd4050c8c95f2262))
* **tabs:** updates stories ([44affa5](https://github.com/Open-Study-College/osc/commit/44affa5dd81c71c17783c5df608d1a69c2b1be99))


### ♻️ Refactors

* **tabs:** remove block padding ([2ea2a68](https://github.com/Open-Study-College/osc/commit/2ea2a6807d663b8e1620c7063e6a25df5ddb14ba))
* **tabs:** remove forceMount ([be7b2c1](https://github.com/Open-Study-College/osc/commit/be7b2c1a267ca2e1c9024e1a60021765b30e47ab))
* **tabs:** update tabs to be composable ([607b32c](https://github.com/Open-Study-College/osc/commit/607b32cd25db1a044eb38d1128cc71a702cc84dd))

## [0.71.0](https://github.com/Open-Study-College/osc/compare/v0.70.0...v0.71.0) (2023-04-20)


### 🐛 Bugs

* add Label prop to textInput and textArea to differentiate name and id props ([a445a7c](https://github.com/Open-Study-College/osc/commit/a445a7c43faa04abd9793c31fc0d1ee3a8103100))


### ✨ Features

* add prospectus form id ([8e9ed0a](https://github.com/Open-Study-College/osc/commit/8e9ed0a89b815402655933b89a4496d48807db86))
* add select component and select validation ([2116650](https://github.com/Open-Study-College/osc/commit/21166503de6fb14bca9503ac5cfcf0c1904f7dc5))


### ♻️ Refactors

* add "Search" label to TextInput in Autocomplete ([a017521](https://github.com/Open-Study-College/osc/commit/a017521864795405ffce92719e9cc2ed46828761))
* add a reset for form error alerts ([0c9e0f0](https://github.com/Open-Study-College/osc/commit/0c9e0f0ac013c7ba970631e8250e08e293ef0dfd))
* add additional check ([aede703](https://github.com/Open-Study-College/osc/commit/aede703f65f309f37b3e2c4892f7c20bf8e44414))
* add additional uniqueIds to resolve server/client id mismatches ([e71ceed](https://github.com/Open-Study-College/osc/commit/e71ceed9dc9623eb2dcc30e70821d1e4766a9782))
* add check no array length ([0d60813](https://github.com/Open-Study-College/osc/commit/0d60813197c6781a43166e099294dcc75227ae5e))
* add checkbox group, move error handling & update arguments passed to clientSideValidation ([dd77d22](https://github.com/Open-Study-College/osc/commit/dd77d22abc3ac1c9815171dfddb30c7d210617a4))
* add checkbox, label and radio styles ([c1f6746](https://github.com/Open-Study-College/osc/commit/c1f6746a7eedf87946ba21dd54ccf8c9e252deca))
* add datepicker stylesheets ([aca4d14](https://github.com/Open-Study-College/osc/commit/aca4d14222884d690862974b96abcfabde32d71f))
* add datepicker to utils, update validation, add "name" prop and update components/tests ([f244c25](https://github.com/Open-Study-College/osc/commit/f244c2576a417a9eadf4d4cc256e118d0520e622))
* add error-alert class ([b846d9d](https://github.com/Open-Study-College/osc/commit/b846d9dce52b595a5ad5b44586c04a59f6d123bd))
* add exports for Checkbox and Radio components ([7afaf60](https://github.com/Open-Study-College/osc/commit/7afaf60577b7ddf8c81c15453ca451585bc8c42c))
* add functionality for successful submission ([d1f2f63](https://github.com/Open-Study-College/osc/commit/d1f2f635a31650c08710d6dd4ab1cd4d73b52efa))
* add getFormFields to validation function ([23c9a55](https://github.com/Open-Study-College/osc/commit/23c9a55ab6703725df54cd8ca7134d95aa5dc2a7))
* add hubspot helper tests ([2f7a66d](https://github.com/Open-Study-College/osc/commit/2f7a66d6dab4520e78bcc2754aa5d27c34ad4e37))
* add inline styling for form inputs ([22674a4](https://github.com/Open-Study-College/osc/commit/22674a45c6e3109dc731e8e3d722e4cb0633787a))
* add isWhite prop and styles ([3bd0ecb](https://github.com/Open-Study-College/osc/commit/3bd0ecbf0e3ffcd9ddfdf7d4c218a4936c9c31f9))
* add JSDocs and correct function argument type ([ad2b8d0](https://github.com/Open-Study-College/osc/commit/ad2b8d06c6ea0a3813ed124f73fbaa43fa9d07a9))
* add key to Form to ensure that the Select component gets reset when the form is submitted ([b2cc010](https://github.com/Open-Study-College/osc/commit/b2cc0109c30dc94b79df316e2fa36a17ac16250b))
* add layer component, restructure and remove redundant css ([b07bca4](https://github.com/Open-Study-College/osc/commit/b07bca4758897df616fcdda776c727b8f69bc8fa))
* add radio and checkbox, and just return results instead of assigning/pushing into array ([4475c8f](https://github.com/Open-Study-College/osc/commit/4475c8fee5b33223b89fc46b72ef700dca4c4c6d))
* add required and group error styling/classes ([4378f23](https://github.com/Open-Study-College/osc/commit/4378f230589a7328fcc97f4576c1a9d1ddafac27))
* add Select and SelectItem component imports ([d787953](https://github.com/Open-Study-College/osc/commit/d787953a0b22bb9f4d0e94b316da6e8625c4a5fb))
* add spacing in Sanity ([ffc20ba](https://github.com/Open-Study-College/osc/commit/ffc20ba4788db7282c361507d50b6ccd430646c1))
* add SSR Provider and I18n Provider ([d840a6a](https://github.com/Open-Study-College/osc/commit/d840a6ac98216f686fad30fd544112565c746785))
* add styling for contact-form ([acb4dd0](https://github.com/Open-Study-College/osc/commit/acb4dd032f5e991c97b96ee1de1830afb618e580))
* add target ([4a8f5aa](https://github.com/Open-Study-College/osc/commit/4a8f5aa6e134e4257ef6a17e70767642909ca007))
* add tests for utils ([1e636af](https://github.com/Open-Study-College/osc/commit/1e636af497b7103854c518fa3c1daa9abf8f1c37))
* add ts-ignore next-line ([f113302](https://github.com/Open-Study-College/osc/commit/f113302ef9ca8e16cfdfbe203275e48d217b8403))
* add uniqueId for label ([ff3d220](https://github.com/Open-Study-College/osc/commit/ff3d2202c47d80dac603999c0dae9cdbaf31abcf))
* add utils and jsdocs ([4cd1d70](https://github.com/Open-Study-College/osc/commit/4cd1d709572b2c96e05021bdac0b08a21adae712))
* coerce entries to string ([dd1c679](https://github.com/Open-Study-College/osc/commit/dd1c679e1eb2cc73ca48b41571dcdb01cfbc7d2e))
* consolidate form errors ([8ea7a6f](https://github.com/Open-Study-College/osc/commit/8ea7a6ffb399a1fad312347bbba9a815c70c6b65))
* correct classname ([0878584](https://github.com/Open-Study-College/osc/commit/0878584cb81cd4aaabf3b8071750a1a796f1cdaf))
* correct import name ([80da579](https://github.com/Open-Study-College/osc/commit/80da579e7f2b2218f8233ea1e75f5246162ac2f1))
* correct styling for when label text overflows onto multiple lines ([9831311](https://github.com/Open-Study-College/osc/commit/98313111cb35964d2137cea54a5fd195953121bd))
* create formData const for clarity ([aaddc5d](https://github.com/Open-Study-College/osc/commit/aaddc5d8298a43fd3b0dab47d12e4ce77a26b7b2))
* css tweaks ([211129a](https://github.com/Open-Study-College/osc/commit/211129a6e4b70610bffb520841a2d25ef9d58b73))
* fix "variants" ts error ([6c063b4](https://github.com/Open-Study-College/osc/commit/6c063b42c948144eb899a80c3fa245c33e22bf6c))
* fix display issue when datepicker modal is active ([d5ca54a](https://github.com/Open-Study-College/osc/commit/d5ca54a15da0daa57ef8ccf00b539df74f106959))
* fix form in storybook and create relative route to utils/validation to fix storybook error ([16ea39c](https://github.com/Open-Study-College/osc/commit/16ea39cb270ae548bdd0a6be10bd3b0ff45c14b7))
* fix module.forms and add Callback Form Id ([5a3d945](https://github.com/Open-Study-College/osc/commit/5a3d945a8f82c21a23dd2ff55cf2367df5ff4946))
* fix tests ([2252c53](https://github.com/Open-Study-College/osc/commit/2252c5307ff257f7ef4ec7a7ca3dfa22dcaed52a))
* fix ts error ([6e3908c](https://github.com/Open-Study-College/osc/commit/6e3908c12ffd307644d65da5e234bf8642042231))
* make spacing and sizing is consistent between all form components ([93a3087](https://github.com/Open-Study-College/osc/commit/93a3087e7dd3de3f6a195ee03f737bd8404d2641))
* make variants prop for TextInput more generic ([35f5bd4](https://github.com/Open-Study-College/osc/commit/35f5bd4182afce90f3854ce1761e93de14313b94))
* more form name variant into the formContainer classes ([343e1c4](https://github.com/Open-Study-College/osc/commit/343e1c4065d78b227f9ac5a1d9d4e16d495ef584))
* move SSR provider from root.tsx to entry.client.tsx and entry.server.tsx ([2a796e1](https://github.com/Open-Study-College/osc/commit/2a796e1234b70ca0664081dc10d567e301a00f59))
* pull in styles and themeName from hubspot to allow for more conditional styling ([6569663](https://github.com/Open-Study-College/osc/commit/656966336cd28f0216a85572126963072d16951b))
* refactor successful submission content and use Alert component ([7cfa1d4](https://github.com/Open-Study-College/osc/commit/7cfa1d4e469d450e005b506031f131db4b4fcb9d))
* refactor to enable multiple inline input fields from hubspot ([2709ba6](https://github.com/Open-Study-College/osc/commit/2709ba61a781eb10b0e5cbba750a4459c4e06575))
* remove datepicker from mockdata ([3a71a56](https://github.com/Open-Study-College/osc/commit/3a71a5661816e159f6ebbfc3dba4e02363769047))
* remove description and update Checkbox client validation parameters ([29a1891](https://github.com/Open-Study-College/osc/commit/29a1891a2896a0a39e254eda3b298e893cb0595e))
* remove form widths, add max-width to the form-container, and add c-form class to root div ([dfee3d3](https://github.com/Open-Study-College/osc/commit/dfee3d3ca93ed7b75c545fb77d818396b75f751e))
* remove redundant key ([44b64e2](https://github.com/Open-Study-College/osc/commit/44b64e2b715765764be20f47cc5e6d7c72e1d5af))
* remove slide-out code ([2b03123](https://github.com/Open-Study-College/osc/commit/2b0312316e1143463a4a055279297acbcab28034))
* rename form submission value to be more generic ([0efe85c](https://github.com/Open-Study-College/osc/commit/0efe85cf5371de6fb2ae5775dcd2e5872be180a2))
* return error if action is not submitting a form ([d8c0bf9](https://github.com/Open-Study-College/osc/commit/d8c0bf98a00be14a867ac160ae111cb9ead93e35))
* temporarily disable test ([a970177](https://github.com/Open-Study-College/osc/commit/a9701778ed026a647dc2daa39b653e20cd522450))
* tidy up and add some additional checks ([a5b3529](https://github.com/Open-Study-College/osc/commit/a5b352934960ec0cc380f4fcf1f60940d69b1579))
* update Checkbox stories to include CheckboxGroup wrapper ([d510dd7](https://github.com/Open-Study-College/osc/commit/d510dd74064f4baed674d2e4df379398b23dd39f))
* update failing tests ([b25d73e](https://github.com/Open-Study-College/osc/commit/b25d73e5f82bd16449f89d3d98e0d81e1eba46bd))
* update Hubspot form tests ([229a079](https://github.com/Open-Study-College/osc/commit/229a0794d23ae50a4ac05aedc50d9265b0e567df))
* update storybook to the callback form ([4f54edc](https://github.com/Open-Study-College/osc/commit/4f54edc29c31f3d6b27d94971c23e3330a02f95e))
* update type and check input is string ([cbdb097](https://github.com/Open-Study-College/osc/commit/cbdb097919f201489de0b94f9d7953bab0f2fa57))
* update types ([94f5bb4](https://github.com/Open-Study-College/osc/commit/94f5bb4f380edcd251836f4e08ded2ae94d94428))
* update user error messages ([929adbc](https://github.com/Open-Study-College/osc/commit/929adbc86f600fdb595a867d7d16da2e88df29b4))
* update validateAction function and move adding schema validation function ([46a3de3](https://github.com/Open-Study-College/osc/commit/46a3de3987f78daf913a6de8de228a352e9c6523))
* update var to const ([ee12500](https://github.com/Open-Study-College/osc/commit/ee12500d69c630c9fdf0ba89d6ff86aca848a60d))
* wrap DateField component in i18nProvider to ensure correct locale ([d2b3005](https://github.com/Open-Study-College/osc/commit/d2b30052d167ded9fbb3371fbc7dd119aebd6e13))

