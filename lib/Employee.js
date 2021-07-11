const inquirer = require('inquirer');
const db = require('../db/connection');
const printTable = require('../util/printTable.js');
//const {startApp} = require('./Tracker');

class Employee {
  constructor() {

  }

  async viewAllEmployee() {
    const sql = `SELECT e1.id, e1.first_name, e1.last_name, roles.title AS title, department.name AS department, roles.salary AS salary, concat(e2.first_name,' ',e2.last_name) AS Manager
    FROM employee e1
    LEFT JOIN roles ON e1.role_id = roles.id
    LEFT JOIN department ON roles.department_id = department.id
    LEFT JOIN employee e2 ON e1.manager_id = e2.id;`

    return await new Promise(resolve => {
      db.query(sql, (err, rows) => {
        if (err) {
          console.log(err);
        }
        resolve(rows);
      });
    }).then(rows => {
      return printTable(rows);
    })
  };

  async viewByManager(optionSelected) {
    
    return new Promise(resolve => {
      const manager = `SELECT employee.id, concat(employee.first_name,' ',employee.last_name) AS Manager FROM employee
      INNER JOIN roles ON role_id = roles.id
      WHERE roles.title = 'Manager';`
      db.query(manager, (err, rows) => {
        if (err) {
          console.log(err);
        }
        this.managers = JSON.parse(JSON.stringify(rows));
        resolve(this.managers);
      })
    }).then(managers => {
      
      const managerList = managers.map(manager => {
        return manager.Manager
      })
      return inquirer.prompt([
        {
          type: "list",
          name: "selectManager",
          message: "Please select a Manager!!",
          choices: managerList
        }
      ])
    }).then(selection => {
      return this.managers.findIndex(manager => manager.Manager === selection.selectManager)  
    }).then(index => {
      const sql = `SELECT e1.id, e1.first_name, e1.last_name, roles.title AS title, department.name AS department, roles.salary AS salary, concat(e2.first_name,' ',e2.last_name) AS Manager
      FROM employee e1
      LEFT JOIN roles ON e1.role_id = roles.id
      LEFT JOIN department ON roles.department_id = department.id
      LEFT JOIN employee e2 ON e1.manager_id = e2.id
      WHERE e1.manager_id = ${this.managers[index].id}
      `
      db.query(sql, (err, rows) => {
        if (err) {
          console.log(err);
        }
        printTable(rows);
        return rows;
      })
      return ''
    })    
  }
}

module.exports = Employee;