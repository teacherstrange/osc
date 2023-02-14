## [0.34.1](https://github.com/Open-Study-College/osc/compare/v0.34.0...v0.34.1) (2023-02-14)


### 🐛 Bugs

* add image back into build process ([86af618](https://github.com/Open-Study-College/osc/commit/86af6189208abdd4fd4b77ead77be360b8808701))
* add radix package to studio and update nvmrc ([535c7ba](https://github.com/Open-Study-College/osc/commit/535c7ba51fc553541333e87574c6cd21aa815990))
* condtional token path ([059f156](https://github.com/Open-Study-College/osc/commit/059f1561905060268465109da9ae358ca203a1ab))
* declare image as a build arg ([ecd5319](https://github.com/Open-Study-College/osc/commit/ecd531955492506d17cfbdcb68f6e2617599d9eb))
* image id and studio conditionals ([fb386f3](https://github.com/Open-Study-College/osc/commit/fb386f3ad2bd6c910b80301654375984447a60e0))
* image tags ([3213c68](https://github.com/Open-Study-College/osc/commit/3213c687a62822f75d2a7255e111b6d26b9b2aed))
* revert short_sha to github sha ([a02e909](https://github.com/Open-Study-College/osc/commit/a02e9098f3bb18f063f3195bbf234b3692b8e05d))
* sanity_studio_ci is defined ([d537742](https://github.com/Open-Study-College/osc/commit/d537742db8b60c7e7b3e8b313d2dda113fadc0a9))
* sanity_studio_ci is now readonly ([5fd3e82](https://github.com/Open-Study-College/osc/commit/5fd3e820305370a7b741fc53a92359997adae3b4))
* short sha ([6aec899](https://github.com/Open-Study-College/osc/commit/6aec8996fba4fa0e992a7e31bf7deac2a88e20cc))
* typo in body.tsx osc-studio ([5d27a68](https://github.com/Open-Study-College/osc/commit/5d27a686ce6049b2d129f011984452aaeb3499e2))
* update dockerfiles with ENV SANITY_STUDIO_CI="true" ([88f7256](https://github.com/Open-Study-College/osc/commit/88f7256ea83561571fec2c3baedc512d457a4406))
* update sample env.file in studio ([5ede79b](https://github.com/Open-Study-College/osc/commit/5ede79bb89a2ba3803f1cb1536dddb6c6da4ec76))
* use short sha when searching for image ([c902995](https://github.com/Open-Study-College/osc/commit/c902995ace022020d15cc6ff800a5ac4b6b70be0))
* used buildx action v2 ([b6f21e1](https://github.com/Open-Study-College/osc/commit/b6f21e1d3b6438eb02509c77d10aef8b2c28a714))

## [0.34.0](https://github.com/Open-Study-College/osc/compare/v0.33.1...v0.34.0) (2023-02-14)


### ⚙️ CI/CD Updates

* **tools:** prettier fixes ([3496b57](https://github.com/Open-Study-College/osc/commit/3496b5775fdde62d23774ea8bc670aa6cae6f56a))


### ♻️ Refactors

* **tokens:** adds colour variable to accordion ([3fdd019](https://github.com/Open-Study-College/osc/commit/3fdd019156a83661d5bd616a4acc1b24ff40b7d1))
* **tokens:** amend to colour token ([7570a07](https://github.com/Open-Study-College/osc/commit/7570a07fbc10756a69eeadddaa6595645ff094ba))
* **tokens:** creates and updates box shadow variables ([9bab3ee](https://github.com/Open-Study-College/osc/commit/9bab3ee16a9dcfca36c7787e04452bac54ef97b8))
* **tokens:** fixes prettier line issue ([6608807](https://github.com/Open-Study-College/osc/commit/6608807c046f113fa6c10065a282716f536e84da))
* **tokens:** pr feedback ([900e249](https://github.com/Open-Study-College/osc/commit/900e249ad5b703d1f6064a8a4b3e21271319fd31))
* **tokens:** redefine radius tokens and update across scss ([05ded1c](https://github.com/Open-Study-College/osc/commit/05ded1c881a3f9ee1580ee7dc7b69dc0a0158386))
* **tokens:** rem function switched to using calc instead of sass:math ([8e586b4](https://github.com/Open-Study-College/osc/commit/8e586b4e5ab5d23eaf237a91593f79c05be57e2a))
* **tokens:** updates all scss files with amended tokens and associated variables ([f49ced3](https://github.com/Open-Study-College/osc/commit/f49ced305c027e9d98f6a1cf081cd3f250a6f82c))
* **tokens:** updates all scss files with amended tokens and associated variables ([73b70bc](https://github.com/Open-Study-College/osc/commit/73b70bcd594bc23f158487bd1bfe2bd03e1860a2))
* **tokens:** updates new and existing js tokens with new conventions ([8c11e7c](https://github.com/Open-Study-College/osc/commit/8c11e7c8c50dc39f3e44c8ecd242f15a1091bf37))
* **tokens:** updates new class keywords inline with new variable naming ([87a2cb6](https://github.com/Open-Study-College/osc/commit/87a2cb6db137bb99305d8bb309c85b6ab2929614))
* **tokens:** updates outdated doc ([d5b651f](https://github.com/Open-Study-College/osc/commit/d5b651f3f4e41134656029ff5d1a45e59b33fa71))
* **tokens:** updates package.json script for watching sass ([78fde7e](https://github.com/Open-Study-College/osc/commit/78fde7ed9e07e2d6b24d4ae5cc890b9bd9a69084))
* **tokens:** updates test.html file with new variable naming ([ad7cb4c](https://github.com/Open-Study-College/osc/commit/ad7cb4cf481793c7cbc1afe72ca30f95e33e577a))
* **tokens:** updates tokens README ([8bdb440](https://github.com/Open-Study-College/osc/commit/8bdb440eb3fdd1192afb8a7f0918db493064f481))
* **tokens:** updates types to match token names ([c5d370d](https://github.com/Open-Study-College/osc/commit/c5d370d3585997298708efee06111409e4235807))


### ✨ Features

* **tokens:** adds new darkestGrey colour ([b2e3e66](https://github.com/Open-Study-College/osc/commit/b2e3e66fdeff8a53eb5574abb7a3e81ce7d427f7))

## [0.33.1](https://github.com/Open-Study-College/osc/compare/v0.33.0...v0.33.1) (2023-02-14)


### 📦 General Housekeeping / Package Updates

* **prisma:** upgraded to latest prisma version ([fcb5a3b](https://github.com/Open-Study-College/osc/commit/fcb5a3bca9e82801fa362b8190a1e66e0d7c594e))

## [0.33.0](https://github.com/Open-Study-College/osc/compare/v0.32.0...v0.33.0) (2023-02-09)


### ♻️ Refactors

* **prisma:** readding supposedly deprecated feature - fails to generate without ([99e0514](https://github.com/Open-Study-College/osc/commit/99e0514e0e063d3a1195483c9e010edf560eaec5))
* **prisma:** removed deprecated settings ([8431623](https://github.com/Open-Study-College/osc/commit/8431623aecb17d3cf503387492e8511007343031))


### ✨ Features

* **api-admin:** added schema types fro unassigned students ([aa343e5](https://github.com/Open-Study-College/osc/commit/aa343e5ec6cfbdef7aa0c75ec78924cda85e0007))
* **api-admin:** added shield perms ([c4a59f6](https://github.com/Open-Study-College/osc/commit/c4a59f6acf449973bb55cd3db93827cba750e72b))
* **api-admin:** adding dev scripts ([dcd73d1](https://github.com/Open-Study-College/osc/commit/dcd73d18825f6a1ad477d499bc24e53fabc80d4c))
* **api-admin:** expanded prisma query for unassigned students ([20fe348](https://github.com/Open-Study-College/osc/commit/20fe3489fd00e53efba9e2ba7e38df5616535ee7))
* **api-admin:** initial admin API skeleton with basic query ([ea197b6](https://github.com/Open-Study-College/osc/commit/ea197b6d7e457d9a32fa1d01933c3aa9464dc5df))
* **api-gateway:** adding admin API to gateway ([8275ec5](https://github.com/Open-Study-College/osc/commit/8275ec57b58f810eced1aef2a9d26ab977449b2b))
* **prisma:** redefined student/course/tutor relationships ([64c8800](https://github.com/Open-Study-College/osc/commit/64c88002f1924beb8ec71c290d93df1e1e8ba83b))


### 🐛 Bugs

* **api-admin:** removed unused context ([62d147b](https://github.com/Open-Study-College/osc/commit/62d147b95356fdbed7619f0ce5d991b2044ff149))
* **api-admin:** setting fields to non-nullable ([3fe6fe5](https://github.com/Open-Study-College/osc/commit/3fe6fe5a3172a8c7d562a208b04215736b1ab93a))
* **api-admin:** setting ID to non-nullable ([b19dc03](https://github.com/Open-Study-College/osc/commit/b19dc03e72590e1cee27a880077bbcf751e991dd))
* **api-admin:** type casting user context from gateway ([052f597](https://github.com/Open-Study-College/osc/commit/052f59735532b9ac8e521bc8094858514fc222ed))

## [0.32.0](https://github.com/Open-Study-College/osc/compare/v0.31.0...v0.32.0) (2023-01-30)


### ✨ Features

* **ecommerce:** preloads spritesheet ([1ecf6af](https://github.com/Open-Study-College/osc/commit/1ecf6af565ce6479d0d9901ca1b1eb7655e2b00f))
* **ecommerce:** rule to server deps bundle to prevent unhandled syntax error with svgs ([eb56c69](https://github.com/Open-Study-College/osc/commit/eb56c693c9ad111c3d453abb30189f72e3bbb7bf))
* **studio:** adds custom icon picker and spritesheet ([09e0d96](https://github.com/Open-Study-College/osc/commit/09e0d966e8a7a601a1e3d3dc94e0959897d19297))
* add dist folder to staticDirs so we can reference the spritesheet ([88ec773](https://github.com/Open-Study-College/osc/commit/88ec77339ffd98a1234594e6e3ef74dd00168146))
* adds an icon component ([7cad44b](https://github.com/Open-Study-College/osc/commit/7cad44b706b67d7471d9e887383be698b16f7a46))
* adds custom icons ([57576ab](https://github.com/Open-Study-College/osc/commit/57576ab8e7839716f139bfe2df233a044dbb63a8))
* adds custom rollup plugin to generate a spritesheet ([330722e](https://github.com/Open-Study-College/osc/commit/330722e39924e4491ce40f602561776597eac836))


### ♻️ Refactors

* remove menu icon ([5bb8059](https://github.com/Open-Study-College/osc/commit/5bb805900ffdba29d36391a9be2e1aae60943232))
* renames icons with more generic name ([b066ac7](https://github.com/Open-Study-College/osc/commit/b066ac7af867104cb51ffba1f1063285d7bbba47))
* **tag:** updates accessible icon within the tag ([f2e3edc](https://github.com/Open-Study-College/osc/commit/f2e3edc7531870efde3be1a7a9d0dee28e6e7b5d))
* update regex to match all instances ([b163bec](https://github.com/Open-Study-College/osc/commit/b163bec45d4d3718c96494a05888450a6f5384ab))

