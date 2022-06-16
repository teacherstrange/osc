(self.webpackChunkosc_academic_hub = self.webpackChunkosc_academic_hub || []).push([
    [179],
    {
        './app/components sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.(js%7Cjsx%7Cts%7Ctsx))$':
            function (module, __unused_webpack_exports, __webpack_require__) {
                var map = {
                    './Button.stories.tsx': './app/components/Button.stories.tsx',
                    './FormToggle.stories.tsx': './app/components/FormToggle.stories.tsx'
                };
                function webpackContext(req) {
                    var id = webpackContextResolve(req);
                    return __webpack_require__(id);
                }
                function webpackContextResolve(req) {
                    if (!__webpack_require__.o(map, req)) {
                        var e = new Error("Cannot find module '" + req + "'");
                        throw ((e.code = 'MODULE_NOT_FOUND'), e);
                    }
                    return map[req];
                }
                (webpackContext.keys = function webpackContextKeys() {
                    return Object.keys(map);
                }),
                    (webpackContext.resolve = webpackContextResolve),
                    (module.exports = webpackContext),
                    (webpackContext.id =
                        './app/components sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.(js%7Cjsx%7Cts%7Ctsx))$');
            },
        './app/components sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.mdx)$':
            function (module) {
                function webpackEmptyContext(req) {
                    var e = new Error("Cannot find module '" + req + "'");
                    throw ((e.code = 'MODULE_NOT_FOUND'), e);
                }
                (webpackEmptyContext.keys = function () {
                    return [];
                }),
                    (webpackEmptyContext.resolve = webpackEmptyContext),
                    (webpackEmptyContext.id =
                        './app/components sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.mdx)$'),
                    (module.exports = webpackEmptyContext);
            },
        './.storybook/preview.js-generated-config-entry.js': function (
            __unused_webpack_module,
            __unused_webpack___webpack_exports__,
            __webpack_require__
        ) {
            'use strict';
            var preview_namespaceObject = {};
            __webpack_require__.r(preview_namespaceObject),
                __webpack_require__.d(preview_namespaceObject, {
                    __namedExportsOrder: function () {
                        return __namedExportsOrder;
                    },
                    parameters: function () {
                        return parameters;
                    }
                });
            __webpack_require__('./node_modules/core-js/modules/es.object.keys.js'),
                __webpack_require__('./node_modules/core-js/modules/es.symbol.js'),
                __webpack_require__('./node_modules/core-js/modules/es.array.filter.js'),
                __webpack_require__(
                    './node_modules/core-js/modules/es.object.get-own-property-descriptor.js'
                ),
                __webpack_require__(
                    './node_modules/core-js/modules/web.dom-collections.for-each.js'
                ),
                __webpack_require__(
                    './node_modules/core-js/modules/es.object.get-own-property-descriptors.js'
                );
            var ClientApi = __webpack_require__(
                    './node_modules/@storybook/client-api/dist/esm/ClientApi.js'
                ),
                chakra_ui_react_esm = __webpack_require__(
                    './node_modules/@chakra-ui/react/dist/chakra-ui-react.esm.js'
                ),
                global_colours = (0, chakra_ui_react_esm.extendTheme)({
                    colors: { success: 'var(--colour-success)', notice: 'var(--colour-notice)' }
                }),
                theme_darkTheme = (0, chakra_ui_react_esm.extendTheme)(global_colours, {
                    shadows: { outline: 'none' },
                    colors: {
                        primary: 'var(--colour-navy)',
                        secondary: 'green',
                        tertiary: 'var(--colour-black)',
                        quaternary: 'var(--colour-grey)'
                    },
                    components: {
                        Button: {
                            variants: {
                                primary: {
                                    _hover: { bg: 'tertiary', color: 'secondary' },
                                    bg: 'primary',
                                    color: 'secondary',
                                    borderColor: 'secondary',
                                    borderWidth: '1px',
                                    borderStyle: 'solid',
                                    boxShadow:
                                        '0 2.8px 2.2px rgb(0 0 0 / 3.4%), 0 6.7px 5.3px rgb(0 0 0 / 4.8%), 0 12.5px 10px rgb(0 0 0 / 6%), 0 22.3px 17.9px rgb(0 0 0 / 7.2%), 0 41.8px 33.4px rgb(0 0 0 / 8.6%), 0 100px 80px rgb(0 0 0 / 12%)'
                                }
                            }
                        },
                        Link: {
                            baseStyle: {
                                _focus: { boxShadow: 'none' },
                                _hover: { textDecoration: 'none' }
                            }
                        }
                    }
                }),
                client =
                    (__webpack_require__('./node_modules/react/index.js'),
                    __webpack_require__(
                        './node_modules/@storybook/react/dist/esm/client/index.js'
                    )),
                react_router = __webpack_require__('./node_modules/react-router/index.js'),
                emotion_element_cbed451f_browser_esm = __webpack_require__(
                    './node_modules/@emotion/react/dist/emotion-element-cbed451f.browser.esm.js'
                ),
                emotion_cache_browser_esm = __webpack_require__(
                    './node_modules/@emotion/cache/dist/emotion-cache.browser.esm.js'
                ),
                jsx_runtime = __webpack_require__('./node_modules/react/jsx-runtime.js'),
                cache = (0, emotion_cache_browser_esm.Z)({ key: 'css', prepend: !0 });
            (0, client.addDecorator)(function (story) {
                return (0,
                jsx_runtime.jsx)(emotion_element_cbed451f_browser_esm.C, { value: cache, children: (0, jsx_runtime.jsx)(react_router.VA, { initialEntries: ['/'], children: story() }) });
            });
            var parameters = {
                    chakra: { theme: theme_darkTheme },
                    actions: { argTypesRegex: '^on[A-Z].*' },
                    controls: { matchers: { color: /(background|color)$/i, date: /Date$/ } },
                    backgrounds: {
                        default: 'dark',
                        values: [
                            { name: 'dark', value: '#272145' },
                            { name: 'light', value: '#fff' }
                        ]
                    }
                },
                __namedExportsOrder = ['parameters'];
            function ownKeys(object, enumerableOnly) {
                var keys = Object.keys(object);
                if (Object.getOwnPropertySymbols) {
                    var symbols = Object.getOwnPropertySymbols(object);
                    enumerableOnly &&
                        (symbols = symbols.filter(function (sym) {
                            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
                        })),
                        keys.push.apply(keys, symbols);
                }
                return keys;
            }
            function _defineProperty(obj, key, value) {
                return (
                    key in obj
                        ? Object.defineProperty(obj, key, {
                              value: value,
                              enumerable: !0,
                              configurable: !0,
                              writable: !0
                          })
                        : (obj[key] = value),
                    obj
                );
            }
            Object.keys(preview_namespaceObject).forEach(function (key) {
                var value = preview_namespaceObject[key];
                switch (key) {
                    case 'args':
                        return (0, ClientApi.uc)(value);
                    case 'argTypes':
                        return (0, ClientApi.v9)(value);
                    case 'decorators':
                        return value.forEach(function (decorator) {
                            return (0, ClientApi.$9)(decorator, !1);
                        });
                    case 'loaders':
                        return value.forEach(function (loader) {
                            return (0, ClientApi.HZ)(loader, !1);
                        });
                    case 'parameters':
                        return (0, ClientApi.h1)(
                            (function _objectSpread(target) {
                                for (var i = 1; i < arguments.length; i++) {
                                    var source = null != arguments[i] ? arguments[i] : {};
                                    i % 2
                                        ? ownKeys(Object(source), !0).forEach(function (key) {
                                              _defineProperty(target, key, source[key]);
                                          })
                                        : Object.getOwnPropertyDescriptors
                                        ? Object.defineProperties(
                                              target,
                                              Object.getOwnPropertyDescriptors(source)
                                          )
                                        : ownKeys(Object(source)).forEach(function (key) {
                                              Object.defineProperty(
                                                  target,
                                                  key,
                                                  Object.getOwnPropertyDescriptor(source, key)
                                              );
                                          });
                                }
                                return target;
                            })({}, value),
                            !1
                        );
                    case 'argTypesEnhancers':
                        return value.forEach(function (enhancer) {
                            return (0, ClientApi.My)(enhancer);
                        });
                    case 'argsEnhancers':
                        return value.forEach(function (enhancer) {
                            return (0, ClientApi._C)(enhancer);
                        });
                    case 'render':
                        return (0, ClientApi.$P)(value);
                    case 'globals':
                    case 'globalTypes':
                        var v = {};
                        return (v[key] = value), (0, ClientApi.h1)(v, !1);
                    case '__namedExportsOrder':
                    case 'decorateStory':
                    case 'renderToDOM':
                        return null;
                    default:
                        return console.log(key + ' was not supported :( !');
                }
            });
        },
        './app/components/Button.stories.tsx': function (
            __unused_webpack_module,
            __webpack_exports__,
            __webpack_require__
        ) {
            'use strict';
            __webpack_require__.r(__webpack_exports__),
                __webpack_require__.d(__webpack_exports__, {
                    Accessible: function () {
                        return Accessible;
                    },
                    Inaccessible: function () {
                        return Inaccessible;
                    },
                    __namedExportsOrder: function () {
                        return __namedExportsOrder;
                    }
                });
            __webpack_require__('./node_modules/core-js/modules/es.object.assign.js'),
                __webpack_require__('./node_modules/react/index.js');
            var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
                './node_modules/react/jsx-runtime.js'
            );
            __webpack_exports__.default = { title: 'button' };
            var Accessible = function Accessible() {
                return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)('button', {
                    children: 'Accessible button'
                });
            };
            Accessible.displayName = 'Accessible';
            var Inaccessible = function Inaccessible() {
                return (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)('button', {
                    style: { backgroundColor: 'red', color: 'darkRed' },
                    children: 'Inaccessible button'
                });
            };
            (Inaccessible.displayName = 'Inaccessible'),
                (Accessible.parameters = Object.assign(
                    { storySource: { source: '() => <button>Accessible button</button>' } },
                    Accessible.parameters
                )),
                (Inaccessible.parameters = Object.assign(
                    {
                        storySource: {
                            source: "() => (\n    <button style={{ backgroundColor: 'red', color: 'darkRed' }}>Inaccessible button</button>\n)"
                        }
                    },
                    Inaccessible.parameters
                ));
            var __namedExportsOrder = ['Accessible', 'Inaccessible'];
        },
        './app/components/FormToggle.stories.tsx': function (
            __unused_webpack_module,
            __webpack_exports__,
            __webpack_require__
        ) {
            'use strict';
            __webpack_require__.r(__webpack_exports__),
                __webpack_require__.d(__webpack_exports__, {
                    Primary: function () {
                        return Primary;
                    },
                    __namedExportsOrder: function () {
                        return __namedExportsOrder;
                    },
                    default: function () {
                        return FormToggle_stories;
                    }
                });
            __webpack_require__('./node_modules/core-js/modules/es.object.assign.js');
            var chakra_ui_layout_esm = __webpack_require__(
                    './node_modules/@chakra-ui/layout/dist/chakra-ui-layout.esm.js'
                ),
                chakra_ui_form_control_esm = __webpack_require__(
                    './node_modules/@chakra-ui/form-control/dist/chakra-ui-form-control.esm.js'
                ),
                chakra_ui_switch_esm = __webpack_require__(
                    './node_modules/@chakra-ui/switch/dist/chakra-ui-switch.esm.js'
                ),
                jsx_runtime = __webpack_require__('./node_modules/react/jsx-runtime.js'),
                FormCheckbox = function FormCheckbox(props) {
                    var leftIcon = props.leftIcon,
                        rightIcon = props.rightIcon,
                        id = props.id,
                        text = props.text,
                        onToggle = props.onToggle,
                        isChecked = props.isChecked;
                    return (0, jsx_runtime.jsx)(chakra_ui_layout_esm.xu, {
                        flexWrap: 'wrap',
                        mb: 5,
                        children: (0, jsx_runtime.jsxs)(chakra_ui_form_control_esm.NI, {
                            display: 'flex',
                            alignItems: 'center',
                            children: [
                                (0, jsx_runtime.jsx)(chakra_ui_form_control_esm.lX, {
                                    htmlFor: id,
                                    mb: '0',
                                    children: text
                                }),
                                leftIcon,
                                'boolean' == typeof isChecked &&
                                    (0, jsx_runtime.jsx)(chakra_ui_switch_esm.r, {
                                        size: 'lg',
                                        isChecked: isChecked,
                                        onChange: onToggle,
                                        id: id
                                    }),
                                void 0 === isChecked &&
                                    (0, jsx_runtime.jsx)(chakra_ui_switch_esm.r, {
                                        size: 'lg',
                                        onChange: onToggle,
                                        id: id
                                    }),
                                rightIcon
                            ]
                        })
                    });
                };
            FormCheckbox.displayName = 'FormCheckbox';
            var components_FormToggle = FormCheckbox;
            try {
                (FormToggle.displayName = 'FormToggle'),
                    (FormToggle.__docgenInfo = {
                        description: '',
                        displayName: 'FormToggle',
                        props: {
                            text: {
                                defaultValue: null,
                                description: '',
                                name: 'text',
                                required: !1,
                                type: { name: 'string' }
                            },
                            leftIcon: {
                                defaultValue: null,
                                description: '',
                                name: 'leftIcon',
                                required: !1,
                                type: { name: 'ReactNode' }
                            },
                            rightIcon: {
                                defaultValue: null,
                                description: '',
                                name: 'rightIcon',
                                required: !1,
                                type: { name: 'ReactNode' }
                            },
                            onToggle: {
                                defaultValue: null,
                                description: '',
                                name: 'onToggle',
                                required: !1,
                                type: { name: '((e: ChangeEvent<HTMLInputElement>) => void)' }
                            },
                            id: {
                                defaultValue: null,
                                description: '',
                                name: 'id',
                                required: !0,
                                type: { name: 'string' }
                            },
                            isChecked: {
                                defaultValue: null,
                                description: '',
                                name: 'isChecked',
                                required: !1,
                                type: { name: 'boolean' }
                            }
                        }
                    }),
                    'undefined' != typeof STORYBOOK_REACT_CLASSES &&
                        (STORYBOOK_REACT_CLASSES['app/components/FormToggle.tsx#FormToggle'] = {
                            docgenInfo: FormToggle.__docgenInfo,
                            name: 'FormToggle',
                            path: 'app/components/FormToggle.tsx#FormToggle'
                        });
            } catch (__react_docgen_typescript_loader_error) {}
            var FormToggle_stories = { title: 'FormToggle', component: components_FormToggle },
                Template = function Template(args) {
                    return (0, jsx_runtime.jsx)(components_FormToggle, Object.assign({}, args));
                };
            Template.displayName = 'Template';
            var Primary = Template.bind({});
            (Primary.args = { id: 'storybook-form-toggle' }),
                (Primary.parameters = Object.assign(
                    {
                        storySource: {
                            source: '(args) => {\n    return <FormToggle {...args}></FormToggle>;\n}'
                        }
                    },
                    Primary.parameters
                ));
            var __namedExportsOrder = ['Primary'];
        },
        './storybook-init-framework-entry.js': function (
            __unused_webpack_module,
            __unused_webpack___webpack_exports__,
            __webpack_require__
        ) {
            'use strict';
            __webpack_require__('./node_modules/@storybook/react/dist/esm/client/index.js');
        },
        '?4f7e': function () {},
        './generated-stories-entry.cjs': function (
            module,
            __unused_webpack_exports,
            __webpack_require__
        ) {
            'use strict';
            (module = __webpack_require__.nmd(module)),
                (0,
                __webpack_require__('./node_modules/@storybook/react/dist/esm/client/index.js')
                    .configure)(
                    [
                        __webpack_require__(
                            './app/components sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.mdx)$'
                        ),
                        __webpack_require__(
                            './app/components sync recursive ^\\.(?:(?:^%7C\\/%7C(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/)(?%21\\.)(?=.)[^/]*?\\.stories\\.(js%7Cjsx%7Cts%7Ctsx))$'
                        )
                    ],
                    module,
                    !1
                );
        }
    },
    function (__webpack_require__) {
        var __webpack_exec__ = function (moduleId) {
            return __webpack_require__((__webpack_require__.s = moduleId));
        };
        __webpack_require__.O(0, [668], function () {
            return (
                __webpack_exec__(
                    './node_modules/@storybook/core-client/dist/esm/globals/polyfills.js'
                ),
                __webpack_exec__(
                    './node_modules/@storybook/core-client/dist/esm/globals/globals.js'
                ),
                __webpack_exec__('./storybook-init-framework-entry.js'),
                __webpack_exec__(
                    './node_modules/@storybook/react/dist/esm/client/docs/config-generated-config-entry.js'
                ),
                __webpack_exec__(
                    './node_modules/@storybook/react/dist/esm/client/preview/config-generated-config-entry.js'
                ),
                __webpack_exec__(
                    './node_modules/@storybook/addon-links/preview.js-generated-config-entry.js'
                ),
                __webpack_exec__(
                    './node_modules/@storybook/addon-docs/preview.js-generated-config-entry.js'
                ),
                __webpack_exec__(
                    './node_modules/@storybook/addon-actions/preview.js-generated-config-entry.js'
                ),
                __webpack_exec__(
                    './node_modules/@storybook/addon-backgrounds/preview.js-generated-config-entry.js'
                ),
                __webpack_exec__(
                    './node_modules/@storybook/addon-measure/preview.js-generated-config-entry.js'
                ),
                __webpack_exec__(
                    './node_modules/@storybook/addon-outline/preview.js-generated-config-entry.js'
                ),
                __webpack_exec__(
                    './node_modules/@storybook/addon-interactions/preview.js-generated-config-entry.js'
                ),
                __webpack_exec__(
                    './node_modules/@storybook/addon-a11y/preview.js-generated-config-entry.js'
                ),
                __webpack_exec__(
                    './node_modules/@chakra-ui/storybook-addon/preset/decorators/dist/chakra-ui-storybook-addon-preset-decorators.cjs.js-generated-config-entry.js'
                ),
                __webpack_exec__('./.storybook/preview.js-generated-config-entry.js'),
                __webpack_exec__('./generated-stories-entry.cjs')
            );
        });
        __webpack_require__.O();
    }
]);
