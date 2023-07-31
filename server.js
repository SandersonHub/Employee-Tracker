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
  database: 'employee_db2'
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

    //This section of code displays the terminal promoted

    //chaining a then method to a promise
    //promise is resolved then the then method is called
    .then(({ action }) => {
      //evaluates the action
      //case / switch statement, takes the code block and executes it
      //break will move it to the next case
      console.log(action);
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
        
        default:
            console.log(`didnt work`);
      }
    });
}

// In this section of code is where the information is displayed "Department, Roles, Employees"

// View all departments

function viewDepartments() {

  const sql = 'SELECT id, name FROM department';
  dbExpress.connect(function(err) {
    if (err) throw err;
    //dbExpress is the connection to the database
    //query method to execute the sql string
    //fields is the parameter that will contain information about the returned results fields
    dbExpress.query("SELECT * FROM department", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });


  //sql string to retrive the ID and name from the department table
  //
  // dbExpress.query(sql, (err) => {
  //   //query method to execute the sql string
  //   if (err) {
  //     console.log('Error:', err.message);
  //     //if error throw an error with message
  //   }
  // });
}

// View all roles

function viewRoles() {
  const sql = 'SELECT id, title, salary, department_id FROM role';
  dbExpress.query(sql, (err) => {
    if (err) {
      console.log('Error:', err);
    }
  });
}

// View all employees

function viewEmployees() {
  const sql = 'SELECT id, first_name, last_name, role_id, manager_id FROM employee';
  dbExpress.query(sql, (err) => {
    if (err) {
      console.log('Error:', err.message);
      displayOptions();
    }
  });
}


// In this section of code is where the information can be added "Department, Roles, Employees"

// Add a new department

//route handler for a post request to create a new department
app.post('/api/new-department', (req, res) => {
  //const sql will INSERT INTO the department table the name
  const sql = `INSERT INTO department (name)
    VALUES = ?`;
    //parmas array, will contain the name from the body
    const params = [body.name];
    
    //excute the sql string if there is an error throw an error message
  db.query(sql, params, (err, result) => {
    if (err) {
      //display 400 error message
      res.status(400).json({ error: err.message });
      return;
    }
    //if data is correct, display success message
    res.json({
      message: 'success',
      data: body
    });
  });
});

// Add a new role
app.post('/api/new-role', (req, res) => {
  const sql = `INSERT INTO role (title, salary, department_id)
    VALUES (?, ?, ?)`;
    //(?, ?, ?) placeholders for title, salary, and department_id.
  const params = [body.title, body.salary, body.department_id];
  
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});

// Add a new employee

app.post('/api/new-employee', (req, res) => {
  const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?, ?, ?, ?)`;
  const params = [body.first_name, body.last_name, body.role_id, body.manager_id];
  
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});







app.listen(PORT, () => {
  console.log(`Running on (if working) ${PORT}`);
});

// Call the displayOptions function at the end to start the inquirer prompts
displayOptions();
