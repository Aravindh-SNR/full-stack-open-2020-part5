Cypress.Commands.add('createUser', ({ username, password, name }) => {
    cy.request({
        url: 'http://localhost:3001/api/users',
        method: 'POST',
        body: { username, password, name }
    });
});

Cypress.Commands.add('login', ({ username, password }) => {
    cy.request({
        url: 'http://localhost:3001/api/login',
        method: 'POST',
        body: { username, password }
    }).then(({ body }) => {
        localStorage.setItem('user', JSON.stringify(body));
        cy.visit('http://localhost:3000');
    });
});

Cypress.Commands.add('createBlog', blog => {
    cy.request({
        url: 'http://localhost:3001/api/blogs',
        method: 'POST',
        headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}` },
        body: blog
    }).then(({ body }) => {
        cy.visit('http://localhost:3000');
        return cy.wrap(body);
    });
});

Cypress.Commands.add('likeBlog', blog => {
    cy.request({
        url: `http://localhost:3001/api/blogs/${blog.id}`,
        method: 'PUT',
        body: { likes: blog.likes + 1 }
    }).then(({ body }) => {
        cy.visit('http://localhost:3000');
        return cy.wrap(body);
    });
});