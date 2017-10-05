'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CitationContainer = function CitationContainer(_ref, context) {
  var contextualization = _ref.contextualization,
      onClick = _ref.onClick;

  var citations = context.citations;
  var id = contextualization.id;
  if (citations) {
    var citation = citations[id];
    if (citation) {
      var CitComponent = citation.Component;
      return _react2.default.createElement(
        'cite',
        {
          className: 'peritext-contextualization peritext-contextualization-inline peritext-contextualization-web peritext-contextualizer-bib',
          onClick: onClick,
          id: id
        },
        CitComponent
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
   * Map of citations built upstream
   * (each citation features the following keys: 'Component', 'html' and 'order')
   */
  citations: _propTypes2.default.object
};

exports.default = CitationContainer;