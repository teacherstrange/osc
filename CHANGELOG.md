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

## [0.44.0](https://github.com/Open-Study-College/osc/compare/v0.43.0...v0.44.0) (2023-02-24)


### ✨ Features

* add calendar component ([c4cad9f](https://github.com/Open-Study-College/osc/commit/c4cad9fd67b15a69f0aa5e1ea9573c4b342a5a62))
* add DateField component ([0abff3d](https://github.com/Open-Study-College/osc/commit/0abff3d1bd0a296eccfdc0747281426a0a670074))
* add DatePicker component and react-aria supplementary components ([f58dc9e](https://github.com/Open-Study-College/osc/commit/f58dc9e02f07fe2556f7247854535cc72ca239e5))
* add DateRangePicker and RangeCalendar ([18f5236](https://github.com/Open-Study-College/osc/commit/18f5236cb0e77bb8f7961c53efd2b0e7581d5f45))


### 🧪 Tests

* add more tests to DateRangerPicker ([87a9299](https://github.com/Open-Study-College/osc/commit/87a92993525620960a6cca2160db2e8449cdc57f))
* add tests for DatePicker component ([9d2fbe6](https://github.com/Open-Study-College/osc/commit/9d2fbe6d133804ea4fea838ec057960290c0e27d))
* add tests for DateRangePicker component ([66e63ca](https://github.com/Open-Study-College/osc/commit/66e63ca9a3dd8882d4c1f41bc839a2a4930b7849))


### ♻️ Refactors

* add a "default date" story ([a325d47](https://github.com/Open-Study-College/osc/commit/a325d472099beed4ab263cb1ec8b487d698174ca))
* add additional test for year and decade calendar selectors ([2cc52a2](https://github.com/Open-Study-College/osc/commit/2cc52a2329319cc9c6f5c1b4915010585ec46b88))
* add aria-label and role for the time presets container ([cdeb1a8](https://github.com/Open-Study-College/osc/commit/cdeb1a8ce74fe8a73ad6c00af5f7446efc2ba6e9))
* add background color to datepicker popover ([97b61ab](https://github.com/Open-Study-College/osc/commit/97b61abeb172e4d45986b75fedb8799d10638d02))
* add CalendarState type and cast to RangeCalendarState when necessary ([6b94e6d](https://github.com/Open-Study-College/osc/commit/6b94e6d581eb6c8184a7f6daaee8b2c20fa26982))
* add cell height/width variable ([7240217](https://github.com/Open-Study-College/osc/commit/7240217d96f84b9f1404cbb5f7318648ceb619c3))
* add change to enable "select end date" to work correctly ([85828bb](https://github.com/Open-Study-College/osc/commit/85828bb24f96d81c2df2eb8875e3eca5e0a1e89e))
* add changes for range calendar in mobile view ([1833938](https://github.com/Open-Study-College/osc/commit/183393830caef6ca2e859c9db37d7ebc20f6c670))
* add comments and styling adjustments ([c086d1e](https://github.com/Open-Study-College/osc/commit/c086d1ec37b0a4f5759f33027c60ece7fbd8794a))
* add comments for row/column create on year/decade calendars ([686257b](https://github.com/Open-Study-College/osc/commit/686257b12eeaa8b2c7ab524bb2603c7ac226b91b))
* add darker neutral colour for the label ([285b739](https://github.com/Open-Study-College/osc/commit/285b739eb7d370e190f29de17a80cc845631a8f2))
* add decade/yearly calendars and updates styles ([99ce2df](https://github.com/Open-Study-College/osc/commit/99ce2df3d405555615152c03f6ad9cad16d1447d))
* add error handling styling ([057f15c](https://github.com/Open-Study-College/osc/commit/057f15cd76e07a5c8a7ed70822887f80cb23ba60))
* add es-lint-disable for useEffect ([fd9d64d](https://github.com/Open-Study-College/osc/commit/fd9d64d82ed4b7ef6049892ef382a4bb487af603))
* add focus-visible and hover style for continuity ([dbe3f1e](https://github.com/Open-Study-College/osc/commit/dbe3f1e9eff9466bda287d426a675d1fa10daae1))
* add global $radius variable ([7a900a6](https://github.com/Open-Study-College/osc/commit/7a900a6e7ace04a942a082753b4a2f225cca2b59))
* add interfaces ([73f6f2f](https://github.com/Open-Study-College/osc/commit/73f6f2fb9355dd630a2cf029b6f0662688806e6b))
* add more DatePicker stories ([75035a1](https://github.com/Open-Study-College/osc/commit/75035a1adebaa330f6b5897f9e49e40ebba4e084))
* add more documentation into storybook ([62407be](https://github.com/Open-Study-College/osc/commit/62407be2968e70eb34e49f2025475c153b0be412))
* add more TS support and styling tweaks to label and button ([f477ec7](https://github.com/Open-Study-College/osc/commit/f477ec78d8661fa6e92c8e506081318866e82179))
* add not() selector to avoid unwanted hover styles ([4cba644](https://github.com/Open-Study-College/osc/commit/4cba6441d4d0458cb1c396afaf40b2b6bd88c039))
* add random id to avoid duplicate id ([59a19ec](https://github.com/Open-Study-College/osc/commit/59a19ecc243683202e70169d81008cfe0bf64e10))
* add state to check if defaultValue has been set ([ba7e79b](https://github.com/Open-Study-College/osc/commit/ba7e79be1d78520f16f0a19d189c362076a839a4))
* add TS support and small refactors ([98fff1e](https://github.com/Open-Study-College/osc/commit/98fff1ec0832d835f06879f3e61ecef376f3de30))
* add TS support for Calendar component ([30d64e9](https://github.com/Open-Study-College/osc/commit/30d64e90deb36ba19a419660867529ad33c7c7e2))
* add TS support for utils, RangeCalendar & DatePicker ([417bf62](https://github.com/Open-Study-College/osc/commit/417bf6281ea69cb916dd9e115c663b13bea5d6a9))
* add uniqueId hook to avoid different Ids with SSR ([b01f912](https://github.com/Open-Study-College/osc/commit/b01f9122eaa76a9b2f9e335526f3a7d994f5930a))
* change "visibleDuration" back to two months ([02cadf1](https://github.com/Open-Study-College/osc/commit/02cadf1b22d1f6d1800dc86a52f68d7e682dd2c6))
* change variable declarations from let to const ([f431fcd](https://github.com/Open-Study-College/osc/commit/f431fcd81e862800689c96e65c9795b2a1eabc43))
* change width to 100% and add spacing to last segment ([1625675](https://github.com/Open-Study-College/osc/commit/162567586c836e8bb7739a241c9ff04c70fd3039))
* consolidate subcomponents into the same files ([7276e18](https://github.com/Open-Study-College/osc/commit/7276e182e93a7c3c07096814dc41158c080d5f83))
* correct timePreset value name ([f897da5](https://github.com/Open-Study-College/osc/commit/f897da5d1bed58636dddce65a787c493de604c03))
* correct typo ([4b1c721](https://github.com/Open-Study-College/osc/commit/4b1c7214bcd54473653d8bacd1b36c19b2e5c378))
* de-structure props in the body of functions ([7e6ded6](https://github.com/Open-Study-College/osc/commit/7e6ded6ca6799a136ea32f33cc09106c02e18de8))
* define types for useState ([b487f51](https://github.com/Open-Study-College/osc/commit/b487f518e8ed19661483b3069aabcbcb521c3ce2))
* destructure in body of function and add interface ([a3872b3](https://github.com/Open-Study-College/osc/commit/a3872b30afa9e896e805da89419175b8e878d660))
* destructure min/maxValue to avoid spreading onto DatePicker ([a6f1b8d](https://github.com/Open-Study-College/osc/commit/a6f1b8d69b0a72e844f9afbc8417422009db9f4f))
* enabled defaultValue to be set ([2ea78a0](https://github.com/Open-Study-College/osc/commit/2ea78a03edf2376abaf2bde45bf28f6f5263df74))
* fix months showing disabled in every year ([53bd0b0](https://github.com/Open-Study-College/osc/commit/53bd0b0eab8a80ceac82819cf41cc5329d7d19ff))
* fix tests ([d459bf4](https://github.com/Open-Study-College/osc/commit/d459bf4025381b1db50c3b4f675567221c73ed3e))
* fix tests by adding SpriteSheetProvider ([c0b169d](https://github.com/Open-Study-College/osc/commit/c0b169d2c6da3c5b8b99ada69ae9e297790b7dfa))
* further styling adjustments ([28c765a](https://github.com/Open-Study-College/osc/commit/28c765a36ebe302d5aed5365aebca87380685e67))
* integrate year/decade calendar views into DatePicker calendar ([d005124](https://github.com/Open-Study-College/osc/commit/d0051240dceb5d14277ff43a63dc522ea9f38916))
* make "presets" prop optional ([1ee43c0](https://github.com/Open-Study-College/osc/commit/1ee43c0ea582d630717244cf421aaa4b20a0dae5))
* make "type" optional and set a default ([1f454ef](https://github.com/Open-Study-College/osc/commit/1f454ef58c72485c4f3714260d3634b7b24b8767))
* mock useMediaQuery to fix failing tests ([ddacbb9](https://github.com/Open-Study-College/osc/commit/ddacbb929551fa47990e29f68d7c9f35b5944427))
* move "createCalendar" into utils ([1452f90](https://github.com/Open-Study-College/osc/commit/1452f906a48d94313fa07dcc0c98ba1b9f9368ba))
* move calendar icon into DateField component ([cae3b64](https://github.com/Open-Study-College/osc/commit/cae3b64a06d86465b54c183991963e17dba130f1))
* move hover styling up to "grid-cell" element to stop flickering ([f931e0e](https://github.com/Open-Study-College/osc/commit/f931e0e4796484641c60bee3f40cad97c2cf3194))
* order and destructure props ([ad58d9b](https://github.com/Open-Study-College/osc/commit/ad58d9b4cfc0bd266f60ba155216f028e3ddef4c))
* pass label as a prop ([4b4dbb7](https://github.com/Open-Study-College/osc/commit/4b4dbb736cbf54f3d824bc66263e7d850d3aa7bc))
* re-organise imports ([1d66de3](https://github.com/Open-Study-College/osc/commit/1d66de36a4eb7e079c96e0436c066f24c5fc3ca0))
* refactor so DateRangePicker can modify state correctly ([c6d8bba](https://github.com/Open-Study-College/osc/commit/c6d8bba9f5d3a23e274d73339e414315b9a45ea4))
* refactor TimePresets component ([0523471](https://github.com/Open-Study-College/osc/commit/0523471b7addea418a175a529a02b9c864ceca76))
* remove "isUnavailable" prop ([533e747](https://github.com/Open-Study-College/osc/commit/533e747ac2cc6597f70b9cf5c3ee19801205f0f1))
* remove aria-label ([f3abdf9](https://github.com/Open-Study-College/osc/commit/f3abdf9804967725bb1559ffbc4262d51cb4ac89))
* remove comment ([b492552](https://github.com/Open-Study-College/osc/commit/b49255282d114741500bee6e6ec9985da8423d36))
* remove comment ([65b2e67](https://github.com/Open-Study-College/osc/commit/65b2e67842e755781d0dc61be4281fd99f360185))
* remove default value from useState ([40a7fb4](https://github.com/Open-Study-College/osc/commit/40a7fb41a729d972d056323ba454e47c2b1db4e0))
* remove hard-coded width and change flex-direction to "column" ([396bb4c](https://github.com/Open-Study-College/osc/commit/396bb4c2b6f243b15bb5227d33de5a42bc262bf7))
* remove parseDate import ([353c637](https://github.com/Open-Study-College/osc/commit/353c6372aa96efe6f52a771629324f0447dd8b97))
* remove rangeCalendar stories ([c194cc0](https://github.com/Open-Study-College/osc/commit/c194cc0c5546160af0fd03fcaf7d7adeedb67204))
* remove redundant font-weight and add darker gray as the color for accessibility ([e03e4a0](https://github.com/Open-Study-College/osc/commit/e03e4a0c265d0d38a70d2d4f05a6c033d9ccafae))
* remove stories ([89f8f98](https://github.com/Open-Study-College/osc/commit/89f8f98613a0d55f905c042dc96cbb8e0b136adc))
* remove td element padding ([651e786](https://github.com/Open-Study-College/osc/commit/651e786b6955876b10819b12ca6b890ea1b3fbab))
* remove unused label and name prop ([2b49ea5](https://github.com/Open-Study-College/osc/commit/2b49ea5a51a7413bf2c785040dd42d0b5692c5fa))
* remove usage of "new" operator ([ecfcaa4](https://github.com/Open-Study-College/osc/commit/ecfcaa4e6263a05518c9cbf127ebc342cd32fdd4))
* reorganise scss and classes ([bc1c190](https://github.com/Open-Study-College/osc/commit/bc1c190f68a59c7a0157fd51aa7265d3b3f858ea))
* replace RangeCalendar for RangeCalendarContainer ([3e0fade](https://github.com/Open-Study-College/osc/commit/3e0fadebfe7575e61b01e98a79c8be3319c4d2c5))
* replace ReactAriaButton with Button component ([e63c4a5](https://github.com/Open-Study-College/osc/commit/e63c4a54ab74f1176a57212433ed4ce2c9242f65))
* restructure scss to remove need for "important" declaration ([9803d80](https://github.com/Open-Study-College/osc/commit/9803d80b02c3c25146aa835a1c9818656c277d1f))
* scss updates ([e248127](https://github.com/Open-Study-College/osc/commit/e248127e25e2f88e207ceda99fc12434234a5b4e))
* set calendar to not close when selecting dates ([578b470](https://github.com/Open-Study-College/osc/commit/578b470fa30d24f9d828439c70879f01080c6442))
* simplify classes creation ([a20777e](https://github.com/Open-Study-College/osc/commit/a20777e9e677cbf620ae07326ec2da0d2c81a476))
* tidy up code for setting the prompt, add ts and comments ([abaa660](https://github.com/Open-Study-College/osc/commit/abaa6605c8d76216e647f8fcef13b968240425dd))
* tidy up code on disabling date ranges ([b1ed89e](https://github.com/Open-Study-College/osc/commit/b1ed89e47361fc08a92db96b6115e60e18b1ce03))
* uncomment calendar styles ([d683a2a](https://github.com/Open-Study-College/osc/commit/d683a2afbc58b4f6d984a63336f03c1e10e69376))
* unset overflow for desktop screens ([b9c80a8](https://github.com/Open-Study-College/osc/commit/b9c80a80836154f9b3e8fc75aa044f3787be2d72))
* update <div> to <label> element ([e46d808](https://github.com/Open-Study-College/osc/commit/e46d80802903f64ed0073434d9050fc19f7abbab))
* update calendar scss ([97e2098](https://github.com/Open-Study-College/osc/commit/97e2098013fcda45d15c76f9d8df0538c05dd75d))
* update DatePicker to cater for yearly and decade calendars ([6087ac1](https://github.com/Open-Study-College/osc/commit/6087ac1d5617a737e74be7c94873a785e8f676ed))
* update failing tests ([4b37c56](https://github.com/Open-Study-College/osc/commit/4b37c56e9f0c65b0abc22cc79d5668bce652330e))
* update icons ([fe49c71](https://github.com/Open-Study-College/osc/commit/fe49c714e8018e27a30439aa11046351632be8be))
* update name of uniqueId ([f30c518](https://github.com/Open-Study-College/osc/commit/f30c518e32dcb521bcc8181743a53e60469a81a1))
* update padding ([43f8803](https://github.com/Open-Study-College/osc/commit/43f880326380f64c5e4cd84660515b5722e42ac5))
* update prompt to be hidden based on a class ([feaf102](https://github.com/Open-Study-College/osc/commit/feaf102b02bbd6a7e2d09f16ef22463e82a3b5d8))
* update scss path ([6d69621](https://github.com/Open-Study-College/osc/commit/6d696216459be57a41e5e6d7ac0a00685ac459f4))
* update scss with correct tokens ([ae69cdc](https://github.com/Open-Study-College/osc/commit/ae69cdc806822bc1463c051b907652a60151ec47))
* update stories ([60b3637](https://github.com/Open-Study-College/osc/commit/60b3637a859aa5bc8b72800c03a4d911698b4eae))
* update styling for grid cells ([381aaaa](https://github.com/Open-Study-College/osc/commit/381aaaa3a4458467451ce1645b6615117ba16226))
* update tabbing and focus functionality for presets ([2f32ccc](https://github.com/Open-Study-College/osc/commit/2f32ccc6335a29f62b44216d9b671cd1be526604))
* update validation ([2938975](https://github.com/Open-Study-College/osc/commit/29389757839b9aec01cf442e4e01ab320baef186))
* update year and decade calendars to use "isDisabled" classes ([e6cf9ac](https://github.com/Open-Study-College/osc/commit/e6cf9ac70217e550415e7f4e31b57b99dfb2999e))
* use BEM styling for the Chevron, and remove h3 styling ([3eff9dc](https://github.com/Open-Study-College/osc/commit/3eff9dc4aa171e9b5885b834ef08dd7cbb5b759a))
* use existing "c-label" class for the labels ([791e9f0](https://github.com/Open-Study-College/osc/commit/791e9f0433bcab4a418713c5c6bf48177f235412))
* use span instead of h3 and updates styles ([8f656d0](https://github.com/Open-Study-College/osc/commit/8f656d04894a40b3b902bc9991007c267d7a949a))

