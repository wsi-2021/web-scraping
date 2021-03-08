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

module.exports = {
  extractText
};
