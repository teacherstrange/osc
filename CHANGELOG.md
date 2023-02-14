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

## [0.31.0](https://github.com/Open-Study-College/osc/compare/v0.30.0...v0.31.0) (2023-01-30)


### ✨ Features

* add "isDisabled" story and descriptions ([68a750a](https://github.com/Open-Study-College/osc/commit/68a750a1226cc9c69bc892708bfe84c5ecd333cc))
* add error handling/styling for "Has Validation" ([2e6d128](https://github.com/Open-Study-College/osc/commit/2e6d128e05f4e5d46191af9f3a199fa3fb56f879))

## [0.30.0](https://github.com/Open-Study-College/osc/compare/v0.29.1...v0.30.0) (2023-01-30)


### ✨ Features

* add Slider component, styling and tests ([008f622](https://github.com/Open-Study-College/osc/commit/008f62250e9c8dcd5a1b1b170771cd93110f0e1b))


### ♻️ Refactors

* mock out ResizeObserver, make same change in Popover component and remove package ([a897e77](https://github.com/Open-Study-College/osc/commit/a897e776b3e1234a11f6538b89392cfc1e19df40))
* remove React fragment ([977a2d4](https://github.com/Open-Study-College/osc/commit/977a2d4347b8d427ba21dea4f97c2910eaa6b40a))
* remove useEffect and set value directly in useState ([191d1b1](https://github.com/Open-Study-College/osc/commit/191d1b1c4c459a3dcc109f66cc1ee84288b8d38c))
* remove useEffect import ([7d35023](https://github.com/Open-Study-College/osc/commit/7d3502391a8c87af2c53d5d724e74ebac1f27e0e))
* removes react FC type from components ([1e4ab18](https://github.com/Open-Study-College/osc/commit/1e4ab18475520761d836eddcd9b2c01a1a731b41))
* simplify and move into two separate stories ([72326fa](https://github.com/Open-Study-College/osc/commit/72326fa16f9f6af1305730b5f4c939e75f73535d))


### 🐛 Bugs

* adds missing children type ([e250054](https://github.com/Open-Study-College/osc/commit/e25005467abdbf6429239b81a586e52a03a3bd36))
* updates props to correct type ([4b9639e](https://github.com/Open-Study-College/osc/commit/4b9639efbdfc9d369bd113d04feb4aa3c591d239))

