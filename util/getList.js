const db = require('../db/connection');

const getList = listOf => {
  return new Promise (res => {
    if (listOf === 'managers') {
      const manager = `SELECT employee.id, concat(employee.first_name,' ',employee.last_name) AS Manager FROM employee
        INNER JOIN roles ON role_id = roles.id
        WHERE roles.title = 'Manager';`;
      db.query(manager, (err, rows) => {
        if (err) {
          console.log(err);
        }
        res(JSON.parse(JSON.stringify(rows)));
      });
    }
    else if (listOf === 'department') {
      const department = `SELECT * FROM department;`;
      db.query(department, (err, rows) => {
        if (err) {
          console.log(err);
        }
        res(JSON.parse(JSON.stringify(rows)));
      });
    }
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