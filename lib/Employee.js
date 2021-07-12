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
    //Query to get list of all employees
    const sql = `SELECT e1.id, e1.first_name, e1.last_name, roles.title AS title, department.name AS department, roles.salary AS salary, concat(e2.first_name,' ',e2.last_name) AS Manager
    FROM employee e1
    LEFT JOIN roles ON e1.role_id = roles.id
    LEFT JOIN department ON roles.department_id = department.id
    LEFT JOIN employee e2 ON e1.manager_id = e2.id;`;
    //SQL query
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
    })
  };

  //-----VIEW EMPLOYEE BY MANAGER-----//
  async viewByManager() {
    //get all managers
    return await getList('managers')
    .then(managers => {
      this.managersList = managers;
      //conver manager list to array for choices
      const allManager = managers.map(manager => {
        return manager.Manager;
      });
      //select manager
      return inquirer.prompt([
        {
          type: "list",
          name: "selectManager",
          message: "Please select a Manager!!",
          choices: allManager
        }
      ])
    }).then(selection => {
      //get selected department's index on the list
      return this.managersList.findIndex(manager => manager.Manager === selection.selectManager);
    }).then(index => {
      //query to get employees by manager, search by id
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
    //get all department list
    return await getList('department')
    .then(departments => {
      this.departmentList = departments;
      //convet departments to array for choices
      const allDepartment = departments.map(department => {
        return department.name;
      });
      //select department
      return inquirer.prompt([
        {
          type: "list",
          name: "selectDepartment",
          message: "Please select a Department!!",
          choices: allDepartment
        }
      ])
    }).then(selection => {
      //get department index on the list
      return this.departmentList.findIndex(department => department.name === selection.selectDepartment);
    }).then(index => {
      //Query to get employees by department, search by id
      const sql = `SELECT e1.id, e1.first_name, e1.last_name, roles.title AS title, department.name AS department
      FROM employee e1
      INNER JOIN roles ON role_id = roles.id
      INNER JOIN department ON department_id = department.id
      WHERE department.id = ${this.departmentList[index].id};
      `;
      //SQL query 
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

    //List of all managers
    let allManager = await getList('managers')
      .then(managers => {
        this.managersList = managers;
        return managers.map(manager => {
          return manager.Manager;
        });
      })
    //add No Manager to the manager list
    allManager.push('No Manager');
    //List of all roles
    let allRoles = await getList('roles')
      .then(roles => {
        this.rolesList = roles;
        return roles.map(role => {
          return role.Title;
        });
      })
    //Get employee details
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
      //employee details and get id for role and manager
      return {
        employeeDetails: employeeDetails,
        role: this.rolesList.findIndex(role => role.Title === employeeDetails.role),
        manager: this.managersList.findIndex(manager => manager.Manager === employeeDetails.manager)
      }
    })
    .then(employeeData => {
      //If employee has no manager, SQL query and parameter will be as shown below.
      if (employeeData.employeeDetails.manager === 'No Manager') {
        var sql = `INSERT INTO employee (first_name, last_name, role_id)
        VALUES (?, ?, ?);`;
        var params = [employeeData.employeeDetails.first_name, employeeData.employeeDetails.last_name, this.rolesList[employeeData.role].id];
      }
      //For employee with manager, SQL query and parameter will be as shown below.
      else {
        var sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES (?,?,?,?);`;
        var params = [employeeData.employeeDetails.first_name, employeeData.employeeDetails.last_name, this.rolesList[employeeData.role].id, this.managersList[employeeData.manager].id];
      }
      //console.log(employeeData.employeeDetails.first_name, employeeData.employeeDetails.last_name, this.rolesList[employeeData.role].id, this.managersList[employeeData.manager].id)
      db.query(sql, params, (err, result) =>{
        if(err) {
          console.log(err);
        }
        if (result.affectedRows === 0) {
          //Message if no rows are changed.
          console.log('Error: Employee was not added, please try again!!');
        } else {
          //Message after employee successfully added.
          console.log('\nEmployee added successfully!!');
        }       
      });
    })

  }

  //-----UPDATE EMPLOYEE ROLE-----//
  async updateEmployeeRole() {
    //Get input
    return await inquirer.prompt([
      {
        type: "input",
        name: "id",
        message: "Please enter id of the employee you want to update!!",
      }
    ])
    //get id and roles list
    .then(answer => {
      this.updateId = answer.id;
      return getList('roles');
    })
    .then(roles => {
      this.rolesList = roles;
      //convert to array for choices
      const allRoles = roles.map(role => {
          return role.Title;
      });
      //Select role
      return inquirer.prompt([
        {
          type: "list",
          name: "selectRole",
          message: "Please select new role for the employee!!",
          choices: allRoles
        }
      ])
    }).then(selection => {
      //Find index of selection in main list
      return this.rolesList.findIndex(role => role.Title === selection.selectRole);
    }).then(index => {
      const sql = `UPDATE employee SET role_id = ? WHERE employee.id = ?;
      `;
      //get roles id and pass role id and employee id as parameter
      const params = [this.rolesList[index].id, this.updateId];
      db.query(sql, params, (err, result) =>{
        //Message on error
        if(err) {
          console.log({'error': err.message});
        }
        if (result.affectedRows === 0) {
          //Message if no rows are changed.
          console.log('Employee id was not found, please try again!!');
        } else {
          //Message after employee manager is successfully added.
          console.log('Employee role was updated successfully!!');
        }       
      });
    });    
  };

  //-----UPDATE EMPLOYEE MANAGER-----//
  async updateEmployeeManager() {
    //Get input
    return await inquirer.prompt([
      {
        type: "input",
        name: "id",
        message: "Please enter id of the employee you want to update!!",
      }
    ])
    //get id and manager list
    .then(answer => {
      this.updateId = answer.id;
      return getList('managers');
    })
    .then(managers => {
      this.managersList = managers;
      //convert to array for choices
      const allManager = managers.map(manager => {
        return manager.Manager;
      });
      //Select manager
      return inquirer.prompt([
        {
          type: "list",
          name: "selectManager",
          message: "Please select a Manager!!",
          choices: allManager
        }
      ])
    }).then(selection => {
      //Find index of selection in main list
      return this.managersList.findIndex(manager => manager.Manager === selection.selectManager);
    }).then(index => {
      const sql = `UPDATE employee SET manager_id = ? WHERE employee.id = ?;
      `;
      //get manager id and pass manager id and employee id as parameter
      const params = [this.managersList[index].id, this.updateId];
      db.query(sql, params, (err, result) =>{
        //Message on error
        if(err) {
          console.log({'error': err.message});
        }
        if (result.affectedRows === 0) {
          //Message if no rows are changed.
          console.log('Employee id was not found, please try again!!');
        } else {
          //Message after employee manager is successfully added.
          console.log('Employee manager was updated successfully!!');
        }       
      });
    })    
  };


}

  

module.exports = Employee;