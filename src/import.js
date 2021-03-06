const stream = require('./stream');

module.exports = async function (tables, database) {
  for (const table of tables) {
    const tableName = table['name'];
    const schema = table['schema'];
    const columnNamesAndTypes = schema.map(c => 
      c.name + ' ' + c.type).join(', ');
    const columns = schema.map(v => v.name).join(', ');
    const params = schema.map(v => '@' + v.name).join(', ');
    const constraints = schema.filter(v => v.constraint).map(v => v.name).join(', ');

    database.prepare(
      `CREATE TABLE IF NOT EXISTS ${tableName} 
       (${columnNamesAndTypes}, UNIQUE(${constraints}) ON CONFLICT IGNORE)`
    ).run();
          
    const insertRow = database.prepare(`INSERT INTO ${tableName} (${columns}) VALUES (${params})`);
    const insertRows = database.transaction((rows) => {
      for (const row of rows) insertRow.run(row);
    });
    
    await stream(table, insertRows, 1000);
  }
}