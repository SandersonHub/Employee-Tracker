const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
//importing express, mysql and inquirer

//heroku
const PORT = process.env.PORT || 3001;

//express middleware
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Create a MySQL connection for Express server
//db dbExpress, connection to the database
const dbExpress = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Tinroad25!',
  database: 'employee_db2'
});

// Helper function to display options
function displayOptions() {
  inquirer
    .prompt([
      {
        type: 'list', //list of options
        name: 'action', //name of the prompt
        message: 'What would you like to do?', //the message that asks the user what they want to do
        choices: [ //choices that the user can choose from
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a new department',
          'Add a new role',
          'Add a new employee',
          'Update employee role',
          'Exit',
        ],
      },
    ])

    //This section of code displays the terminal promoted

    //chaining a then method to a promise
    //promise is resolved then the then method is called
    .then(({ action }) => { //evaluates the action
      console.log(action);
      switch (action) {
        case 'View all departments': //case / switch statement, takes the code block and executes it
          viewDepartments();
          break; //break will move it to the next case
        case 'View all roles':
          viewRoles();
          break;
        case 'View all employees':
          viewEmployees();
          break;
         case 'Add a new department':
          addDepartment();
         break;
        case 'Add a new role':
         addRole();
         break;
        case 'Add a new employee':
          addEmployee();
          break;
          // Added a case to update an exsisting employee role
        case 'Update employee role':
          updateEmployeeRole();
          break;
        case 'Exit':
          console.log('bye');
          break;
        
        default:
            console.log(`didnt work`);
      }
    });
}

// In this section of code is where the information is displayed "Department, Roles, Employees"

// View all departments

function viewDepartments() {

  const sql = 'SELECT id AS value, name FROM department';

  //dbExpress is the connection to the database
  //query method to execute the sql string
  //fields is the parameter that will contain information about the returned results fields
  dbExpress.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.table(result);
    displayOptions();
  });
}

// View all roles

function viewRoles() {
  const sql = 'SELECT id AS VALUE, title, salary, department_id name FROM role';
  dbExpress.query(sql, (err, result, fields) => {
    if (err) {
      console.log('Error:', err);
    }
    console.table(result);
    displayOptions();
  });
}

// View all employees

function viewEmployees() {
  const sql = 'SELECT id AS VALUE, first_name, last_name, role_id FROM employee';
  dbExpress.query(sql, (err, result, fields) => {
    if (err) {
      console.log('Error:', err);
      return;
    }
    console.table(result);
    displayOptions();
  });
}

// In this section of code is where the information can be added "Department, Roles, Employees

// Add a new department
function addDepartment() { 
  inquirer.prompt([
    {
      name: "Department",
      type: "input",
      message: "Enter the name for the New Department:"
    },
  ]).then(answers => {
    console.log("Department Successfully Added:", answers);
  }).catch(error => {
    console.error("Error occurred:", error);
  }).then(() => {
    displayOptions(); // Call displayOptions() regardless of success or failure
  });
}

// Add a new role
function addRole() { 
  inquirer.prompt([
    {
      name: "title",
      type: "input",
      message: "Enter the title for the New Role:"
    },
    {
      name: "salary",
      type: "input",
      message: "Enter the salary for the New Role:"
    },
    {
      name: "department",
      type: "input",
      message: "Enter the department ID for the New Role:"
    },
  ]).then(answers => {
    console.log("Role Successfully Added:", answers);
    displayOptions(); // Show options again after successful role addition
  }).catch(error => {
    console.error("Error occurred:", error);
    displayOptions(); // Show options again after error
  });
}

// Add a new employee
function addEmployee() { 
  inquirer.prompt([
    {
      name: "firstname",
      type: "input",
      message: "Enter their first name:"
    },
    {
      name: "lastname",
      type: "input",
      message: "Enter their last name:"
    },
    {
      name: "role",
      type: "list",
      message: "What is their role?",
      choices: ["Engineering", "Finance", "Interconnected", "Legal"]
    },
  ]).then(answers => {
    console.log("Employee Sucessfully Added:", answers);
  }).catch(error => {
    console.error("Error occurred:", error);
  });
}

//update an employee role

// Function to fetch the list of employees from the database
function getEmployeesList(callback) { //gets the list of employees from the database. (Callback) is a function that passes to an argument to another function
  const sql = 'SELECT * FROM employee'; // Query to select an employee
  dbExpress.query(sql, (err, employees) => {
    if (err) { //error checking
      console.error(err);
      callback([]);
    } else {
      callback(employees); //callback function to return the list of employees
    }
  });
}

function updateEmployeeRole() {
  // fetches the list of employees from the database
  getEmployeesList((employees) => { //takes an employees parameter
    const changeEmployee = employees.map((employee) => ({ //Map, creates a new array with the results of calling a function for every array element
      name: `${employee.first_name} ${employee.last_name}`, // (` `) initializes a template literal, and employee.first_name and employee.last_name are the expressions
      //name displays the first and last name of the employee 
      value: employee.id,
    }));

    inquirer.prompt([ //prompt to ask the user to pick an employee and also it will have select a new role id
      {
        name: "employeeId",
        type: "list",
        message: "Please pick the Employee you would like to change the role for:",
        choices: changeEmployee,
      },
      {
        name: "newRoleId",
        type: "input",
        message: "Enter the new role ID for the Employee:",
      },
    ]).then(answers => {
      const { employeeId, newRoleId } = answers; //destructuring assignment syntax, anwser is the object that specific to employeeId and newRoleId
      const sql = 'UPDATE employee SET role_id = ? WHERE id = ?';
      dbExpress.query(sql, [newRoleId, employeeId], (err, result) => { //[newRoleId, employeeId], array that displays the values that will be inserted
        if (err) { //error checking
          console.error(err);
        } else {
          console.log("Employee role updated successfully. yay!");
        }
        displayOptions();
      });
    });
  });
}



app.listen(PORT, () => {
  console.log(`Running on (if working) ${PORT}`);
});

// Call the displayOptions function at the end to start the inquirer prompts
displayOptions();
