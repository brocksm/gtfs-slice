const csv = require('csv-parser');

module.exports = function (table, callback, bufferSize) {
  let buffer = [],
      rows = 0,
      readstream = fs.createReadStream(path.resolve(`${directory}${table.baseFilename}.txt`));

  return new Promise(function(resolve) {
    readstream
      .pipe(csv({
        mapValues: table.mapValues,
        mapHeaders: table.mapHeaders
      }))
      .on('data', (data) => {		
        buffer.push(data);
        if (buffer.length === bufferSize) {
          // once buffer size has been reached, insert and clear buffer
          callback(buffer);
          buffer = [];
          rows += bufferSize;
        }	
      })
      .on('end', () => {
        callback(buffer);
        rows += buffer.length;
        console.log(`imported ${rows} rows into ${table['name']}`);
        resolve();
      });
  }).catch((error) => {console.error(error)})	
}
