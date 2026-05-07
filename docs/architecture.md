# System Architecture
Project: HapagTech – Smart Restaurant Ordering System

## System Overview Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                          HAPAGTECH SYSTEM                            │
└─────────────────────────────────────────────────────────────────────┘

                                 Internet
                                    ↑
                ┌───────────────────┼───────────────────┐
                │                   │                   │
                ↓                   ↓                   ↓
        ┌─────────────┐      ┌─────────────┐     ┌──────────────┐
        │  Web Browser│      │  Mobile App │     │  Admin Panel │
        └─────────────┘      └─────────────┘     └──────────────┘
                │                   │                   │
                └───────────────────┼───────────────────┘
                                    │ HTTP/HTTPS
                                    ↓
        ┌────────────────────────────────────────────────────────┐
        │             FRONTEND (React + TypeScript)              │
        │  ┌──────────────────────────────────────────────────┐  │
        │  │  Components:                                     │  │
        │  │  - Header & Navigation                           │  │
        │  │  - Product Catalog & Search                      │  │
        │  │  - Shopping Cart                                 │  │
        │  │  - User Profile & Authentication                │  │
        │  │  - Order Management                              │  │
        │  │  - Favorites & Wishlist                          │  │
        │  └──────────────────────────────────────────────────┘  │
        │                       ↓                                  │
        │              REST API Calls (Axios)                     │
        └────────────────────────────────────────────────────────┘
                                    │ API Requests/JSON
                                    ↓
        ┌────────────────────────────────────────────────────────┐
        │           BACKEND (Django REST Framework)              │
        │  ┌──────────────────────────────────────────────────┐  │
        │  │  API Endpoints:                                  │  │
        │  │  - /api/auth/ (Login, Register, JWT)            │  │
        │  │  - /api/products/ (Browse, Filter, Search)      │  │
        │  │  - /api/cart/ (Add, Remove, Update Items)       │  │
        │  │  - /api/orders/ (Create, Track, History)        │  │
        │  │  - /api/favorites/ (Save, Remove Products)      │  │
        │  │  - /api/users/ (Profile, Preferences)           │  │
        │  └──────────────────────────────────────────────────┘  │
        │                       ↓                                  │
        │              Django ORM & Business Logic                │
        └────────────────────────────────────────────────────────┘
                                    │ SQL Queries
                                    ↓
        ┌────────────────────────────────────────────────────────┐
        │                   DATABASE                             │
        │  ┌──────────────────────────────────────────────────┐  │
        │  │  PostgreSQL Tables:                              │  │
        │  │  - Users (auth, profile, preferences)            │  │
        │  │  - Products (menu items, categories)             │  │
        │  │  - Orders (transactions, status, totals)         │  │
        │  │  - Cart Items (temporary shopping state)         │  │
        │  │  - Favorites (saved products)                    │  │
        │  └──────────────────────────────────────────────────┘  │
        └────────────────────────────────────────────────────────┘

                            External Services
                                    │
                ┌───────────────────┼───────────────────┐
                │                   │                   │
                ↓                   ↓                   ↓
        ┌────────────────┐ ┌──────────────┐ ┌─────────────────┐
        │  Cloudinary    │ │  JWT Auth    │ │  Email Service  │
        │  (Image CDN)   │ │  (Security)  │ │  (Notifications)│
        └────────────────┘ └──────────────┘ └─────────────────┘
```

---

## System Components

### 1. Frontend (React + TypeScript + Vite)
**Purpose**: User-facing interface for browsing, ordering, and account management

**Key Features**:
- **Product Discovery**: Browse categories, search, filter by dietary preferences (dairy-free, etc.)
- **Shopping Cart**: Add/remove items, view totals, manage quantities
- **User Authentication**: Login/Register, JWT token management, profile management
- **Order Management**: Place orders, track status, view order history
- **Favorites**: Save preferred products for quick access
- **Responsive UI**: Works on desktop and mobile devices

**Technologies**:
- React 18+ with TypeScript
- Vite (build tool)
- Axios (HTTP client for API calls)
- State Management: Zustand (ProductStore, HomeUserStore)
- ESLint for code quality

### 2. Backend (Django REST Framework)
**Purpose**: Handles business logic, data processing, and API serving

**Key Apps**:

#### API App
- User authentication and profile management
- User preferences (dietary restrictions, profile picture)
- JWT token generation and validation

#### Products App
- Product catalog management
- Category organization
- Dietary information and ingredient tracking
- Favorite products feature

#### Cart App
- Shopping cart management
- Item quantity tracking
- Cart persistence

#### Orders App
- Order creation and processing
- Order status tracking
- Total amount calculation
- Order history

**Technologies**:
- Django 5.1.6 (Python web framework)
- Django REST Framework (API serialization)
- djangorestframework_simplejwt (JWT authentication)
- PostgreSQL (production database)
- Pillow (image processing)
- Cloudinary (image storage and CDN)

### 3. Database (PostgreSQL)
**Purpose**: Persistent data storage for all application entities

**Key Tables**:
- **Users**: Authentication, profile info, dietary preferences
- **Products**: Menu items, descriptions, prices, dietary info
- **Categories**: Product categories/classifications
- **Orders**: Customer orders, total amounts, timestamps
- **Cart**: Temporary shopping session items
- **Favorites**: User-saved products

**Features**:
- Relational data model
- Foreign key constraints for data integrity
- Migration system for schema versioning

---

## Data Flow

### 1. User Registration/Login Flow
```
User enters credentials
    ↓
