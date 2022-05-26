export class MenuOption {

    navigate(url) {
        cy.visit(url)
    }

    MenuClick() {
        cy.get('.js-main-menu-btn > .Icons')
            .click()
    }

    PayOrTransfer() {
        cy.get('.js-main-menu-paytransfer > .Button > .Language__container')
            .click()
    }

    Payees() {
        cy.get('.js-main-menu-payees > .Button > .Language__container')
            .click()
    }

    Documents() {
        cy.get('.js-main-menu-documents > .Button > .Language__container')
            .click()
    }

    ApplyNow() {
        cy.get('.js-main-menu-applynow > .Button > .Language__container')
            .click()
    }

    Cards() {
        cy.get('.js-main-menu-cards > .Button > .Language__container')
            .click()
    }

    Notifications() {
        cy.get('.js-main-menu-notifications > .Button')
            .click()
    }

    Insurance() {
        cy.get('.js-main-menu-insurance > .Button > .Language__container')
            .click()
    }

    InternetBankingHelp() {
        cy.get('.js-main-menu-help > .Button > .Language__container')
            .click()
    }

    Contact() {
        ccy.get('.MainMenu-navSecondaryList-secureMessages > .Button > .Language__container')
            .click()
    }

    Settings() {
        cy.get('.MainMenu-navSecondary > .List > :nth-child(2) > .Button > .Language__container')
            .click()
    }

}