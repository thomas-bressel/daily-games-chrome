describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays the main heading', () => {
    cy.contains('h1', 'Daily Games Chrome Extension').should('be.visible');
  });

  it('displays the example component', () => {
    cy.contains('Composant Example').should('be.visible');
  });

  it('has a clickable button', () => {
    cy.contains('button', 'Cliquez-moi').should('be.visible').click();
  });
});
