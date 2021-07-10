const db = require('../db/connection');

class Employee {
  constructor() {

  }

  async viewAllEmployee() {
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
    });
    //const [rows, fields] = await db.execute(sql);
    //console.log(rows, fields)
  };

  async viewByManager() {
    
  }
}

module.exports = Employee;