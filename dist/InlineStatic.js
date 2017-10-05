'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _peritextRenderingUtils = require('peritext-rendering-utils');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CitationContainer = function CitationContainer(_ref, context) {
  var contextualization = _ref.contextualization,
      resource = _ref.resource;

  var citations = context.citations;
  var id = contextualization.id;
  if (citations) {
    var citation = citations[id];
    if (citation) {
      var CitComponent = citation.Component;
      var Link = context.ReferenceLinkComponent;
      return _react2.default.createElement(
        'cite',
        { id: id, className: 'peritext-contextualization peritext-contextualization-inline peritext-contextualization-codex peritext-contextualizer-bib' },
        Link ? _react2.default.createElement(
          Link,
          {
            href: '#' + (0, _peritextRenderingUtils.resourceToCslJSON)(resource)[0].id
          },
          CitComponent
        ) : _react2.default.createElement(
          'a',
          {
            href: '#' + (0, _peritextRenderingUtils.resourceToCslJSON)(resource)[0].id
          },
          CitComponent
        )
      );
    }
    return null;
  }
  return null;
};
/**
 * Component's properties types
 */
CitationContainer.propTypes = {
  contextualization: _propTypes2.default.object
};
/**
 * Component's context used properties
 */
CitationContainer.contextTypes = {
  /**
   * Hash of citations built upstream
   * (each citation features the following keys: 'Component', 'html' and 'order')
   */
  citations: _propTypes2.default.object,

  /**
   * Optional custom link component (for instance for epub generators)
   */
  ReferenceLinkComponent: _propTypes2.default.func
};

exports.default = CitationContainer;