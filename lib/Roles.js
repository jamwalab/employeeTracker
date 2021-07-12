const inquirer = require('inquirer');
const db = require('../db/connection');
const printTable = require('../util/printTable.js');
const getList = require('../util/getList')

class Roles {
  constructor() {

  }

  //-----SHOW ALL ROLES-----//
  async allRoles() {
    const sql = `SELECT roles.id, roles.title, roles.salary, department.name
    FROM roles
    LEFT JOIN department ON department_id = department.id;
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

  //-----ADD ROLE-----//
  async addRole() {

    return await getList('department')
    .then(departments => {
      this.departmentList = departments;
      const allDepartment = departments.map(department => {
        return department.name;
      });
      return inquirer.prompt([
        {
          type: "input",
          name: "title",
          message: "Please add title of the new role!!",
        },
        {
          type: "input",
          name: "salary",
          message: "Please enter salary for the new role!!",
        },
        {
          type: "list",
          name: "department",
          message: "Please select a role!!",
          choices: allDepartment
        }
      ])
    })
    .then(newRole => {
      const index = this.departmentList.findIndex(department => department.name === newRole.department);
      const sql = `INSERT INTO roles (title, salary, department_id)
      VALUES (?, ?, ?);`
      const params = [newRole.title, newRole.salary, this.departmentList[index].id];
      db.query(sql, params, (err) =>{
        if(err) {
          console.log(err);
        }
      });
      console.log('\nNew role added successfully!!')
    })
  }
}

module.exports = Roles;