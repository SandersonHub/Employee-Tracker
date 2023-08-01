USE employee_db2;
--database / table

INSERT INTO department (name)
VALUES ("Engineering"),
       ("Finance"),
       ("Interconnected"),
       ("Legal")


-- Insert data into the 'role' table
INSERT INTO role (title, salary, department_id)
VALUES ('Software Engineer', 100000, 1), --Job title, Salary, and which deparment ID
       ('Security Manager', 85000, 3);
       ('Accountant', 75000, 2);
       ('Lawyer', 120000, 4)
       ('Sales', 80000, 3)
       ('Marketing', 70000, 3)
       ('HR', 60000, 3)
       ('IT', 90000, 3)
       ('Customer Service', 50000, 3)
       ('Intern', 40000, 3)


-- Insert data into the 'employee' table
INSERT INTO employee (first_name, last_name, role_id)
VALUES ('Bradley', 'Sanderson', 1); -- First name, last name, and role ID
       ('John', 'Doe', 2);
       ()

