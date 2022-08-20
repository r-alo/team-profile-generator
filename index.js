const inquirer = require('inquirer');
const fs = require('fs');
const generateHtml = require('./utils/generateHtml');

const memberList = [];

async function addTeamMember(role) {
    let lastQuestion = {
        type: 'input',
    }
    if (role === "engineer") {
        lastQuestion.name = 'github' 
        lastQuestion.message = `Input the github (required):`
    }
    if (role === 'intern') {
        lastQuestion.name = 'school' 
        lastQuestion.message = `Input the school (required):`
    }
    const memberData = await inquirer.prompt([
        {
            type: 'input',
            name: `name`, 
            message: `Input the name(required)`
        },
        {
            type: 'input',
            name: 'id', 
            message: 'Enter the ID (required):'
        },
        {
            type: 'input',
            name: `email`, 
            message: `Input the email(required):`
        },
        lastQuestion
    ]);
    memberData.role = role;
    memberList.push(memberData);
    menu();
}

function menu() {
    const questions = [
        {
            type: 'rawlist',
            name: 'menuOption',
            message: 'What do you want to do?',
            choices: [
                'add engineer',
                'add intern',
                'finish building my team',
            ],
        },
    ];

  inquirer.prompt(questions).then((answers) => {
    if (answers.menuOption === "add engineer") {
        addTeamMember("engineer");
    }
    if (answers.menuOption === "add intern") {
        addTeamMember("intern");
    }
    if (answers.menuOption === "finish building my team") {
        const content = generateHtml(memberList);
        fs.writeFile('./index.html', content, err => {
            if (err) {
                console.error(err);
            }
        });
    }
  });
}

inquirer
  .prompt([
    {
        type: 'input',
        name: 'managerName', 
        message: 'Enter the team manager’s name (required):'
    },
    {
        type: 'input',
        name: 'managerId', 
        message: 'Enter the team manager’s ID (required):'
    },
    {
        type: 'input',
        name: 'managerEmail', 
        message: 'Enter the team manager’s email (required):'
    },
    {
        type: 'number',
        name: 'officeNumber', 
        message: 'Enter the team manager’s office number (required):'
    },
  ])
  .then(async (answers) => {
    console.log(answers);
    return menu();
    
    const answersCollection = [];
    for (let index = 0; index < answers.teamNumbers; index++) {
        const number = index + 1;
        inquirer.prompt([
            {
                type: 'input',
                name: `nameFrom_${number}`, 
                message: `Input the name from ${number} member(required)`
            },
            {
                type: 'input',
                name: `roleFrom_${number}`, 
                message: `Input the role from ${number} member(required):`
            },
            {
                type: 'input',
                name: `emailFrom_${number}`, 
                message: `Input the email from ${number} member(required):`
            },
            {
                type: 'input',
                name: `githubFrom_${number}`, 
                message: `Input the github from ${number} member(required):`
            },
        ]);
    }

    const content = generateHtml(answersCollection);
    fs.writeFile('./index.html', content, err => {
        if (err) {
            console.error(err);
        }
    });
  })
  .catch((error) => {
    console.log(error)
  });