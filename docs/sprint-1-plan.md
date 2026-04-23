# Sprint 1 Plan
Project: HapagTech – Smart Restaurant Ordering System

---

## Sprint Duration
Week 2 – Week 3 (2 weeks)

## Change Request Update (Week 3)
New requirement added: **Cancel Order Before Preparation**

Timeline adjustment:
- Week 2: Keep original authentication, browsing, cart, and checkout tasks
- Week 3: Add cancellation API, cancel button in UI, and validation/testing tasks

---

## Selected User Stories

### 1. User Login and Registration
- **Priority:** High   
- **Story Points:** 3
- **Owner:** Sajol, Rhenel Jhon
- **Tasks:**
  - Create login UI and registration UI
  - User can input name, email, and password
  - Implement authentication login
  - System validates required fields
  - Validate user credentials
  - Redirect user after login

---

### 2. User Page and Details
- **Priority:** High  
- **Story Points:** 3
- **Owner:** Locsin, Roxanne  
- **Tasks:**
  - Develop user profile page displaying personal information
  - Implement order history section showing past transaction and order details
  - Add functionality for viewing and updating user preferences

---

### 3. Browse Available Dishes
- **Priority:** High
- **Story Points:** 5
- **Owner:** Locsin, Roxanne
- **Tasks:**
  - Create menu UI layout 
  - Display list of dishes (name, price, range)
  - Implement category filtering (Agahan, Tanghalian, Hapunan)
  - Add search or filter functionality 
  - Create dish details view

---

### 4. Add to Cart
- **Priority:** High
- **Story Points:** 3
- **Owner:** Chiong, Heart   
- **Tasks:**
  - Create "Add to Cart" button in product page UI
  - Check if item already exist in cart and update quantity 
  - Update total cart cost
  - Store selected product details

---

### 5. View Cart
- **Priority:** High
- **Story Points:** 3
- **Owner:** Chiong, Heart   
- **Tasks:**
  - Create cart page UI
  - Display selected items
  - Show quantity and total price
  - Implement remove item function

---

### 6. Checkout Order
- **Priority:** High  
- **Story Points:** 5  
- **Owner:** Limpahan, Mark Vincent
- **Tasks:**
  - Create checkout page UI showing selected cart items  
  - Display order summary (items, quantity, subtotal, total price) 
  - Implement "Place Order" button functionality  
  - Validate cart before checkout (prevent empty orders)  
  - Send order data to backend / API endpoint  
  - Store order in database with initial status (e.g., Pending)  
  - Clear cart after successful order placement  
  - Show order confirmation message to user  

---

### 7. Cancel Order Before Preparation (Change Request)
- **Priority:** High
- **Story Points:** 5
- **Owner:** Limpahan, Mark Vincent; Chiong, Heart
- **Tasks:**
  - Add `Cancel Order` action in order history UI for pending orders
  - Create backend endpoint to cancel order with status validation
  - Restrict cancellation to `Pending` orders only
  - Update order state to `Canceled` and persist audit info
  - Add tests for allowed and blocked cancellation scenarios
