/* eslint react/no-danger : 0 */

import React from 'react';
import PropTypes from 'prop-types';

const Inline = ( {
  resource,
  /*
   * resource,
   * contextualizer,
   */
  contextualization,
  renderingMode,
  children,
}, {
  citations = {}
} ) => {
  const citation = citations[contextualization.id];
  const handleClick = e => {
    e.stopPropagation();
  }
  if ( citation && citation.html ) {
    return (
      <a
        id={ contextualization.id }
        className={ `peritext-contextualization inline bib rendering-mode-${renderingMode}` }
        href={`#${resource.id}`}
        onClick={handleClick}
      >
        {children /*&& children.length ?
          <q>
            {children}
          </q>
          :
          children
        */}
        <cite
          dangerouslySetInnerHTML={ { __html: citation.html } }
        />
      </a>
    );
  }
  return null;
};

Inline.contextTypes = {
  citations: PropTypes.object
};

export default Inline;
