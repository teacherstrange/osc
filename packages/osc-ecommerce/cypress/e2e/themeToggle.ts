it('toggles to light theme', () => {
    cy.visit('/');
    cy.get('.chakra-switch__thumb').click();
    cy.get('body').should('have.class', 'chakra-ui-light');
});

it('toggles to light theme', () => {
    cy.visit('/');
    cy.get('.chakra-switch__thumb').click();
    cy.get('body').should('have.class', 'chakra-ui-light');
});
