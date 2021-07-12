const inquirer = require('inquirer');
const db = require('../db/connection');
const printTable = require('../util/printTable.js');
const getList = require('../util/getList')

class Roles {
  constructor() {

  }

  //-----SHOW ALL ROLES-----//
  async allRoles() {
    //SQL query to get all roles
    const sql = `SELECT roles.id, roles.title, roles.salary, department.name AS department
    FROM roles
    LEFT JOIN department ON department_id = department.id;
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

  //-----ADD ROLE-----//
  async addRole() {
    //Get list of all departments
    return await getList('department')
    .then(departments => {
      this.departmentList = departments;
      //conver department list to array for choices
      const allDepartment = departments.map(department => {
        return department.name;
      });
      //get new role details
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
          message: "Please select a Department!!",
          choices: allDepartment
        }
      ])
    })
    .then(newRole => {
      //get selected department's index on the department list
      const index = this.departmentList.findIndex(department => department.name === newRole.department);
      //SQL query to add role
      const sql = `INSERT INTO roles (title, salary, department_id)
      VALUES (?, ?, ?);`
      const params = [newRole.title, newRole.salary, this.departmentList[index].id];
      //SQL query
      db.query(sql, params, (err) =>{
        if(err) {
          console.log(err);
        }
        //Add confirmation
        console.log('\nNew role added successfully!!')
      });     
    })
  }
}

module.exports = Roles;