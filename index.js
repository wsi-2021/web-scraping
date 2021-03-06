'use strict';
/** Require the NodeJS file utils library.
  @constant
  @type {object}
*/
const fs = require('fs');
/** Require the Cheerio third-party library.
  {@link https://cheerio.js.org/}
  @constant
  @type {object}
*/
const cheerio = require('cheerio');
/** Require our own Scraper Utils library.
  @constant
  @type {object}
*/
const su = require('./lib/scraper-utils');

var raw_html = fs.readFileSync('data/raw/itmd.html');
var $ = cheerio.load(raw_html);

var courses = [];

console.log("There are", $('.coursetitle').length, "ITMD courses. And here they are:");

$('.courseblock').each(function() {
  var course = {};
  var hours;
  course.code = su.extractText($(this), '.coursecode');
  course.title = su.extractText($(this), '.coursetitle');
  course.description = su.extractDescription($(this), '.courseblockdesc');

  hours = $(this).find('.hours')
    .text()
    .toLowerCase()
    .replace(/\n/gm, '')
    .replace(/(\d)(?!$)/gm, '$1,')
    .replace(/([a-z]+)/gm, '"$1"');
  course.hours = JSON.parse(`{${ hours }}`);
  if (Object.prototype.hasOwnProperty.call(course.hours, 'credit')) {
    course.hours.lecture = 0;
    course.hours.lab = 0;
    course.hours.credits = course.hours.credit;
    delete course.hours.credit;
  }
  courses.push(course);
  // console.log($(this).text());
});

console.log(courses);

// $('.courseblockdesc').text().replace(/\n/gm, "");

fs.writeFileSync('data/itmd.json', JSON.stringify(courses));


/*
  Handling prerequisites:

  (ITM 311 or CS 116 or CS 201) and (ITM 312 or ITM 313 or CS 331)

  var prereqs = [
    ['ITM 311', 'CS 116', 'CS 201'],
    ['ITM 312', 'ITM 313', 'CS 331']
  ];

  var prereqs = [
    ['ITMD 361'],
    ['ITMD 362']
  ];

*/
