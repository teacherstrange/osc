## [0.120.0](https://github.com/Open-Study-College/osc/compare/v0.119.0...v0.120.0) (2023-06-23)


### ✨ Features

* added base sso auth ([2954925](https://github.com/Open-Study-College/osc/commit/2954925ac6a808a8736ed3439a51c138fd216c92))
* added common tutor queries ([f899df4](https://github.com/Open-Study-College/osc/commit/f899df4a54e677b2ffc2e5a2156e74c7cc619ecc))
* added course accept on tutor create ([0174d8c](https://github.com/Open-Study-College/osc/commit/0174d8c7063be3edbcfba246bb91ea494116d4a5))
* added firstname/lastname for validation ([e50ccf8](https://github.com/Open-Study-College/osc/commit/e50ccf8fe06e65f596043be6796f2d5a6249afdc))
* added IV fields to tutor create ([7bf3afb](https://github.com/Open-Study-College/osc/commit/7bf3afb83117fd52be414ea585596a10e44160fd))
* added iv handling to prisma schema ([b8ff2ff](https://github.com/Open-Study-College/osc/commit/b8ff2ff4e96220005f5f37f19811f7a7b1d942d5))
* added iv to course tutor ([fe34b3f](https://github.com/Open-Study-College/osc/commit/fe34b3f39d16039053964972230bac4057f7b7ab))
* added mutations ([4815e30](https://github.com/Open-Study-College/osc/commit/4815e30c56b7a51ba55baaeb01e4f786a6ce4958))
* added permissions to tutor create ([f42e0e2](https://github.com/Open-Study-College/osc/commit/f42e0e2a0844b94c75d93cd51634135d7bbf7a81))
* added query to mark a user as an IV ([5d72bef](https://github.com/Open-Study-College/osc/commit/5d72bef72b57a7bb8b5de1d325da9566880d3273))
* added sso endpoints ([c4345b8](https://github.com/Open-Study-College/osc/commit/c4345b84f2a8f9adb64fec611c4fe8b9a4c40571))
* added sso login and create ([1020ee9](https://github.com/Open-Study-College/osc/commit/1020ee99a10f65640b3b20d94516966ad952deb4))
* added tutor token validation ([781c729](https://github.com/Open-Study-College/osc/commit/781c729c5fd463459c7b38fb173fb9032d938071))
* assign tutor user role ([f0f353e](https://github.com/Open-Study-College/osc/commit/f0f353e2d688face918e35caa6451d702bf2b8b5))
* consideration for an 'accept' checkbox ([0000e4b](https://github.com/Open-Study-College/osc/commit/0000e4b228e60d34c495a5f05aa10eed579c5945))
* function to create a tutor ([a583ad4](https://github.com/Open-Study-College/osc/commit/a583ad407107fb6ac4e15d0bf091160907a031e1))
* got created by from AuthContext ([d6d2217](https://github.com/Open-Study-College/osc/commit/d6d22173f24b67253bedca8f1bada4d421dfc346))
* modified login input to string ([1e7e0e1](https://github.com/Open-Study-College/osc/commit/1e7e0e1df191e02f2d1bae95731e28526bdaffc1))
* modified user social to contain a ssoRef ([7033268](https://github.com/Open-Study-College/osc/commit/703326801e447a3cfd420d978818b4ef208a37b5))
* tutor create email ([d793562](https://github.com/Open-Study-College/osc/commit/d7935626a36859d51c193d86d83ea4ffa2af449f))


### 📦 General Housekeeping / Package Updates

* minor fixes ([4169e7a](https://github.com/Open-Study-College/osc/commit/4169e7a7c96d3d2b1116b9ed65507c2a7bcf199d))
* remove accept boolean ([e2e0ab3](https://github.com/Open-Study-College/osc/commit/e2e0ab34596de35e51a16e284563b169a22ebc2b))
* removed accept boolean from schema ([d53bfea](https://github.com/Open-Study-College/osc/commit/d53bfeac24ddb8d3a3fa286bd43db1c6342beb22))
* removed createdBy from mutation input ([21cc88f](https://github.com/Open-Study-College/osc/commit/21cc88fd46d5b72aad5ceebd590a0f138eae7a1c))
* reworded ssoId to socialId for logic ([fe1906d](https://github.com/Open-Study-College/osc/commit/fe1906d36fd6bee16321a6543002b1e0894afb6a))

## [0.119.0](https://github.com/Open-Study-College/osc/compare/v0.118.0...v0.119.0) (2023-06-23)


### ✨ Features

* **prisma-schema:** made values and defaults optional ([dc2f73a](https://github.com/Open-Study-College/osc/commit/dc2f73aa2e07001061fd1e2f84f71b5072edc6ef))
* **settings-api:** added shield permission rules ([6861bba](https://github.com/Open-Study-College/osc/commit/6861bbaf4035c28bcc0b947814ec182084cd67c2))
* **settings-api:** cloned admin API creating settings API ([381d63e](https://github.com/Open-Study-College/osc/commit/381d63e7c3abc31edf425130746634092e11147b))
* **settings-api:** get all preferences or a specific one for a user ([ff5c653](https://github.com/Open-Study-College/osc/commit/ff5c653ab99a6c7725bc7182d3b758da4ddd83d6))
* **settings-api:** v1 ability to save and read preferences by both ID and unique key ([bf69138](https://github.com/Open-Study-College/osc/commit/bf6913819f99d2194b5c7ec082f50dcc2f751568))

## [0.118.0](https://github.com/Open-Study-College/osc/compare/v0.117.0...v0.118.0) (2023-06-23)


### ✨ Features

* add user input ([fd45963](https://github.com/Open-Study-College/osc/commit/fd45963eeba4f3ffe5edba728a788d4852e532fb))
* added createdBy to admin create ([5ad3c92](https://github.com/Open-Study-College/osc/commit/5ad3c92e8de9335824bbbae5e99a1cdf0fe08c3b))
* added extra permissions to admin user create ([39a773f](https://github.com/Open-Study-College/osc/commit/39a773f8abe4f927181210c9329ad4b3b614fd11))
* added extraPermissions to schema ([ef21562](https://github.com/Open-Study-College/osc/commit/ef21562f8d718756189547a0255e49d1cca7eaa5))
* added query for get all permissions ([a42b72a](https://github.com/Open-Study-College/osc/commit/a42b72a755c9fc596036d93147a8bd272202de0b))
* made organisation required and multi roles ([a6483f7](https://github.com/Open-Study-College/osc/commit/a6483f73d7af4cfb838bd74642aa3e842f743665))
* moved user create through 1 endpoint ([8c8cd7e](https://github.com/Open-Study-College/osc/commit/8c8cd7e920466b0712831ae4c035c1850dcb2c1a))


### 📦 General Housekeeping / Package Updates

* fixed comment ([3a1752c](https://github.com/Open-Study-College/osc/commit/3a1752c503983178746d090e13a6cf496b23d4a4))

## [0.117.0](https://github.com/Open-Study-College/osc/compare/v0.116.0...v0.117.0) (2023-06-23)


### ✨ Features

* add e2e tests for search route ([f23066d](https://github.com/Open-Study-College/osc/commit/f23066d1aaebae45cb4bd26dd22f588ca55c490e))
* disable web security to bypass CORS issues ([d39f42d](https://github.com/Open-Study-College/osc/commit/d39f42df18e58d631fc96dbc6e089e6038018a91))

## [0.116.0](https://github.com/Open-Study-College/osc/compare/v0.115.0...v0.116.0) (2023-06-22)


### ✨ Features

* create InfiniteHits component and add Pagination component ([6d9c637](https://github.com/Open-Study-College/osc/commit/6d9c637bc9fe8271e674e2c466a290a8c5399581))


### ♻️ Refactors

* add [@layer](https://github.com/layer) wrapper ([819d4e3](https://github.com/Open-Study-College/osc/commit/819d4e370da457ef83c3a0f947549e503fcdf45c))
* add new container sizes ([a368259](https://github.com/Open-Study-College/osc/commit/a368259c5d06b4086f6c2b52f497132ed5727230))
* add padding and update container size ([a14021b](https://github.com/Open-Study-College/osc/commit/a14021bb2714b1092b71c966f020006ae1917715))
* remove Hits component ([4ca3e8e](https://github.com/Open-Study-College/osc/commit/4ca3e8ef0ba468c3ecafb181d6d81fddd3043bc9))
* udpate classes on OSCPagination and remove redundant styling ([8ca2192](https://github.com/Open-Study-College/osc/commit/8ca2192e68749b37530f31062f14a917a7bee687))
* update package-lock file ([a2da884](https://github.com/Open-Study-College/osc/commit/a2da8843b5aeadeaf14abcaef1d083f20f579b33))
* update pagination specific styling ([2da7503](https://github.com/Open-Study-College/osc/commit/2da75039eafdd0c70d299f29cbc91149bba9e692))
* use InfiniteHits component in search route ([c5ed879](https://github.com/Open-Study-College/osc/commit/c5ed8794931c0207c347d9eb86a4a52127d0bcb8))

