# EMPLOYEE TRACKER
## Version 1.0
## Description
Command Line app that helps create database of all the employees. You have the option to view employee data and add new employee, department or roles.

## Table of Contents
* [License](#license)
* [Installation](#installation)
* [Test](#test)
* [Usage](#usage)
* [Credits](#credits)

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installation
* Clone the app using the below [Link to EMPLOYEE TRACKER repository](https://github.com/jamwalab/employeeTracker.git)
* Open to [connection.js file in db folder](./db/connection.js) and update your MySQL password.
* On command line, log in to my sql using 
* >mysql -u root -p
* Run the sql files to create database and add some entries.
* >source db/db.sql
* >source db/schema.sql
* >source db/seeds.sql
* Exit my sql and run the app.
* >node app

## Test
Testing is not available at the moment.

## Usage
* When started, you will get a menu screen as shown below
![Menu Page](./assets/img/startMenu.PNG)
* You will have following options to choose from -
  * View all Employees
  * View Employees by Manager
  * View Employees by Department
  * View all Roles
  * View all Departments
  * Add an Employee
  * Add a Role
  * Add a Department
  * Update an Employee Role
  * Update Employee Manager
  * Exit
* To exit, select _Exit_ in the option and it will close the database connection and stop the loop.

[Link to the walkthrough video](https://www.youtube.com/watch?v=JEIW-1eBi58)

## Credits
#### NPM Modules
* [Inquirer](https://www.npmjs.com/package/inquirer)
* [console.table](https://www.npmjs.com/package/console.table)

#### Users
* Abhishek Jamwal - [GitHub](https://github.com/jamwalab)