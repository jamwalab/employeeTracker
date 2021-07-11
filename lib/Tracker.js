const checkSelection = require('../util/checkSelection')
const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('../db/connection');

  const menuSelector = () => {
    const startMenu = [
      'View all Employees',
      'View employees by manager',
      'View employees by department',
      'View all Roles',
      'View all Departments',
      'Add an Employee',
      'Add a Role', 
      'Add a Department',
      'Update an Employee Role',
      'Update employee managers',
      'Delete departments, roles, and employees',
      'Exit'
    ]

    return inquirer.prompt([
      {
        type: "list",
        name: "startMenuOptions",
        message: "What would you like to do?",
        choices: startMenu
      }
    ]).then(selection => {
      return checkSelection(selection);
      
      //console.log(this.startMenu[0], selection);
      
      /*switch(selection.startMenuOptions) {
        case startMenu[0]:
          new Employee().viewAllEmployee(selection.startMenuOptions)
          break;
        case startMenu[1]:
          new Employee().viewByManager(selection.startMenuOptions)
          break;   
        default:
          console.log(selection);
          break;
      }
      return selection.startMenuOptions;  */
    })
    .then ((selection) => {
      console.log('aaaaaaaaaaaaaaaaaaaaaa')
      startApp(selection);
    })
  }

  const startApp = async (selection) => {
    //await new Promise(resolve => setTimeout(resolve, 500));
    if (selection === 'Exit') {
      db.end(err => {
        if (err) {
          console.log('error' + err.message);
        }
        console.log('Database connection closed')
      })
      return;
    }
    console.log('Please select your next query');
    menuSelector();
  }

module.exports = {menuSelector, startApp};