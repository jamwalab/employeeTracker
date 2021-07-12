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

  async addDepartment() {
  
    return await inquirer.prompt([
      {
        type: "input",
        name: "department",
        message: "Please add new department name!!",
      }
    ])
    .then(answer => {
      const sql = `INSERT INTO department (department.name)
      VALUES (?);`;
      db.query(sql, answer.department, (err) =>{
        if(err) {
          console.log(err);
        }
      });
    });
  };
}

module.exports = Department;