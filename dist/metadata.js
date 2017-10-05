'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  type: 'peritext-contextualizer',
  id: 'bib',
  name: 'Bibliographic citation',
  coverage: {
    inlineStatic: true,
    blockStatic: true,
    inlineDynamic: true,
    blockDynamic: true
  },
  model: {
    acceptedResourceTypes: [{
      test: function test(resource) {
        return true;
      }
    }],
    inline: {},
    block: {
      options: []
    }
  }
};