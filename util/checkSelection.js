const Employee = require('../lib/Employee');

const checkSelection = (data) => {
  return new Promise (res => {
    switch(data.startMenuOptions) {
      case 'View all Employees':
        new Employee().viewAllEmployee()
        break;
      case 'View employees by manager':
        new Employee().viewByManager()
        break;   
      default:
        console.log(data);
        break;
    }
    res(data.startMenuOptions);
  })
}

module.exports = checkSelection;