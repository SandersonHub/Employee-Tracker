--checks if the database exists and if it does it drops it
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;


USE employee_db;

--created table department
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--id stores values, NOT NULL means it cant be left empty
--AUTO_INCREMENT means it will automatically increment the id
--Primary key meanns it will have a unique identifer
    name VARCHAR(30) NOT NULL
--max length of 30 characters
);

--created role table
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
--defines a column which is called salary
    department_id INT,
    FOREIGN KEY (department_id)
--foreign key is a column that references back to the primary key
    REFERENCES department(id) 
);

--created employee table
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
-- FOREIGN KEY (role_id) amd REFEFERNCE role(id) 
-- means that the role_id column references the id column in the role table
    FOREIGN KEY (role_id)
    REFERENCES role(id), 
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
);