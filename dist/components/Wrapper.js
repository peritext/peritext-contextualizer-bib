"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _peritextUtils = require("peritext-utils");

var _helpers = require("../helpers");

var _FrontCover = _interopRequireDefault(require("./FrontCover"));

var _TitlePage = _interopRequireDefault(require("./TitlePage"));

var _BackCover = _interopRequireDefault(require("./BackCover"));

var _Colophon = _interopRequireDefault(require("./Colophon"));

var _References = _interopRequireDefault(require("./References"));

var _Glossary = _interopRequireDefault(require("./Glossary"));

var _EndNotes = _interopRequireDefault(require("./EndNotes"));

var _DefaultLinkComponent = _interopRequireDefault(require("./DefaultLinkComponent"));

var _DefaultMentionComponent = _interopRequireDefault(require("./DefaultMentionComponent"));

var _DefaultSectionLinkComponent = _interopRequireDefault(require("./DefaultSectionLinkComponent"));

var _MarkdownPlayer = _interopRequireDefault(require("./MarkdownPlayer"));

var _TableOfContents = _interopRequireDefault(require("./TableOfContents"));

var _ResourceSections = _interopRequireDefault(require("./ResourceSections"));

var _Section = _interopRequireDefault(require("./Section"));

var _defaultStyle = _interopRequireDefault(require("../defaultStyle"));

var _Figures = _interopRequireDefault(require("./Figures"));

