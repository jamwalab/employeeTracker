const checkSelection = require('../util/checkSelection')
const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('../db/connection');

const menuSelector = async () => {
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

  return await inquirer.prompt([
    {
      type: "list",
      name: "startMenuOptions",
      message: "What would you like to do?",
      choices: startMenu
    }
  ]);
}  

const startApp = async () => {
  const selection = await menuSelector();
  
  checkSelection(selection)
    .then(async (selection) => {
      if (selection === 'Exit') {
        db.end(err => {
          if (err) {
            console.log('error' + err.message);
          }
          console.log('Database connection closed')
        })
        return;
      }
      else {
        await new Promise(resolve => setTimeout(resolve, 500));
        startApp();
      }
    })

}

module.exports = {startApp};