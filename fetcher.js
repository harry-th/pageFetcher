const request = require('request');
const fs = require('fs');
let name, address;
if (process.argv.slice(2).length > 2) return console.log('too many arugments');
if (process.argv.slice(2).length === 1) {
  name = process.argv.slice(2)[0];
} else {
  name = process.argv.slice(2)[1];
}
if (process.argv.slice(2).length > 1)address = process.argv.slice(2)[0];

let fetcher = function(address = 'http://www.example.edu', fileName) {
  if (fs.existsSync(`./${fileName}`))  {
    console.log('need a different file name');
    return;
  } else if (!fileName) {
    console.log('need a filename');
    return;
  }
     
  request(address, (error, response, body) => {
    if (error) {
      console.log('incorrect url',error);
      return error;
    }
    fs.writeFile(`./${fileName}.html`, body, (error) => {
      if (error) console.log(error);
      else console.log(`Downloaded and saved ${body.length} bytes to ./${fileName}.html`);
    });
  });
};

fetcher(address,name);