var _buildResourceSectionsSummary = _interopRequireDefault(require("peritext-utils/dist/buildResourceSectionsSummary"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const EmptyPage = () => _react.default.createElement("div", {
  className: 'composition-block empty-page'
});

const updateStyles = props => {
  const {
    edition: {
      data = {}
    },
    contextualizers = {}
  } = props;
  const {
    style: {
      css = '',
      mode = 'merge'
    } = {
      css: ''
    }
  } = data;
  const contextualizersStyles = Object.keys(contextualizers).map(type => contextualizers[type] && contextualizers[type].defaultCss || '').join('\n');

  if (mode === 'merge') {
    return [_defaultStyle.default, // templateStylesheet,
    contextualizersStyles, css].join('\n');
  } else {
    // styleMode === 'replace'
    return [// templateStylesheet,
    contextualizersStyles, css].join('\n');
  }
};
/**
 * @todo externalize
 */


const buildToc = (production, edition, translate) => {
  const summary = edition.data.plan.summary;
  const tocEl = summary.find(el => el.type === 'tableOfContents');
  const level = tocEl && +tocEl.data.level || 0;
  return summary.reduce((res, element) => {
    const {
      data = {}
    } = element;

    switch (element.type) {
      case 'customPage':
        const {
          title,
          displayInTableOfContents
        } = data;

        if (displayInTableOfContents) {
          return [...res, {
            title,
            level: 0,
            href: `custom-block-${element.id}`
          }];
        }

        return res;

      case 'sections':
      case 'resourceSections':
        const {
          id
        } = element;
        const {
          customSummary = {
            active: false
          },
          level: blockLevel = 0,
          figuresPosition = 'endOfSections'
        } = data;

        if (customSummary.active) {
          const {
            summary: thatCustomSummary
          } = customSummary;
          return [...res, ...thatCustomSummary.reduce((resLoc, {
            resourceId,
            level: thatLevel
          }) => {
            const thatSection = production.resources[resourceId];
            const titlesMap = {
              'header-one': 1,
              'header-two': 2,
              'header-three': 3,
              'header-four': 4
            };
            const newItems = [{
              title: (0, _peritextUtils.getResourceTitle)(thatSection),
              level: blockLevel + thatLevel,
              href: `section-${id}-${resourceId}`
            }];

            if (level > 0 && thatSection && thatSection.data && thatSection.data.contents) {
              const blocks = thatSection.data.contents.contents.blocks;
              blocks.forEach(block => {
                if (titlesMap[block.type]) {
                  newItems.push({
                    title: block.text,
                    level: blockLevel + thatLevel + titlesMap[block.type],
                    href: `title-${block.key}`
                  });
                }
              });

              if (figuresPosition === 'endOfSections') {
                const {
                  figuresNumberMap,
                  figures
                } = (0, _helpers.buildFiguresNumberMap)({
                  production,
                  sectionsIds: [resourceId],
                  figuresPosition
                });

                if (Object.keys(figures).reduce((sum, key) => sum + figures[key].length, 0)) {
                  newItems.push({
                    title: translate('Figures'),
                    level: thatLevel + 1,
                    href: `end-figures-${id}-${resourceId}`
                  });
                }
              }
            }

            return [...resLoc, ...newItems];
          }, []).filter(s => s)];
        } else if (element.type === 'resourceSections') {
          return [...res, ...(0, _buildResourceSectionsSummary.default)({
            production,
            option: data
          }).reduce((resLoc, {
            resourceId,
            level: initLevel
          }) => {
            const thatSection = production.resources[resourceId];
            const thatLevel = initLevel;
            const titlesMap = {
              'header-one': 1,
              'header-two': 2,
              'header-three': 3,
              'header-four': 4
            };
            const newItems = [{
              title: (0, _peritextUtils.getResourceTitle)(thatSection),
              level: blockLevel + thatLevel,
              href: `section-${id}-${resourceId}`
            }];

            if (level > 0 && thatSection && thatSection.data && thatSection.data.contents) {
              const blocks = thatSection.data.contents.contents.blocks;
              blocks.forEach(block => {
                if (titlesMap[block.type]) {
                  newItems.push({
                    title: block.text,
                    level: blockLevel + thatLevel + titlesMap[block.type],
                    href: `title-${block.key}`
                  });
                }
              });
            }

            if (figuresPosition === 'endOfSections') {
              const {
                figuresNumberMap,
                figures
              } = (0, _helpers.buildFiguresNumberMap)({
                production,
                sectionsIds: [resourceId],
                figuresPosition
              });

              if (Object.keys(figures).reduce((sum, key) => sum + figures[key].length, 0)) {
                newItems.push({
                  title: translate('Figures'),
                  level: thatLevel + 1,
                  href: `end-figures-${id}-${resourceId}`
                });
              }
            }

            return [...resLoc, ...newItems];
          }, [])];
        }

        return [...res, ...production.sectionsOrder.reduce((resLoc, {
          resourceId,
          level: thatLevel
        }) => {
          const thatSection = production.resources[resourceId];
          const titlesMap = {
            'header-one': 1,
            'header-two': 2,
            'header-three': 3,
            'header-four': 4
          };
          const newItems = [{
            title: (0, _peritextUtils.getResourceTitle)(thatSection),
            level: blockLevel + thatLevel,
            href: `section-${id}-${resourceId}`
          }];

          if (level > 0 && thatSection && thatSection.data && thatSection.data.contents) {
            const blocks = thatSection.data.contents.contents.blocks;
            blocks.forEach(block => {
              if (titlesMap[block.type]) {
                newItems.push({
                  title: block.text,
                  level: blockLevel + thatLevel + titlesMap[block.type],
                  href: `title-${block.key}`
                });
              }
            });
          }

          if (figuresPosition === 'endOfSections') {
            const {
              figuresNumberMap,
              figures
            } = (0, _helpers.buildFiguresNumberMap)({
              production,
              sectionsIds: [resourceId],
              figuresPosition
            });

            if (Object.keys(figures).reduce((sum, key) => sum + figures[key].length, 0)) {
              newItems.push({
                title: translate('Figures'),
                level: thatLevel + 1,
                href: `end-figures-${id}-${resourceId}`
              });
            }
          }

          return [...resLoc, ...newItems];
        }, [])];

      case 'glossary':
        return [...res, {
          title: data.customTitle || translate('Glossary list'),
          level: 0,
          href: `glossary-block-${element.id}`
        }];

      case 'references':
        return [...res, {
          level: 0,
          title: data.customTitle || translate('References'),
          href: `reference-block-${element.id}`
        }];

      default:
        return res;
    }
  }, []);
};

const buildSectionBlockSummary = (sectionBlock, production) => {
  if (sectionBlock.data.customSummary && sectionBlock.data.customSummary.active) {
    return sectionBlock.data.customSummary.summary;
  }

  return production.sectionsOrder;
};

const Sections = ({
  production,
  edition,
  translate,
  data = {},
  citations,
  publicationTitle,
  publicationSubtitle,
  id
}) => {
  const summary = edition.data.plan.summary;
  const {
    notesPosition = 'footnotes',
    figuresPosition = 'endOfSections',
    displayHeader = false
  } = data;
  const sectionsBlocks = summary.filter(s => s.type === 'sections');
  const sectionsIds = sectionsBlocks.reduce((res, sectionBlock) => {
    return [...res, ...buildSectionBlockSummary(sectionBlock, production)];
  }, []);
  const {
    figuresNumberMap,
    figures
  } = (0, _helpers.buildFiguresNumberMap)({
    production,
    sectionsIds: sectionsIds.map(({
      resourceId
    }) => resourceId),
    figuresPosition
  });
  return [...sectionsIds.map(({
    resourceId
  }, index) => {
    const section = production.resources[resourceId];
    return _react.default.createElement(_Section.default, {
      section: section,
      notesPosition: notesPosition,
      figuresPosition: figuresPosition,
      figuresNumberMap: figuresNumberMap,
      figures: figuresPosition === 'endOfSections' ? figures[resourceId] : undefined,
      key: `${index}-${resourceId}`,
      displayHeader: displayHeader,
      production: production,
      containerId: id,
      translate: translate,
      citations: citations,
      publicationTitle: publicationTitle,
      publicationSubtitle: publicationSubtitle
    });
  }), notesPosition === 'endOfContents' ? _react.default.createElement(_EndNotes.default, {
    key: 'endnotes',
    sectionsIds: sectionsIds,
    production: production,
    translate: translate,
    citations: citations,
    publicationTitle: publicationTitle,
    publicationSubtitle: publicationSubtitle
  }) : null, figuresPosition === 'endOfContents' ? _react.default.createElement(_Figures.default, {
    production: production,
    translate: translate,
    figures: figures,
    figuresNumberMap: figuresNumberMap
  }) : null];
};

const renderSummary = ({
  production,
  edition,
  translate,
  citations
}) => {
  const summary = edition.data.plan.summary;
  const {
    data: editionData = {}
  } = edition;
  const {
    metadata
  } = production;
  const finalTitle = editionData.publicationTitle || metadata.title;
  const finalSubtitle = editionData.publicationSubtitle || metadata.subtitle;
  return summary.map((element, index) => {
    switch (element.type) {
      case 'frontCover':
        return _react.default.createElement(_FrontCover.default, _extends({
          key: index,
          production: production,
          edition: edition,
          translate: translate
        }, element));

      case 'titlePage':
        return _react.default.createElement(_TitlePage.default, _extends({
          key: index,
          production: production,
          edition: edition,
          translate: translate
        }, element));

      case 'colophon':
        return _react.default.createElement(_Colophon.default, _extends({
          key: index,
          production: production,
          edition: edition,
          translate: translate
        }, element));

      case 'backCover':
        return _react.default.createElement(_BackCover.default, _extends({
          key: index,
          production: production,
          edition: edition,
          translate: translate
        }, element));

      case 'emptyPage':
        return _react.default.createElement(EmptyPage, {
          key: index
        });

      case 'tableOfContents':
        const toc = buildToc(production, edition, translate);
        return _react.default.createElement(_TableOfContents.default, {
          key: index,
          data: element.data,
          tableOfContents: toc,
          translate: translate,
          id: element.id
        });

      case 'customPage':
        if (element.data.customHTML && element.data.customHTML.length) {
          return _react.default.createElement("div", {
            id: element.data.customCssId || element.id,
            key: index,
            className: `composition-block custom-page  has-custom-html ${element.data.displayPageNumber ? 'has-page-number' : ''}`,
            dangerouslySetInnerHTML: {
              __html: element.data.customHTML
            }
          });
        }

        return _react.default.createElement("div", {
          id: element.data.customCssId || element.id,
          key: index,
          className: `composition-block custom-page ${element.data.displayPageNumber ? 'has-page-number' : ''}`
        }, element.data.title && _react.default.createElement("h1", {
          id: `custom-block-${element.id}`,
          className: 'composition-block-title peritext-block-title'
        }, element.data.title), element.data.markdownContents && _react.default.createElement(_MarkdownPlayer.default, {
          src: element.data.markdownContents
        }));

      case 'sections':
        return _react.default.createElement(Sections, _extends({
          key: index,
          production: production,
          edition: edition,
          translate: translate,
          citations: citations,
          publicationTitle: finalTitle,
          publicationSubtitle: finalSubtitle
        }, element));

      case 'glossary':
        return _react.default.createElement(_Glossary.default, _extends({
          key: index,
          production: production,
          edition: edition,
          translate: translate,
          citations: citations
        }, element));

      case 'references':
        return _react.default.createElement(_References.default, _extends({
          key: index,
          production: production,
          edition: edition,
          translate: translate,
          citations: citations
        }, element));

      case 'resourceSections':
        return _react.default.createElement(_ResourceSections.default, _extends({
          key: index,
          production: production,
          edition: edition,
          translate: translate,
          citations: citations,
          publicationTitle: finalTitle,
          publicationSubtitle: finalSubtitle
        }, element));

      default:
        return _react.default.createElement("div", {
          id: element.id,
          className: 'composition-block',
          key: index
        }, element.type);
    }
  });
};

const editionHasGlossary = (edition = {}) => {
  if (edition.data && edition.data.plan && edition.data.plan.summary) {
    const summary = edition.data.plan.summary;
    return summary.find(e => e.type === 'glossary') !== undefined;
  }

  return false;
};

class Template extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "shouldComponentUpdate", () => true);

    _defineProperty(this, "translate", key => {
      const {
        locale = {}
      } = this.props;
      return locale[key] || key;
    });
  }

  getChildContext() {
    return {
      LinkComponent: this.props.LinkComponent || _DefaultLinkComponent.default,
      MentionComponent: this.props.MentionComponent || _DefaultMentionComponent.default,
      SectionLinkComponent: this.props.SectionLinkComponent || _DefaultSectionLinkComponent.default,
      production: this.props.production,
      productionAssets: this.props.production.assets,
      preprocessedData: this.props.preprocessedData,
      contextualizers: this.props.contextualizers,
      translate: this.translate,
      useGlossary: editionHasGlossary(this.props.edition)
    };
  }

  render() {
    const {
      props: {
        production,
        edition,
        contextualizers,
        renderAdditionalHTML = false,
        preprocessedData
      },
      translate
    } = this;
    const {
      data = {}
    } = edition;
    const {
      additionalHTML = ''
    } = data;
    const citations = preprocessedData && preprocessedData.global && preprocessedData.global.citations ? preprocessedData.global.citations : (0, _peritextUtils.buildCitations)({
      production,
      edition
    }, true);
    const finalStyles = updateStyles({
      edition,
      contextualizers
    });
    /**
     * We render an array
     * to have our sections as a flat collection
     * which facilitates @paged rules about pages breaks
     */

    return [...renderSummary({
      production,
      edition,
      translate,
      citations
    }), _react.default.createElement("style", {
      key: 'styles',
      dangerouslySetInnerHTML: {
        __html: finalStyles
        /* eslint react/no-danger : 0 */

      }
    }), renderAdditionalHTML ? _react.default.createElement("div", {
      id: 'additional-html',
      key: 'additional-html',
      dangerouslySetInnerHTML: {
        /* eslint react/no-danger : 0 */
        __html: `${additionalHTML} `
      }
    }) : null].filter(s => s);
  }

}

exports.default = Template;
Template.childContextTypes = {
  LinkComponent: _propTypes.default.func,
  MentionComponent: _propTypes.default.func,
  SectionLinkComponent: _propTypes.default.func,
  translate: _propTypes.default.func,
  production: _propTypes.default.object,
  productionAssets: _propTypes.default.object,
  contextualizers: _propTypes.default.object,
  preprocessedData: _propTypes.default.object,
  useGlossary: _propTypes.default.bool
};