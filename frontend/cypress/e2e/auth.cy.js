describe('Auth Flow', () => {
  it('should login with valid credentials', () => {
    cy.visit('/login');
    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="password"]').type('testpass');
    cy.get('button[type="submit"]').click();
    cy.contains('Welcome, testuser');
  });
});