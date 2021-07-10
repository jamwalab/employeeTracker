const inquirer = require('inquirer');
const db = require('../db/connection');
const printTable = require('../util/printTable.js');

class Employee {
  constructor() {

  }

  viewAllEmployee() {
    const sql = `SELECT e1.id, e1.first_name, e1.last_name, roles.title AS title, department.name AS department, roles.salary AS salary, concat(e2.first_name,' ',e2.last_name) AS Manager
    FROM employee e1
    LEFT JOIN roles ON e1.role_id = roles.id
    LEFT JOIN department ON roles.department_id = department.id
    LEFT JOIN employee e2 ON e1.manager_id = e2.id;`

    return new Promise(resolve => {
      db.query(sql, (err, rows) => {
        if (err) {
          console.log(err);
        }
        resolve(rows);
        //resolve(JSON.stringify(rows));
      });
    }).then(rows => {
      printTable(rows);
    });
    //const [rows, fields] = await db.execute(sql);
    //console.log(rows, fields)
  };

  async viewByManager() {
    
    return new Promise(resolve => {
      const manager = `SELECT employee.id, concat(employee.first_name,' ',employee.last_name) AS Manager FROM employee
      INNER JOIN roles ON role_id = roles.id
      WHERE roles.title = 'Manager';`
      db.query(manager, (err, rows) => {
        if (err) {
          console.log(err);
        }
        resolve(JSON.parse(JSON.stringify(rows)));
      })
    }).then(managers => {
      this.managers = managers;
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
      console.log(this.managers, selection)
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
        console.log(rows);
        printTable(rows);
        return rows;
      })
    })
    
  }
}

module.exports = Employee;