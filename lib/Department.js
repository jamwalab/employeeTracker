const inquirer = require('inquirer');
const db = require('../db/connection');
const printTable = require('../util/printTable.js');
const getList = require('../util/getList')

class Department {
  constructor() {

  }
  //-----SHOW ALL DEPARTMENTS-----//
  async allDepartments() {
    //SQL query for all departments
    const sql = `SELECT * FROM department;
    `;
    //sql query
    return await new Promise(resolve => {
      db.query(sql, (err, rows) => {
        if (err) {
          console.log(err);
        }
        resolve(rows);
      });
    }).then(rows => {
      //print table
      return printTable(rows);
    });
  };

  //-----ADD DEPARTMENT-----//
  async addDepartment() {
    //get new department detail
    return await inquirer.prompt([
      {
        type: "input",
        name: "department",
        message: "Please add new department name!!",
      }
    ])
    .then(answer => {
      //SQL query to add new department
      const sql = `INSERT INTO department (department.name)
      VALUES (?);`;
      db.query(sql, answer.department, (err) =>{
        if(err) {
          console.log(err);
        }
        //confirmation message
        console.log('\nNew department added successfully!!')
      });
    });
  };
}

module.exports = Department;