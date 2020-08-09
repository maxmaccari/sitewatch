describe('Ping website', () => {
  it('Ping website with correct url if latency is good', () => {
    cy.server()
    cy.route({
      method: 'GET',
      url: '*',
      response: [],
    }).as('pingSite')

    cy.visit('/')
    cy.get('[data-test-id="site-input"]').type('www.example.com')
    cy.get('[data-test-id="ping-button"]').click()

    cy.wait('@pingSite')

    cy.contains('www.example.com')
    cy.contains('The latency of www.example.com is good.')

    cy.contains('[data-test-id="ping-button"]', 'Retry')

    cy.get('[data-test-id="site-input"]').type('/www')
    cy.contains('[data-test-id="ping-button"]', 'Ping')
  })

  it('Ping website with correct url if latency is average', () => {
    cy.server()
    cy.route({
      method: 'GET',
      url: '*',
      response: [],
      delay: 500,
    }).as('pingSite')

    cy.visit('/')
    cy.get('[data-test-id="site-input"]').type('www.example.com')
    cy.get('[data-test-id="ping-button"]').click()

    cy.wait('@pingSite')

    cy.contains('www.example.com')
    cy.contains('The latency of www.example.com is average.')
  })

  it('Ping website with correct url if latency is bad', () => {
    cy.server()
    cy.route({
      method: 'GET',
      url: '*',
      response: [],
      delay: 1200,
    }).as('pingSite')

    cy.visit('/')
    cy.get('[data-test-id="site-input"]').type('www.example.com')
    cy.get('[data-test-id="ping-button"]').click()

    cy.wait('@pingSite')

    cy.contains('www.example.com')
    cy.contains('The latency of www.example.com is bad.')
  })

  it('Ping website with invalid url', () => {
    cy.visit('/')
    cy.get('[data-test-id="site-input"]').type('invalid url')
    cy.get('[data-test-id="ping-button"]').should('be.disabled')
  })
})
