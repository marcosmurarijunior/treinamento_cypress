/// <reference types="cypress" />

describe('Login', () => {
    it('Autenticar com credenciais válidas', () => {
        cy.visit('https://demo.realworld.io/#/login')

        cy.get('input[type=email]').type(Cypress.env('user'))
        cy.get('input[type=password]').type(Cypress.env('pass'))
        cy.contains('button', 'Sign in').click()

        cy.get('[href*=editor]').should('be.visible')

    });

    it('Autenticar com senha inválida', () => {
        cy.visit('https://demo.realworld.io/#/login')

        cy.get('input[type=email]').type('marcos.junior4@br.experian.com')
        cy.get('input[type=password]').type('1234')
        cy.contains('button', 'Sign in').click()

        cy.get('li[ng-repeat$=errors]').should('be.visible')
        .and('contain.text', 'email or password is invalid')

    });

    it('Autenticar com email inválido', () => {
        cy.visit('https://demo.realworld.io/#/login')

        cy.get('input[type=email]').type('marcos.junior@br.experian.com')
        cy.get('input[type=password]').type('M@rc0s123')
        cy.contains('button', 'Sign in').click()

        cy.get('li[ng-repeat$=errors]').should('be.visible')
        .and('contain.text', 'email or password is invalid')

    });

});

// ES6 Mocha Snippets

