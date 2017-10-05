export default {
  type: 'peritext-contextualizer',
  id: 'bib',
  name: 'Bibliographic citation',
  coverage: {
    inlineStatic: true,
    blockStatic: true,
    inlineDynamic: true,
    blockDynamic: true,
  },
  model: {
    acceptedResourceTypes: [{
      test: resource => true
    }],
    inline: {},
    block: {
      options: []
    }
  }
}