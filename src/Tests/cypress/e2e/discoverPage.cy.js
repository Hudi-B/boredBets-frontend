describe('discoverPage', () => {
  it('passes', () => {

    cy.visit('https://bored-bets.vercel.app/')
    cy.contains("Discover").click()
    cy.url().should("include", "/discover")


    cy.contains('Users').click()
    cy.contains('Public').click()
    cy.contains('Apply Filters').click()

   })
})