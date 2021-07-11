const inquirer = require('inquirer');
const db = require('../db/connection');
const printTable = require('../util/printTable.js');
const getList = require('../util/getList')
//const {startApp} = require('./Tracker');

class Employee {

  constructor() {

  }

  //-----VIEW ALL EMPLOYEES-----//
  async viewAllEmployee() {
    const sql = `SELECT e1.id, e1.first_name, e1.last_name, roles.title AS title, department.name AS department, roles.salary AS salary, concat(e2.first_name,' ',e2.last_name) AS Manager
    FROM employee e1
    LEFT JOIN roles ON e1.role_id = roles.id
    LEFT JOIN department ON roles.department_id = department.id
    LEFT JOIN employee e2 ON e1.manager_id = e2.id;`;

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

  //-----VIEW EMPLOYEE BY MANAGER-----//
  async viewByManager() {
    
    /*return new Promise(resolve => {
      const manager = `SELECT employee.id, concat(employee.first_name,' ',employee.last_name) AS Manager FROM employee
        INNER JOIN roles ON role_id = roles.id
        WHERE roles.title = 'Manager';`;
      db.query(manager, (err, rows) => {
        if (err) {
          console.log(err);
        }
        this.managersList = JSON.parse(JSON.stringify(rows));
        resolve(this.managersList);
      })
    })*/
    return await getList('managers')
    .then(managers => {
      this.managersList = managers;
      const allManager = managers.map(manager => {
        return manager.Manager;
      });
      return inquirer.prompt([
        {
          type: "list",
          name: "selectManager",
          message: "Please select a Manager!!",
          choices: allManager
        }
      ])
    }).then(selection => {
      return this.managersList.findIndex(manager => manager.Manager === selection.selectManager);
    }).then(index => {
      const sql = `SELECT e1.id, e1.first_name, e1.last_name, roles.title AS title, department.name AS department, roles.salary AS salary, concat(e2.first_name,' ',e2.last_name) AS Manager
      FROM employee e1
      LEFT JOIN roles ON e1.role_id = roles.id
      LEFT JOIN department ON roles.department_id = department.id
      LEFT JOIN employee e2 ON e1.manager_id = e2.id
      WHERE e1.manager_id = ${this.managersList[index].id}
      `;
      db.query(sql, (err, rows) => {
        if (err) {
          console.log(err);
        }
        printTable(rows);
        return rows;
      })
      return '';
    })    
  };

  //-----VIEW EMPLOYEE BY DEPARTMENT-----//
  async viewByDepartment() {

    /*return new Promise(resolve => {
      const department = `SELECT * FROM department;`;
      db.query(department, (err, rows) => {
        if (err) {
          console.log(err);
        }
        this.departmentList = JSON.parse(JSON.stringify(rows));
        resolve(this.departmentList);
      })
    })*/
    return await getList('department')
    .then(departments => {
      this.departmentList = departments;
      const allDepartment = departments.map(department => {
        return department.name;
      });
      return inquirer.prompt([
        {
          type: "list",
          name: "selectDepartment",
          message: "Please select a Department!!",
          choices: allDepartment
        }
      ])
    }).then(selection => {
      return this.departmentList.findIndex(department => department.name === selection.selectDepartment);
    }).then(index => {
      console.log(index);
      const sql = `SELECT e1.id, e1.first_name, e1.last_name, roles.title AS title, department.name AS department
      FROM employee e1
      INNER JOIN roles ON role_id = roles.id
      INNER JOIN department ON department_id = department.id
      WHERE department.id = ${this.departmentList[index].id};
      `;
      db.query(sql, (err, rows) => {
        if (err) {
          console.log(err);
        }
        printTable(rows);
        return rows;
      })
      return '';
    });    
  }

  //-----ADD NEW EMPLOYEE-----//
  async addEmployee() {
    /*return new Promise(resolve => {
      const roles = `SELECT roles.id, concat(roles.title,', ',department.name) AS Title
      FROM roles
      INNER JOIN department ON department_id = department.id;
      `;
      const manager = `SELECT employee.id, concat(employee.first_name,' ',employee.last_name) AS Manager FROM employee
        INNER JOIN roles ON role_id = roles.id
        WHERE roles.title = 'Manager';`;

    */ 
    
    let allManager = await getList('managers')
      .then(managers => {
        this.managersList = managers;
        return managers.map(manager => {
          return manager.Manager;
        });
      })
    
    allManager.push('No Manager');
    
    let allRoles = await getList('roles')
      .then(roles => {
        this.rolesList = roles;
        return roles.map(role => {
          return role.Title;
        });
      })
    
    console.log(allManager, allRoles);

    return await inquirer.prompt([
      {
        type: "input",
        name: "first_name",
        message: "Please enter the first name of the employee!!",
      },
      {
        type: "input",
        name: "last_name",
        message: "Please enter the last name of the employee!!",
      },
      {
        type: "list",
        name: "role",
        message: "Please select a role!!",
        choices: allRoles
      },
      {
        type: "list",
        name: "manager",
        message: "Please select a manager!!",
        choices: allManager
      }
    ])
    .then(employeeDetails => {
      return {
        employeeDetails: employeeDetails,
        role: this.rolesList.findIndex(role => role.Title === employeeDetails.role),
        manager: this.managersList.findIndex(manager => manager.Manager === employeeDetails.manager)
      }
    })
    .then(employeeData => {
      if (employeeData.employeeDetails.manager === 'No Manager') {
        var sql = `INSERT INTO employee (first_name, last_name, role_id)
        VALUES (?, ?, ?);`;
        var params = [employeeData.employeeDetails.first_name, employeeData.employeeDetails.last_name, this.rolesList[employeeData.role].id];
      }
      else {
        var sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES (?,?,?,?);`;
        var params = [employeeData.employeeDetails.first_name, employeeData.employeeDetails.last_name, this.rolesList[employeeData.role].id, this.managersList[employeeData.manager].id];
      }
      //console.log(employeeData.employeeDetails.first_name, employeeData.employeeDetails.last_name, this.rolesList[employeeData.role].id, this.managersList[employeeData.manager].id)
      db.query(sql, params, (err) =>{
        if(err) {
          console.log(err);
        }
      });
      console.log('\nEmployee added successfully!!');
    })

  }

  //-----UPDATE EMPLOYEE ROLE-----//
  async updateEmployeeRole() {
    return await inquirer.prompt([
      {
        type: "input",
        name: "id",
        message: "Please enter id of the employee you want to update!!",
      }
    ])
    .then(answer => {
      this.updateId = answer.id;
      return getList('roles');
    })
    .then(roles => {
      this.rolesList = roles;
      const allRoles = roles.map(role => {
          return role.Title;
      });
      return inquirer.prompt([
        {
          type: "list",
          name: "selectRole",
          message: "Please select new role for the employee!!",
          choices: allRoles
        }
      ])
    }).then(selection => {
      return this.rolesList.findIndex(role => role.Title === selection.selectRole);
    }).then(index => {
      console.log(this.rolesList[index].id, this.updateId)
      const sql = `UPDATE employee SET role_id = ? WHERE employee.id = ?;
      `;
      const params = [this.rolesList[index].id, this.updateId];
      db.query(sql, params, (err) =>{
        if(err) {
          console.log({'error': err.message});
        }
      });
    })    
  };
  }

  //-----UPDATE EMPLOYEE MANAGER-----//

module.exports = Employee;