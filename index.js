const fs = require('fs');
const cheerio = require('cheerio');

var raw_html = fs.readFileSync('data/raw/itmd.html');
var $ = cheerio.load(raw_html);

console.log("There are", $('.coursetitle').length, "ITMD courses. And here they are:");

$('.coursetitle').each(function() {
  console.log($(this).text());
});

// $('.courseblockdesc').text().replace(/\n/gm, "");
