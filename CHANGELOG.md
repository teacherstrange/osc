## [0.10.0](https://github.com/Open-Study-College/osc/compare/v0.9.0...v0.10.0) (2022-11-15)


### ✨ Features

* adds robots.txt resource route ([7149f8d](https://github.com/Open-Study-College/osc/commit/7149f8db223506ee4c57f2714c6d11764f8da687))
* adds sitemap resource route ([29d1e5b](https://github.com/Open-Study-College/osc/commit/29d1e5b4c195112dbf071281de290dd708ccb914))


### 🐛 Bugs

* ensure protocol to return https ([194991f](https://github.com/Open-Study-College/osc/commit/194991fbbcc30367a1b4cb6936443a0643fb4d5c))

## [0.9.0](https://github.com/Open-Study-College/osc/compare/v0.8.0...v0.9.0) (2022-11-15)


### ♻️ Refactors

* **components:** rename interfaces file as types to match convention in other packages ([a2e8445](https://github.com/Open-Study-College/osc/commit/a2e844570522edeb4727f9b4075615dc2e6bf797))
* **components:** replace FormToggle with ThemeSwitcher ([6acaeae](https://github.com/Open-Study-College/osc/commit/6acaeae05e37d873a3b9c3610e550ea21ef3ae36))


### 📝 Documentation

* replaces chakra mentions with radix ([ca0b7ab](https://github.com/Open-Study-College/osc/commit/ca0b7abb641e3bcc6bec3eee479addd52ceab522))


### 🧪 Tests

* **components:** updated modal import in test file ([30b2391](https://github.com/Open-Study-College/osc/commit/30b23919483c225f0ceff54d9e44c758c63239d7))
* **components:** updated props in modal test ([ee7bd1d](https://github.com/Open-Study-College/osc/commit/ee7bd1df37f232400ffcec2c7271440b01bebd4f))


### ✨ Features

* **components:** add accessible description to modal ([a3da92a](https://github.com/Open-Study-College/osc/commit/a3da92ac48075605fafdeac6c5032ab36086a4a6))
* **components:** add attribute selectors to css purge safelist ([e5a6974](https://github.com/Open-Study-College/osc/commit/e5a6974444c95391f3b3cc87cb1c23d5c8f9ee75))
* **components:** add classname utility ([d537ede](https://github.com/Open-Study-College/osc/commit/d537edeae8c4a0653671b12a4d38173156e93a03))
* **components:** add simple theme styles ([69011aa](https://github.com/Open-Study-College/osc/commit/69011aa2e6ce701b64055bb00ba501d32b729639))
* **components:** add styling hooks ([dc685b4](https://github.com/Open-Study-College/osc/commit/dc685b4c6b21d861324b4cf240033631c364b633))
* **components:** make type optional in modal ([6b48aa2](https://github.com/Open-Study-College/osc/commit/6b48aa2f3d1716e7f07abdaaf90a628ae92308f2))
* **components:** replace chakra components with radix primitives ([83e7727](https://github.com/Open-Study-College/osc/commit/83e7727b56f1c9fb3dd2eb5ca256bd266137ed33))
* **sites:** remove chakra and emotion dependencies ([57b5b9e](https://github.com/Open-Study-College/osc/commit/57b5b9ea0fc9e7d41dfd1b343fc5667f485e92e3))
* **sites:** remove chakra theme files ([bb6a860](https://github.com/Open-Study-College/osc/commit/bb6a8607b52aa89e909ab0fce3c384152240097d))
* **sites:** remove chakra ui components ([be4f3c1](https://github.com/Open-Study-College/osc/commit/be4f3c18d6795ffd7caab916ec406240d1bb87f9))
* **sites:** remove emotion cache ([a6baa57](https://github.com/Open-Study-College/osc/commit/a6baa578ab9382a561bf48ac29e9e420911367dd))
* **storybook:** remove chakra plugin ([290bf1a](https://github.com/Open-Study-College/osc/commit/290bf1ac81eec394044de1fd2d59c4f295864d58))


### 🐛 Bugs

* **components:** fix variant name typo ([88c874a](https://github.com/Open-Study-College/osc/commit/88c874ada3529dd759181310ea42ca88694b2965))
* **sites:** add props declaration to theme switcher ([543711b](https://github.com/Open-Study-College/osc/commit/543711b796cadb5a3dfc996658b0dca8b990d722))
* chromatic deployment bug ([d7e05cd](https://github.com/Open-Study-College/osc/commit/d7e05cd049801b3dbe31390ed36314b28059b9be))


### 📦 General Housekeeping / Package Updates

* deletes unused constants file ([bdb20cb](https://github.com/Open-Study-College/osc/commit/bdb20cb62090e303fd26bc69952ef9829a7a4c75))
* **components:** alphabetise exports ([50296b0](https://github.com/Open-Study-College/osc/commit/50296b019799532e2ea705fc8cfa34e673287089))

## [0.8.0](https://github.com/Open-Study-College/osc/compare/v0.6.0...v0.8.0) (2022-11-15)


### ♻️ Refactors

* abstracts the exlcude drafts filter into a utility function ([0aa4868](https://github.com/Open-Study-College/osc/commit/0aa4868e7efd0cdf51fb36c23c47803a7884e2bd))
* updates 500 error to 404 ([eb13cf2](https://github.com/Open-Study-College/osc/commit/eb13cf2163968498cf0b41cca4bc9397698917d9))


### 🧪 Tests

* add global types to include our extended test ([88e7504](https://github.com/Open-Study-College/osc/commit/88e75049226b14e8c62887561b458dc9311a8d7f))
* adds tests for redirection functions ([463c07d](https://github.com/Open-Study-College/osc/commit/463c07dc66b964b0a26bb144bdb54af72dd800e0))
* adds tests for redirects ([8d4809b](https://github.com/Open-Study-College/osc/commit/8d4809bc40820d9f54e71c5b65e04f0bbe9bb555))
* extend expect to check for some items in an array ([f4ee2ec](https://github.com/Open-Study-College/osc/commit/f4ee2ec65968cefae9d9cbd55705c915b1b10f54))
* extends the expect function to check array for some items ([a15b5c7](https://github.com/Open-Study-College/osc/commit/a15b5c723079b02e63b508f4077fcae28f18fad0))
* update object match test to check for value types ([9c47a1d](https://github.com/Open-Study-College/osc/commit/9c47a1db19ef9ce30c4e5ba06ac4a7bbee2a5282))


### ✨ Features

* add Breadcrumb component ([4356f4d](https://github.com/Open-Study-College/osc/commit/4356f4db20696c5c3a78408696762c795cdd99a5))
* add css for conditional hover and re-work logic for rendering a link ([010feb6](https://github.com/Open-Study-College/osc/commit/010feb6777f74699c5bb1d487054f51e57dc000c))
* add export for Breadcrumbs component ([1efa9fa](https://github.com/Open-Study-College/osc/commit/1efa9fa8cbf7d2134e856cfe0a1ef6e8cd4c9352))
* add fallback to display title if redirecting to a shopify page ([7a90b65](https://github.com/Open-Study-College/osc/commit/7a90b65c761fff0d7ee632aa356de457afdd598e))
* add function to redirect visitors if page has redirect in sanity ([7ae5d26](https://github.com/Open-Study-College/osc/commit/7ae5d26808a833f4db371f76358962b24860d57e))
* add functions to build urls and exclude drafts ([9374eac](https://github.com/Open-Study-College/osc/commit/9374eac9d388177ffcf38733d22e3c8d6bb482e5))
* add redirects schema to studio ([c0a691e](https://github.com/Open-Study-College/osc/commit/c0a691e96e907d5c6104bfb5790434d78062f9a2))
* add stories for Breadcrumb component ([9123f43](https://github.com/Open-Study-College/osc/commit/9123f43e0be1f3b1b1295e4711df3403be53b7fe))
* add stories for Tag component ([5187149](https://github.com/Open-Study-College/osc/commit/5187149bd3c504e27a856310197726bece18e765))
* add tests for Breadcrumb component ([7b34213](https://github.com/Open-Study-College/osc/commit/7b34213d55f7622bc9f40f2aa41786551cd52c27))
* add tests for Tag component ([6d9de06](https://github.com/Open-Study-College/osc/commit/6d9de062eb4ed350b1b30dfa7217020496496307))
* added carousel story, list volumes ([2da1bcf](https://github.com/Open-Study-College/osc/commit/2da1bcf29af743399ae4ed69950e6e7c7be1c05e))
* adds a redirects document to sanity studio ([727c7ac](https://github.com/Open-Study-College/osc/commit/727c7ac47974c01f5b7a308e02a44a007f3b0f79))
* adds function to create the url pathname ([4cb7356](https://github.com/Open-Study-College/osc/commit/4cb735633d074ba84efb84d95519bde04eda5447))
* adds function to redirect a path based on Sanity query ([bcb65a0](https://github.com/Open-Study-College/osc/commit/bcb65a01d76e41131f0a1c21eb891be54df30acb))
* adds icon for redirects ([efc55f5](https://github.com/Open-Study-College/osc/commit/efc55f5f7eb1ee5db19d564fcb386b8de4d6c128))
* adds redirect type ([6e4f246](https://github.com/Open-Study-College/osc/commit/6e4f246c5505a0156258c611ce401252ffde32e2))
* adds validation to fields ([307b4aa](https://github.com/Open-Study-College/osc/commit/307b4aa92fddd27d551b52b5418fc5db59c10e92))
* create Tag component ([9d16fc0](https://github.com/Open-Study-College/osc/commit/9d16fc0aa32c0b15d53ee96a18b6dbd4919f96a7))
* test composite action ([535e6c7](https://github.com/Open-Study-College/osc/commit/535e6c7b99e4f3049523a3e03c8cbcdb9e503d9e))
* update breadcrumb to breadcrumbItem ([5c13197](https://github.com/Open-Study-College/osc/commit/5c13197fed66616aa87bc2c2eed584e52c8fcf2a))
* update idx to index ([9d74d8b](https://github.com/Open-Study-College/osc/commit/9d74d8b7340f0e5348d3eca1f158022b6f704118))


### 🐛 Bugs

* accessiblity issues ([fcf0607](https://github.com/Open-Study-College/osc/commit/fcf0607fb0eb8c565250ce5a3e399c69bb8ab489))
* add and tidy destroy apps.yml ([9215f9a](https://github.com/Open-Study-College/osc/commit/9215f9a6e3552dceafc7cd7052739941730d9735))
* add chakra-ui/icons to deps for academic, ecommerce, ui ([b73f812](https://github.com/Open-Study-College/osc/commit/b73f8122aba0b350e3da9867f110e635a69fbc48))
* add chakra-ui/icons to deps for academic, ecommerce, ui ([ece8b40](https://github.com/Open-Study-College/osc/commit/ece8b4042baea5170c89dbb1ea83087f595ca3ca))
* add closes to deploy steps ([d5aaabf](https://github.com/Open-Study-College/osc/commit/d5aaabf935754d3a6141ced340c19a0b13614262))
* add composite action to other workflows ([c419f5a](https://github.com/Open-Study-College/osc/commit/c419f5a0511867d63e8ab5efe3109b00bfd433e8))
* add composite step for deployment ([f613460](https://github.com/Open-Study-College/osc/commit/f61346074fc32ef5fc87371411729983e54039af))
* add curly braces to composite action ([8148b5c](https://github.com/Open-Study-College/osc/commit/8148b5c526ef5319155f69af67b4d7e5acf741e3))
* add delete all old passwords manual workflow ([ce3f168](https://github.com/Open-Study-College/osc/commit/ce3f168a4423438f251d555fdffc14d11dfea56f))
* add docker build studio step, remove dockerfile.release ([5da9e46](https://github.com/Open-Study-College/osc/commit/5da9e4650c9c351ae2a94160efdc3de232c275d9))
* add dockerBuild composite action ([8678966](https://github.com/Open-Study-College/osc/commit/86789662472d3925ddd1a4c62310ee40a3caf16f))
* add indicators and prev/next button to carousel ([4c06055](https://github.com/Open-Study-College/osc/commit/4c0605539e3d3ab5b0cf7597142b15252bff1631))
* add opcacity 0 to the slides not the embla container ([112bb7b](https://github.com/Open-Study-College/osc/commit/112bb7bea39324b51553de6798ec833409807884))
* add osc-ui as a dependency to osc-eccommerce ([8f245ef](https://github.com/Open-Study-College/osc/commit/8f245ef253dbded12b54527188ecc43d37ff7ff0))
* add osc-ui back into deployment workflows ([a2a0852](https://github.com/Open-Study-College/osc/commit/a2a08526d40653966c8ba76003f5c26c0650bffc))
* add password name to docker build step in deploy workflows ([97cf98d](https://github.com/Open-Study-College/osc/commit/97cf98dd135f99a76ac73e7dd9184e5bfe9a0902))
* add password name to dockerBuild command ([03cdd79](https://github.com/Open-Study-College/osc/commit/03cdd79e081bc6f33f547926ee7e0c0ee0f5b64e))
* add prisma generate to playwright cocd workflow ([bdcde26](https://github.com/Open-Study-College/osc/commit/bdcde2651b3af356727278440b6382b366ce451c))
* add prisma generate to playwright cocd workflow ([b4ef96b](https://github.com/Open-Study-College/osc/commit/b4ef96b025f5777525cefc71ec92a5d870f9843d))
* add steps so the workflow does not fail if it does not find volumes ([5d6013f](https://github.com/Open-Study-College/osc/commit/5d6013f00f75866338f287b6c8c77f9c7b40719f))
* add string modification to the github ref inside composite action ([ebccf10](https://github.com/Open-Study-College/osc/commit/ebccf10268913541bfcd68d2db8b3d21bd65af55))
* add use debounce ([035895c](https://github.com/Open-Study-College/osc/commit/035895cb2d63ceb37044b6bd14038ae9da045a47))
* added checkout to main workflows ([2275600](https://github.com/Open-Study-College/osc/commit/22756003479a3bd8f2be2fc1bc7a26e3391c0210))
* added devdeps to sanity studio ([a201e68](https://github.com/Open-Study-College/osc/commit/a201e68cdc5309e1549a311f95d4d3fc416cb3f1))
* added devdeps to sanity studio ([5708745](https://github.com/Open-Study-College/osc/commit/57087456230c3e3cf534801381e24897b209c018))
* added packages to package.json workspaces ([56ee788](https://github.com/Open-Study-College/osc/commit/56ee7886833d93a7689dc2eb6a14d80d3a0391af))
* alignment and min height ([a6fe866](https://github.com/Open-Study-College/osc/commit/a6fe866b96ffdd640ed14728ac3f109bb039e956))
* alternative uses path ([0c218cb](https://github.com/Open-Study-College/osc/commit/0c218cb198f2cb406509825721451eb644fce23a))
* aria hidden issue ([bbe63da](https://github.com/Open-Study-College/osc/commit/bbe63da5a381a2b828825b004d88cf89a42a351a))
* bugfixing merge ([d693ada](https://github.com/Open-Study-College/osc/commit/d693adad66e92b00b2e4eb52f1d7b978c1319c0a))
* build db branch ([bbf1a59](https://github.com/Open-Study-College/osc/commit/bbf1a593671606f86d8cad94ef551963a0e6c2da))
* build osc-studio using dockerfile studio ([ed074e4](https://github.com/Open-Study-College/osc/commit/ed074e43e798493454683d11a312ff74fc96e0ac))
* build pr branches and studio on pr's to main ([49e35a9](https://github.com/Open-Study-College/osc/commit/49e35a99a666da92a003c1ff889ccdb3908910d3))
* build pr branches when merging into main and pr is open ([4c8dcae](https://github.com/Open-Study-College/osc/commit/4c8dcae6bb419132602b930ce6342010bbc16afa))
* build when osc-api-auth changes, do not build if pscale or prisma folder change ([b603096](https://github.com/Open-Study-College/osc/commit/b6030965f5eb830d8369c2e1acfff22538a68fd4))
* cancel all workflows in a different manner ([9a427d1](https://github.com/Open-Study-College/osc/commit/9a427d1f452f45f4a8527c380d2eb54777c6f3a1))
* cancel chromatic if draft mode ([fd18439](https://github.com/Open-Study-College/osc/commit/fd18439eaf5a7ec7d15a1239e1eef5e456ab1ad7))
* cancel run as a step in chromatic workflows ([1967c5e](https://github.com/Open-Study-College/osc/commit/1967c5ec35c2a7673bbe92079afe5cce1eee2089))
* carousel buttons and resizing, added osc-studio dist to ignore files ([fe673cf](https://github.com/Open-Study-College/osc/commit/fe673cf6d294650055f80d80920fad51fd1205bf))
* carousel height bug ([59bdf42](https://github.com/Open-Study-College/osc/commit/59bdf42c3293d4b287ed8fceb7f50651551c358c))
* carousel loading prematurely ([29dfe40](https://github.com/Open-Study-College/osc/commit/29dfe408daec39dde009122e89030b62552419bb))
* carousel schema changes ([980407a](https://github.com/Open-Study-College/osc/commit/980407a5ba0e692fc0dad90a34cdd913ddb06a38))
* carousel test prep and fix resizing bug ([a967ff6](https://github.com/Open-Study-College/osc/commit/a967ff6b205070ac410731e305ec895f64eb9b95))
* change conditional on delete old volumes step ([e406d75](https://github.com/Open-Study-College/osc/commit/e406d751a4df3f0f98f98b36d91a369e74c03ad8))
* change path to composite action ([bbd4e5b](https://github.com/Open-Study-College/osc/commit/bbd4e5b09723b85dd3237758326f4e76c9406d20))
* change secrets to inputs inside dockerBuild action ([206faa9](https://github.com/Open-Study-College/osc/commit/206faa92328b41be9fca05e3fda8831d4b1b62f0))
* change syntax of cancel step in chromatic ([7752583](https://github.com/Open-Study-College/osc/commit/7752583b811a8267b6b0aa3a1b3b1e342403b75f))
* check if workflows are cancelled ([ae61735](https://github.com/Open-Study-College/osc/commit/ae617359cd8ab591acd0c4c5673398541c8df7d9))
* checkout repo to access cancel.sh, move cancel.sh to bin folder ([e711a7f](https://github.com/Open-Study-College/osc/commit/e711a7ffa2ffe5359beb15b54cb82258ce4a6035))
* chmod shell script ([fbe5417](https://github.com/Open-Study-College/osc/commit/fbe541772b56a4410e444c7aca3b16ec1e6f06fa))
* cicd errors ([24064d7](https://github.com/Open-Study-College/osc/commit/24064d7e58fc175e300956e1d04bc4da1bfd6193))
* conditionals in dockerBuild step ([c2efdb6](https://github.com/Open-Study-College/osc/commit/c2efdb6d32d391dabbbf01739ba52c887270a5d3))
* conditionals surrounding pr deployment ([2b687b1](https://github.com/Open-Study-College/osc/commit/2b687b159bc51a129204ff81ca76f08fa39521f8))
* connected carousel to sanity ([9d3ce64](https://github.com/Open-Study-College/osc/commit/9d3ce642df87e2fd3c395e109ca27ea83df2f680))
* copy over composite action steps to ecommerce ([a900c98](https://github.com/Open-Study-College/osc/commit/a900c987669ae6641caf21f9d958a9bba76bc8b3))
* create connection string to pr branches ([b484253](https://github.com/Open-Study-College/osc/commit/b4842531de5f037098fd32534ddba116a6324335))
* delete old volumes ([0b01edc](https://github.com/Open-Study-College/osc/commit/0b01edc506025013f4a93cd9e25585b56294697c))
* delete volumes before creating one ([b1839b4](https://github.com/Open-Study-College/osc/commit/b1839b42ef6e775d64e9c82b4c525e7c48b62b5d))
* delete volumes in other workflows ([8b9c24a](https://github.com/Open-Study-College/osc/commit/8b9c24a989e77d920715a41ff846315e7521203e))
* deploy osc-studio differently to pr branches ([4f9d288](https://github.com/Open-Study-College/osc/commit/4f9d288f66a35b4abbea1cc7f54f43929e3980b5))
* disable osc-api workflow ([d315516](https://github.com/Open-Study-College/osc/commit/d315516cf4ffaeba136a45928fc1ecc9e7a06815))
* do not build apps when osc-ui changes ([87fb42f](https://github.com/Open-Study-College/osc/commit/87fb42f46b508df59fa235852befb6628010e402))
* do not create a connection string when building osc-studio ([02f53a4](https://github.com/Open-Study-College/osc/commit/02f53a48104d9920e46640778085455aba6bcca5))
* do not create and merge DR to main when building osc-studio ([a5e6c5b](https://github.com/Open-Study-College/osc/commit/a5e6c5be8b47874fdd8810feda42863ca65e9b3e))
* do not create pr connection string when creating db branch ([2dc50dc](https://github.com/Open-Study-College/osc/commit/2dc50dc424ad7acebcbf8fd7885922ab23c45fba))
* do not create pr if it is a draft ([c146c9c](https://github.com/Open-Study-College/osc/commit/c146c9cf39ceb36b9f9e3628f6c5f2158533f29d))
* do not delete component d.ts files after creation ([619ef2a](https://github.com/Open-Study-College/osc/commit/619ef2a42ef264fb0402cacc0bed2a8d9e43eff4))
* do not merge dr to main if app name == osc-studio ([10d1d12](https://github.com/Open-Study-College/osc/commit/10d1d121e1753d626bfb4a63d3a416d2273bf378))
* do not pass db urls to composite action ([6152b7f](https://github.com/Open-Study-College/osc/commit/6152b7f28f0f0881edfb78ccc42f36efb61b55f2))
* do not report if node modules are not found in move package to root ([47bf805](https://github.com/Open-Study-College/osc/commit/47bf80539296c65a038161a483b31c5180e46f7f))
* do not run addDevDeps in this branch ([a7ef30f](https://github.com/Open-Study-College/osc/commit/a7ef30f4e591e0558654e0476760d12a92ff776a))
* do not run workflows when pr is edited ([c3ea8a8](https://github.com/Open-Study-College/osc/commit/c3ea8a86c1c05a4cc27d2f26290ff36c134edbcc))
* echo db url in dockerBuild Action ([7d0ab7d](https://github.com/Open-Study-College/osc/commit/7d0ab7d029fcfdf6803c38ce3451a5cbaa67f436))
* echo my_db_url ([7b19a2a](https://github.com/Open-Study-College/osc/commit/7b19a2a3f259e6e38bafc1dd80e2e3ab1171a653))
* echo pscale prisma db url pr ([57cc4ac](https://github.com/Open-Study-College/osc/commit/57cc4ac78ae3671318a43556cd0211842382d327))
* echo-branch in a different manner ([756b720](https://github.com/Open-Study-College/osc/commit/756b720b5ceaa20bc1ebd5eff860b8d227fdbb53))
* edited pscale urls ([0c6f2ea](https://github.com/Open-Study-College/osc/commit/0c6f2ea280b6c642659e872b4bd50e3dd95a218f))
* exit code 1 in cancel.sh ([b30d884](https://github.com/Open-Study-College/osc/commit/b30d8843673e6c8eeb211f96049832a529614136))
* fixed axis problem ([2111b6f](https://github.com/Open-Study-College/osc/commit/2111b6f223194b1312f6018ff67395d09928ed35))
* fixed pre-commit error message if unstaged files contain linting errors ([0a6c1be](https://github.com/Open-Study-College/osc/commit/0a6c1be9588f297131f032c47b983f581385763a))
* format build step deploy workflows ([eab7264](https://github.com/Open-Study-College/osc/commit/eab7264341500f4780c85e5e15c33d7730733d88))
* format headref in deployment composite action ([2555036](https://github.com/Open-Study-College/osc/commit/25550367cc42545a07f1c0aaeb5c485f81e7bab8))
* full width images ([e6f944d](https://github.com/Open-Study-College/osc/commit/e6f944d89213acd9836ffb8b82ae9728ac12c1b3))
* if the target branch is not equal to main, do not cancel the workflow ([312b8ee](https://github.com/Open-Study-College/osc/commit/312b8ee2fc5fe9d830b43b1808b9e795802c5798))
* image takes up entire width of box inside carousel template ([77d4e84](https://github.com/Open-Study-College/osc/commit/77d4e847c92eb8c5188ea5c48b0767b707d04a92))
* indicator buttons not showing in storybook ([b2dd67e](https://github.com/Open-Study-College/osc/commit/b2dd67e7547ac212a7696fa92791fbd5e6f9a090))
* initial build carousel ([86c67ae](https://github.com/Open-Study-College/osc/commit/86c67ae57fbe7120273a047db92a8052f3a248a9))
* list in json format ([3224331](https://github.com/Open-Study-College/osc/commit/3224331c76a063d5382ed5de7bc7496861b6b164))
* make some inputs optional in the dockerBuild command ([e84feef](https://github.com/Open-Study-College/osc/commit/e84feef8ac7d8c66ef356b7f74e41ac30ae57d9f))
* manually bumping version in package.json in hope of retriggering release workflow ([457a0da](https://github.com/Open-Study-College/osc/commit/457a0da7263d276e586f8404d77f4537b85f72eb))
* margin-left issue ([45deadb](https://github.com/Open-Study-College/osc/commit/45deadb76c778ec0d58e1b7ec6747025bd21c1b0))
* matt reccomended changes ([0356d7e](https://github.com/Open-Study-College/osc/commit/0356d7e2bdfb169f453f2cb9e9fb859057b3a4e0))
* merge error in workflows ([1c6f608](https://github.com/Open-Study-College/osc/commit/1c6f6081f6a0baa6837417d04aac04e81eb2e99f))
* move cancel.sh back and checkout repo ([c7d352a](https://github.com/Open-Study-College/osc/commit/c7d352ae7eb5137d37186c0f3c87b2cc2ca1f9f4))
* move carousel styles to root, so it is applied on kitchen sink page ([23398a3](https://github.com/Open-Study-College/osc/commit/23398a33ccf102e8b42b89eb4aa2c8e380f26cc5))
* move location of cancel.sh and specify bash shell ([b6fa49b](https://github.com/Open-Study-College/osc/commit/b6fa49bc4925d9f4d95205ff15462acf3d08743c))
* multiple images not working when veritcally stacked ([31cfd45](https://github.com/Open-Study-College/osc/commit/31cfd45a273e3ad5ba32129c376169d04a0bb171))
* multiple themes in storybook, vitest tests for carousel ([c37b7a9](https://github.com/Open-Study-College/osc/commit/c37b7a9038f13b6df2b4f991e7483ce2d65bc5ef))
* multiple themes in storybook, vitest tests for carousel ([b324db5](https://github.com/Open-Study-College/osc/commit/b324db557b49586667f159d3b825b5c6f16ea2ee))
* multiple themes storybook deployment ([8b1f58f](https://github.com/Open-Study-College/osc/commit/8b1f58f63a731815126146458105c31ec4fec4cc))
* no not pass pscale urls to dockerBuild action ([766d676](https://github.com/Open-Study-College/osc/commit/766d676ac92be51db491dbdf325b32948fe6be91))
* only build deploy workflows when base_ref === "main" ([1b9c8ef](https://github.com/Open-Study-College/osc/commit/1b9c8ef18b5f48c94d4d30bd666cdafd53226016))
* pass branch to dockerBuild action ([2fc1eb3](https://github.com/Open-Study-College/osc/commit/2fc1eb399078a20479ee894e1158182387de4a5a))
* pass coreect name to deploy pr branch step ([6ce5bb8](https://github.com/Open-Study-College/osc/commit/6ce5bb89e9dd95f8898e2372f822d78ea2be3336))
* point to scss rather than css file ([50ba9ec](https://github.com/Open-Study-College/osc/commit/50ba9ecc1f73a4f6dd20eaf703fc115b633f2fc6))
* quotes surrouding my_db_url ([2b03c62](https://github.com/Open-Study-College/osc/commit/2b03c62efa58d3e5867681640da0f378b326a08d))
* re-run workflows when pr is ready_for_review ([64576ec](https://github.com/Open-Study-College/osc/commit/64576ec5bc7e2cc530d9e169fb91b5833b2fa371))
* remove "branch" input ([2e7e8b9](https://github.com/Open-Study-College/osc/commit/2e7e8b9b5f76060d279734ec9d1ae3aec5ecf6a9))
* remove backticks from command ([96b6b8c](https://github.com/Open-Study-College/osc/commit/96b6b8c70b3d3b093b1c59144034fd9c5bf6f09d))
* remove comment and added osc-studio to dist folder ([7955d88](https://github.com/Open-Study-College/osc/commit/7955d880ae76cf5c26ddebac62b4d0d7cf8c29d7))
* remove db related steps from workflows ([1a9a3b3](https://github.com/Open-Study-College/osc/commit/1a9a3b318d94e1da02f4a731a08cc2ea992edded))
* remove depth error ([ab66dce](https://github.com/Open-Study-College/osc/commit/ab66dce6b124d05507565cd43c1d592349f35b7d))
* remove double quotes from composite action ([1b9f966](https://github.com/Open-Study-College/osc/commit/1b9f96623673e76776b03cdf2d34a60c2f2dd020))
* remove echo from composite action ([f39f05d](https://github.com/Open-Study-College/osc/commit/f39f05d39a836d181cb50cb82231cb6f5d1bce5e))
* remove filtering on destroy step ([34f5a5c](https://github.com/Open-Study-College/osc/commit/34f5a5c7b42fe16ceb94e83fdfc73422c8f64a8d))
* remove inputs from dockerBuild command ([733da09](https://github.com/Open-Study-College/osc/commit/733da09bb78246aae1e45deb11da0173a55fc34f))
* remove list volumes step ([14e6299](https://github.com/Open-Study-College/osc/commit/14e6299a0ea167dff4a84f603b7b7037399aa770))
* remove modal from index.tsx ([43bff95](https://github.com/Open-Study-College/osc/commit/43bff955f941476a076d6bb6910aeb926e30d826))
* remove secret from deployment composite action ([26daa60](https://github.com/Open-Study-College/osc/commit/26daa6059d06bcfb1450d8f8ee6afae624d51367))
* remove setup step from playwright ([fa6f485](https://github.com/Open-Study-College/osc/commit/fa6f485f2b2193aa4089b4a7cdff0505daa1c299))
* remove surplus steps from ecommerce-pr-branches and edit compostie action ([8cb8712](https://github.com/Open-Study-College/osc/commit/8cb87125a3d1bb8d7f66cd61b72f7cfbc2d0eeba))
* remove unused import from rollup ([37e7a8d](https://github.com/Open-Study-College/osc/commit/37e7a8d3f4637b5913ad9defd9334ebbc66a4f2b))
* remove use-debounce from dev deps ([e78606d](https://github.com/Open-Study-College/osc/commit/e78606d72916a58842c5e5a8cc4d67f33b221b5d))
* remove verbose flag from action.yml ([223748b](https://github.com/Open-Study-College/osc/commit/223748b977ce94c55470f2228ea6702e7b5a8b26))
* removed untracked addtions ([98b0d74](https://github.com/Open-Study-College/osc/commit/98b0d740cac2318b3a2f68f421cb2b22655f3707))
* rename bin in root to workflow-scripts ([fa171c7](https://github.com/Open-Study-College/osc/commit/fa171c77f01cdde85c2cb6c3ce44827634f0833d))
* rename branch variable creation step ([c6e939a](https://github.com/Open-Study-College/osc/commit/c6e939abc1cb9138f1ca611b20db6abba9184bf8))
* rename secrets to inputs ([d7a58a7](https://github.com/Open-Study-College/osc/commit/d7a58a748354b86e687bf423eb1c6cd9d25fa7f9))
* replace 500 error with 404 ([5566470](https://github.com/Open-Study-College/osc/commit/5566470fcf2805acbe0ca8f1506c0b8347fb80a1))
* replace app_name with readAndLogAppName ([8a67d60](https://github.com/Open-Study-College/osc/commit/8a67d60805a59cefdc77dd09185e2961b947af1b))
* replace PLANETSCALE_PRISMA_DATABASE_URL_CYPRESS with PLANETSCALE_PRISMA_DATABASE_URL_PLAYWRIGHT ([86665ad](https://github.com/Open-Study-College/osc/commit/86665adb2f81e8ace1522318cb9bb605ecb5aaae))
* resize bug ([b433e1d](https://github.com/Open-Study-College/osc/commit/b433e1d2c3484d4a418dd15c42fad4a92bbc5012))
* resizing bug on button click ([0134db6](https://github.com/Open-Study-College/osc/commit/0134db6bf721d7063cb55d0a93fedbb2138b4041))
* revert back to CHANGELOG_RELEASE ([0120257](https://github.com/Open-Study-College/osc/commit/01202577bff68dd4ef457176a45cb3245cc6731e))
* revert changes to cancel.sh ([b118e9e](https://github.com/Open-Study-College/osc/commit/b118e9e6442b6d9d6a0e47440955b836e7e40a56))
* revert changes to helper script ([32f1451](https://github.com/Open-Study-College/osc/commit/32f1451843507c2dd24314fb1d5d83131a157ce0))
* revert changes to workflow filtering on the deploy step ([b9f8563](https://github.com/Open-Study-College/osc/commit/b9f85630fe22620527a9fddf9ec6157607cf649a))
* revert read branch name step, echo to output ([f511883](https://github.com/Open-Study-College/osc/commit/f5118835e65f5489e8e3fceb9bc89ab682d01aa2))
* run orkflows if composite actions have changed ([673ccfe](https://github.com/Open-Study-College/osc/commit/673ccfef74b4e3d2765ecb7040de03ddea9093b1))
* run workflows if composite actions have changed ([23c0597](https://github.com/Open-Study-College/osc/commit/23c05978d965e4891fded12bae337c9c963bb42b))
* set branch as output of composite action ([23110ef](https://github.com/Open-Study-College/osc/commit/23110ef9f9821547bea78164ed1f9a5993849ad7))
* skip studio deploying ([6c77ce6](https://github.com/Open-Study-College/osc/commit/6c77ce683ef3a98bc00c5ff51d401b144b06d7b5))
* slide gap issue ([01b0133](https://github.com/Open-Study-College/osc/commit/01b013331f8d7fa714b7045c55ce083b54972edf))
* slideGap issue ([dd08f7c](https://github.com/Open-Study-College/osc/commit/dd08f7ccfb5865b42c488f881f1e38fb4fa59d93))
* small change to see if checks appear ([b8b905c](https://github.com/Open-Study-College/osc/commit/b8b905cf56c37b5885666d5213a2b54440d70a29))
* split composite action into two composite actions ([9623b6d](https://github.com/Open-Study-College/osc/commit/9623b6d0046c83832b915c8673f72b0b85084557))
* stevens recommended changes ([f423c88](https://github.com/Open-Study-College/osc/commit/f423c887954deb3822ab28560bb56a9a08294595))
* storybook multiple themes ([7239ccd](https://github.com/Open-Study-College/osc/commit/7239ccd42a58bfc52e50af7204f1166462d258a0))
* storybook multiple themes ([335e175](https://github.com/Open-Study-College/osc/commit/335e1753600f04c61d2faf9b0456fb8991038098))
* storybook with multiple themes ([da40995](https://github.com/Open-Study-College/osc/commit/da40995ab82db6240731300063ecbc936bf274cb))
* storybook with scss ([1bada17](https://github.com/Open-Study-College/osc/commit/1bada178911c83775d4212b7f14ad71f5184f585))
* temp remove filter for pr branch ([519a896](https://github.com/Open-Study-College/osc/commit/519a89689a98b155a370cdc1fb9fb021b3f1ee75))
* test cancelling workflows using bash script ([945acd8](https://github.com/Open-Study-College/osc/commit/945acd88a2da2d76c1f89a819fa10c6a9de8da47))
* testing alternative to exit 0 when running precheck ([cd259b9](https://github.com/Open-Study-College/osc/commit/cd259b90834c03e95290b2063c2c826edd8364b5))
* testing pr from branch to branch ([f2c1a47](https://github.com/Open-Study-College/osc/commit/f2c1a47c814a2d879fc9875c6b03e547e3122fd2))
* testing pscale connection string helper function ([0cf6a1c](https://github.com/Open-Study-College/osc/commit/0cf6a1c42cf41551e018ab393f54761cf4171e23))
* testing studio workflows ([2abc900](https://github.com/Open-Study-College/osc/commit/2abc900eb483f5831d3c71d75416e81d6725503c))
* tidy up branches and add comments ([30f1a7e](https://github.com/Open-Study-College/osc/commit/30f1a7e3e315930239ef5b936ca6d8915630c564))
* tidy up deployment step ([dcb7681](https://github.com/Open-Study-College/osc/commit/dcb7681013b54924e3454094a2a99d2bdc32d312))
* tidy up storybook dependencies ([0af0bf8](https://github.com/Open-Study-College/osc/commit/0af0bf877a46edefb45d0476128f6652c2480ca9))
* tidy up storybook dependencies ([d143bdb](https://github.com/Open-Study-College/osc/commit/d143bdb9a72eaba06c193ad58600797aca4d0f00))
* tidying up after rebasing v0.6.0 ([ddf4c45](https://github.com/Open-Study-College/osc/commit/ddf4c45b984e1dc01b19cff436627e3ec25a251d))
* tidying up after rebasing v0.6.0 ([0657b6c](https://github.com/Open-Study-College/osc/commit/0657b6c3ac7bfd0011a5e8ba962fecb490e1c42b))
* typo in action foldername ([d5e516e](https://github.com/Open-Study-College/osc/commit/d5e516e7a9f38ed87ae64ed5b72727f9347d0fcb))
* typo in app name composite action ([d018e10](https://github.com/Open-Study-College/osc/commit/d018e101444736a89f6b54afe56ac71e85144097))
* typo in cancel workflow step ecommerce deploy ([fa2a5c6](https://github.com/Open-Study-College/osc/commit/fa2a5c6f1ea5bfebf6d9063f0c52f1bdf978a95d))
* typo in composite action name and echo branch from composite action ([5b14c9c](https://github.com/Open-Study-College/osc/commit/5b14c9cfefe1cf035ba4db3c5682f9f96b38183e))
* typo in deployment workflow ([656cab2](https://github.com/Open-Study-College/osc/commit/656cab200aade0a7a6621990c490b33361dedacc))
* typo in dockerBuild Action ([19fe96d](https://github.com/Open-Study-College/osc/commit/19fe96d8b91c8776abee71886d320075bf8f493b))
* typo in dockerbuild file ([cf03a83](https://github.com/Open-Study-College/osc/commit/cf03a836d0015f5e488d1a4a45c418c179e8ac42))
* typo in osc-academic-hub pr-branches.yml ([d2d4931](https://github.com/Open-Study-College/osc/commit/d2d4931e70e6734ea4c63ed73ffcd13f1c5e7bd3))
* typo in playwright deployment step ([142fd09](https://github.com/Open-Study-College/osc/commit/142fd096c8faa978bf5a2e059a513ceb9d5d1952))
* typo in playwright workflow ([277ffe9](https://github.com/Open-Study-College/osc/commit/277ffe93e04abbd89766c8e2ac5624a8f1924f5f))
* typo in workflow filter ([dbd88ac](https://github.com/Open-Study-College/osc/commit/dbd88ac3cba1717544f2805b2d9533a11e0fa9e7))
* typo in workflows ([9de724b](https://github.com/Open-Study-College/osc/commit/9de724ba4980618dd48102a5b714a2fd31096c33))
* typos in workflow ([79fe260](https://github.com/Open-Study-College/osc/commit/79fe260e16bd9fd3d6a6f2637e920e650b74c13f))
* typos in workflows and echo my_db_url ([6be0422](https://github.com/Open-Study-College/osc/commit/6be0422962d81b8aa993c8bb544a9a79139c61fd))
* undo changes to files not in workflows ([b4480ba](https://github.com/Open-Study-College/osc/commit/b4480ba1cb5b1b48753d655c5d4eb0964ded5aa0))
* updade concurrencies across workflows ([a786e80](https://github.com/Open-Study-College/osc/commit/a786e80a160a15feedf33605c48a69def800835a))
* update concurrencies across workflows ([12c604b](https://github.com/Open-Study-College/osc/commit/12c604be99dcf6ca6b5d3485c0b0e93648348ade))
* update conditionals surrounding deployment of prs ([ae75950](https://github.com/Open-Study-College/osc/commit/ae75950c92e435e06ae70e142c6463ffd5d56226))
* update conditionals surrounding docker build commands ([6e2aa1e](https://github.com/Open-Study-College/osc/commit/6e2aa1e14169ded2c17be7de9426b2d2c18e3a9f))
* update id in dockerBuild action ([13bbbfd](https://github.com/Open-Study-College/osc/commit/13bbbfd017879d7011e1d0e5f0b812ea31cacb37))
* update interval for is-selected tests ([2e1ba6b](https://github.com/Open-Study-College/osc/commit/2e1ba6b1aabd9769245c48815bf16791e5eb53af))
* update name to be more descriptive ([7a68714](https://github.com/Open-Study-College/osc/commit/7a68714403c45787d6061474bbaa251c0c7d8a0e))
* update password name in docker build command osc-ecommerce-pr-branches ([811a77b](https://github.com/Open-Study-College/osc/commit/811a77b676bdeacaaa32545ba92d51e5898f747b))
* update release version ([7d9f0ad](https://github.com/Open-Study-College/osc/commit/7d9f0adf861bb30047e9d67cf9dd9f041f7649e4))
* update workflows to  use workspaces ([74f1172](https://github.com/Open-Study-College/osc/commit/74f117287f02ad8317811ea80221a012b63e257f))
* update workflows to  use workspaces ([0c0eb95](https://github.com/Open-Study-College/osc/commit/0c0eb95c253084b18126a76e990cacf6401194d0))
* updates volumes delete script to take app name ([1452efe](https://github.com/Open-Study-College/osc/commit/1452efec688fa836312eaa150a5ebd6d68707921))
* upgrade to workspaces, bundle css in a different manner ([fc188c9](https://github.com/Open-Study-College/osc/commit/fc188c9c2e83503c66357417f36b3453801bed87))
* upgrade to workspaces, bundle css in a different manner ([d8fe4b1](https://github.com/Open-Study-College/osc/commit/d8fe4b15454e3edf5e17193e6e5c40561f4e5f70))
* us inputs.PASSWORD_NAME in dockerBuild action ([2621b97](https://github.com/Open-Study-College/osc/commit/2621b9726d1bf64efbc8580f9f1836e11651dd24))
* use embla recommended method for calculating aria hidden ([cc3032b](https://github.com/Open-Study-College/osc/commit/cc3032b322e55ac883e5678587e3f0be21a6b13d))
* use inputs.PASSWORD_NAME when creating all connection strings ([6fefbdb](https://github.com/Open-Study-College/osc/commit/6fefbdbbed543ba778cd9d872adeb5949a2b4fc6))
* uses flyctl before deleting old volumes ([676ddcc](https://github.com/Open-Study-College/osc/commit/676ddcc16bbb32971467f1e41a0c2b9c89fec504))
* write basic test, fix resizing bug and make accessible, allow duplicate carousels ([53a3dc7](https://github.com/Open-Study-College/osc/commit/53a3dc70241bb866912b5afeefc28864cb92764d))


### 📦 General Housekeeping / Package Updates

* adds redirects type ([debb6ac](https://github.com/Open-Study-College/osc/commit/debb6ac175f978645dd3d3752d4329dbf889abc9))
* adds remix cookie ([2a87b85](https://github.com/Open-Study-College/osc/commit/2a87b859f2ee51753ce16589dff4541a1873502d))
* adds remix hooks to snippets ([7d6823c](https://github.com/Open-Study-College/osc/commit/7d6823cb1d7024ae157d7ea12ff00d6691543f8d))
* adds remix snippets to project settings ([b735a89](https://github.com/Open-Study-College/osc/commit/b735a89f9fc8d9f0bfc3a2dc2de8f4fca2a3d4b8))
* adds scope to snippets ([e32169a](https://github.com/Open-Study-College/osc/commit/e32169ae0d214da63427a13535bbde893c0ad4aa))

## [0.6.0](https://github.com/Open-Study-College/osc/compare/v0.5.1...v0.6.0) (2022-10-28)


### ✨ Features

* added .env.example to gateway ([d684af4](https://github.com/Open-Study-College/osc/commit/d684af4e1705f99896a544dfb6cfe9d06aaab133))
* added API packages to Lerna config ([048c04b](https://github.com/Open-Study-College/osc/commit/048c04bcc7c63b2e32a9db486e995fbaa3457342))
* added auth api base build ([47de2d8](https://github.com/Open-Study-College/osc/commit/47de2d8c41283f9ee872406e476068ee89904985))
* implements osc-api-gateway run commands ([2491b88](https://github.com/Open-Study-College/osc/commit/2491b88c3516cf412483ceff5833bec4f073f9b3))
* initial gateway setup ([8ea3c7e](https://github.com/Open-Study-College/osc/commit/8ea3c7e75139c232831998bdf0b62ae70691e229))
* initial ORM/DB table setup ([6fb8442](https://github.com/Open-Study-College/osc/commit/6fb8442088bde34255a59e4d03782745ef6f9e73))
* restructured API into individual packages ([4158ed5](https://github.com/Open-Study-College/osc/commit/4158ed5c27b79fb1eb7fe368a8db8de44825eb3c))
* updated .gitignore files ([cfcb96c](https://github.com/Open-Study-College/osc/commit/cfcb96c092f5ae9ffd6dfd4ea5497193430e4b09))
* users tables ([3449e78](https://github.com/Open-Study-College/osc/commit/3449e781c1265a2ea6dd65c7b851f243c0f4b535))
* working barebones of API Gateway ([0ae81e2](https://github.com/Open-Study-College/osc/commit/0ae81e2be90ad59321a8c9a805d6fe1ea1cdb087))
* working setup of barebones auth subgraph ([14eb6cf](https://github.com/Open-Study-College/osc/commit/14eb6cf45640b9efba31da7b31054fc256b6f647))


### 📝 Documentation

* updates cypress mentions in readme ([eca560e](https://github.com/Open-Study-College/osc/commit/eca560e2f6d7a5278f146439c917f4084af6e5e3))


### 📦 General Housekeeping / Package Updates

* add .node-persist to gitignore ([62c37fb](https://github.com/Open-Study-College/osc/commit/62c37fbc57cf734c1a7443df2a8f94bc3f21353c))
* removes duplicate files ([39fc2c2](https://github.com/Open-Study-College/osc/commit/39fc2c25c78138419841a9c1aeff45ce4dfd069e))
* removes unused file ([988d03f](https://github.com/Open-Study-College/osc/commit/988d03ffd6483122176572a701a7534170bd6f49))
* renames test directories to use __ naming convention ([4d11cbd](https://github.com/Open-Study-College/osc/commit/4d11cbd93e8e0d71a405894c5ac37465ae45a3b6))
* tidy root.tsx file ([406f482](https://github.com/Open-Study-College/osc/commit/406f482f851973705cfffc98b627a529f249ad78))
* tidy route files ([db6229f](https://github.com/Open-Study-College/osc/commit/db6229fdf0dd1674538a9e011f0444b306b240a7))
* update heading level ([713bccb](https://github.com/Open-Study-College/osc/commit/713bccb6e91e16c6e2a14130f9468180327df9fc))
* update mock directory path ([fbf5a29](https://github.com/Open-Study-College/osc/commit/fbf5a2935b6fe09fa8309d85a4d0272ddbd8e6ac))


### 🧪 Tests

* update test assertion so it's less mad ([89b73f2](https://github.com/Open-Study-College/osc/commit/89b73f23bec104b7ecceb646314e80670499d0b5))
* update test assertion so it's less mad ([9bc1b6a](https://github.com/Open-Study-College/osc/commit/9bc1b6ac5ff990c54f889ad41c3c3f6e548ca484))


### ♻️ Refactors

* changed console.info messages to be more identifiable ([fe012bf](https://github.com/Open-Study-College/osc/commit/fe012bf7503f94df3e73ea24a7c2a1def7ddbb98))
* moves formtoggle component into it's own directory ([ce9b895](https://github.com/Open-Study-College/osc/commit/ce9b895cfd56997497c21df525926d66c4ee9814))
* moves util functions into utils directory ([5d6833c](https://github.com/Open-Study-College/osc/commit/5d6833c3ae30bc445c5951087a5cee20b52e8355))
* remove test scss files ([f9ed36e](https://github.com/Open-Study-College/osc/commit/f9ed36e64ecc2ea8c51b2342180640833605387d))
* removes depricated dashobard plugin ([a9f7fcc](https://github.com/Open-Study-College/osc/commit/a9f7fccf44a19af5f0b9415ff9e40d87d081d437))
* renaming tutoring field to coursesTutored to avoid confusion ([17f1e2c](https://github.com/Open-Study-College/osc/commit/17f1e2ccafe4eea2c44521e9110d0aba7c9c8c2f))
* updated package.json version ([525b8cd](https://github.com/Open-Study-College/osc/commit/525b8cdb3803166ff61eea363a9f393c02b7ec04))


### 🐛 Bugs

* removed cypress ([44dd2c6](https://github.com/Open-Study-College/osc/commit/44dd2c6d5142a7c7c145706a51c54c98ff034f57))
* removed npm init test script errors ([1a80c04](https://github.com/Open-Study-College/osc/commit/1a80c0459cb34e8e55340ba72acea4a4e4b8865f))
* removed/replaced console.log ([a9f3f33](https://github.com/Open-Study-College/osc/commit/a9f3f337efc2e736f566e8f3f3a168746cf8eee4))

## [0.5.1](https://github.com/Open-Study-College/osc/compare/v0.5.0...v0.5.1) (2022-10-26)


### 🐛 Bugs

* update cacert ([e405850](https://github.com/Open-Study-College/osc/commit/e4058509d68e04b0fd26e56479a7372656355f47))
* update cacert.pem ([f29eb3a](https://github.com/Open-Study-College/osc/commit/f29eb3ae3fc794de4eb6ac7cd079b63d0fb34a3d))

