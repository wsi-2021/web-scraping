'use strict';
/** @module */

/** Extract simple text from the child of a parent element.
  @function extractText
  @param {object} element A Cheerio parent element
  @param {string} selector A CSS selector for a child element
  @returns {string} The child's text content
*/
function extractText(element, selector) {
  return normalizeSpaces(element.find(selector).text());
}

function normalizeSpaces(text) {
  return text.replace(/\s/g, ' ');
}

// Export all public parts of the API
module.exports = {
  extractText
};

// When testing, also export the private parts
if (process.env.NODE_ENV === 'test') {
  module.exports.normalizeSpaces = normalizeSpaces;
}
