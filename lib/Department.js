const inquirer = require('inquirer');
const db = require('../db/connection');
const printTable = require('../util/printTable.js');
const getList = require('../util/getList')

class Department {
  constructor() {

  }
  //-----SHOW ALL DEPARTMENTS-----//
  async allDepartments() {
    const sql = `SELECT * FROM department;
    `;

    return await new Promise(resolve => {
      db.query(sql, (err, rows) => {
        if (err) {
          console.log(err);
        }
        resolve(rows);
      });
    }).then(rows => {
      return printTable(rows);
    });
  };
}

module.exports = Department;