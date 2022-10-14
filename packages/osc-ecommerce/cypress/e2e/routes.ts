// We had an isse where certain pages were hanging when querying the SanityClient
// Since changing out the SanityClient package with PicoSanity We want to check that this is or isn't happening.
// As we're testing that the query in the backend isn't hanging we only need to assert that the page loads
// so we'll check that there's a h1 element.
it('successfully navigates to the homepage', () => {
    cy.visit('/');

    cy.get('h1').should('exist');
});

it('successfully navigates to a page', () => {
    cy.visit('/kitchen-sink');
    cy.get('h1').should('exist');
});

describe('successfully navigates to some product pages', () => {
    it('successfully navigates to the a level maths page', () => {
        cy.visit('/products/a-level-maths');
        cy.get('h1').should('exist');
    });

    it('successfully navigates to the #10 voucher page', () => {
        cy.visit('/products/10-pound-gift-voucher');
        cy.get('h1').should('exist');
    });

    it('successfully navigates aat level 2 and 3 accounting page', () => {
        cy.visit('/products/aat-level-2-and-3-accounting');
        cy.get('h1').should('exist');
    });

    it('successfully navigates sage 50c computerised accounts level 1', () => {
        cy.visit('/products/sage-50c-computerised-accounts-level-1');
        cy.get('h1').should('exist');
    });
});

describe('successfully navigates to some collection pages', () => {
    it('successfully navigates to the accounting collections page', () => {
        cy.visit('/collections/accounting');
        cy.get('h1').should('exist');
    });

    it('successfully navigates to the animal care collections page', () => {
        cy.visit('/collections/animal-care');
        cy.get('h1').should('exist');
    });

    it('successfully navigates to the science collections page', () => {
        cy.visit('/collections/science');
        cy.get('h1').should('exist');
    });
});
