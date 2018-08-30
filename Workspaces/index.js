var request = require('request');
var cheerio = require('cheerio');
var CSV = require('csv-string');
var fs = require('fs');
var dir = './data';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

var item = [];
var shirtsUrl = "http://shirts4mike.com/shirts.php";

request(shirtsUrl, function(error, response, html) {
  if (!error) {
    var $ = cheerio.load(html);
    var product = $('.products').children();

    product.each(function(index) {
      var productUrl = `http://shirts4mike.com/${product.eq(index).children().attr('href')}`;
      request(productUrl, function(error, response, html) {
        if (!error) {
          var product$ = cheerio.load(html);
          let price = product$('.price').text();
          let imgUrl = product$('.shirt-picture').find('img').attr('src');
          let title = product$('.shirt-picture').find('img').attr('alt');

          var itemCollective = {
            title: title,
            price: price,
            ImageUrl: imgUrl,
            url: productUrl,
            time: Date()
          }

          item.push(CSV.stringify(itemCollective));
          console.log(itemCollective);
          fs.writeFile('data/8_29_2018.csv', item, function (err) {
            if (err) {
              throw err;
              } else {
              console.log('It worked!');
              }
          });
        }
      });
     });
   } else {
     console.log("" + error);
   }
  });
