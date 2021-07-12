const cTable = require('console.table');

//-----PRINT RESULT TABLE-----//
const printTable = data => {
  return new Promise(res => {
    console.log(`
    `);
    console.table(data);
    res(data);
  })  
};

module.exports = printTable;