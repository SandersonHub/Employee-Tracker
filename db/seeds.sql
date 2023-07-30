USE employee_db;
--database / table

INSERT INTO department (name)
VALUES ("Engineering"),
       ("Finance"),
       ("Interconnected"),
       ("Sales");

-- Insert data into the 'role' table
INSERT INTO role (title, salary, department_id)
VALUES ('Software Engineer', 100000, 1), --Job title, Salary, and which deparment ID
       ('Security Manager', 85000, 3);    

-- Insert data into the 'employee' table
INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Bradley', 'Sanderson', 1); -- First name, last name, and role ID

