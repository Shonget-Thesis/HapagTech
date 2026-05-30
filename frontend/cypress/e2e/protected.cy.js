describe('Protected Routes', () => {
  it('should redirect to login if not authenticated', () => {
    cy.visit('/protected');
    cy.url().should('include', '/login');
  });
});