import {resourceToCslJSON} from 'peritext-rendering-utils';
import React from 'react';
import PropTypes from 'prop-types';

const CitationContainer = ({
  contextualization,
  resource,
}, context) => {
  const citations = context.citations;
  const id = contextualization.id;
  if (citations) {
    const citation = citations[id];
    if (citation) {
      const CitComponent = citation.Component;
      const Link = context.ReferenceLinkComponent;
      return (
        <cite id={id} className="peritext-contextualization peritext-contextualization-inline peritext-contextualization-codex peritext-contextualizer-bib">
          {Link ? <Link
           href={'#' + resourceToCslJSON(resource)[0].id}
          >
            {CitComponent}
          </Link>
          :
          <a
           href={'#' + resourceToCslJSON(resource)[0].id}
          >
            {CitComponent}
          </a>
          }
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
   * Hash of citations built upstream
   * (each citation features the following keys: 'Component', 'html' and 'order')
   */
  citations: PropTypes.object,

  /**
   * Optional custom link component (for instance for epub generators)
   */
  ReferenceLinkComponent: PropTypes.func,
};

export default CitationContainer;
