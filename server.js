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
  });
  //function to handle the users choice
  function userchoice(choice) {
    //choice is the users
    choice
    //callback function
      .then((answer) => {
        switch (answer.Act) {
          case 'View Department':
            //switch / case statement checks the value of anwser.act
            viewDepartment();
            //breaks out of the switch statement
            break;
  
          case 'View Roles':
            viewRoles();
            break;
  
          case 'View Employees':
            viewEmployees();
            break;
  
          case 'Add Department':
            addDepartment();
            break;
  
          case 'Add Role':
            addRole();
            break;
  
          case 'Add Employee':
            addEmployee();
            break;
  
          case 'Update Employee Role':
            updateEmployeeRole();
            break;
  
          case 'Exit':
            connection.end();
            break;
          //default is used if no case matches the switch above
          default:
            console.log(`Action DID NOT work ${answer.action}`);
            break;  
        }
      })
      //error checking
      .catch((err) => {
        console.error('Err:', err);
      });
  }