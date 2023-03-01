## [0.48.0](https://github.com/Open-Study-College/osc/compare/v0.47.0...v0.48.0) (2023-03-01)


### ✨ Features

* **ecommerce:** wrap root components in o-page div ([9b0f022](https://github.com/Open-Study-College/osc/commit/9b0f0221e1c2c49dff39d4cdea0e63f7743208e3))
* **styles:** adds o-page object class ([3586390](https://github.com/Open-Study-College/osc/commit/35863908141b0969e419a3f0a3d49462fddfa6be))

## [0.47.0](https://github.com/Open-Study-College/osc/compare/v0.46.4...v0.47.0) (2023-02-28)


### 📦 General Housekeeping / Package Updates

* make storybook quiet for my sanity ([c21648a](https://github.com/Open-Study-College/osc/commit/c21648aa99860f9bafcbf6dfa93367a224f36e60))


### 🐛 Bugs

* **ecommerce:** fixes lint error ([5d964ad](https://github.com/Open-Study-College/osc/commit/5d964ad68f647d2a150d321f68543c574ac388c6))
* **navbar:** removes isDekstop check on inline style ([d2c3805](https://github.com/Open-Study-College/osc/commit/d2c380570f0d3519f872febf2c2e7b4e9ef4ee92))


### 🧪 Tests

* **e2e:** add e2e tests for the navbar ([36b1d00](https://github.com/Open-Study-College/osc/commit/36b1d000f69a70089a098bf895c6bef3ca4ec529))
* **e2e:** enable mobile tests ([89830d5](https://github.com/Open-Study-College/osc/commit/89830d5eb8099774a2e8650c306581606acf87d3))
* **ecommerce:** add exact: true to button locators ([fdc5f5c](https://github.com/Open-Study-College/osc/commit/fdc5f5c7dc67f1c8e2a92a4f7481a2d4347a9d84))


### ♻️ Refactors

* **ecommerce:** abstract header into it's own component ([366ab4b](https://github.com/Open-Study-College/osc/commit/366ab4b7c294a3b3918302394a48b911a36ef74c))
* **ecommerce:** move buildUrl query into it's own file ([8d032ff](https://github.com/Open-Study-College/osc/commit/8d032ff3a9b8afa67ebf5b83c277dcd3419e4467))
* **ecommerce:** update svgs to use Icon component ([2729f19](https://github.com/Open-Study-College/osc/commit/2729f196361777a6324950fb6c6c8e5a619911a6))
* **ecommerce:** updates getSettingsData to accept params ([09a7a3c](https://github.com/Open-Study-College/osc/commit/09a7a3ca432c471d052df6237cbfb95a0a9102c1))
* **navbar:** removes prefetch prop ([dc072ad](https://github.com/Open-Study-College/osc/commit/dc072ad5f9fb1c09a4a9ac7dc52aecccdb13fca4))


### ✨ Features

* **ecommerce:** add action nav to settings query ([283a4ac](https://github.com/Open-Study-College/osc/commit/283a4ac56997cb616b164b9241c2dadb9ae64916))
* **ecommerce:** add types for nav settings ([68e469e](https://github.com/Open-Study-College/osc/commit/68e469e9ec223266c57514c4112a017cf514fa90))
* **ecommerce:** adds action bar to header ([e7e4038](https://github.com/Open-Study-College/osc/commit/e7e4038caeec95277d40b663a30818194057b94c))
* **ecommerce:** adds action nav settings types ([c8b1093](https://github.com/Open-Study-College/osc/commit/c8b1093efa7637e1ce46e51242ee24e6044be41f))
* **ecommerce:** adds action nav to header ([234e4c5](https://github.com/Open-Study-College/osc/commit/234e4c5be8d6868183f29688e3e3a165e8e7bdd8))
* **ecommerce:** adds action nav to mobile menu ([15e095f](https://github.com/Open-Study-College/osc/commit/15e095f6cebdcec9d3833165fa26a53769dd131e))
* **ecommerce:** adds header and nav ([35d07f1](https://github.com/Open-Study-College/osc/commit/35d07f17b24ba8b8d846e38356859bbf62e7488d))
* **ecommerce:** adds nav component wrapper ([a6a386e](https://github.com/Open-Study-College/osc/commit/a6a386eba15213e0c8db7c981cd2af100c8cb661))
* **ecommerce:** adds navigation query ([246bae7](https://github.com/Open-Study-College/osc/commit/246bae7580f77ef304e752af91dd83185c79136a))
* **ecommerce:** import logo from osc-ui ([68f47c4](https://github.com/Open-Study-College/osc/commit/68f47c41ed0f76e5a05ae9a7b86e17041759f908))
* **header:** adds background color ([f1a4427](https://github.com/Open-Study-College/osc/commit/f1a4427f2efff88d89cf2f174c0c7fabdf24e1c6))
* **header:** update exports ([b499e6d](https://github.com/Open-Study-College/osc/commit/b499e6de34b53c1716fff6080e4b1389cb576c65))
* **icon:** export accessible icon component ([8558f4e](https://github.com/Open-Study-College/osc/commit/8558f4e36f3ccc1f5e393f6e33ee8e2996761b13))
* **logo:** export logo from osc-ui ([f5b35f1](https://github.com/Open-Study-College/osc/commit/f5b35f1da012c1eb27b6458315024b4848a19a68))
* **navbar:** adds an event listener to close menu when links are clicked ([90ca7bc](https://github.com/Open-Study-College/osc/commit/90ca7bc1a8e9b9cd009e59adcc119e7c340edd61))
* **navbar:** adds useUniqueId hook ([bd5675d](https://github.com/Open-Study-College/osc/commit/bd5675d41e582640e5bb763ade59ee47d29ed794))
* **studio:** adds action nav settings ([661c15f](https://github.com/Open-Study-College/osc/commit/661c15fc61bd2d37e4e44d4cab5ec8de0a6e6421))
* **studio:** adds nav selector to settings ([4d097ff](https://github.com/Open-Study-College/osc/commit/4d097ff5612493da8cfc49b6540daf8fc77d7972))
* **studio:** adds navigation schema ([289b1de](https://github.com/Open-Study-College/osc/commit/289b1dead140d7c2b1c55676620818692306e53d))
* **studio:** adds navigation to the desk structure ([7fe7c4a](https://github.com/Open-Study-College/osc/commit/7fe7c4ad746684e3ae34e6d800dfc479e351e2ae))

## [0.46.4](https://github.com/Open-Study-College/osc/compare/v0.46.3...v0.46.4) (2023-02-28)


### 🐛 Bugs

* **academic-hub:** move styles link before component styles ([66014e4](https://github.com/Open-Study-College/osc/commit/66014e42959c874a94db44780d386149007c81c7))
* **ecommerce:** move dynamic styles after static assets ([23991ad](https://github.com/Open-Study-College/osc/commit/23991ad9bb8c4cace345d2d49293b523a8c85c41))

## [0.46.3](https://github.com/Open-Study-College/osc/compare/v0.46.2...v0.46.3) (2023-02-24)


### ♻️ Refactors

* **styles:** updates container class and modifiers ([0b6fa06](https://github.com/Open-Study-College/osc/commit/0b6fa06995572d88ac5fcd4ab80dca898a6d854a))


### 📦 General Housekeeping / Package Updates

* **style:** update comment ([05cb2ef](https://github.com/Open-Study-College/osc/commit/05cb2ef1960b548b312713ccd58abfdde82ac649))


### ⚙️ CI/CD Updates

* **actions:** adds codeball update ([b37f00f](https://github.com/Open-Study-College/osc/commit/b37f00f2eede05c42765deb8cac2c15539ae0436))

## [0.46.2](https://github.com/Open-Study-College/osc/compare/v0.46.1...v0.46.2) (2023-02-24)


### 🐛 Bugs

* **config:** removed the scss formatter override in the vscode json ([9c8dab0](https://github.com/Open-Study-College/osc/commit/9c8dab0fd1d1d0efb68a403f48a359cdfa6f4390))


### ♻️ Refactors

* **scss:** setting up css layers to control the cascade when loading components scss via osc-ui ([d2e70d9](https://github.com/Open-Study-College/osc/commit/d2e70d9dffd120eff7ee1266f12dcfc27d8d8a11))
* **scss:** wraps all component scss with an [@layer](https://github.com/layer) to allow us better control of css cascade ([857f649](https://github.com/Open-Study-College/osc/commit/857f6497e135f3ee32ce48de4574ab1505f0f050))

