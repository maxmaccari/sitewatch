describe('Ping website', () => {
  it('Ping website with correct url if latency is good', () => {
    cy.server()
    cy.mockPingResponse('http://www.example.com')

    cy.visit('/')
    cy.get('[data-test-id="site-input"]').type('www.example.com')
    cy.get('[data-test-id="ping-button"]').click()

    cy.waitPing()

    cy.contains('www.example.com')
    cy.contains('The latency of www.example.com is good.')

    cy.contains('[data-test-id="ping-button"]', 'Retry')

    cy.get('[data-test-id="site-input"]').type('/www')
    cy.contains('[data-test-id="ping-button"]', 'Ping')
  })

  it('Ping website with correct url if latency is average', () => {
    cy.server()
    cy.mockPingResponse('http://www.example.com', 500)

    cy.visit('/')
    cy.get('[data-test-id="site-input"]').type('www.example.com')
    cy.get('[data-test-id="ping-button"]').click()

    cy.waitPing()

    cy.contains('www.example.com')
    cy.contains('The latency of www.example.com is average.')
  })

  it('Ping website with correct url if latency is bad', () => {
    cy.server()
    cy.mockPingResponse('http://www.example.com', 1200)

    cy.visit('/')
    cy.get('[data-test-id="site-input"]').type('www.example.com')
    cy.get('[data-test-id="ping-button"]').click()

    cy.waitPing()

    cy.contains('www.example.com')
    cy.contains('The latency of www.example.com is bad.')
  })

  it('Ping inexistent website return network error', () => {
    cy.server()
    cy.mockPingError('http://abcd.efgh.htmals')

    cy.visit('/')
    cy.get('[data-test-id="site-input"]').type('abcd.efgh.htmals')
    cy.get('[data-test-id="ping-button"]').click()

    cy.waitPing()

    cy.contains('Error')
  })

  it('Allow to retry on errors', () => {
    cy.server()
    cy.mockPingError('http://www.example.com')

    cy.visit('/')
    cy.get('[data-test-id="site-input"]').type('www.example.com')
    cy.get('[data-test-id="ping-button"]').click()

    cy.waitPing()
    cy.contains('Error')

    cy.mockPingResponse('http://www.example.com', 100)

    cy.get('[data-test-id="try-again"]').click()
    cy.waitPing()

    cy.get('[data-test-id="site-input"]').should(
      'have.value',
      'http://www.example.com'
    )
    cy.contains('www.example.com')
    cy.contains('The latency of www.example.com is good.')
  })

  it('Ping website with invalid url', () => {
    cy.visit('/')
    cy.get('[data-test-id="site-input"]').type('invalid url')
    cy.get('[data-test-id="ping-button"]').should('be.disabled')
  })
})
