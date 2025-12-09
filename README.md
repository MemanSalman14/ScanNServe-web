# 🍽️ ScanNServe - Food Ordering System

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

**A modern, full-stack food ordering platform to browse, order, and enjoy delicious meals**

[🚀 Live Demo](https://scan-n-serve-frontend.vercel.app) • [Features](#-features) • [Installation](#-installation--setup) • [API Docs](#-api-endpoints) 

</div>

---

## 📋 Table of Contents

- [About The Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Deployment](#-deployment)


---

## 🎯 About The Project

**ScanNServe** is a complete food ordering solution that enables customers to browse menus, place orders, and make secure payments. The system includes three main components:

- **Customer Frontend** - User-facing application for browsing and ordering food
- **Admin Panel** - Management dashboard for restaurant owners
- **Backend API** - RESTful API handling all business logic

---

## ✨ Features

### 👥 Customer Features
| Feature | Description |
|---------|-------------|
| 🔐 User Authentication | Secure signup/login with JWT |
| 🍕 Browse Menu | Filter food items by category |
| 🛒 Shopping Cart | Add, remove, and update quantities |
| 💳 Secure Payments | Stripe integration for payments |
| 📦 Order Tracking | Real-time order status updates |
| 📱 Responsive Design | Mobile-first approach |

### 👨‍💼 Admin Features
| Feature | Description |
|---------|-------------|
| ➕ Add Food Items | Upload images with base64 encoding |
| 📋 Manage Menu | Edit and delete food items |
| 📊 Order Management | View and update order statuses |
| 🔄 Real-time Updates | Live order notifications |

---

## 🛠 Tech Stack

### Frontend
```
React 19 • React Router DOM • Axios • React Toastify • Vite • CSS3
```

### Backend
```
Node.js • Express.js • MongoDB • Mongoose • JWT • Bcrypt • Stripe • Multer
```

### Deployment
```
Vercel (Frontend & Backend) • MongoDB Atlas
```

---

## 📁 Project Structure

```

│
├── 📂 frontend_ScanNServe/          # Customer Application
│   ├── public/
│   └── src/
│       ├── assets/                  # Images & static files
│       ├── components/              # Reusable UI components
│       │   ├── Navbar/
│       │   ├── Header/
│       │   ├── ExploreMenu/
│       │   ├── FoodDisplay/
│       │   ├── FoodItem/
│       │   ├── Footer/
│       │   ├── LoginPopup/
│       │   └── AppDownload/
│       ├── context/                 # React Context (State Management)
│       └── pages/                   # Application pages
│           ├── Home/
│           ├── Cart/
│           ├── PlaceOrder/
│           ├── MyOrders/
│           └── Verify/
│
├── 📂 admin_ScanNServe/             # Admin Panel
│   └── src/
│       ├── assets/
│       ├── components/
│       │   ├── Navbar/
│       │   └── Sidebar/
│       └── pages/
│           ├── Add/                 # Add food items
│           ├── List/                # View/delete items
│           └── Orders/              # Manage orders
│
└── 📂 backend_ScanNServe/           # Backend API
    ├── config/                      # Database configuration
    ├── controllers/                 # Route handlers
    ├── middleware/                  # Auth middleware
    ├── models/                      # Mongoose schemas
    ├── routes/                      # API routes
    └── uploads/                     # Uploaded files
```

---

## 🚀 Installation & Setup

### Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14.0.0 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB Atlas](https://www.mongodb.com/atlas) account
- [Stripe](https://stripe.com/) account

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/ScanNServe.git
cd ScanNServe
```

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd backend_ScanNServe

# Install dependencies
npm install

# Create environment file
copy .env.example .env    # Windows
# cp .env.example .env    # Mac/Linux

# Start development server
npm run server
```

### Step 3: Frontend Setup

```bash
# Open new terminal and navigate to frontend
cd frontend_ScanNServe

# Install dependencies
npm install

# Start development server
npm run dev
```

### Step 4: Admin Panel Setup

```bash
# Open new terminal and navigate to admin panel
cd admin_ScanNServe

# Install dependencies
npm install

# Start development server
npm run dev
```

### 🎉 Access the Applications

| Application | URL |
|-------------|-----|
| Frontend | http://localhost:5173 |
| Admin Panel | http://localhost:5174 |
| Backend API | http://localhost:4000 |

---

## 🔐 Environment Variables

Create a `.env` file in the `backend_ScanNServe` directory:

```env
# Database
MONGODB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/scannserve

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here

# Stripe Payment
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key

# Server
PORT=4000
```

> ⚠️ **Important**: Never commit your `.env` file to version control!

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/user/register` | Register new user | ❌ |
| `POST` | `/api/user/login` | Login user | ❌ |

### Food Items

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/food/list` | Get all food items | ❌ |
| `POST` | `/api/food/add` | Add new food item | ✅ Admin |
| `POST` | `/api/food/remove` | Delete food item | ✅ Admin |

### Shopping Cart

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/cart/add` | Add item to cart | ✅ |
| `POST` | `/api/cart/remove` | Remove item from cart | ✅ |
| `POST` | `/api/cart/get` | Get user's cart | ✅ |

### Orders

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/order/place` | Place new order | ✅ |
| `POST` | `/api/order/verify` | Verify payment | ❌ |
| `POST` | `/api/order/userorders` | Get user's orders | ✅ |
| `GET` | `/api/order/list` | Get all orders | ✅ Admin |
| `POST` | `/api/order/status` | Update order status | ✅ Admin |

---

## 🚦 Order Status Flow

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  🍳 Processing  │ ──► │  🚚 Out for     │ ──► │  ✅ Delivered   │
│                 │     │     Delivery    │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

---

## ☁️ Deployment

### Deploy to Vercel

#### Backend Deployment

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com/)
3. Set root directory to `backend_ScanNServe`
4. Add environment variables in Vercel dashboard
5. Deploy!

#### Frontend Deployment

1. Update API URL in `src/context/StoreContext.jsx`
2. Import project in [Vercel](https://vercel.com/)
3. Set root directory to `frontend_ScanNServe`
4. Deploy!

#### Admin Panel Deployment

1. Update API URL in `src/App.jsx`
2. Import project in [Vercel](https://vercel.com/)
3. Set root directory to `admin_ScanNServe`
4. Deploy!

---





---







