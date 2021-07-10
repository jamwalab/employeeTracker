const cTable = require('console.table');

const printTable = data => {
  console.log(`
  `);
  console.table(data);
  /*return new Promise (resolve => {
    console.log(`
    `);
    console.table(data);
    resolve(data)
  }).then(() => {
    console.log(`aaaaaaaaaaaaa
    `);
  })*/
};

module.exports = printTable;
