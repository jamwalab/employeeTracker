const Employee = require('../lib/Employee');

const checkSelection = (data) => {
  return new Promise (res => {
    switch(data.startMenuOptions) {
      case 'View all Employees':
        res(new Employee().viewAllEmployee())
        break;
      case 'View employees by manager':
        res(new Employee().viewByManager())
        break;   
      default:
        console.log(data);
        res(data.startMenuOptions)
        break;
    }
    //res(data.startMenuOptions);
  })
}

module.exports = checkSelection;