const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
//importing express, mysql and inquirer

//heroku
const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Create a MySQL connection for Express server
//db dbExpress, connection to the database
const dbExpress = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Tinroad25!',
  database: 'employee_db'
});

// Helper function to display options
function displayOptions() {
  inquirer
    .prompt([
      {
        //list of options
        type: 'list',
        //name of the prompt
        name: 'action',
        //the message that asks the user what they want to do
        message: 'What would you like to do?',
        //choices that the user can choose from
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a new department',
          'Add a new role',
          'Add a new employee',
          'Exit',
        ],
      },
    ])
    //chaining a then method to a promise
    //promise is resolved then the then method is called
    .then(({ action }) => {
      //evaluates the action
      //case / switch statement, takes the code block and executes it
      //break will move it to the next case
      switch (action) {
        case 'View all departments':
          viewDepartments();
          break;
        case 'View all roles':
          viewRoles();
          break;
        case 'View all employees':
          viewEmployees();
          break;
        // case 'Add a new department':
        //   addDepartment();
        //   break;
        // case 'Add a new role':
        //   addRole();
        //   break;
        // case 'Add a new employee':
        //   addEmployee();
        //   break;
        case 'Exit':
          console.log('bye');
          break;
      }
    });
}

// View all departments
function viewDepartments() {
  const sql = 'SELECT id, name FROM department';
  //sql string to retrive the ID and name from the department table
  dbExpress.query(sql, (err, rows) => {
    //query method to execute the sql string
    if (err) {
      console.log('Error:', err.message);
      //if error throw an error with message
    }
  });
}

// View all roles
function viewRoles() {
  const sql = 'SELECT id, title, salary, department_id FROM role';
  dbExpress.query(sql, (err, rows) => {
    if (err) {
      console.log('Error:', err);
    }
  });
}

// View all employees
function viewEmployees() {
  const sql = 'SELECT id, first_name, last_name, role_id, manager_id FROM employee';
  dbExpress.query(sql, (err, rows) => {
    if (err) {
      console.log('Error:', err.message);
      displayOptions();
    }
  });
}



app.listen(PORT, () => {
  console.log(`Running on (if working) ${PORT}`);
});

// Call the displayOptions function at the end to start the inquirer prompts
displayOptions();
