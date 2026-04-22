describe('Authentication Flows', () => {
  beforeEach(() => {
    // Clear cookies before each test
    cy.clearCookies()
  })

  it('should allow a new user to sign up', () => {
    cy.visit('/signup')
    const username = `testuser_${Date.now()}`
    
    cy.get('input[name="username"]').type(username)
    cy.get('input[name="password"]').type('password123')
    cy.get('button[type="submit"]').click()
    
    // Should redirect to dashboard
    cy.url().should('include', '/dashboard')
    cy.contains(`Welcome, ${username}`)
  })

  it('should allow an admin to log in', () => {
    cy.visit('/admin-login')
    
    cy.get('input[name="username"]').type('admin')
    cy.get('input[name="password"]').type('admin')
    cy.get('button[type="submit"]').click()
    
    // Should redirect to admin dashboard
    cy.url().should('include', '/admin/dashboard')
    cy.contains('Manage Employees')
  })
})
