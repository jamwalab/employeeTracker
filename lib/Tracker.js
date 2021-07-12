const checkSelection = require('../util/checkSelection')
const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('../db/connection');

//-----MENU SELECTION DISPLAY-----//
const menuSelector = async () => {
  //Option list
  const startMenu = [
    'View all Employees',
    'View Employees by Manager',
    'View Employees by Department',
    'View all Roles',
    'View all Departments',
    'Add an Employee',
    'Add a Role', 
    'Add a Department',
    'Update an Employee Role',
    'Update Employee Manager',
    'Exit'
  ]
  //Menu selection display
  return await inquirer.prompt([
    {
      type: "list",
      name: "startMenuOptions",
      message: "What would you like to do?",
      choices: startMenu
    }
  ]);
}  

//-----APP START OPTIONS-----//
const startApp = async () => {
  const selection = await menuSelector();
  //Check option selected - Function called
  checkSelection(selection)
    .then(async (selection) => {
      //If Exit close database connection and end the loop
      if (selection === 'Exit') {
        db.end(err => {
          if (err) {
            console.log('error' + err.message);
          }
          console.log('Database connection closed')
        })
        return;
      }
      //For all other option continue the loop
      //Delay timer added to avoid inquirer option getting printed over the result table displayed
      else {
        await new Promise(resolve => setTimeout(resolve, 500));
        startApp();
      }
    })
}

module.exports = {startApp};