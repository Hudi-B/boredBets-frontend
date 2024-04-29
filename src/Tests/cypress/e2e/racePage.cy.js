describe('template spec', () => {
  it('passes ', () => {
    cy.visit('https://bored-bets.vercel.app/')
    cy.contains("Races").click()
    cy.url().should("include", "/races")

    cy.contains('Upcoming').click();
    cy.contains('Passed').click();

    
  });
})