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
function extractDescription(element, selector) {
  var text = extractText(element, selector);
  text = text
    .trim() // remove space from either end
    .replace(/\s\s/gm, " "); // remove double spaces
  return text;
}
/*
course.description = $(this).find('.courseblockdesc')
  .text()
  .replace(/\n/gm, "") // remove newlines
  .replace(/\s\s/gm, " "); // remove double spaces
*/
function normalizeSpaces(text) {
  return text.replace(/\s/g, ' ');
}

// Export all public parts of the API
module.exports = {
  extractDescription,
  extractText
};

// When testing, also export the private parts
if (process.env.NODE_ENV === 'test') {
  module.exports.normalizeSpaces = normalizeSpaces;
}
