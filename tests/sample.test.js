// 1. Order Creation
function createOrder(items) {
  return {
    id: 1,
    items: items,
    status: 'pending'
  };
}

// 2. Menu Retrieval
function getMenu() {
  return ['Burger', 'Fries', 'Drink'];
}

// 3. Cart Total Calculation
function calculateTotal(prices) {
  return prices.reduce((sum, price) => sum + price, 0); // FIXED
}

// 4. API Response Validation
function fetchOrder() {
  return {
    success: true,
    data: { id: 1, total: 150 }
  };
}

// 5. Input Validation
function isValidOrderInput(input) {
  return input !== null && input.length > 0;
}


describe('HapagTech System Tests', () => {

  test('Order creation should return a valid order object', () => {
    const order = createOrder(['Burger', 'Fries']);
    expect(order).toHaveProperty('id');
    expect(order.items.length).toBe(2);
    expect(order.status).toBe('pending');
  });

  test('Menu retrieval should return available items', () => {
    const menu = getMenu();
    expect(menu).toContain('Burger');
    expect(menu.length).toBeGreaterThan(0);
  });

  test('Cart total calculation should be correct', () => {
    const total = calculateTotal([100, 50]);
    expect(total).toBe(150);
  });

  test('API response should return success and valid data', () => {
    const response = fetchOrder();
    expect(response.success).toBe(true);
    expect(response.data).toHaveProperty('id');
    expect(response.data.total).toBe(150);
  });

  test('Input validation should reject empty input', () => {
    expect(isValidOrderInput([])).toBe(false);
    expect(isValidOrderInput(['Burger'])).toBe(true);
  });

});