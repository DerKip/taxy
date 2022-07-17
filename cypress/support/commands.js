import Tesseract from 'tesseract.js';

Cypress.Commands.add('getTextFromImage', (imageUrl) => {
  const getImgText = new Promise((resolve) => {
    resolve(
      Tesseract.recognize(imageUrl, 'eng', {
        logger: (m) => console.log(m),
      }).then(({ data: { text } }) => {
        return text;
      })
    );
  });
  cy.wrap(getImgText).as('imgText');
});

Cypress.Commands.add('solveSecurityStamp', (str) => {
  let problem = str.slice(0, -2);
  problem = problem.replace(/\s+/g, '');
  console.log(problem);
  if (problem.includes('-')) {
    return (
      Number(problem.slice(0, problem.indexOf('-'))) -
      Number(problem.slice(problem.indexOf('-') + 1))
    );
  }
  if (problem.includes('+')) {
    return (
      Number(problem.slice(0, problem.indexOf('+'))) +
      Number(problem.slice(problem.indexOf('+') + 1))
    );
  }
});
