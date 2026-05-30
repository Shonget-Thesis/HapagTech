describe('Error States', () => {
  it('should show error for wrong credentials', () => {
    cy.visit('/login');
    cy.get('input[name="username"]').type('wronguser');
    cy.get('input[name="password"]').type('wrongpass');
    cy.get('button[type="submit"]').click();
    cy.contains('Invalid credentials');
  });
  it('should show error for empty fields', () => {
    cy.visit('/login');
    cy.get('button[type="submit"]').click();
    cy.contains('Please fill out this field');
  });
});