import React from 'react';
import PropTypes from 'prop-types';
import {Bibliography} from 'react-citeproc';
import {resourceToCslJSON} from 'peritext-rendering-utils';


const CitationContainer = ({
  resource,
  // contextualization,
  onClick,
}, {
  citationLocale,
  citationStyle
}) => {

  const data = resourceToCslJSON(resource);
  const items = data.reduce((result, item) => ({
    ...result,
    [item.id]: item
  }), {});

  return <figure className="peritext-contextualization peritext-contextualization-block peritext-contextualization-codex peritext-contextualization-web peritext-contextualizer-bib">
    <Bibliography
      items={items}
      style={citationStyle || ''}
      locale={citationLocale || ''} />
    </figure>
};
/**
 * Component's properties types
 */
CitationContainer.propTypes = {
  resource: PropTypes.object,
  onClick: PropTypes.func,
};
/**
 * Component's context used properties
 */
CitationContainer.contextTypes = {
  /**
   * Map of citations built upstream
   * (each citation features the following keys: 'Component', 'html' and 'order')
   */
  citations: PropTypes.object,
  citationLocale: PropTypes.string,
  citationStyle: PropTypes.string,
};

export default CitationContainer;
