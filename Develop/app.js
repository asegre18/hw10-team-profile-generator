const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let teamList = [];

// create render methods for each employee type to call once info gathered by employee
function renderEmployee(teamList) {
    let data = render(teamList);
    return fs.writeFile(outputPath, data, err => {
        console.log(err);
    })
};
// rendering to page still not functioning properly!!!!

function promptQuestions() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your name?",
        name: "name"
      },
      {
        type: "number",
        message: "What is your ID number?",
        name: "id"
      },
      {
        type: "input",
        message: "What is your email address?",
        name: "email"
      },
      {
        type: "list",
        message: "What is your role at the company?",
        name: "role",
        choices: ["Engineer", "Intern", "Manager"]
      },
    ])
    .then(function ({ name, id, email, role }) {
      switch (role) {
        case "Engineer":
          inquirer
            .prompt({
              type: "input",
              message: "What is your GitHub username?",
              name: "github"
            })
            .then(function ({ github }) {
              generateEngineer(name, id, email, github);
              addTeamMember();
            });
          break;
        case "Intern":
          inquirer
            .prompt({
              type: "input",
              message: "What school are you enrolled at?",
              name: "school"
            })
            .then(function ({ school }) {
              generateIntern(name, id, email, school);
              addTeamMember();
            });
          break;
        case "Manager":
          inquirer
            .prompt({
              type: "input",
              message: "What is your Office Number?",
              name: "officeNumber"
            })
            .then(function ({ officeNumber }) {
              generateManager(name, id, email, officeNumber);
              addTeamMember();
            });
          break;
      }
    });
}

function addTeamMember() {
  inquirer.prompt({
    type: "confirm",
    message: "Do you want to add another employee to your team?",
    name: "addTeamMember"
  }).then(function ({ addTeamMember }) {
    console.log("New team member added: ", addTeamMember);
    if (addTeamMember) {
        promptQuestions();
    } else {
        renderEmployee();
    }
  }).catch(err => {
      console.log("Error adding new team member", err);
      throw err;
  })
}

function generateEngineer(name, id, email, officeNumber) {
  const engineer = new Engineer(name, id, email, officeNumber);
  teamList.push(engineer);
  return engineer;
}

function generateIntern(name, id, email, school) {
  const intern = new Intern(name, id, email, school);
  teamList.push(intern);
  return intern;
}

function generateManager(name, id, email, school) {
  const manager = new Manager(name, id, email, school);
  teamList.push(manager);
  return manager;
}

promptQuestions();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
