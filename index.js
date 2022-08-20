const inquirer = require('inquirer');

inquirer
  .prompt([
    {
        type: 'number',
        name: 'teamNumbers', 
        message: '1. Input the number of team members(required):'
    },
  ])
  .then(async (answers) => {
    console.log(answers);
  })
  .catch((error) => {
    console.log(error)
  });