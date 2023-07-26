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

//function to start applicaiton
function startApplication() 