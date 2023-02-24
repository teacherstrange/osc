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

## [0.46.1](https://github.com/Open-Study-College/osc/compare/v0.46.0...v0.46.1) (2023-02-24)


### ⚙️ CI/CD Updates

* **actions:** adds codeball AI PR review workflow ([ca96ffc](https://github.com/Open-Study-College/osc/commit/ca96ffc3bec968e4aca1ce5f1d5be8fed3d3eac1))

## [0.46.0](https://github.com/Open-Study-College/osc/compare/v0.45.0...v0.46.0) (2023-02-24)


### ✨ Features

* **api-assignments:** added .env variables to .example ([ff4a341](https://github.com/Open-Study-College/osc/commit/ff4a3412ed5471c0e976dcefbe20ade10f2d28bf))
* **api-assignments:** added S3 SDK ([6f0319c](https://github.com/Open-Study-College/osc/commit/6f0319c22b68ee28aefd4477426ef621584e4f1b))
* **api-assignments:** define assignment prisma models ([c05f517](https://github.com/Open-Study-College/osc/commit/c05f517c9ab1c8cd9a790f6949672bdef2e714c8))
* **api-assignments:** get signed upload url from S3 ([316c564](https://github.com/Open-Study-College/osc/commit/316c5643215b8a956162e4ec10dba16b92110cc4))
* **api-assignments:** initial API setup ([a9da598](https://github.com/Open-Study-College/osc/commit/a9da598e8866e660b6af3964570e0faac950426b))
* **api-assignments:** successfully getting a signed url ([90e4f06](https://github.com/Open-Study-College/osc/commit/90e4f06a7deeb35662ff9237c3d766c81de3aff6))
* **api-gateway:** adding assignments API to gateway ([018ee6b](https://github.com/Open-Study-College/osc/commit/018ee6bd5b7cb52b6d9f0feecb46cd1ea39948cf))


### 📦 General Housekeeping / Package Updates

* **api-assignments:** remove `debug: true` ([b9b9c19](https://github.com/Open-Study-College/osc/commit/b9b9c197d45fc961ec98ad995c1a33a59195f87b))

## [0.45.0](https://github.com/Open-Study-College/osc/compare/v0.44.0...v0.45.0) (2023-02-24)


### ✨ Features

* **api-gateway:** added LMS API to gateway ([ff87df9](https://github.com/Open-Study-College/osc/commit/ff87df9b7294748fa77fc7896a53f7f5f946a70b))
* **api-lms:** authenticating Litmos (WIP) ([f87dd51](https://github.com/Open-Study-College/osc/commit/f87dd5167f7d1ff2ea3053fcb3fc11070aaa3d02))
* **api-lms:** setup skeleton LMS API ([38fe653](https://github.com/Open-Study-College/osc/commit/38fe653bb82a9d3b7ead615d48532748a328b21d))
* **api-lms:** working API example ([f21cb5e](https://github.com/Open-Study-College/osc/commit/f21cb5e1441a76ab9f52346dc0a399885a74fc75))


### ♻️ Refactors

* **api:** updating .env.example files with all variables ([9727f02](https://github.com/Open-Study-College/osc/commit/9727f025e41b7f060ab4169c624b36b1885be652))
* **api-lms:** change from `let` to `const` ([567f7ce](https://github.com/Open-Study-College/osc/commit/567f7cefb213ffbfe3f382d37b6944d8b02d95a0))


### 🐛 Bugs

* **api-lms:** returning an error if no user found ([e140b43](https://github.com/Open-Study-College/osc/commit/e140b43cefa2bf8910b979b28c90a7d28f11a67e))


### 📦 General Housekeeping / Package Updates

* **api-lms:** added docs to schema ([93a9edc](https://github.com/Open-Study-College/osc/commit/93a9edcbad7c18114a59ec8ab2cebe9f43547998))
* **api-lms:** remove `console.log` ([fb16abb](https://github.com/Open-Study-College/osc/commit/fb16abbc9baff7de73480c68cda40e935c5e7135))
* **api-lms:** removed empty function types file ([b91e5f7](https://github.com/Open-Study-College/osc/commit/b91e5f762dc88c0399df3c9e9bb8f68d24404769))
* **api-lms:** set ID to non-nullable in GQL schema ([888d86d](https://github.com/Open-Study-College/osc/commit/888d86d5287dceb5423334564ef213371bc4e6ef))

