describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'admin',
            username: 'admin',
            password: 'admin'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user) 
        cy.visit('http://localhost:3000')
    })
  
    it('5.17 Login form is shown', function() {
        cy.contains('login').click()
        cy.contains('username')
        cy.contains('password')
        cy.contains('login')
    })

    describe('5.18 Login',function() {
        it('succeeds with correct credentials', function() {
            cy.contains('login').click()
            cy.get('#username').type('admin')
            cy.get('#password').type('admin')
            cy.get('#login-button').click()
            cy.contains('admin logged in')
        })
    
        it('fails with wrong credentials', function() {
            cy.contains('login').click()
            cy.get('#username').type('wrongusername')
            cy.get('#password').type('wrongpassword')
            cy.get('#login-button').click()
            cy.contains('wrong username or password')
        })
    })

    describe.only('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'admin', password: 'admin' })
            cy.createBlog({ title: 'Hello world!', author: 'Linus', url: 'google.com' })
        })
    
        it('5.19 A blog can be created', function() {
            cy.contains('new blog').click()
            cy.get('#title').type('Test blog')
            cy.get('#author').type('Test author')
            cy.get('#url').type('Test url')
            cy.get('#submit-button').click()
            cy.contains('Test blog')
            cy.contains('Test author')
        })

        it('5.20 A blog can be liked', function() {
            cy.contains('Hello world!').as('theBlog')
            cy.get('@theBlog').contains('view').click()
            cy.get('@theBlog').parent().get('#like-button').click()
            cy.get('@theBlog').contains('likes 1')
        })

        it('5.21 A blog can be deleted', function() {
            cy.contains('new blog').click()
            cy.get('#title').type('Test blog')
            cy.get('#author').type('Test author')
            cy.get('#url').type('Test url')
            cy.get('#submit-button').click()
            cy.reload()

            cy.contains('Test blog Test author').as('theBlog')
            cy.get('@theBlog').contains('view').click()
            cy.get('@theBlog').parent().get('#remove-button').click()
            cy.should('not.contain', 'Test blog Test author')
        })

        it('5.22 Blogs are ordered according to likes', function() {
            cy.createBlog({ title:'First Blog ', author:'Author', url:'URL', likes: 1 })
            cy.createBlog({ title:'Second Blog', author:'Author', url:'URL', likes: 2 })
            cy.createBlog({ title:'Third Blog', author:'Author', url:'URL', likes: 5 })
            cy.get('div#hiddenBlog').first().contains('Third Blog')
        })
    })
})