/* eslint no-new-func : 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { Bibliography } from 'react-citeproc';
import { resourceToCslJSON } from 'peritext-utils';

const Block = ( {
  resource = {},
  // contextualizer,
  contextualization = {},
  renderingMode = 'paged',
  children
}, {
  citationLocale,
  citationStyle,
} ) => {

  const items = resourceToCslJSON( resource );

  const item = items[0];

  if ( item ) {
    return (
      <div
        id={ contextualization.id }
        className={ `peritext-contextualization block bib rendering-mode-${renderingMode}` }
      >
        <blockquote style={ { display: 'none' } }>
          {children}
        </blockquote>
        <Bibliography
          style={ citationStyle }
          locale={ citationLocale }
          items={ { [item.id]: item } }
        />
      </div>
    );
  }
  return null;
};

Block.contextTypes = {
  citationLocale: PropTypes.string,
  citationStyle: PropTypes.string,
  citationItems: PropTypes.object,
};

export default Block;
