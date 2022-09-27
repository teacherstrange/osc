// import faker from '@faker-js/faker';
it('toggles the accordion', () => {
    cy.visitAndCheck('/');
    cy.findByRole('button', { name: 'changed title again 2' })
        .click()
        .should('have.attr', 'aria-expanded', 'true');
});
