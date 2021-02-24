const fs = require('fs');
const cheerio = require('cheerio');

var raw_html = fs.readFileSync('data/raw/itmd.html');
var $ = cheerio.load(raw_html);

var courses = [];

console.log("There are", $('.coursetitle').length, "ITMD courses. And here they are:");

$('.courseblock').each(function() {
  var course = {};
  var hours;
  course['code'] = $(this).find('.coursecode').text();
  course['title'] = $(this).find('.coursetitle').text();
  course['description'] = $(this).find('.courseblockdesc')
    .text()
    .replace(/\n/gm, "") // remove newlines
    .replace(/\s\s/gm, " "); // remove double spaces
  hours = $(this).find('.hours')
    .text()
    .toLowerCase()
    .replace(/\n/gm, '')
    .replace(/(\d)(?!$)/gm, '$1,')
    .replace(/([a-z]+)/gm, '"$1"');
  course['hours'] = JSON.parse(`{${hours}}`);
  if (course['hours'].hasOwnProperty('credit')) {
    course['hours']['lecture'] = 0;
    course['hours']['lab'] = 0;
    course['hours']['credits'] = course['hours']['credit'];
    delete course['hours']['credit'];
  };
  courses.push(course);
  //console.log($(this).text());
});

console.log(courses);

// $('.courseblockdesc').text().replace(/\n/gm, "");

fs.writeFileSync('data/itmd.json', JSON.stringify(courses));
