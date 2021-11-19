/// <reference types="cypress" />

var Chance = require('chance');
var chance = new Chance;

describe ('Articles', () =>{

    beforeEach(() => {
        
        //cy.visit('login')

        cy.login()

        cy.visit('/')
        
    });

    it('Criar um novo artigo', () => {

        cy.intercept({
            url: 'https://api.realworld.io/api/articles',
            method: 'POST'
        }).as('postArticles')

        cy.get('[href*=editor]').click()
        
        const articleTitle = 'Article Example ' + new Date().getTime()

        cy.get('input[ng-model$=title]').type(articleTitle)
        cy.get('input[ng-model$=description]').type(chance.sentence({words: 7}))
        cy.get('textarea[ng-model$=body]').type(chance.paragraph())
        cy.get('input[ng-model$=tagField]').type('cypress')

        cy.contains('button', 'Publish Article').click()

        cy.wait('@postArticles').then(interception =>{
            //cy.log(interception.response.statusCode)

            const slug = interception.response.body.article.slug

            cy.url().should('contain', slug)

        })

        cy.get('h1').should('contain', articleTitle)

    });

    it('Teste', () => {

    });

})