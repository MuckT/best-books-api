/// <reference types="cypress" />

describe('/', () => {
  it('returns JSON', () => {
    cy.request(`/`)
      .its('body')
      .should('include', 'Make Reading Great Again!')
  });
});