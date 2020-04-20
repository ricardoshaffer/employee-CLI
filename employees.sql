/*

To run this file, we do the following in our Terminal:

1. Go to the directory of this sql file.

2. Get into our mysql console.

3. Run "source schema.sql"

*/

-- Drops the wishes_db if it already exists --
DROP DATABASE IF EXISTS employee_management;

-- Create the database wishes_db and specified it for use.
DROP DATABASE IF EXISTS employee_management;
CREATE DATABASE employee_management;

USE employee_management;

-- Create the table wishes.
CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  first_name varchar(30) NOT NULL,
  last_name varchar(30) NOT NULL,
  role_id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  role_title varchar(30) NOT NULL,
  role_salary DECIMAL(8,2) NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id)
);
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  department_name varchar(30) NOT NULL,
  PRIMARY KEY (id)
);

-- -- Insert a set of records.
-- INSERT INTO employees (first_name, last_name, employee_ID, title, department, salary)
-- VALUES ("Jimmy", "Johns", 12, "Sandwich Maker", 'Salesperson', 12000.00);

-- -- SELECT name, size FROM shirts WHERE size = 'medium';

