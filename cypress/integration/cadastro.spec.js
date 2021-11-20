/// <reference types="cypress" />

    describe ('Cadastro', () =>{

        beforeEach(() => {
            cy.visit('register')
        });

        it('Cadastro de usuário com credenciais válidas', () => {
            
            cy.intercept({
                method: 'POST',
                pathname: '/api/users'
            },{
                statusCode: 200,
                fixture: 'cadastro-sucesso'
            }).as('postUsers')
            
            cy.get('[ng-model$=username]').type('marcos.junior6')
            cy.get('[ng-model$=email]').type('marcos.junior6@mail.com')
            cy.get('[ng-model$=password]').type('123456')
            cy.contains('button', 'Sign up').click()
    
            cy.wait('@postUsers')
    
        });

        it('Cadastro de usuário com email já cadastrado', () => {
            
            cy.intercept({
                method: 'POST',
                pathname: '/api/users'
            },{
                statusCode: 422,
                fixture: 'cadastro-email-usado'
            }).as('postUsers')
            
            cy.get('[ng-model$=username]').type('marcos.junior5')
            cy.get('[ng-model$=email]').type('marcos.junior5@mail.com')
            cy.get('[ng-model$=password]').type('123456')
            cy.contains('button', 'Sign up').click()

            cy.get('.error-messages').should('contain', 'email has already been taken')
    
        });

        it('Cadastro de usuário com username já cadastrado', () => {
            
            cy.intercept({
                method: 'POST',
                pathname: '/api/users'
            },{
                statusCode: 422,
                fixture: 'cadastro-username-usado'
            }).as('postUsers')
            
            cy.get('[ng-model$=username]').type('marcos.junior5')
            cy.get('[ng-model$=email]').type('marcos.junior5@mail.com')
            cy.get('[ng-model$=password]').type('123456')
            cy.contains('button', 'Sign up').click()

            cy.get('.error-messages').should('contain', 'username has already been taken')
    
        });
    
});