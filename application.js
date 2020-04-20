// =====================
// Routes
//======================

var inquirer = require("inquirer");
var connection = require("./connection/connection");


connection.connect(function(err) {
  if (err){
      console.log(err);
  };
  runSearch();
});

// =====================
// INITIATION AND ROOT QUESTIONS
//======================

function runSearch() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "Add Employee",
          "Add Department",
          "Add Role",
          "View Employees",
          "View Employees & Department",
          "View by Department",
          "exit"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "Add Employee":
            employeeAdd();
          break;
  
        case "Add Department":
          departmentAdd();
          break;
  
        case "Add Role":
          roleAdd();
          break;
  
        case "View Employees":
            employeeSearch();
          break;

        case "View Employees & Department":
          departmentView();
          break;

        case "View by Department":
          departmentOnly();
          break;
  
        case "exit":
          connection.end();
          break;
        }
      });
  };
//======================
// VIEW ALL EMPLOYEES
//======================
function employeeSearch(){
    connection.query("SELECT employees.first_name, employees.last_name, roles.role_title, roles.role_salary, department.department_name FROM employees LEFT JOIN roles ON roles.id = employees.role_id LEFT JOIN department ON roles.role_title = department.department_name",
    (err, response) => {
        if (err) throw err;
        console.table(response);
        runSearch();
    })
}
//======================
// VIEW EMPLOYEES W/ DEPARTMENT
//======================
function departmentView(){

    connection.query("SELECT employees.first_name, employees.last_name, roles.role_title, roles.role_salary, department.id FROM employees LEFT JOIN roles ON roles.id = employees.role_id LEFT JOIN department ON roles.department_id = department.id ORDER BY department.id", (err, res) => {
        if (err) throw err;
        console.table(res);
        runSearch();
    })
}
//======================
// VIEW DEPARTMENTS
//======================
function departmentOnly(){
    connection.query("SELECT department.department_name FROM department", (err, res) => {
        if (err) throw err;
        console.table(res);
        runSearch();
    })
}

// =====================
// ADD DEPARTMENT
//======================
function departmentAdd(){
    inquirer
      .prompt([
      {
        name: "department_name",
        type: "input",
        message: "what's the department name?",
        },
    ]).then(({department_name})=>{
        connection.query("INSERT INTO department(department_name) VALUES (?)", 
        [department_name], 
        function(err, result) {
            if(err)throw err;
            console.log(result.affectedRows);
        })
        runSearch();
    })
        
}
// =====================
// ADD ROLE
//======================
function roleAdd(){
    inquirer
      .prompt([
        {
        name: "role_title",
        type: "input",
        message: "what's the title?",
        validate: function(answer){
            if(answer.length < 2){
                return "enter a title that's more than (1) character"
            } return true
        }
      },
      {
        name: "role_salary",
        type: "input",
        message: "what's the salary of the role?",
        validate: function(answer){
            if(isNaN(answer)){
            return "enter only numbers"
            } return true
            } 
        },
        {
            name: "department_id",
            type: "input",
            message: "what's the Department ID?",
            validate: function(answer){
                if(isNaN(answer)){
                    return "enter only numbers"
                } return true
                } 
        }
    ]).then(({role_title, role_salary, department_id})=>{
        connection.query("INSERT INTO roles(role_title, role_salary, department_id) VALUES (?, ?, ?)", 
        [role_title, role_salary, department_id], 
        function(err, result) {
            if(err)throw err;
            console.log(result.affectedRows);
            runSearch();
        })
    })
        
}

// =====================
// ADD EMPLOYEE
//======================//


function employeeAdd(){
    inquirer
    .prompt([
    {
        name: "firstName",
        type: "input",
        message: "What's the employee's first name?",
        validate: function(answer){
            if(answer.length < 2){
                return "the employee's first name is not just one letter!"
            } return true
            }
    },
    {
        name: "lastName",
        type: "input",
        message: "what's the employee's last name?",
        validate: function(answer){
            if(answer.length < 2){
                return "the employee's last name is not just one letter!"
                } return true
                }
    }
  ]).then(({firstName, lastName})=> {
         connection.query("SELECT * FROM roles", (err, res)=>{
             if(err) throw err;
             allRoles = res.map(val => val.role_title);
             inquirer.prompt([{
                     name: "roleAs",
                     type: "list",
                     message: "What's the employees role?",
                     choices: allRoles
                 }
            ])
        .then(({roleAs}) =>{
             let deptID;
             for (let i = 0; i < allRoles.length; i++) {
                 if (allRoles[i] == roleAs) {
                     deptID = i + 1;
                     break;
                 }
             }
     connection.query("INSERT INTO employees(first_name, last_name, role_id) VALUES (?, ?, ?)", 
     [firstName, lastName, deptID], 
     function(err, result) {
         if(err)throw err;
         console.log(result.affectedRows);
         
         })
         runSearch();
     })
     
    })
})
 }