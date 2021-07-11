const Employee = require('../lib/Employee');

const checkSelection = (data) => {
  return new Promise (res => {
    switch(data.startMenuOptions) {
      case 'View all Employees':
        res(new Employee().viewAllEmployee());
        break;
      case 'View employees by manager':
        res(new Employee().viewByManager());
        break;
      case 'View employees by department':
        res(new Employee().viewByDepartment());
        break;
      case 'Add an Employee':
        res(new Employee().addEmployee());
        break; 
      case 'Update an Employee Role':
        res(new Employee().updateEmployeeRole());
        break;
      default:
        console.log(data);
        res(data.startMenuOptions);
        break;
    }
    //res(data.startMenuOptions);
  })
}

module.exports = checkSelection;