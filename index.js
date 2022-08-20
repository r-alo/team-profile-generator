const inquirer = require('inquirer');
const generateHtml = require('./utils/generateHtml');

inquirer
  .prompt([
    {
        type: 'number',
        name: 'teamNumbers', 
        message: '1. Input the number of team members(required):'
    },
  ])
  .then(async (answers) => {
    const answersCollection = [];
    for (let index = 0; index < answers.teamNumbers; index++) {
        const number = index + 1;
        answersCollection[index] = await inquirer
        .prompt([
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
    console.log(content);
  })
  .catch((error) => {
    console.log(error)
  });