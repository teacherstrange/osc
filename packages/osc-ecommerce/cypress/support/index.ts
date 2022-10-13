import '@testing-library/cypress/add-commands';
import './commands';

Cypress.on('uncaught:exception', (err, runnable, promise) => {
    // returning false here prevents Cypress from
    // failing the test

    if (err.message.includes('Registration failed - push service not available')) {
        return false;
    }
});
