//import and require MYSQL and inquirer
const mysql = require('mysql');
const inquirer = require('inquirer');

// this creates a "MySQL connection"
const connection = mysql.createConnection({
  //where MYSQL is running
  host: 'localhost',
  //port MYSQL is running on (this could be any random port)
  port: 3301,
  //default username
  user: 'root',
  password: 'Tinroad25!',
  //database name (could be anything)
  database: 'job_tracker_DB',
});

// Connection to db
connection.connect((err) => {
  //error handling
  if (err) throw err;
  console.log('Connected MySQL database');
  //starts the main command line after the 
  startApplication();
});

//function to start the applicaiton and will prompt the user with a these options below
function startApplication() 
//npm package
//inquirer displays a prompt for the user
  inquirer
  .Prompt({
    //displays the name of the prompt / used to access users information
    name: 'Act',
    //type = list
    type: 'list',
    message: 'what do you need to do?',
    //listed of choices the user can pick from
    choices: [
      'View Departmnet',
      'View Roles',
      'View Employees',
      'Add Department',
      'Add Role',
      'Add Employee',
      'Update Employee Role',
      'Exit',
    ]
  }

  )