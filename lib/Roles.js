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
}

module.exports = Roles;