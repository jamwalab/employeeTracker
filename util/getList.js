const db = require('../db/connection');

//-----GET LIST FOR MANAGERS, ROLES AND DEPARTMENT-----//
const getList = listOf => {
  return new Promise (res => {
    //Get list of all managers
    if (listOf === 'managers') {
      //Manager name + department
      const manager = `SELECT employee.id, concat(employee.first_name,' ',employee.last_name) AS Manager FROM employee
        INNER JOIN roles ON role_id = roles.id
        WHERE roles.title = 'Manager';`;
      //SQL query
      db.query(manager, (err, rows) => {
        if (err) {
          console.log(err);
        }
        res(JSON.parse(JSON.stringify(rows)));
      });
    }
    //Get list of all departments
    else if (listOf === 'department') {
      const department = `SELECT * FROM department;`;
      db.query(department, (err, rows) => {
        if (err) {
          console.log(err);
        }
        res(JSON.parse(JSON.stringify(rows)));
      });
    }
    //Get list of all roles
    else if (listOf === 'roles') {
      const roles = `SELECT roles.id, concat(roles.title,', ',department.name) AS Title
      FROM roles
      INNER JOIN department ON department_id = department.id;`;
      db.query(roles, (err, rows) => {
        if (err) {
          console.log(err);
        }
        res(JSON.parse(JSON.stringify(rows)));
      });
    }
  })
}

module.exports = getList;