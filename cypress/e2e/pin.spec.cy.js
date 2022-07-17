describe('', () => {
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
  const kraBaseUrl = 'https://itax.kra.go.ke';
  it('solves security stamp and checks PIN details', () => {
    cy.visit(`${kraBaseUrl}/KRA-Portal/pinChecker.htm`);
    cy.get('#vo\\.pinNo').type('A009266488M');
    cy.get('#captcha_img')
      .invoke('attr', 'src')
      .then((src) => {
        cy.getTextFromImage(`${kraBaseUrl}${src}`);
      });
    cy.get('@imgText').then((imgText) => {
      cy.solveSecurityStamp(imgText).then((solution) => {
        cy.get('#captcahText').type(solution);
        cy.get('#consult').click();
      });
    });
  });
});
