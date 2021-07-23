const csv = require('csv-parser');
const readline = require('readline');

module.exports = function (table, callback, bufferSize) {
  let buffer = [],
      rows = 0,
      readstream = fs.createReadStream(path.resolve(`${'./'}${table.name}.txt`));

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
          readline.clearLine(process.stdout, 0);
          readline.cursorTo(process.stdout, 0);
          process.stdout.write(`imported ${rows} rows into ${table['name']}`);
        }	
      })
      .on('end', () => {
        callback(buffer);
        rows += buffer.length;
        readline.clearLine(process.stdout, 0);
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(`imported ${rows} rows into ${table['name']}\n`);
        resolve();
      });
  }).catch((error) => {console.error(error)})	
}
