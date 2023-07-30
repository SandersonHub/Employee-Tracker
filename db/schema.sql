-- Checks if the database exists and if it does, it drops it
DROP DATABASE IF EXISTS employee_db;

-- Creates a new database
CREATE DATABASE employee_db;

-- Switch to the newly created database
USE employee_db;

-- Creates the 'department' table
CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Creates the 'role' table
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL, -- Add the salary column
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

-- Creates the 'employee' table
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);
