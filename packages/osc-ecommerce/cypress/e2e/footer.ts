// import faker from '@faker-js/faker';
it('toggles the accordion', () => {
    cy.visit('/');
    cy.findByRole('button', { name: 'changed title again' })
        .click()
        .should('have.attr', 'aria-expanded', 'false');
});
