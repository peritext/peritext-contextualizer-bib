'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactCiteproc = require('react-citeproc');

var _peritextRenderingUtils = require('peritext-rendering-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CitationContainer = function CitationContainer(_ref, _ref2) {
  var resource = _ref.resource,
      onClick = _ref.onClick;
  var citationLocale = _ref2.citationLocale,
      citationStyle = _ref2.citationStyle;


  var data = (0, _peritextRenderingUtils.resourceToCslJSON)(resource);
  var items = data.reduce(function (result, item) {
    return (0, _extends4.default)({}, result, (0, _defineProperty3.default)({}, item.id, item));
  }, {});

  return _react2.default.createElement(
    'figure',
    { className: 'peritext-contextualization peritext-contextualization-block peritext-contextualization-codex peritext-contextualization-web peritext-contextualizer-bib' },
    _react2.default.createElement(_reactCiteproc.Bibliography, {
      items: items,
      style: citationStyle || '',
      locale: citationLocale || '' })
  );
};
/**
 * Component's properties types
 */
CitationContainer.propTypes = {
  resource: _propTypes2.default.object,
  onClick: _propTypes2.default.func
};
/**
 * Component's context used properties
 */
CitationContainer.contextTypes = {
  /**
   * Map of citations built upstream
   * (each citation features the following keys: 'Component', 'html' and 'order')
   */
  citations: _propTypes2.default.object,
  citationLocale: _propTypes2.default.string,
  citationStyle: _propTypes2.default.string
};

exports.default = CitationContainer;