describe('Employee Management', () => {
  beforeEach(() => {
    cy.clearCookies()
    // Login as admin first
    cy.visit('/admin-login')
    cy.get('input[name="username"]').type('admin')
    cy.get('input[name="password"]').type('admin')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/admin/dashboard')
  })

  it('should allow admin to add an employee', () => {
    cy.contains('Add Employee').click()
    
    // Add employee modal should be visible
    cy.get('#addModal').should('not.have.class', 'hidden')
    
    cy.get('#addName').type('Jane Cypress')
    cy.get('#addEmail').type('jane.cypress@example.com')
    cy.get('#addDept').type('Quality Assurance')
    cy.get('#addContact').type('555-0100')
    
    cy.contains('button', 'Save').click()
    
    // Modal should close and employee should be in the table
    cy.contains('Jane Cypress')
    cy.contains('Quality Assurance')
  })
})
