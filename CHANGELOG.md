## [0.42.1](https://github.com/Open-Study-College/osc/compare/v0.42.0...v0.42.1) (2023-02-21)


### 🐛 Bugs

* **styles:** interpolate step in scales-map to convert type to string ([f543cf7](https://github.com/Open-Study-College/osc/commit/f543cf7aad17546ae9df69976b72b746a45719cd))

## [0.42.0](https://github.com/Open-Study-College/osc/compare/v0.41.2...v0.42.0) (2023-02-17)


### 🧪 Tests

* **video:** adds overlay tests ([27d1ab1](https://github.com/Open-Study-College/osc/commit/27d1ab1a4eeb8a95a91b229273c9f50a48e439fb))
* **video:** adds tests ([a4233b0](https://github.com/Open-Study-College/osc/commit/a4233b03314ca3d5a374b4e8fe1da7f6671a4a81))
* **video:** updates classname check test ([66400a1](https://github.com/Open-Study-College/osc/commit/66400a10da83d3cdcd90b9c321912d048e0bc3fd))


### ✨ Features

* **ecommerce:** adds query for video ([66258ff](https://github.com/Open-Study-College/osc/commit/66258ffe20a16288a9e2c7eb82d487446eb891d8))
* **ecommerce:** adds videoplayer to sanity modules ([3d9dd99](https://github.com/Open-Study-College/osc/commit/3d9dd99fc994fb539fc9a808159abe8839877375))
* **studio:** adds video schema to studio ([f77f0cf](https://github.com/Open-Study-College/osc/commit/f77f0cf95de241232725e0d07e34edce5ff75894))
* **video:** add overlay as subcomponent ([b2c74d4](https://github.com/Open-Study-College/osc/commit/b2c74d41c9094a0aec8e54647db31e7811084bb8))
* **video:** adds autoplay and overlay ([8d5bf73](https://github.com/Open-Study-College/osc/commit/8d5bf73b272d096c0aa3b3b7d2426acd6a549aa0))
* **video:** adds custom play button/icon ([8aea980](https://github.com/Open-Study-College/osc/commit/8aea980774d577b44336b26ddbea411ec972e325))
* **video:** adds details to storybook ([c670717](https://github.com/Open-Study-College/osc/commit/c6707173c05b518fb038b033a220dc1cede8253a))
* **video:** adds fallback background colour ([55604ad](https://github.com/Open-Study-College/osc/commit/55604ad2780d4ea661e3ab2cd2009ef03605ff18))
* **video:** adds initial video component ([501b7ed](https://github.com/Open-Study-College/osc/commit/501b7ed49a83fbca9c841f00ef5c370dbca4b30b))
* **video:** adds intersection observer hook to pause player when it's out of view ([df59590](https://github.com/Open-Study-College/osc/commit/df59590697b3b99cbd5df7e51d69aa8eb0116a46))
* **video:** adds loop prop ([477b970](https://github.com/Open-Study-College/osc/commit/477b970dbbfcc8c221674d162bf7a0c84bc79359))
* **video:** adds overlay to preview image ([902531c](https://github.com/Open-Study-College/osc/commit/902531cbb21a28ef17c4c2bd57593ddafdfddd98))
* **video:** adds storyt to preserve the overlay ([90d2975](https://github.com/Open-Study-College/osc/commit/90d29750e990ffa7a45479a33c9c58a2c1152490))
* **video:** adds z-index to put play button over the overlay ([08a748d](https://github.com/Open-Study-College/osc/commit/08a748d4b539bcd5c414dfaa925e3c67a8649f20))
* **video:** export video player from osc-ui ([8b74616](https://github.com/Open-Study-College/osc/commit/8b74616df4c651bf33bf466039d52ce0e7adef79))


### 🐛 Bugs

* **video:** remove max-width and set width on wrapper ([2863bb6](https://github.com/Open-Study-College/osc/commit/2863bb674fb7711e8e3d300f10c4b78f8b0c72e7))


### 📦 General Housekeeping / Package Updates

* **video:** add todo as reminder to remove spritesheet path prop ([18cbb9d](https://github.com/Open-Study-College/osc/commit/18cbb9d20913794f624ab3cb6b7dcd5d3ccff5f9))
* tidy up todos ([be7522c](https://github.com/Open-Study-College/osc/commit/be7522c52dc70014142b64e925b4ffe76172dacc))
* update comment for better clarity ([46e423e](https://github.com/Open-Study-College/osc/commit/46e423e86737d95afd839ffde3b70fb9c2ba00de))
* **storybook:** add max width to video story ([471422c](https://github.com/Open-Study-College/osc/commit/471422c1a5f1a29fa5819a4c8ec665f314d3c824))
* **video:** installs react-player package ([5a0726b](https://github.com/Open-Study-College/osc/commit/5a0726b7378e8b9da48592f21d0765b4ee5dcb22))


### ♻️ Refactors

* **ecommerce:** update text area component name to match other naming convention ([68bc86f](https://github.com/Open-Study-College/osc/commit/68bc86fee42fdb3f1e0408dc6da2d84791733295))
* **studio:** rename preserveOverlay to preserveContent ([2b90a8b](https://github.com/Open-Study-College/osc/commit/2b90a8b7c5f20ec1057c9fbf8c9b4bca407c4c7f))
* **styles:** adds focus style mixin ([1c39874](https://github.com/Open-Study-College/osc/commit/1c3987456403ae67371ae168c3db006545331815))
* **video:** adds classname to overlay if content is preserved ([b82fe65](https://github.com/Open-Study-College/osc/commit/b82fe65ee1242d33880fef3adc9ade7538530c53))
* **video:** adds iconPath prop so we can pass spritesheet path ([465344a](https://github.com/Open-Study-College/osc/commit/465344aad7a3ccf28eff1fe181efb173ffb4d3bd))
* **video:** change overlay to have 0 opacity rather than render ([1d92869](https://github.com/Open-Study-College/osc/commit/1d92869fdb79c64ed28f2c5c5173f0e47414acca))
* **video:** extract props into object so we can reuse them across both components ([751c2ee](https://github.com/Open-Study-College/osc/commit/751c2ee547fcc1fe0792bd0b85ce2e62845c301d))
* **video:** remove temporary icon path fix ([9e93bb0](https://github.com/Open-Study-College/osc/commit/9e93bb04e9f4b559f9d49610ddc6a9dec5a582f7))
* **video:** replace react-player/lazy with youtube & vimeo packages ([41ac6cf](https://github.com/Open-Study-College/osc/commit/41ac6cfb96b0a96e1639e740ab25645e5081f881))
* **video:** update media queries to use variable name ([b4f463d](https://github.com/Open-Study-College/osc/commit/b4f463d2d772b79c5b01ef4f732fbdd12c637098))
* **video:** update tests to use spritesheet provider ([e563a49](https://github.com/Open-Study-College/osc/commit/e563a49a1c71b5d4d019e594fc0e1400fa46680e))
* **video:** update to use new token names ([2cab76b](https://github.com/Open-Study-College/osc/commit/2cab76bd2b9651c15f13968d2886fe2175dad8c8))
* **video:** update video to take overlayed content ([fec9b02](https://github.com/Open-Study-College/osc/commit/fec9b02820431d3dbea7d9663c31186a7161c4ae))
* **video:** updates grid layout so aspect-ratio is maintained better ([15d9323](https://github.com/Open-Study-College/osc/commit/15d9323084a98940fa7f864e1dad94f614b11dc1))

## [0.41.2](https://github.com/Open-Study-College/osc/compare/v0.41.1...v0.41.2) (2023-02-17)


### 🐛 Bugs

* add SpriteSheetProvider and re-write test ([f3af8e5](https://github.com/Open-Study-College/osc/commit/f3af8e5a1a6f5fd46243451a99f97d7677ced3fe))


### ♻️ Refactors

* **types:** adds a Maybe generic type ([14e5597](https://github.com/Open-Study-College/osc/commit/14e5597df222f37ee9851c820f4748e76276f114))
* update assertion ([7307c78](https://github.com/Open-Study-College/osc/commit/7307c78a066ce0a26639e15688b4bab44e551cf2))

## [0.41.1](https://github.com/Open-Study-College/osc/compare/v0.41.0...v0.41.1) (2023-02-17)


### 🐛 Bugs

* **content:** remove "other" props spread ([a1fc82e](https://github.com/Open-Study-College/osc/commit/a1fc82e81839b472b399fa47037ff79da480ecc9))


### 📦 General Housekeeping / Package Updates

* **content:** removes old TODO comment ([3c370a9](https://github.com/Open-Study-College/osc/commit/3c370a91a62977f38508d33b9bc91ede8a97cad4))

## [0.41.0](https://github.com/Open-Study-College/osc/compare/v0.40.0...v0.41.0) (2023-02-17)


### 🐛 Bugs

* **header:** eslint error ([b99641e](https://github.com/Open-Study-College/osc/commit/b99641e0fef1094394e50a2fe63ce7b0934b4cb0))
* **navbar:** adds conditional to fix typescript error on setting style ([ee2df52](https://github.com/Open-Study-College/osc/commit/ee2df52cabf0879ad018ec5b241534ac0075e5a1))
* **navbar:** ensure the content gets reset if the menu is closed ([8cb8a3c](https://github.com/Open-Study-College/osc/commit/8cb8a3c9c216540ceb1e95da76df09a60ae9399f))
* **navbar:** fixes level increment in story ([eb98ce6](https://github.com/Open-Study-College/osc/commit/eb98ce69fe6a2be145d4e648dc49decd8e389bfb))
* **navbar:** vertically align items ([3e67c86](https://github.com/Open-Study-College/osc/commit/3e67c86e2ced2f9d1eb2e254e86f7a2ebf2ed621))


### 📦 General Housekeeping / Package Updates

* **navbar:** add paths to data so not everything is active ([a48f5f7](https://github.com/Open-Study-College/osc/commit/a48f5f79f44ec3bb931276eee306c483774c30f8))
* export components from package ([eb97bc0](https://github.com/Open-Study-College/osc/commit/eb97bc02c6c435374609a013c6e85fdfd540d73c))
* make storybook quiet for my sanity ([e71cc87](https://github.com/Open-Study-College/osc/commit/e71cc87bb2d4241379cb06272e6952d86f641ace))
* update lock file ([7f6cccc](https://github.com/Open-Study-College/osc/commit/7f6ccccac44213e69f74add27f6f876eaea9bc4b))
* update stories ([1515870](https://github.com/Open-Study-College/osc/commit/151587096ce8a6f404d63c8d13890d90f24c792d))
* **header:** remove comment ([bd1b7fe](https://github.com/Open-Study-College/osc/commit/bd1b7fed3e9069908906b9bfa2eed7db434ba7e3))


### 🧪 Tests

* wrap renders in spritesheet provider ([d1e9590](https://github.com/Open-Study-College/osc/commit/d1e95902d9c4b0bfed3df2271efcd4135e896472))
* **burger:** adds missing prop to test ([804dd56](https://github.com/Open-Study-College/osc/commit/804dd567ae5a6d3ae9d5d6a39d31eb87ca215a7b))
* **header:** adds tests for header component ([95f2dd0](https://github.com/Open-Study-College/osc/commit/95f2dd05e44bf3b35c794f22510df900e15e484e))


### ✨ Features

* **burger:** adds burger button ([f775fd9](https://github.com/Open-Study-College/osc/commit/f775fd99d99efb63b2bf187b632472e6289a9dc4))
* **header:** add focus styles ([2a0330f](https://github.com/Open-Study-College/osc/commit/2a0330f2527ce7a062c8404cf2fbb61fdd928098))
* **header:** adds base header component ([d142553](https://github.com/Open-Study-College/osc/commit/d14255307b70528220858df21cf7aadbc50a366a))
* **icon:** add logo to icons directory ([46792fe](https://github.com/Open-Study-College/osc/commit/46792fed7c5d4f5bc24cc354fc34acebaf4fdc48))
* **navbar:** add underline styles to hovered and active menu items ([e4dc186](https://github.com/Open-Study-College/osc/commit/e4dc1868682c7a02c3c3ab9ef178c1f610f30b9c))
* **navbar:** adds base navbar component ([ff7e839](https://github.com/Open-Study-College/osc/commit/ff7e8397382089948459d6a338d1058cf950e982))
* **navbar:** adds click event to fix the mobile subnav into view ([bc14fc4](https://github.com/Open-Study-College/osc/commit/bc14fc431f78be20905c250fc528d1ae851ba9db))
* **navbar:** adds hook to useMediaQuery ([2725a9e](https://github.com/Open-Study-College/osc/commit/2725a9ecc0b06e52642fbf689cb29307a930910d))
* **navbar:** adds hover and active styles to submenu items ([d2ab33d](https://github.com/Open-Study-College/osc/commit/d2ab33d816546f8f4399c3f321a0efafaee4b217))
* **navbar:** adds initial styles for the nav ([d1304cf](https://github.com/Open-Study-College/osc/commit/d1304cfb9fe9fa1e2bc81af10a38a83c1870f46b))
* **navbar:** adds transition timing ([6d7ac73](https://github.com/Open-Study-College/osc/commit/6d7ac73e80ae1f022292c82b9fd252c64e281b0e))
* **navbar:** adds transition to rotating chevron ([3993022](https://github.com/Open-Study-College/osc/commit/3993022339f2a87140246b3f80f79656ff474c67))
* **navbar:** lock the parent header overflow style ([38db2d4](https://github.com/Open-Study-College/osc/commit/38db2d46c745e3965e6bd9bfe4e5fdc8067d3d5e))
* **navbar:** set tabindex to -1 if links/buttons are hidden ([440be88](https://github.com/Open-Study-College/osc/commit/440be889e6764496be195992e9972bc336878f8c))
* **navbar:** transition in chevron on hover ([f984d10](https://github.com/Open-Study-College/osc/commit/f984d1010b17e1bed56b1ad78fdec462925456c2))
* **refactor:** adds simple dropdown styles ([f59a384](https://github.com/Open-Study-College/osc/commit/f59a384e8f0ce8f04b773a92fff9fa3ec8e117ea))
* **styles:** updates container sizes ([ed781b1](https://github.com/Open-Study-College/osc/commit/ed781b1310b0bcb18584f222aa5ca30b715e52ae))


### ♻️ Refactors

* **burger:** replaces ComponentPropsWithoutRef with ComponentPropsWithRef ([4e57080](https://github.com/Open-Study-College/osc/commit/4e57080617b916ff3a92c59fae8db481089b62a8))
* **burger:** set the isOpen prop to required ([6b6bdad](https://github.com/Open-Study-College/osc/commit/6b6bdad25edf52642b737553a8a45cb1df36d930))
* **burger:** update variables to use new token names ([f0fbde7](https://github.com/Open-Study-College/osc/commit/f0fbde71086ee5ef148d278adcf1d72fb2c635d3))
* **burger:** updates variables to use calculated values ([d8743c7](https://github.com/Open-Study-College/osc/commit/d8743c7685a19bc00c8301bb9c0961e01e25e2b0))
* **header:** add Slot primitive so we can pass classname to child ([0e7e6a9](https://github.com/Open-Study-College/osc/commit/0e7e6a9e14f157d3be72f9552b8fb26db2bed697))
* **header:** change setHeaderHeight to use boundingClientRect ([409e8e0](https://github.com/Open-Study-College/osc/commit/409e8e09382bbc6ebca3b686138d6dc6e290df50))
* **header:** set icon size ([f6338a4](https://github.com/Open-Study-College/osc/commit/f6338a4e037b75b93ca7494d69f6cabd9d5dfdcd))
* **header:** update logo to use Icon rather than inline svg ([962a4af](https://github.com/Open-Study-College/osc/commit/962a4aff27056926280219fee34cb803cb7454dd))
* **header:** update variables to use new token names ([259c142](https://github.com/Open-Study-College/osc/commit/259c14284efc42093436d818b29015296de347b6))
* **icon:** update icon component to take size prop ([1db2cb4](https://github.com/Open-Study-College/osc/commit/1db2cb4763236ab816fa21a8c29ac09d50bf696f))
* **logo:** moves logo into it's own component file ([a99ebd7](https://github.com/Open-Study-College/osc/commit/a99ebd741531ae888b1d961024e80a860d42f9e5))
* **navbar:** abscract useContext into it's own hook ([0061845](https://github.com/Open-Study-College/osc/commit/0061845525f54c2becba3e719aa94977b4d2abf9))
* **navbar:** adds context so we can pass variables ([91deacf](https://github.com/Open-Study-College/osc/commit/91deacfd39df38384d1d6eafa97dcbe34918398f))
* **navbar:** change hover colour ([48f1111](https://github.com/Open-Study-College/osc/commit/48f1111fff8fca48e3b3bbda566110799c57609f))
* **navbar:** remove line height so we are inheriting from the body ([a710c40](https://github.com/Open-Study-College/osc/commit/a710c40172d5a00daf9431984d631d3fa93f6589))
* **navbar:** removes comment ([43da2b0](https://github.com/Open-Study-College/osc/commit/43da2b0cd97307576ad0c926de782ea6ea2e67ae))
* **navbar:** removes specific focus styles ([b81518c](https://github.com/Open-Study-College/osc/commit/b81518cd0b923bbb2ae177d95ee2cda208deadd3))
* **navbar:** replace isDesktop with u-hidden class ([245a210](https://github.com/Open-Study-College/osc/commit/245a21063a9d234b41d5b1b8e03b678d7756a0f9))
* **navbar:** restructure shape of nav data ([d7eab75](https://github.com/Open-Study-College/osc/commit/d7eab754f936a06bbbffa31eaccb93f534c292c3))
* **navbar:** update const name ([3245f24](https://github.com/Open-Study-College/osc/commit/3245f2472c6e9123a6f6aa3860b43954e31d7475))
* **navbar:** update inline svg with Icon component ([3682925](https://github.com/Open-Study-College/osc/commit/3682925d27c03b60b341eb3d64f9b0adc2e18354))
* **navbar:** update inline svgs with Icon component ([0a3ddc9](https://github.com/Open-Study-College/osc/commit/0a3ddc9d28e586dedf4c09eed283975b091defc1))
* **navbar:** update media queries to use variable over token function ([a791760](https://github.com/Open-Study-College/osc/commit/a791760cd41225f488d32064fdba77f2725417a5))
* **navbar:** update styles to handle deeply nested triggers/links ([0b98cab](https://github.com/Open-Study-College/osc/commit/0b98cab4bd71de79146228ccba989bf4835af593))
* **navbar:** update styles to style mid level link ([af326f9](https://github.com/Open-Study-College/osc/commit/af326f9c050745f13197d7799af5972bc4466330))
* **navbar:** update top level hover to match figma prototype ([b456847](https://github.com/Open-Study-College/osc/commit/b45684741585e00f35053cfd597b0f06ea847951))
* **navbar:** update variables to use new token names ([74b4f0b](https://github.com/Open-Study-College/osc/commit/74b4f0b77c943855662c5212af79d309dbfe0d12))
* **navbar:** updates colour value with token ([afc3646](https://github.com/Open-Study-College/osc/commit/afc36467029d111f0e9d43dcbcd2dbb94e97a94f))
* **styles:** adds important to utility so it overrules component styles ([3f6b715](https://github.com/Open-Study-College/osc/commit/3f6b71598bea6dae456205d7a5653a361c3c88e5))
* **styles:** update media queries to use variables ([c3c7acb](https://github.com/Open-Study-College/osc/commit/c3c7acb466402f32f1a14617a4ad6f337a9ff4b8))

