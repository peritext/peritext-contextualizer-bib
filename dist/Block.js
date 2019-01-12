"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactCiteproc = require("react-citeproc");

var _peritextUtils = require("peritext-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint no-new-func : 0 */
const Block = ({
  resource = {},
  // contextualizer,
  contextualization = {},
  renderingMode = 'paged',
  children
}, {
  citationLocale,
  citationStyle
}) => {
  const items = (0, _peritextUtils.resourceToCslJSON)(resource);
  const item = items[0];

  if (item) {
    return _react.default.createElement("div", {
      id: contextualization.id,
      className: `peritext-contextualization block bib rendering-mode-${renderingMode}`
    }, _react.default.createElement("blockquote", {
      style: {
        display: 'none'
      }
    }, children), _react.default.createElement(_reactCiteproc.Bibliography, {
      style: citationStyle,
      locale: citationLocale,
      items: {
        [item.id]: item
      }
    }));
  }

  return null;
};

Block.contextTypes = {
  citationLocale: _propTypes.default.string,
  citationStyle: _propTypes.default.string,
  citationItems: _propTypes.default.object
};
var _default = Block;
exports.default = _default;