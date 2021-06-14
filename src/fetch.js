const fetch = require('node-fetch');
const unzip = require('adm-zip');
      
module.exports = function (url) {
  return fetch(url)
  .then((response) => {
    if (!response.ok) {
      console.error(`Error downloading GTFS files from ${url} (HTTP response ${response.statusText})`)
      process.exit(1);
    }
    else {return response.buffer();}
  })		
  .then((buffer) => {fs.writeFileSync(`${filename}.zip`, buffer);})
  .then(() => {new unzip(`${filename}.zip`).extractAllTo(directory);});
}