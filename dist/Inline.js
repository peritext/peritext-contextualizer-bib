"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _peritextUtils = require("peritext-utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint react/no-danger : 0 */
const Inline = ({
  resource,

  /*
   * resource,
   * contextualizer,
   */
  contextualization,
  renderingMode,
  children
}, {
  citations = {}
}) => {
  const citation = citations[contextualization.id];

  if (citation && citation.html) {
    const [{
      id
    }] = (0, _peritextUtils.resourceToCslJSON)(resource);
    return _react.default.createElement("a", {
      id: contextualization.id,
      className: `peritext-contextualization inline bib rendering-mode-${renderingMode}`,
      href: `#${id}`
    }, children
    /*&& children.length ?
    <q>
    {children}
    </q>
    :
    children
    */
    , _react.default.createElement("cite", {
      dangerouslySetInnerHTML: {
        __html: citation.html
      }
    }));
  }

  return null;
};

Inline.contextTypes = {
  citations: _propTypes.default.object
};
var _default = Inline;
exports.default = _default;