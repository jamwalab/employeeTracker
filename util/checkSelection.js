const Employee = require('../lib/Employee');
const Roles = require('../lib/Roles');
const Department = require('../lib/Department');

//-----CHECK OPTION SELECTED AND CALL FUNCTION FOR EACH OPTION SELECTED
const checkSelection = (data) => {
  return new Promise (res => {
    //Switch case for option selected
    switch(data.startMenuOptions) {
      case 'View all Employees':
        res(new Employee().viewAllEmployee());
        break;
      case 'View Employees by Manager':
        res(new Employee().viewByManager());
        break;
      case 'View Employees by Department':
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
      case 'Add a Role':
        res(new Roles().addRole());
        break; 
      case 'Add a Department':
        res(new Department().addDepartment());
        break;
      case 'Update an Employee Role':
        res(new Employee().updateEmployeeRole());
        break;
      case 'Update Employee Manager':
        res(new Employee().updateEmployeeManager());
        break;
      default:
        console.log(data);
        res(data.startMenuOptions);
        break;
    }
  })
}

module.exports = checkSelection;