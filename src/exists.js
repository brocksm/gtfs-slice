module.exports = {
  directoryExists: (directory) => {
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
    }
    process.chdir(directory);
  },
  filesExist: (tableNames) => {
    const dirFiles = fs.readdirSync('./')
      .filter(file => file.slice(-3) === 'txt')
      .map(file => path.basename(file, '.txt'));
            
    for (const name of tableNames) {
      if (!dirFiles.includes(name)) {
        console.error(`missing required GTFS file ${name}.txt in ${path.resolve('./')}`);
        process.exit(1);
      }
    }
  },
  tablesExist: (tableNames, database) => {
    for (const name of tableNames) {
      // can't prepare this statement out of the loop, since sqlite
      // doesn't allow parameter binding for table names
      let rows = database.prepare(`SELECT COUNT(*) AS rows FROM ${name}`);
      if (rows.get().rows === 0) {
        console.error(`Error: missing data in table ${database}::${name}`);
        process.exit(1);
      }
    }
  }
}