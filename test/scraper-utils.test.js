'use strict';
/* global beforeEach, describe, it */
/* eslint no-irregular-whitespace: ["error", { "skipTemplates": true }]*/
const assert = require('assert').strict;
const cheerio = require('cheerio');

const raw_html = `<div class="courseblock">
<div class="courseblocktitle">
<div class="noindent coursecode">ITMD 361</div>
<div class="noindent coursetitle"><strong>Fundamentals of Web Development</strong></div>
</div>
<div class="courseblockdesc"><p class="noindent">
This course will cover the creation of Web pages and sites using HTML, CSS, Javascript, jQuery, and graphical applications as well as the client and server architecture of the Internet and related web technologies.  The creation and deployment of modern, standards-compliant web pages are addressed.  Students create and deploy a Web site with multiple pages and cross-linked structures.
</p>
</div>
<div class="noindent courseblockattr hours">
<span><strong>Lecture:</strong> 3</span> <span><strong>Lab:</strong> 0</span> <span><strong>Credits:</strong> 3</span>
</div>
</div>`;

var courseblock;

const su = require('../lib/scraper-utils');

describe('scraper utils', function() {

  beforeEach(function() {
    var $ = cheerio.load(raw_html);
    courseblock = $('.courseblock');
  });
  describe('#extractText', function() {
    it('should return the expected course code', function() {
      assert.equal(
        su.extractText(courseblock, '.coursecode'),
        'ITMD 361'
      );
    });
    it('should return the expected course title', function() {
      assert.equal(
        su.extractText(courseblock, '.coursetitle'),
        'Fundamentals of Web Development'
      );
    });
  });
  describe('#extractDescription', function() {
    var expected_description = `This course will cover the creation of Web pages and sites using HTML, CSS, Javascript, jQuery, and graphical applications as well as the client and server architecture of the Internet and related web technologies. The creation and deployment of modern, standards-compliant web pages are addressed. Students create and deploy a Web site with multiple pages and cross-linked structures.`;
    it('should return the expected course description', function() {
      assert.equal(
        su.extractDescription(courseblock, '.courseblockdesc'),
        expected_description
      );
    });
  });

});

describe('private scraper functions', function() {
  describe('#normalizeSpace', function() {
    it('should replace all space characters with a simple space', function() {
      assert.equal(
        su.normalizeSpaces('wacky\tspace'),
        'wacky space'
      );
    });
  });
});
