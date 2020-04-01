describe('Bloglist app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset');
        cy.visit('http://localhost:3000');
    });

    it('displays login form by default', function() {
        cy.contains('Log in to the application');
        cy.get('#login-form');
        cy.get('#username');
        cy.get('#password');
        cy.get('#login-btn');
    });

    describe('Login', function() {
        beforeEach(function() {
            cy.request({
                url: 'http://localhost:3001/api/users',
                method: 'POST',
                body: {
                    username: 'kent',
                    password: 'dev',
                    name: 'Kent C. Dodds'
                }
            });

            cy.visit('http://localhost:3000');
        });

        it('works for correct credentials', function() {
            cy.get('#username').type('kent');
            cy.get('#password').type('dev');
            cy.get('#login-btn').click();
            cy.contains('Kent C. Dodds logged in');
        });

        it('fails for incorrect credentials', function() {
            cy.get('#username').type('kent');
            cy.get('#password').type('password');
            cy.get('#login-btn').click();
            cy.get('.error')
                .should('contain', 'Invalid username or password')
                .should('have.css', 'color', 'rgb(255, 0, 0)');
        });
    });
});