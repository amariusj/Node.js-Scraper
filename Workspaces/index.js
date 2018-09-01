var request = require('request');
var cheerio = require('cheerio');
var csv = require('csv')
var fs = require('fs');
var dir = './data';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!

var yyyy = today.getFullYear();
if(dd<10){
    dd='0'+dd;
}
if(mm<10){
    mm='0'+mm;
}
var today = mm+'_'+dd+'_'+yyyy;

var item = [];
var shirtsUrl = "http://shirts4mike.com/shirts.php";

request(shirtsUrl, function(error, response, html) {
  if (!error) {
    var $ = cheerio.load(html);
    var product = $('.products').children();
    var headers = `
    Title, Price, Image Url, Product Url, Date Published
    `;

    item.push(headers);

    product.each(function(index) {
      var productUrl = `http://shirts4mike.com/${product.eq(index).children().attr('href')}`;
      request(productUrl, function(error, response, html) {
        if (!error) {
          var product$ = cheerio.load(html);
          let price = product$('.price').text();
          let imgUrl = product$('.shirt-picture').find('img').attr('src');
          if (productUrl === `http://shirts4mike.com/${product.eq(0).children().attr('href')}`) {
            let title = 'Logo Shirt Red';
            console.log(title);
            var itemCollective = `
            ${title}, ${price}, ${imgUrl}, ${productUrl}, ${Date()}
          `;

          item.push(itemCollective);
          console.log(itemCollective);

          fs.writeFile('data/' + today + '.csv', item, function (err) {
            if (err) {
              throw err;
              } else {
              console.log('It worked!');
              }
          });
          } else
          if (productUrl === `http://shirts4mike.com/${product.eq(3).children().attr('href')}`) {
            let title = 'Logo Shirt Green';
            console.log(title);
            var itemCollective = `
              ${title}, ${price}, ${imgUrl}, ${productUrl}, ${Date()}
            `;

            item.push(itemCollective);
            console.log(itemCollective);

            fs.writeFile('data/' + today + '.csv', item, function (err) {
              if (err) {
                throw err;
                } else {
                console.log('It worked!');
                }
            });
          } else
          if (productUrl === `http://shirts4mike.com/${product.eq(6).children().attr('href')}`) {
            let title = 'Logo Shirt Teal';
            console.log(title);
            var itemCollective = `
              ${title}, ${price}, ${imgUrl}, ${productUrl}, ${Date()}
            `;

            item.push(itemCollective);
            console.log(itemCollective);

            fs.writeFile('data/' + today + '.csv', item, function (err) {
              if (err) {
                throw err;
                } else {
                console.log('It worked!');
                }
            });
          } else
          if (productUrl === `http://shirts4mike.com/${product.eq(5).children().attr('href')}`) {
            let title = 'Logo Shirt Gray';
            console.log(title);
            var itemCollective = `
              ${title}, ${price}, ${imgUrl}, ${productUrl}, ${Date()}
            `;

            item.push(itemCollective);
            console.log(itemCollective);

            fs.writeFile('data/' + today + '.csv', item, function (err) {
              if (err) {
                throw err;
                } else {
                console.log('It worked!');
                }
            });
          } else
          if (productUrl === `http://shirts4mike.com/${product.eq(1).children().attr('href')}`) {
            let title = 'Mike the Frog Shirt Black';
            console.log(title);
            var itemCollective = `
              ${title}, ${price}, ${imgUrl}, ${productUrl}, ${Date()}
            `;

            item.push(itemCollective);
            console.log(itemCollective);

            fs.writeFile('data/' + today + '.csv', item, function (err) {
              if (err) {
                throw err;
                } else {
                console.log('It worked!');
                }
            });
          }
          else
          if (productUrl === `http://shirts4mike.com/${product.eq(2).children().attr('href')}`) {
            let title = 'Mike the Frog Shirt Blue';
            console.log(title);
            var itemCollective = `
              ${title}, ${price}, ${imgUrl}, ${productUrl}, ${Date()}
            `;

            item.push(itemCollective);
            console.log(itemCollective);

            fs.writeFile('data/' + today + '.csv', item, function (err) {
              if (err) {
                throw err;
                } else {
                console.log('It worked!');
                }
            });
          }
          else
          if (productUrl === `http://shirts4mike.com/${product.eq(4).children().attr('href')}`) {
            let title = 'Mike the Frog Shirt Yellow';
            console.log(title);
            var itemCollective = `
              ${title}, ${price}, ${imgUrl}, ${productUrl}, ${Date()}
            `;

            item.push(itemCollective);
            console.log(itemCollective);

            fs.writeFile('data/' + today + '.csv', item, function (err) {
              if (err) {
                throw err;
                } else {
                console.log('It worked!');
                }
            });
          }
          else
          if (productUrl === `http://shirts4mike.com/${product.eq(7).children().attr('href')}`) {
            let title = 'Mike the Frog Shirt Orange';
            console.log(title);
            var itemCollective = `
              ${title}, ${price}, ${imgUrl}, ${productUrl}, ${Date()}
            `;

            item.push(itemCollective);
            console.log(itemCollective);

            fs.writeFile('data/' + today + '.csv', item, function (err) {
              if (err) {
                throw err;
                } else {
                console.log('It worked!');
                }
            });
          }
          // var itemCollective = `
          //   ${title}, ${price}, ${imgUrl}, ${productUrl}, ${Date()}
          // `;

          // item.push(itemCollective);
          // console.log(itemCollective);
          //
          // fs.writeFile('data/' + today + '.csv', item, function (err) {
          //   if (err) {
          //     throw err;
          //     } else {
          //     console.log('It worked!');
          //     }
          // });
        }
      });
     });
   } else {
     console.log("" + error);
   }
  });
