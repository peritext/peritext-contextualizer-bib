
export default {
  id: 'bib',
  type: 'peritext-contextualizer',
  name: 'Bibliographic citation contextualizer',
  acceptedResourceTypes: [ {
    test: ( resource ) => resource.metadata.type !== 'glossary'
  } ],
  profile: {
    inline: {
      mutable: true,
      options: {
        prefix: {
          type: 'string'
        },
        locator: {
          type: 'string'
        },
        suffix: {
          type: 'string'
        }
      }
    },
    block: {
      mutable: false,
    }
  }
};
