const fs = require('fs');
const cheerio = require('cheerio');

var raw_html = fs.readFileSync('data/raw/itmd.html');
var $ = cheerio.load(raw_html);

var courses = [];

console.log("There are", $('.coursetitle').length, "ITMD courses. And here they are:");

$('.coursetitle').each(function() {
  var course = {};
  course['title'] = $(this).text();
  courses.push(course);
  //console.log($(this).text());
});

console.log(courses);

// $('.courseblockdesc').text().replace(/\n/gm, "");

fs.writeFileSync('data/itmd.json', JSON.stringify(courses));
