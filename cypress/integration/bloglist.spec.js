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
            const user = {
                username: 'kent',
                password: 'dev',
                name: 'Kent C. Dodds'
            };
            cy.createUser(user);
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

    describe('Blog creation', function() {
        beforeEach(function() {
            const user = {
                username: 'kent',
                password: 'dev',
                name: 'Kent C. Dodds'
            };
            cy.createUser(user);
            cy.login(user);
        });

        it('works for a logged in user', function() {
            // Before blog creation
            cy.get('#blogs > *').should('have.length', 0);

            // Blog creation
            cy.contains('Create new blog').click();
            cy.get('#title').type('How to test custom React hooks');
            cy.get('#author').type('Kent C. Dodds');
            cy.get('#url').type('https://kentcdodds.com/blog/how-to-test-custom-react-hooks');
            cy.get('#create-blog-btn').click();

            // After blog creation
            cy.get('#blogs > *').should('have.length', 1);
            cy.contains('How to test custom React hooks');
            cy.contains('Kent C. Dodds');
        });
    });

    describe('Users', function() {
        beforeEach(function() {
            const user = {
                username: 'kent',
                password: 'dev',
                name: 'Kent C. Dodds'
            };
            cy.createUser(user);
            cy.login(user);

            const blog = {
                title: 'How to test custom React hooks',
                author: 'Kent C. Dodds',
                url: 'https://kentcdodds.com/blog/how-to-test-custom-react-hooks'
            };
            cy.createBlog(blog);
        });

        it('can like a blog', function() {
            cy.get('.toggle-btn').click();
            cy.contains('Likes: 0');
            cy.get('.like-btn').click();
            cy.contains('Likes: 1');
        });

        it('can delete blogs created by them', function() {
            cy.get('#blogs > *').should('have.length', 1);
            cy.get('.toggle-btn').click();
            cy.get('.remove-btn').click();
            cy.get('#blogs > *').should('have.length', 0);
        });

        it('cannot delete blogs not created by them', function() {
            cy.get('#logout-btn').click();

            const user = {
                username: 'dan',
                password: 'redux',
                name: 'Dan Abramov'
            };
            cy.createUser(user);
            cy.login(user);

            cy.get('.toggle-btn').click();
            cy.get('.remove-btn').should('not.exist');
        });
    });

    describe('Blogs', function() {
        beforeEach(function() {
            const user = {
                username: 'kent',
                password: 'dev',
                name: 'Kent C. Dodds'
            };
            cy.createUser(user);
            cy.login(user);
        });

        it('are ordered according to number of likes starting with blogs with most likes', function() {
            const blog1 = {
                title: 'How to test custom React hooks',
                author: 'Kent C. Dodds',
                url: 'https://kentcdodds.com/blog/how-to-test-custom-react-hooks'
            };
            // Like the blog once
            cy.createBlog(blog1)
                .then(blog => cy.likeBlog(blog));

            const blog2 = {
                title: 'Should I useState or useReducer?',
                author: 'Kent C. Dodds',
                url: 'https://kentcdodds.com/blog/should-i-usestate-or-usereducer'
            };
            // Like the blog twice
            cy.createBlog(blog2)
                .then(blog => cy.likeBlog(blog))
                .then(blog => cy.likeBlog(blog));

            const blog3 = {
                title: 'How to implement useState with useReducer',
                author: 'Kent C. Dodds',
                url: 'https://kentcdodds.com/blog/how-to-implement-usestate-with-usereducer'
            };
            // Like the blog thrice
            cy.createBlog(blog3)
                .then(blog => cy.likeBlog(blog))
                .then(blog => cy.likeBlog(blog))
                .then(blog => cy.likeBlog(blog));

            cy.get('.blog').then(blogs => {
                let likes = 3;
                for (const blog of blogs) {
                    cy.wrap(blog).find('.toggle-btn').click();
                    cy.wrap(blog).contains(`Likes: ${likes}`);
                    likes--;
                }
            });
        });
    });
});