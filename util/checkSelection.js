const Employee = require('../lib/Employee');
const Roles = require('../lib/Roles');
const Department = require('../lib/Department');

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
      case 'View all Roles':
        res(new Roles().allRoles());
        break;
      case 'View all Departments':
        res(new Department().allDepartments());
        break;
      case 'Add an Employee':
        res(new Employee().addEmployee());
        break; 
      case 'Add a Department':
        res(new Department().addDepartment());
        break;
      case 'Update an Employee Role':
        res(new Employee().updateEmployeeRole());
        break;
      case 'Update employee manager':
        res(new Employee().updateEmployeeManager());
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