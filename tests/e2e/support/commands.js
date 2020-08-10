// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('mockPingResponse', (url, latency = 100) => {
  cy.route({
    method: 'POST',
    url: 'https://sitewatcher-maxmaccari.herokuapp.com/ping',
    response: {
      url,
      latency,
      status: 200,
      id: (Math.random() * 1000000000000).toFixed(0),
    },
  }).as('pingSite')
})

Cypress.Commands.add('mockPingError', url => {
  cy.route({
    method: 'POST',
    url: 'https://sitewatcher-maxmaccari.herokuapp.com/ping',
    status: 401,
    response: {
      url,
      code: 'ENOTFOUND',
      message: 'getaddrinfo ENOTFOUND',
    },
  }).as('pingSite')
})

Cypress.Commands.add('waitPing', () => {
  cy.wait('@pingSite')
})
