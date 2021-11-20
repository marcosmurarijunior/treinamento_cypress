/// <reference types="cypress" />

describe('Login', () => {
    
    beforeEach(() => {
        cy.visit('login')
    });
    
    it('Autenticar com credenciais válidas', () => {

        cy.get('input[type=email]').type(Cypress.env('user'))
        cy.get('input[type=password]').type(Cypress.env('pass'))
        cy.contains('button', 'Sign in').click()

        cy.get('[href*=editor]').should('be.visible')

    });

    it('Autenticar com senha inválida', () => {

        cy.get('input[type=email]').type('marcos.junior5@mail.com')
        cy.get('input[type=password]').type('12349')
        cy.contains('button', 'Sign in').click()

        cy.get('li[ng-repeat$=errors]').should('be.visible')
        .and('contain.text', 'email or password is invalid')

    });

    it('Autenticar com email inválido', () => {

        cy.get('input[type=email]').type('marcos.junior@com.br')
        cy.get('input[type=password]').type('123456')
        cy.contains('button', 'Sign in').click()

        cy.get('li[ng-repeat$=errors]').should('be.visible')
        .and('contain.text', 'email or password is invalid')

    });

});

// ES6 Mocha Snippets

