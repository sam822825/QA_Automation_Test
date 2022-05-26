/// <reference types="cypress" />

import { MenuOption } from "../pages/menu_options"

const menu = new MenuOption()

Cypress._.times(3, () => {
    describe('UI Test', () => {
        beforeEach(() => {
            cy.visit('https://www.demo.bnz.co.nz/client/', { headers: { "Accept-Encoding": "gzip, deflate" } })
            //menu.navigate('/', 'headers');
        })

        it('TC1: Page navigation', () => {
            cy.log('Clicking Menu')
            menu.MenuClick();

            cy.log('Clicking Payees')
            menu.Payees();

            cy.log('Verifying page is loaded')
            cy.get('.CustomPage-heading > :nth-child(2)')
                .should('have.text', 'Payees')

        })

        it('TC2: Add new payee', () => {
            cy.log('Navigating to Payees page')
            menu.MenuClick();
            menu.Payees();

            cy.log('Clicking Add')
            cy.get(':nth-child(3) > .Button')
                .click()

            cy.log('Enter Payee name')
            cy.get('#ComboboxInput-apm-name')
                .type('Tester1{enter}')

            cy.log('Enter Payee Account number')
            cy.get('#apm-bank')
                .type('0100010000001050')

            cy.log('click Add')
            cy.get('.js-submit')
                .click()

            cy.log('Payee Added validation')
            cy.get('.message')
                .should('contain', "Payee added")
            cy.contains('Tester1')
                .should('be.visible')

        })

        it('TC3: Validating payee name is required field', () => {
            cy.log('Navigating to Payees page')
            menu.MenuClick();
            menu.Payees();

            cy.log('Clicking Add')
            cy.get(':nth-child(3) > .Button')
                .click()

            cy.log('Clicking Add without having a Payee name')
            cy.get('.js-submit')
                .click()

            cy.log('Validate error when no Payee name is given')
            cy.get('.error-header')
                .should('contain', 'A problem was found. Please correct the field highlighted below.')

            cy.log('Enter Payee name')
            cy.get('#ComboboxInput-apm-name')
                .type('Tester1{enter}')

            cy.log('Validate no errors when Payee name is given')
            cy.get('.error-header')
                .should('not.exist')

        })

        it('TC4: Able to sort Payees by name', () => {
            cy.log('Navigating to Payees page')
            menu.MenuClick();
            menu.Payees();

            cy.log('Clicking Add')
            cy.get(':nth-child(3) > .Button')
                .click()

            cy.log('Enter Payee name')
            cy.get('#ComboboxInput-apm-name')
                .type('Tester1{enter}')

            cy.log('Enter Payee Account number')
            cy.get('#apm-bank')
                .type('0100010000001050')

            cy.log('click Add')
            cy.get('.js-submit')
                .click()


            cy.log('By default name should be in ascending order')
            cy.get('.CustomSection > :nth-child(1)')
                .then($elements => {
                    const strings = [...$elements].map(el => el.innerText)
                    expect(strings).to.deep.equal([...strings].sort())
                })
            //cy.wait(5000)

            cy.log('Decending order name list')
            cy.get('.js-payee-name-column > .Icon')
                .click()
            cy.get('.CustomSection > :nth-child(1)')
                .then($elements => {
                    const strings = [...$elements].map(el => el.innerText)
                    expect(strings).to.deep.equal([...strings].sort())
                })


        })

        it('TC5: Payment page', () => {
            cy.log('Navigating to Payment page')
            menu.MenuClick();
            menu.PayOrTransfer();

            cy.log('Select Everyday account')
            cy.get('[data-testid="from-account-chooser"]')
                .click()
            cy.get(':nth-child(2) > .button-1-1-60')
                .click()

            cy.log('Select bills account')
            cy.get('[data-testid="to-account-chooser"]')
                .click()
            cy.get('[data-testid="to-account-accounts-tab"]')
                .click()
            cy.get('.list-1-1-76 > :nth-child(1) > button')
                .click()

            cy.log('Transfer $500.00')
            cy.get('#field-bnz-web-ui-toolkit-9')
                .type('500.00{enter}')

            cy.log('Payement confirmation')
            cy.get('.message')
                .should('contain', "Transfer successful")

            cy.log('Account validation after transfer')
            cy.get('#account-ACC-1 > .account-info > .account-balance')
                .should('contain', '2,000.00')
            cy.get('#account-ACC-5 > .account-info > .account-balance')
                .should('contain', '920.00')

        })
    })
})

