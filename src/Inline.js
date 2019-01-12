/* eslint react/no-danger : 0 */

import React from 'react';
import PropTypes from 'prop-types';

const Inline = ( {

  /*
   * resource,
   * contextualizer,
   */
  contextualization,
  renderingMode,
  children,
}, {
  citations
} ) => {
  const citation = citations[contextualization.id];
  if ( citation && citation.html ) {
    return (
      <span
        id={ contextualization.id }
        className={ `peritext-contextualization inline bib rendering-mode-${renderingMode}` }
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
      </span>
    );
  }
  return null;
};

Inline.contextTypes = {
  citations: PropTypes.object
};

export default Inline;
