describe('Cart and Checkout', () => {
  it('should add item to cart and checkout', () => {
    cy.visit('/products');
    cy.get('.add-to-cart').first().click();
    cy.visit('/cart');
    cy.get('.checkout').click();
    cy.contains('Order placed');
  });
});