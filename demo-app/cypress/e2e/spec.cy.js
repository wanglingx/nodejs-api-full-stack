describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/')
    //textbox 1
    cy.findByRole('textbox', { name: /a/i}).type('5')
    //textbox2
    cy.findByRole('textbox', { name: /b/i}).type('3')
    //operation
    cy.get('select').select('+');
    //click then checkbox
    cy.findByRole('button', {name: /submit/i}).click()
  })
})