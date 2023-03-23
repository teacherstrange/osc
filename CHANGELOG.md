## [0.58.0](https://github.com/Open-Study-College/osc/compare/v0.57.0...v0.58.0) (2023-03-23)


### ✨ Features

* add ContactForm ([e3fc9bf](https://github.com/Open-Study-College/osc/commit/e3fc9bf89bf4be1e7df0dd7f5e5fd55986ee84f0))
* add form ids to Sanity forms schema ([9550639](https://github.com/Open-Study-College/osc/commit/95506394469a7389b54602dd28ef55c5e01de13b))
* add forms module to ecommerce ([27fb3be](https://github.com/Open-Study-College/osc/commit/27fb3be1b262bb5ea4daf81a85c9c38a73669833))
* add hubspot env vars to workflows ([2d23a04](https://github.com/Open-Study-College/osc/commit/2d23a043e6b3a5e93df12aea7b559146ce0b7f50))
* add hubspot integration ([994eb2d](https://github.com/Open-Study-College/osc/commit/994eb2da61c5921037250ed67258b1cdde05b3e9))
* add prospectus form schema ([9875352](https://github.com/Open-Study-College/osc/commit/9875352d4bfc6cb293def36bf50fdb4c9d5e29e9))
* add validation for datepicker ([981c6df](https://github.com/Open-Study-College/osc/commit/981c6df446977ba2a72e86781981d546bdba8eee))


### ♻️ Refactors

* add "...rest" props first and so any duplicates are overwritten ([951d366](https://github.com/Open-Study-College/osc/commit/951d3666e3f85125be7534a9170962634f5149a3))
* add "tel" and "mailto" to linkExternal validation list ([971ab23](https://github.com/Open-Study-College/osc/commit/971ab23f3f65d8d65a6936aea8176ae0b3d541c2))
* add ability for slide out button to be on the right or the left ([9a5b227](https://github.com/Open-Study-College/osc/commit/9a5b2271d74a04c9dbd5053cb64f8150b071232b))
* add checks to ensure errors are handled correctly ([c3e2d5a](https://github.com/Open-Study-College/osc/commit/c3e2d5a17d24d57337b28d725bba8e620a5a6f61))
* add client side validation and import InputError from TextInput to reduce code ([7292f05](https://github.com/Open-Study-College/osc/commit/7292f05ebf84ac145278f0ca3b671f906ad15ec2))
* add comment ([1566875](https://github.com/Open-Study-College/osc/commit/1566875a03c9a68f87c68be1c7f5d54154aef2d4))
* add default to "type" attribute ([077cfe0](https://github.com/Open-Study-College/osc/commit/077cfe0acfecb338363c853014b09cffa6cee445))
* add description to Switch components ([c5b1450](https://github.com/Open-Study-College/osc/commit/c5b14500876493e14afb361f58e53bfe5e609ab7))
* add error.length checks to component attributes and useEffects ([de455fb](https://github.com/Open-Study-College/osc/commit/de455fbf4a9b2c694cfa80e93abe71c2a5fb22bd))
* add form component exports ([9868bb0](https://github.com/Open-Study-College/osc/commit/9868bb00e6d0706fa605ee273a277504dec51a0a))
* add forms module in Sanity ([48117e3](https://github.com/Open-Study-College/osc/commit/48117e3e2e6a2dd2aba4f5b26f5fe7f9a74f13f9))
* add getHubspotForm to other routes ([2a5f77e](https://github.com/Open-Study-College/osc/commit/2a5f77e3ead817c70de93a8df021b4c4c11030bf))
* add hubspot types ([ce2d870](https://github.com/Open-Study-College/osc/commit/ce2d870f381098860837538618db9e4833174986))
* add in required props for Select component ([21490c1](https://github.com/Open-Study-College/osc/commit/21490c19d482ac0d4337487270906e7e313ba2c5))
* add inputMode and pattern for input component ([21a364c](https://github.com/Open-Study-College/osc/commit/21a364c5dfa1e45c72907092a2bb0e37171669b9))
* add key to content ([e9ea1a4](https://github.com/Open-Study-College/osc/commit/e9ea1a43f83f3a96f3aa120b473350711ccad7b6))
* add loading text to Button ([b0dd5e7](https://github.com/Open-Study-College/osc/commit/b0dd5e7bdd502caa165ec8f1608283cd15c621cd))
* add mock schema/data files to reduce code ([a473126](https://github.com/Open-Study-College/osc/commit/a473126b6372b70b53a297fb773aa595a25bba0b))
* add optional chaining ([60aaa5f](https://github.com/Open-Study-College/osc/commit/60aaa5f4956a6ab14615ddf77e0f3573d02b8474))
* add ReactNode types import ([eed9e1f](https://github.com/Open-Study-College/osc/commit/eed9e1f4626794c0578123444b9c959a5fe45b32))
* add Remix Form, formErrors, and todos ([b5006b8](https://github.com/Open-Study-College/osc/commit/b5006b832a66c4f0d9403500a2f9f09d26a8229c))
* add tests ([2aebf92](https://github.com/Open-Study-College/osc/commit/2aebf927f79560def9ad6dc2e782886f293b4099))
* add tests to check clientSideValidation function works correctly ([e30aa06](https://github.com/Open-Study-College/osc/commit/e30aa0697a29540b167ff1f6569a6939c56fee41))
* add VisuallyHidden description for Icon button ([a5a6a8c](https://github.com/Open-Study-College/osc/commit/a5a6a8cde819ea68fb96dab914c8f28ef355c528))
* add Zod and React Aria "i18n" package to osc-ecommerce ([903c789](https://github.com/Open-Study-College/osc/commit/903c789b0cff7a763a39c99eef4af28a36e26f4a))
* add Zod package to osc-ui ([bcc3dda](https://github.com/Open-Study-College/osc/commit/bcc3ddac65a8955373d33f5ef74b2f7abff71aba))
* camelCase module name ([09ffa90](https://github.com/Open-Study-College/osc/commit/09ffa904320b3aac6dbe40afd6488cc78004de7d))
* change type to "string" ([f3abd30](https://github.com/Open-Study-College/osc/commit/f3abd30317734b4bea3702ebc8df2d922643eaf8))
* convert comments to jsdocs and add other annotations ([8f4533d](https://github.com/Open-Study-College/osc/commit/8f4533d32bcb03289f9ed557b4c46ab6771fad69))
* correct file name ([f17de88](https://github.com/Open-Study-College/osc/commit/f17de88035cdafd86ea6e523a4b0915654d82361))
* correct name of submit button value ([1d910bf](https://github.com/Open-Study-College/osc/commit/1d910bf1c8f82bbb0a85f4d64840a4a09fffee82))
* create interface for sanityForm mock data ([8391e61](https://github.com/Open-Study-College/osc/commit/8391e61c795533960a90ed442e443415ebea315f))
* ensure ids are unique ([6a51a63](https://github.com/Open-Study-College/osc/commit/6a51a6339ebe129f35d83f754426033b0f1babea))
* fix styling for svgs ([625bbcb](https://github.com/Open-Study-College/osc/commit/625bbcb3946a5a30d0ad005d23364a8cc4cbea4b))
* get submitText from hubspot rather than Sanity ([5e5e50e](https://github.com/Open-Study-College/osc/commit/5e5e50e228ff2f55087c6aa0734a700252b0c35d))
* improve formatting for multiple error messages ([4840b33](https://github.com/Open-Study-College/osc/commit/4840b336ab1384d0d24f7a75541e1c40af7ea1be))
* integrate form container styles into forms.scss ([52184b6](https://github.com/Open-Study-College/osc/commit/52184b6cbe042dbfd3c8339711715ab756bdc11e))
* make "slideOut" and "variant" optional props ([fdca6ea](https://github.com/Open-Study-College/osc/commit/fdca6ea5dc77ff2d33ee28cb5ec5f3caaf9d97c8))
* make the slide out feature dynamic, and update forms module ([a3a4f56](https://github.com/Open-Study-College/osc/commit/a3a4f56239a97c69fe592176b0f0c7aee91f5291))
* make variant and size optional props ([bddfef4](https://github.com/Open-Study-College/osc/commit/bddfef4d4c883afd95f6292630ce3e8bd7f612ca))
* move form related code into ecommerce ([327d15d](https://github.com/Open-Study-College/osc/commit/327d15d807ddf1953ea454cc5399462ec3d358a7))
* move hubspot action into own file, and modify Forms.tsx to use useFetcher ([42f89b1](https://github.com/Open-Study-College/osc/commit/42f89b111371aa223f6168ba338da9ca9732a42c))
* pass closeOnSelect as a prop to DatePicker/DateRangePicker and update tests ([752a0d6](https://github.com/Open-Study-College/osc/commit/752a0d6ab0d9fec23967ea48ee7f94cf3c22a442))
* refactor getting hubspot form into helper function ([bc5b12d](https://github.com/Open-Study-College/osc/commit/bc5b12d27e6a5e8e04864f297100ea2a470b2dc7))
* refactor to allow for multiple forms ([11221ca](https://github.com/Open-Study-College/osc/commit/11221cac03da3b98776808a5ddf31105aaaf5caa))
* remove "test" error in storybook ([f852c91](https://github.com/Open-Study-College/osc/commit/f852c918687bc57dcb91e62ae60b01ea6c1094bd))
* remove ContactForm export ([30f477f](https://github.com/Open-Study-College/osc/commit/30f477f29c05c348fc49f802d3fc284620ad11bd))
* remove content from Sanity and update in ecommerce ([0ac7148](https://github.com/Open-Study-College/osc/commit/0ac714859481c437be1a46428131a1f26400b032))
* remove debugger statement ([0327e16](https://github.com/Open-Study-College/osc/commit/0327e1649b08c5fba8a019d0a26877aa09ab5024))
* remove div wrapper and move RemixForm inside FormContainer ([9c0437e](https://github.com/Open-Study-College/osc/commit/9c0437e5bc66750b00fb8720345b7828eede8a0e))
* remove errors as this will come from useActionData ([9758b68](https://github.com/Open-Study-College/osc/commit/9758b68eeb31f7a60f826b88e6d87a81b23abc8d))
* remove forms content from osc-ui ([b9b98a2](https://github.com/Open-Study-College/osc/commit/b9b98a251faf7f3139410da9f60c3d035ed294ee))
* remove formStyles import ([958aa85](https://github.com/Open-Study-College/osc/commit/958aa852824c34caf061b7bd3267cdf01487841c))
* remove icon prop from TextArea component ([c074b5a](https://github.com/Open-Study-College/osc/commit/c074b5a660f84968e44497cc73bff959b68ad2aa))
* remove margin for "c-content" on the hubspot form & remove hover styling for slide-out btn ([0cd3434](https://github.com/Open-Study-College/osc/commit/0cd343498e0ce7033cc7f1e8842fc29480be102f))
* remove prosepctusForm module ([47c1596](https://github.com/Open-Study-College/osc/commit/47c1596c3eacc8793aea8ffdfea156c6637523d9))
* remove redundant data ([3110c44](https://github.com/Open-Study-College/osc/commit/3110c4411b3232523ed3435df6056441ad7c4692))
* remove redundant import ([5163afe](https://github.com/Open-Study-College/osc/commit/5163afebc858a4363913f574a578f5702a2e53f5))
* remove SpriteSheetProvider from tests and at custom render from "test-utils" ([94a8870](https://github.com/Open-Study-College/osc/commit/94a8870ccea47aef9b6020141b5bb5df6d7eb099))
* remove textContent file ([a11105f](https://github.com/Open-Study-College/osc/commit/a11105fc08b95f2ca21197a9dc040122933d6902))
* simplify TextInput component, update stories, tweak scss, and add client side validation ([61ffc93](https://github.com/Open-Study-College/osc/commit/61ffc93229866186f4b137ae70e44725ba7411dd))
* simplify TextInput component, update stories, tweak scss, and add client side validation ([291ebc7](https://github.com/Open-Study-College/osc/commit/291ebc7ce157a597d8d2400867fe8881ba81b1b4))
* small tweaks to component error handling ([0303034](https://github.com/Open-Study-College/osc/commit/0303034397020259e876f6165658b5df5c801387))
* temporarily add forms.scss directly into main.scss ([9bd2746](https://github.com/Open-Study-College/osc/commit/9bd27464c35d9512b24d441d0bf5973b6dec758e))
* tidy up test imports ([83f39bf](https://github.com/Open-Study-College/osc/commit/83f39bf8a3c190201b9bf3e83e9ad6a3b67ac172))
* udpate storybook and tests ([97c584c](https://github.com/Open-Study-College/osc/commit/97c584cf125a86acfc2926a232e3c4f6389c450d))
* update "ContactForm" to "HubspotForm" & refactor code to pull in form data from Hubspot ([02783c0](https://github.com/Open-Study-College/osc/commit/02783c0c8e37e5708f74b4563f0893336bdca1b5))
* update "content" type and remove variants ([6552aa1](https://github.com/Open-Study-College/osc/commit/6552aa16e629da68eea5966b18846a4cd401b07c))
* update "data" type and other corresponding type updates ([7608c18](https://github.com/Open-Study-College/osc/commit/7608c1870d00c994cfc212e69f7338c63179e076))
* update Checkbox component with validation ([d4e2f4a](https://github.com/Open-Study-College/osc/commit/d4e2f4a825469421fe7b0551ec536acc18b91869))
* update class names in FormContainer component ([28bc49e](https://github.com/Open-Study-College/osc/commit/28bc49e3eb6b7d33cc659dab42f222221e101f2d))
* update classname and refactor scss ([3a73007](https://github.com/Open-Study-College/osc/commit/3a730079aef4c174658b3fa5008d93464849c95f))
* update form value ([58fe055](https://github.com/Open-Study-College/osc/commit/58fe055e10543fe3330984518048203ddc16763e))
* update group name in Sanity to "Settings" ([03f3a16](https://github.com/Open-Study-College/osc/commit/03f3a168d3fb43ffc1e240b7a5a6bca9d2268d18))
* update import path for formsStyles ([0121cb5](https://github.com/Open-Study-College/osc/commit/0121cb5780675019381cbd406b0407efa8dda222))
* update mockData, apply to stories/tests, and update tests ([6c66984](https://github.com/Open-Study-College/osc/commit/6c66984094df5177e73fa9a1e48b235d8d975b5b))
* update names for hubspot env vars ([efef49a](https://github.com/Open-Study-College/osc/commit/efef49a17b5154a04934e298e7e2996b4f84f07f))
* update Radio component with validation and fix tests ([8ddf4a6](https://github.com/Open-Study-College/osc/commit/8ddf4a64d88047317cb119d1acb90761451abeaf))
* update readme and env.sample with hubspot env vars ([fc5960e](https://github.com/Open-Study-College/osc/commit/fc5960ec8b43f5a0ebf619d87fdb17870714ed1b))
* update schema to return form name and id ([5697d36](https://github.com/Open-Study-College/osc/commit/5697d36f437dc526a44b1cb1df04054ec536a43f))
* update Select  component with validation and validation test ([62dfacf](https://github.com/Open-Study-College/osc/commit/62dfacfe80c1d30291067d935994993af378fac1))
* update spacing on Select component ([76405d7](https://github.com/Open-Study-College/osc/commit/76405d739347e99acd5790165472364edfc374fa))
* update stories to use textContent.ts and add SpritesheetProvider ([2441de4](https://github.com/Open-Study-College/osc/commit/2441de4d76663e2dc9da5da5d5f25cfe3f0454a3))
* update storybook ([7704fab](https://github.com/Open-Study-College/osc/commit/7704fab5f0c4e24d37f66856856528e27373da41))
* update storybook to remove warnings and spread rest props to remove errors ([747039c](https://github.com/Open-Study-College/osc/commit/747039c7b9ae3159fa57e5a33fdee3185d772e55))
* update Switch component with validation, validation test and aria fixes ([a9d3ae9](https://github.com/Open-Study-College/osc/commit/a9d3ae9ccebf36dddb4221d53adfd6c545c19fbc))
* update Switch component with validation, validation test and aria fixes ([4d7edf1](https://github.com/Open-Study-College/osc/commit/4d7edf1422adfa00b857fd7d2cf2699ef61d0267))
* update TextArea tests ([b0104b3](https://github.com/Open-Study-College/osc/commit/b0104b3392e563c40d32f246d0f16a890447d594))
* update TextInput tests ([95b623d](https://github.com/Open-Study-College/osc/commit/95b623d02949ec6134f49af14fa063e6fe207a03))
* update types & remove references/redundant files related specifically to the ContactForm ([fc3301c](https://github.com/Open-Study-College/osc/commit/fc3301c845bb31c44f81ae7eb2ab3e0b3e788227))
* update types and add eslint disable "react-hooks/exhaustive-deps" ([b82139f](https://github.com/Open-Study-College/osc/commit/b82139f10b45cf8b60e1a01946ac321e4ffc79e5))
* update types on contactForm interface ([40ba530](https://github.com/Open-Study-College/osc/commit/40ba530830ef6f1348f63f0ab4f5d55f4c54f362))
* use Content component, merge title and description together and add actionText to Sanity ([3e8e10e](https://github.com/Open-Study-College/osc/commit/3e8e10e780c02fd4db8adc6def0c537c4d3e2987))
* use hubspotFormData instead of textContent ([66d2c2c](https://github.com/Open-Study-College/osc/commit/66d2c2c2ef84672133da42b4e5ddfd71f195f524))
* use sanityFormData instead of textContent and add classname to parent div ([61d7ad4](https://github.com/Open-Study-College/osc/commit/61d7ad4e76ba5f7b76f9c3a0aaaa8369331a1d7c))
* wrap in components layer ([c206211](https://github.com/Open-Study-College/osc/commit/c206211d1a7b87ec4030f2accce331542d207acc))
* wrap in fragment ([b847630](https://github.com/Open-Study-College/osc/commit/b847630f62dbbca7735c56add8149f22b7cdf3f0))

## [0.57.0](https://github.com/Open-Study-College/osc/compare/v0.56.6...v0.57.0) (2023-03-22)


### 📦 General Housekeeping / Package Updates

* **callout banner:** update storybook descriptions ([13916a5](https://github.com/Open-Study-College/osc/commit/13916a5ac6463a80fd7dd9e97d3ca4a087ebaf90))


### 🧪 Tests

* **callout banner:** adds tests ([a048144](https://github.com/Open-Study-College/osc/commit/a048144f6d81b2ec123c98a9555ad65352ad5824))


### ✨ Features

* **callout banner:** add initial stories ([c30c579](https://github.com/Open-Study-College/osc/commit/c30c57962afc6955d05131d09a86d627d264d40b))
* **callout banner:** adds footer ([604a622](https://github.com/Open-Study-College/osc/commit/604a622783681fd10330019c324ce1aed6a5da10))
* **callout banner:** adds footer story ([c12027c](https://github.com/Open-Study-College/osc/commit/c12027c45754ffa0b0d1c4ad0e783426587d6ebd))
* **callout banner:** adds initial variant styles ([4549e75](https://github.com/Open-Study-College/osc/commit/4549e7575d35ba3e26a9c9c3a10cead9f1226810))
* **callout banner:** init files ([2769b7b](https://github.com/Open-Study-College/osc/commit/2769b7b9ac691f6fce175b5e5d9db41637da19a3))
* **callout banner:** update styles to account for image ([4d25443](https://github.com/Open-Study-College/osc/commit/4d25443f52a2ec09a4910663b79acd12c1293419))


### 🐛 Bugs

* **callout banner:** fix typo in test import ([90a304a](https://github.com/Open-Study-College/osc/commit/90a304aea75d91ad6f7987a9069110cdbfa77a7e))


### ♻️ Refactors

* **callout banner:** add image story ([5245adf](https://github.com/Open-Study-College/osc/commit/5245adf02413ed1716af2246c020183acbcf3f78))
* **callout banner:** change image width to fixed value to prevent resize when loading ([968f284](https://github.com/Open-Study-College/osc/commit/968f284dd9033e546c61b4bcd5525fbb4b4c3848))
* **callout banner:** extract breakpoint into it's own variable ([1c9c9d0](https://github.com/Open-Study-College/osc/commit/1c9c9d0e474c94a28cb8dcf00f0aab27bfd2551c))
* **callout banner:** make slotable component polymorphic with asChild prop ([c860523](https://github.com/Open-Study-College/osc/commit/c8605237d3822ed82cfcd3677045cb0f27520662))
* **callout banner:** refactor html into components ([32d26da](https://github.com/Open-Study-College/osc/commit/32d26dacbcac4405fe49234895d0ed2a0bacb230))
* **callout banner:** update breakpoint for responsive button size ([6298da8](https://github.com/Open-Study-College/osc/commit/6298da8cbf60ccf430d8e97b66f001e6e89789d0))
* **callout banner:** update css to use flex over grid ([c59483a](https://github.com/Open-Study-College/osc/commit/c59483a704d80cea73ea1b88f70d1f0d2fb0f90d))
* **callout banner:** use Slot to flatten markup ([04739a3](https://github.com/Open-Study-College/osc/commit/04739a39b701fff88506e454046913b0d708202c))
* **callout banner:** wrap styles in components layer ([0b32241](https://github.com/Open-Study-College/osc/commit/0b3224191736e971e96c48507e8478accbca9470))
* **styles:** adds important tag to background colours ([b2d188c](https://github.com/Open-Study-College/osc/commit/b2d188c8f0a3c2a74d516afb971c50873815e018))
* **styles:** change line height of 7xl font size ([c1c3315](https://github.com/Open-Study-College/osc/commit/c1c3315b2087aef44dd65c2e0d31431f9f07ded2))

## [0.56.6](https://github.com/Open-Study-College/osc/compare/v0.56.5...v0.56.6) (2023-03-22)


### 🐛 Bugs

* **carousel:** remove full height from carousel ([f990037](https://github.com/Open-Study-College/osc/commit/f990037323b0b1f2add5a67194e29789a37d3a8b))

## [0.56.5](https://github.com/Open-Study-College/osc/compare/v0.56.4...v0.56.5) (2023-03-22)


### 🐛 Bugs

* **types:** update sanity button types ([6ad3e68](https://github.com/Open-Study-College/osc/commit/6ad3e689d622ef6c933083efe12c180efd673e98))


### ♻️ Refactors

* **button:** add initial value and validation to button type ([02c5fb9](https://github.com/Open-Study-College/osc/commit/02c5fb9bae33eab8c5f67897c6b594a61b6c9415))
* **content:** add icon to button within content component ([9f7c4a1](https://github.com/Open-Study-College/osc/commit/9f7c4a12ec1bc5ad6cfc7043709991ebfb312b7c))
* **ecommerce:** add icon to button component ([eaa0bb1](https://github.com/Open-Study-College/osc/commit/eaa0bb1b6997eb525fae963fa72356b4e7d60324))
* **ecommerce:** add missin prop to button component ([af2cb43](https://github.com/Open-Study-College/osc/commit/af2cb43e2a0c521becf3fe59c691abb456f72f15))
* **studio:** add icon picker to button module ([9426057](https://github.com/Open-Study-College/osc/commit/94260574c6843758e5a59b9c2f10f35cd473dbd0))

## [0.56.4](https://github.com/Open-Study-College/osc/compare/v0.56.3...v0.56.4) (2023-03-22)


### ♻️ Refactors

* **content:** add a full width prop ([bbf9066](https://github.com/Open-Study-College/osc/commit/bbf9066c5c7c3d40bc391f3e24315626fec2f3fa))
* **ecommerce:** integrate the full width control into ecommerce app ([db3755f](https://github.com/Open-Study-College/osc/commit/db3755f2a290dedb58e3d0c2fdd16dafe0f0bbc2))
* **ecommerce:** wrap content with container class ([8117374](https://github.com/Open-Study-College/osc/commit/8117374e150b7c0f6147c8760a903fe894ae910b))
* **studio:** add a full width control to studio ([1a17194](https://github.com/Open-Study-College/osc/commit/1a17194001c76b6527ec2a14df96e7f9924478ff))
* **styles:** set a max width to content and add a full width modifier ([fedc808](https://github.com/Open-Study-College/osc/commit/fedc808c3e1c97022969503a52ee46ef81bf8474))

