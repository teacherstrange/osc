// import faker from '@faker-js/faker';
it('toggles the accordion', () => {
    cy.visit('/');
    cy.findByRole('button', { name: 'changed title again 2' })
        .click()
        .should('have.attr', 'aria-expanded', 'false');
});
