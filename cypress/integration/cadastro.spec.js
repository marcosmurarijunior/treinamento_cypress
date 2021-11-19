/// <reference types="cypress" />

    describe ('Cadastro', () =>{
        it.only('Cadastro de usuário com credenciais válidas', () => {
            
            cy.intercept({
                method: 'POST',
                pathname: '/api/users'
            },{
                statusCode: 200,
                fixture: 'cadastro-sucesso'
            }).as('postUsers')
            
            cy.visit('https://demo.realworld.io/#/login')
            
            cy.get('[ng-model$=username]').type('marcos.junior5')
            cy.get('[ng-model$=email]').type('marcos.junior5@br.experian.com')
            cy.get('[ng-model$=password]').type('M@rc0s123')
            cy.contains('button', 'Sign up').click()
    
            cy.get('[href*=editor]').should('be.visible')
    
            cy.wait('@postUsers')
    
        });
    
});