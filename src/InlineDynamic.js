import React from 'react';
import PropTypes from 'prop-types';

const CitationContainer = ({
  contextualization,
  onClick,
}, context) => {
  const citations = context.citations;
  const id = contextualization.id;
  if (citations) {
    const citation = citations[id];
    if (citation) {
      const CitComponent = citation.Component;
      return (
        <cite 
          className="peritext-contextualization peritext-contextualization-inline peritext-contextualization-web peritext-contextualizer-bib"
          onClick={onClick} 
          id={id}
        >
          {CitComponent}
        </cite>
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
  contextualization: PropTypes.object,
};
/**
 * Component's context used properties
 */
CitationContainer.contextTypes = {
  /**
   * Map of citations built upstream
   * (each citation features the following keys: 'Component', 'html' and 'order')
   */
  citations: PropTypes.object
};

export default CitationContainer;
