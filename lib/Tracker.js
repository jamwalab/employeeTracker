const Employee = require('./Employee');
const inquirer = require('inquirer');
const cTable = require('console.table');
const db = require('../db/connection');

const printTable = require('../util/printTable.js');

class Tracker {
  constructor() {
    this.startMenu = [
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
  }

  startTracker() {

    return inquirer.prompt([
      {
        type: "list",
        name: "startMenuOptions",
        message: "What would you like to do?",
        choices: this.startMenu
      }
    ]).then(selection => {
      //console.log(this.startMenu[0], selection);
      switch(selection.startMenuOptions) {
        case this.startMenu[0]:
          new Employee().viewAllEmployee()
            /*.then(rows => {
              printTable(rows);
            })*/
          break;
        case this.startMenu[1]:
          new Employee().viewByManager()
           /* .then(rows => {
              console.log(rows);
              printTable(rows);
            })*/
          break;   
        default:
          console.log(selection);
          break;
      }
      return selection.startMenuOptions;
    }).then(selection => {
      this.exitOption(selection)
    })
    /*new Employee().viewAllEmployee()
      .then(x => {
        console.log(x);
      })*/
    
  }

  async exitOption(selection) {
    await new Promise(resolve => setTimeout(resolve, 500));
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
    this.startTracker();
  }

}

module.exports = Tracker;