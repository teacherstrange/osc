'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var react = require('@chakra-ui/react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function Header() {
    return (React__default["default"].createElement(react.ChakraProvider, null,
        React__default["default"].createElement(react.Accordion, null,
            React__default["default"].createElement(react.AccordionItem, null,
                React__default["default"].createElement("h2", null,
                    React__default["default"].createElement(react.AccordionButton, null,
                        React__default["default"].createElement(react.Box, { flex: '1', textAlign: 'left' }, "Section 1 title"),
                        React__default["default"].createElement(react.AccordionIcon, null))),
                React__default["default"].createElement(react.AccordionPanel, { bg: "red.500", pb: 4 }, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.")),
            React__default["default"].createElement(react.AccordionItem, null,
                React__default["default"].createElement("h2", null,
                    React__default["default"].createElement(react.AccordionButton, null,
                        React__default["default"].createElement(react.Box, { flex: '1', textAlign: 'left' }, "Section 2 title"),
                        React__default["default"].createElement(react.AccordionIcon, null))),
                React__default["default"].createElement(react.AccordionPanel, { pb: 4 }, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.")))));
}

exports.Header = Header;
