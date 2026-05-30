describe('Navigation', () => {
  it('should navigate to correct pages via links', () => {
    cy.visit('/');
    cy.get('a[href="/about"]').click();
    cy.url().should('include', '/about');
    cy.get('a[href="/products"]').click();
    cy.url().should('include', '/products');
  });
});