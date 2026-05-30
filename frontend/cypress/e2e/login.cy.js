describe('Login Page', () => {
  it('should display login form and allow user to type', () => {
    cy.visit('http://localhost:5173/login');
    cy.get('input[type=email]').type('test@example.com');
    cy.get('input[type=password]').type('password123');
    cy.contains('Log in').should('be.visible');
  });
});