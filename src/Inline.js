/* eslint react/no-danger : 0 */

import React from 'react';
import PropTypes from 'prop-types';
import {resourceToCslJSON} from 'peritext-utils';

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
  if ( citation && citation.html ) {
    const [{id}] = resourceToCslJSON(resource);
    return (
      <a
        id={ contextualization.id }
        className={ `peritext-contextualization inline bib rendering-mode-${renderingMode}` }
        href={`#${id}`}
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
