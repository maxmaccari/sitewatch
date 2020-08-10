describe('Ping History', () => {
  it('Ping website with correct url creates a ping history', () => {
    cy.server()
    cy.mockPingResponse('http://www.example.com')

    cy.visit('/')
    cy.get('[data-test-id="site-input"]').type('www.example.com')
    cy.get('[data-test-id="ping-button"]').click()

    cy.waitPing()

    cy.contains('.history-section', 'http://www.example.com')

    cy.mockPingResponse('http://www.example-1.com')

    cy.get('[data-test-id="site-input"]').clear()
    cy.get('[data-test-id="site-input"]').type('www.example-1.com')
    cy.get('[data-test-id="ping-button"]').click()

    cy.waitPing()

    cy.contains('.history-section', 'http://www.example-1.com')
    cy.get('[data-test-id="ping-button"]').click()

    cy.waitPing()

    cy.mockPingResponse('http://www.example-1.com/path')

    cy.get('[data-test-id="site-input"]').type('/path')
    cy.get('[data-test-id="ping-button"]').click()

    cy.waitPing()

    cy.contains('.history-section', 'http://www.example.com')
    cy.contains('.history-section', 'http://www.example-1.com')
    cy.contains('.history-section', 'http://www.example-1.com/path')
  })

  it('The history should persist to page refresh', () => {
    cy.server()
    cy.mockPingResponse('http://www.example.com')

    cy.visit('/')
    cy.get('[data-test-id="site-input"]').type('www.example.com')
    cy.get('[data-test-id="ping-button"]').click()

    cy.waitPing()

    cy.mockPingResponse('http://www.example-1.com')

    cy.get('[data-test-id="site-input"]').clear()
    cy.get('[data-test-id="site-input"]').type('www.example-1.com')
    cy.get('[data-test-id="ping-button"]').click()

    cy.waitPing()

    cy.reload()

    cy.contains('.history-section', 'http://www.example-1.com')
    cy.contains('.history-section', 'http://www.example.com')
  })

  it('Clicking clear resets the history', () => {
    cy.server()
    cy.mockPingResponse('http://www.example.com')

    cy.visit('/')
    cy.get('[data-test-id="site-input"]').type('www.example.com')
    cy.get('[data-test-id="ping-button"]').click()

    cy.waitPing()

    cy.mockPingResponse('http://www.example-1.com')

    cy.get('[data-test-id="site-input"]').clear()
    cy.get('[data-test-id="site-input"]').type('www.example-1.com')
    cy.get('[data-test-id="ping-button"]').click()

    cy.waitPing()

    cy.get('[data-test-id="clear-button"]').click()

    cy.contains('.history-section', 'http://www.example-1.com').should(
      'not.exist'
    )
    cy.contains('.history-section', 'http://www.example.com').should(
      'not.exist'
    )

    cy.reload()

    cy.contains('.history-section', 'http://www.example-1.com').should(
      'not.exist'
    )
    cy.contains('.history-section', 'http://www.example.com').should(
      'not.exist'
    )
  })

  it('Searching the history filter the history by its url', () => {
    cy.server()
    cy.mockPingResponse('http://www.example.com')

    cy.visit('/')
    cy.get('[data-test-id="site-input"]').type('www.example.com')
    cy.get('[data-test-id="ping-button"]').click()

    cy.waitPing()

    cy.mockPingResponse('http://www.example-1.com')

    cy.get('[data-test-id="site-input"]').clear()
    cy.get('[data-test-id="site-input"]').type('www.example-1.com')
    cy.get('[data-test-id="ping-button"]').click()

    cy.waitPing()

    cy.get('[data-test-id="search-input"]').type('http: example-1')

    cy.contains('.history-section', 'http://www.example.com').should(
      'not.exist'
    )

    cy.contains('.history-section', 'http://www.example-1.com')

    cy.get('[data-test-id="search-input"]').type('asdfgh')

    cy.contains('.history-section', 'http://www.example-1.com').should(
      'not.exist'
    )

    cy.contains('.history-section', 'No data found here.')
  })
})
