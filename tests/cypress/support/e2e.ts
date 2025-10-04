// Support pour les tests e2e
Cypress.Commands.add('getBySel', (selector: string) => {
  return cy.get(`[data-test="${selector}"]`);
});

declare global {
  namespace Cypress {
    interface Chainable {
      getBySel(selector: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}

export {};