Frontend sends POST /api/auth/register or /api/auth/login
    ↓
Backend validates input & creates/verifies user
    ↓
JWT token generated and returned
    ↓
Frontend stores token in localStorage
    ↓
Token included in Authorization header for future requests
```

### 2. Product Browsing Flow
```
User searches/filters products
    ↓
Frontend sends GET /api/products/?search=X&category=Y&dietary=Z
    ↓
Backend queries database, applies filters
    ↓
Backend retrieves product details with images (Cloudinary URLs)
    ↓
JSON response with product list sent to frontend
    ↓
Frontend renders product cards with images
```

### 3. Shopping & Order Flow
```
User adds items to cart
    ↓
Frontend sends POST /api/cart/ with product_id and quantity
    ↓
Backend stores in Cart table, linked to user
    ↓
User proceeds to checkout
    ↓
Frontend sends POST /api/orders/ with cart items
    ↓
Backend creates Order record, calculates total
    ↓
Database updated with order and clears cart
    ↓
Frontend shows order confirmation with order ID
    ↓
User can view order status via GET /api/orders/{id}
```

### 4. Favorites Feature Flow
```
User clicks "save" on product
    ↓
Frontend sends POST /api/favorites/ with product_id
    ↓
Backend creates Favorite record linking user to product
    ↓
Frontend updates UI (favorite icon highlights)
    ↓
Favorites persisted in database for next login
```

---

## Authentication & Security

- **JWT Tokens**: Stateless authentication using JSON Web Tokens
- **Token Expiration**: Tokens expire after configurable duration
- **Refresh Tokens**: Allows users to stay logged in without re-entering credentials
- **CORS Headers**: Controlled cross-origin access from frontend
- **Password Storage**: Hashed using Django's built-in security
- **Cloudinary Integration**: Secure image uploads and CDN delivery

---

## Deployment Architecture

### Frontend Deployment (Vercel)
- Automatic deployment from git push
- Edge caching for static assets
- Environment variables for API base URL
- Serverless function support (if needed)

### Backend Deployment (Heroku/Railway/Azure)
- Docker containerization support (Dockerfile in Procfile)
- Environment variables for database, secrets
- Automatic migrations on deploy
- Background job support via Celery (if scaling)

---

## Scalability Considerations

**Current State** (Monolithic):
- Single backend instance
- Shared database connection
- Suitable for MVP/initial launch

**Future Improvements**:
1. **Microservices**: Separate Cart, Orders, Products into independent services
2. **Caching**: Redis for frequently accessed data (products, user sessions)
3. **Message Queues**: RabbitMQ/Celery for async tasks (email notifications, order processing)
4. **Load Balancing**: Multiple backend instances behind load balancer
5. **Database Optimization**: Indexing, query optimization, read replicas
6. **API Rate Limiting**: Protect against abuse
7. **CDN Expansion**: Serve content from multiple global regions

---

## Technology Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React, TypeScript, Vite | Web UI & user interactions |
| Backend | Django, DRF, Python | Business logic & API |
| Database | PostgreSQL | Data persistence |
| Auth | JWT (djangorestframework_simplejwt) | Secure authentication |
| Images | Cloudinary | Image storage & CDN |
| Deployment | Vercel (Frontend), Heroku/Railway (Backend) | Production hosting |

---

## API Contract Example

### GET /api/products/
Fetch all products with optional filters

**Request**:
```json
GET /api/products/?category=pizza&dietary=dairy-free&search=margherita
```

**Response**:
```json
[
  {
    "id": 1,
    "name": "Margherita Pizza",
    "description": "Classic pizza with tomato and mozzarella",
    "price": 12.99,
    "category": "pizza",
    "dietary_info": ["dairy-free"],
    "ingredients": ["tomato", "flour", "dairy-free mozzarella"],
    "image_url": "https://cloudinary.com/image123",
    "is_favorite": false
  }
]
```

### POST /api/orders/
Create a new order

**Request**:
```json
{
  "items": [
    {"product_id": 1, "quantity": 2},
    {"product_id": 3, "quantity": 1}
  ]
}
```

**Response**:
```json
{
  "id": 42,
  "user": 5,
  "items": [...],
  "total_amount": 28.97,
  "status": "pending",
  "created_at": "2026-05-06T10:30:00Z"
}
```
